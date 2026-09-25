#!/usr/bin/env node
// Extracts the 32 treatment detail frames (same 1440×7749 template) into
// src/data/treatments.generated.json. Text is copied verbatim from Figma.
//
//   node scripts/extract-treatments.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { imageBox } from "./lib.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const doc = JSON.parse(readFileSync(join(ROOT, "design", "file.json"), "utf8"));
const byId = new Map();
(function index(n) { byId.set(n.id, n); n.children?.forEach(index); })(doc.document);

// Frame id → canonical hero title (frame names in Figma are wrong; slug comes from the hero title).
export const DETAIL_FRAMES = {
  "239:1096": "Non-Surgical Breast Lift", "883:2": "Weight loss", "928:1899": "Sclerotherapy",
  "951:2940": "Microneedling", "951:14": "Metabolic Reset", "701:2167": "Non-Surgical Male Pectoral Sculpting",
  "928:2188": "Vaginal Rejuvenation", "951:3227": "Laser Treatments", "951:301": "Testosterone Replacement Therapy",
  "883:294": "Hair Restoration", "928:2477": "Skin Tightening", "951:3514": "Biostimulators",
  "951:588": "Anti Aging and Longevity", "951:1455": "Hydra Facial", "883:585": "Pectoral Sculpting",
  "951:4090": "PDO Threadlifts", "966:6717": "Salmon DNA Facial", "966:8437": "Non-Invasive BBL",
  "966:8149": "IV Therapy", "902:1512": "Hand Rejuvenation", "928:2770": "CO2 Laser",
  "951:3803": "Facial Balancing", "959:4421": "Men's Procedure", "966:6431": "Neurotoxins",
  "951:881": "Chemical Peel", "951:2028": "Lip Fillers", "932:3358": "Pico Laser", "951:1168": "Skin Boosters",
  "932:3645": "Tattoo Removal", "686:1719": "Non-surgical BBL", "928:3057": "Slim Shots",
  "951:1741": "Hormone Replacement Therapy",
};

export const slugify = (s) =>
  s.toLowerCase().replace(/[’']/g, "").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const r1 = (v) => Math.round(v * 10) / 10;
const visible = (n) => n.visible !== false;
const all = (n, pred, out = []) => {
  if (!visible(n)) return out;
  if (pred(n)) out.push(n);
  n.children?.forEach((c) => all(c, pred, out));
  return out;
};
const texts = (n) => all(n, (x) => x.type === "TEXT").sort((a, b) => a.absoluteBoundingBox.y - b.absoluteBoundingBox.y || a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const fillHex = (n) => { const f = n.fills?.find((f) => f.type === "SOLID" && f.visible !== false); return f ? hex(f.color) : null; };
const imageFill = (n) => n.fills?.find((f) => f.type === "IMAGE" && f.visible !== false && f.imageRef);

/** Rich text: split into runs, marking the serif-italic accent words. */
function rich(n) {
  const ov = n.characterStyleOverrides ?? [];
  const chars = [...n.characters];
  const runs = [];
  for (let i = 0; i < chars.length; i++) {
    const s = { ...n.style, ...(n.styleOverrideTable?.[ov[i]] ?? {}) };
    const accent = /Ancizar/.test(s.fontFamily);
    const last = runs.at(-1);
    if (last && last.accent === accent) last.text += chars[i];
    else runs.push({ text: chars[i], accent });
  }
  return runs;
}

/** First image under `node` (incl. node itself), placed relative to `frame` (see scripts/lib.mjs). */
function image(node, frame) {
  const imgs = all(node, (x) => !!imageFill(x));
  if (!imgs.length) return null;
  const { ref, box, img, fit } = imageBox(imgs[0], frame.absoluteBoundingBox);
  return { ref, place: { box, ...(img ? { img } : {}), fit } };
}

function extract(id, canonical) {
  const f = byId.get(id);
  const o = f.absoluteBoundingBox;
  const secs = f.children.filter((c) => visible(c) && c.absoluteBoundingBox.height > 300)
    .sort((a, b) => a.absoluteBoundingBox.y - b.absoluteBoundingBox.y);
  const at = (y) => secs.find((s) => Math.abs(s.absoluteBoundingBox.y - o.y - y) < 40);
  const [heroS, processS, outcomesS, whyS, calcS, familyS, faqS] = [111, 791, 1790, 2770, 4002, 4999, 5632].map(at);
  const warn = [];

  // Hero — only text within the visible 680px band counts (the rest is clipped in Figma).
  const hb = heroS.absoluteBoundingBox;
  const heroTexts = texts(heroS).filter((t) => t.absoluteBoundingBox.y < hb.y + hb.height);
  const title = heroTexts.find((t) => t.style.fontSize >= 50);
  const hero = {
    kicker: heroTexts.find((t) => t.characters.trim().startsWith("/"))?.characters.trim() ?? null,
    title: rich(title),
    subtitle: heroTexts.find((t) => t.style.fontSize === 20)?.characters ?? null,
    primaryCta: heroTexts.find((t) => fillHex(t) === "#774c39")?.characters ?? null,
    secondaryCta: heroTexts.find((t) => /Virtual/.test(t.characters) && t !== title)?.characters ?? null,
    image: image(heroS, heroS),
  };

  // Process
  const pT = texts(processS);
  const slideFrames = all(processS, (x) => x.type === "FRAME" && x.absoluteBoundingBox.width > 1000 && x.absoluteBoundingBox.height > 400 && x.absoluteBoundingBox.height < 600 && fillHex(x) === "#000000");
  const process = {
    kicker: pT.find((t) => t.characters.startsWith("/"))?.characters ?? null,
    title: pT.find((t) => t.style.fontSize >= 50)?.characters ?? null,
    description: pT.find((t) => t.style.fontSize === 15 && t.style.lineHeightPx === 30)?.characters ?? null,
    slides: slideFrames.map((s) => {
      const st = texts(s);
      return { number: st[0]?.characters ?? null, title: st[1]?.characters ?? null, image: image(s, s) };
    }),
  };

  // Clinical outcomes
  const oT = texts(outcomesS);
  const beforeAfter = all(outcomesS, (x) => x.type === "FRAME" && x.absoluteBoundingBox.height > 450 && x.absoluteBoundingBox.width > 400 && x.absoluteBoundingBox.width < 600 && fillHex(x) === "#000000")
    .sort((a, b) => a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
  const outcomes = {
    kicker: oT.find((t) => t.characters.startsWith("/"))?.characters ?? null,
    title: oT.find((t) => t.style.fontSize >= 50)?.characters ?? null,
    subtitle: oT.find((t) => t.style.fontSize === 15 && t.style.lineHeightPx === 23)?.characters ?? null,
    caseTitle: oT.find((t) => t.style.fontWeight === 700)?.characters ?? null,
    facts: oT.filter((t) => t.characters.includes("\n") && t.style.fontSize === 15).map((t) => {
      const [label, ...rest] = t.characters.split("\n");
      return { label, value: rest.join("\n"), width: r1(t.absoluteBoundingBox.width) };
    }),
    before: oT.find((t) => t.characters === "Before")?.characters ?? "Before",
    after: oT.find((t) => t.characters === "After")?.characters ?? "After",
    images: beforeAfter.map((fr) => image(fr, fr)),
  };

  // Why clients love…
  const wT = texts(whyS);
  const links = wT.filter((t) => /Results, details/.test(t.characters));
  const cardFrames = all(whyS, (x) => x.type === "FRAME" && x.absoluteBoundingBox.width > 400 && x.absoluteBoundingBox.width < 700 && x.absoluteBoundingBox.height > 250 && x.absoluteBoundingBox.height < 400)
    .filter((fr) => texts(fr).some((t) => /Results, details/.test(t.characters)))
    // keep the outermost matching frame per card
    .filter((fr, _, arr) => !arr.some((p) => p !== fr && all(p, (x) => x === fr).length))
    .sort((a, b) => a.absoluteBoundingBox.y - b.absoluteBoundingBox.y || a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
  if (cardFrames.length !== links.length) warn.push(`why: ${cardFrames.length} cards vs ${links.length} links`);
  const why = {
    title: wT.find((t) => t.style.fontSize >= 50)?.characters ?? null,
    subtitle: wT.find((t) => t.style.fontSize === 15 && t.style.lineHeightPx === 20)?.characters ?? null,
    cards: cardFrames.map((fr) => {
      const ct = texts(fr);
      return {
        title: ct.find((t) => t.style.fontWeight === 600)?.characters ?? null,
        description: ct.find((t) => t.style.fontWeight === 400 && t.style.fontSize === 15)?.characters ?? null,
        descriptionWidth: r1(ct.find((t) => t.style.fontWeight === 400 && t.style.fontSize === 15)?.absoluteBoundingBox.width ?? 295),
        link: ct.find((t) => /Results, details/.test(t.characters))?.characters ?? null,
        image: image(fr, fr),
      };
    }),
  };

  // Price calculator (labels only; numbers come from src/data/pricing.ts)
  const cT = texts(calcS);
  const calc = {
    kicker: cT.find((t) => t.characters.startsWith("/"))?.characters ?? null,
    title: cT.find((t) => t.style.fontSize === 50)?.characters ?? null,
    subtitle: cT.find((t) => t.style.fontSize === 15 && !t.characters.startsWith("/"))?.characters.trim() ?? null,
    zonesLabel: cT.find((t) => t.style.fontSize === 17 && t.style.fontWeight === 400 && /Zones|Area|Target/i.test(t.characters))?.characters ?? null,
    zonesPlaceholder: cT.find((t) => /Select/.test(t.characters))?.characters ?? null,
    durationLabel: cT.find((t) => /Duration|Weeks/i.test(t.characters))?.characters ?? null,
    weeks: cT.filter((t) => /^\d+$/.test(t.characters) && t.style.fontSize === 17).map((t) => Number(t.characters)),
    acceleratorsLabel: cT.find((t) => /Accelerators/.test(t.characters))?.characters ?? null,
    accelerators: cT.filter((t) => /^Add /.test(t.characters)).map((t) => t.characters),
    rateLabel: cT.find((t) => /per session/i.test(t.characters))?.characters ?? null,
    discountLabel: cT.find((t) => /Discount/i.test(t.characters))?.characters ?? null,
    totalLabel: cT.find((t) => /Total/i.test(t.characters))?.characters ?? null,
    footnote: cT.find((t) => t.style.italic)?.characters ?? null,
  };

  // Family CTA (background image is a fill on the section frame itself)
  const fT = texts(familyS);
  const family = {
    kicker: fT.find((t) => t.style.fontSize === 17 && t.style.lineHeightPx === 16)?.characters ?? null,
    title: fT.find((t) => t.style.fontSize >= 50)?.characters ?? null,
    text: fT.find((t) => t.style.lineHeightPx === 30)?.characters ?? null,
    cta: fT.find((t) => fillHex(t) === "#281c17")?.characters ?? null,
    image: image(familyS, familyS),
  };

  // FAQ
  const qT = texts(faqS);
  const qs = qT.filter((t) => t.style.fontFamily === "Manrope" && t.style.fontWeight === 800);
  const as = qT.filter((t) => t.style.fontFamily === "Manrope" && t.style.fontWeight === 500);
  const faq = {
    title: qT.find((t) => t.style.fontSize >= 60)?.characters ?? null,
    image: image(faqS, faqS),
    items: qs.map((q, i) => {
      const next = qs[i + 1]?.absoluteBoundingBox.y ?? Infinity;
      const a = as.find((a) => a.absoluteBoundingBox.y > q.absoluteBoundingBox.y && a.absoluteBoundingBox.y < next);
      return { q: q.characters, a: a?.characters ?? null };
    }),
  };

  const heroTitle = hero.title.map((r) => r.text).join("");
  return {
    frameId: id,
    slug: slugify(canonical),
    name: canonical,
    heroTitle,
    category: hero.kicker,
    hero, process, outcomes, why, calc, family, faq,
    ...(warn.length ? { warnings: warn } : {}),
  };
}

const data = Object.entries(DETAIL_FRAMES).map(([id, name]) => extract(id, name));
const slugs = new Set();
for (const t of data) {
  if (slugs.has(t.slug)) throw new Error(`duplicate slug ${t.slug}`);
  slugs.add(t.slug);
  if (t.warnings) console.warn(t.slug, t.warnings);
}
writeFileSync(join(ROOT, "src", "data", "treatments.generated.json"), JSON.stringify(data, null, 2) + "\n");
console.log(`extracted ${data.length} treatments`);
