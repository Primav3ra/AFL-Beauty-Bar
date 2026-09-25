#!/usr/bin/env node
// Extracts the 4 category pages into src/data/categories.generated.json (verbatim text + layout).
//
//   node scripts/extract-categories.mjs

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, loadDoc, imageFill } from "./lib.mjs";

const { byId } = loadDoc();
const PAGES = { body: "130:2468", "face-care": "221:689", other: "230:888", signature: "213:178" };

const r1 = (v) => Math.round(v * 10) / 10;
const vis = (n) => n.visible !== false;
const all = (n, p, o = []) => { if (!vis(n)) return o; if (p(n)) o.push(n); n.children?.forEach((c) => all(c, p, o)); return o; };
const texts = (n) => all(n, (x) => x.type === "TEXT").sort((a, b) => a.absoluteBoundingBox.y - b.absoluteBoundingBox.y || a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
const rel = (n, o) => ({ x: r1(n.absoluteBoundingBox.x - o.x), y: r1(n.absoluteBoundingBox.y - o.y), w: r1(n.absoluteBoundingBox.width), h: r1(n.absoluteBoundingBox.height) });
const runs = (n) => {
  const ov = n.characterStyleOverrides ?? [];
  const out = [];
  [...n.characters].forEach((ch, i) => {
    const s = { ...n.style, ...(n.styleOverrideTable?.[ov[i]] ?? {}) };
    const accent = /Ancizar/.test(s.fontFamily);
    const last = out.at(-1);
    if (last && last.accent === accent) last.text += ch;
    else out.push({ text: ch, accent });
  });
  return out;
};
const firstImage = (n) => all(n, (x) => !!imageFill(x))[0] ?? null;

const out = {};
for (const [key, id] of Object.entries(PAGES)) {
  const f = byId.get(id);
  const o = f.absoluteBoundingBox;
  const hero = f.children.find((c) => c.name === "Hero");
  const hb = hero.absoluteBoundingBox;
  const hT = texts(hero).filter((t) => t.absoluteBoundingBox.y < hb.y + hb.height);
  const kickerT = hT.find((t) => t.characters.trim().startsWith("/"));
  const titleT = hT.find((t) => t.style.fontSize >= 50);
  const descT = hT.find((t) => t !== kickerT && t !== titleT && t.style.fontSize === 17);
  const heroImg = firstImage(hero);

  // Card grid: ~406×280 frames.
  const cards = all(f, (x) => x.type === "FRAME" && Math.abs(x.absoluteBoundingBox.width - 406) < 8 && x.absoluteBoundingBox.height > 250 && x.absoluteBoundingBox.height < 300)
    .sort((a, b) => a.absoluteBoundingBox.y - b.absoluteBoundingBox.y || a.absoluteBoundingBox.x - b.absoluteBoundingBox.x);
  const grid = cards.length ? cards.reduce((b, c) => ({
    x: Math.min(b.x, c.absoluteBoundingBox.x), y: Math.min(b.y, c.absoluteBoundingBox.y),
    r: Math.max(b.r, c.absoluteBoundingBox.x + c.absoluteBoundingBox.width), bt: Math.max(b.bt, c.absoluteBoundingBox.y + c.absoluteBoundingBox.height),
  }), { x: Infinity, y: Infinity, r: -Infinity, bt: -Infinity }) : null;

  // Left column (eyebrow / title / text) — texts left of the grid, below the hero.
  const left = texts(f).filter((t) => t.absoluteBoundingBox.x < grid.x && t.absoluteBoundingBox.y > hb.y + hb.height && t.absoluteBoundingBox.y < grid.bt);
  const eyebrow = left.find((t) => t.characters.startsWith("/"));
  const colTitle = left.find((t) => t.style.fontSize >= 50);
  const colText = left.find((t) => t.style.fontSize === 15 && t !== eyebrow);

  // Rules + CTA banner.
  const lines = all(f, (x) => x.type === "LINE" && x.absoluteBoundingBox.width >= 1400).map((l) => r1(l.absoluteBoundingBox.y - o.y));
  const cta = f.children.find((c) => vis(c) && texts(c).some((t) => /Schedule your consultation/.test(t.characters)) && c.name !== "Footer");
  const cT = texts(cta);
  const ctaImg = firstImage(cta);
  const footer = f.children.find((c) => c.name === "Footer");

  out[key] = {
    frameId: id,
    hero: {
      nodeId: hero.id,
      height: r1(hb.height),
      top: r1(hb.y - o.y),
      image: heroImg ? heroImg.id : null,
      kicker: kickerT?.characters.trim() ?? null,
      kickerTop: kickerT ? r1(kickerT.absoluteBoundingBox.y - hb.y - 10) : null, // chip has 10px padding
      title: runs(titleT),
      titleTop: r1(titleT.absoluteBoundingBox.y - hb.y),
      titleSize: titleT.style.fontSize,
      titleTracking: r1(titleT.style.letterSpacing),
      description: descT?.characters.replace(/\n$/, "") ?? null,
      descriptionWidth: descT ? r1(descT.absoluteBoundingBox.width) : null,
      descriptionLineHeight: descT ? r1(descT.style.lineHeightPx) : null,
      descriptionGap: descT ? r1(descT.absoluteBoundingBox.y - titleT.absoluteBoundingBox.y - 77) : null,
    },
    column: {
      eyebrow: eyebrow?.characters ?? null,
      title: colTitle?.characters ?? null,
      titleWidth: colTitle ? r1(colTitle.absoluteBoundingBox.width) : null,
      text: colText?.characters ?? null,
      textWidth: colText ? r1(colText.absoluteBoundingBox.width) : null,
      textLineHeight: colText ? r1(colText.style.lineHeightPx) : null,
      x: eyebrow ? r1(eyebrow.absoluteBoundingBox.x - o.x) : null,
      eyebrowTop: eyebrow ? r1(eyebrow.absoluteBoundingBox.y - o.y) : null,
      titleTop: colTitle ? r1(colTitle.absoluteBoundingBox.y - o.y) : null,
      textTop: colText ? r1(colText.absoluteBoundingBox.y - o.y) : null,
    },
    grid: { x: r1(grid.x - o.x), y: r1(grid.y - o.y), w: r1(grid.r - grid.x), h: r1(grid.bt - grid.y) },
    cards: cards.map((c) => {
      const t = texts(c);
      const grad = all(c, (x) => x.fills?.some((fl) => fl.type === "GRADIENT_LINEAR"))[0];
      const img = firstImage(c);
      return {
        nodeId: c.id,
        box: rel(c, o),
        image: img?.id ?? null,
        gradientHeight: grad ? r1(grad.absoluteBoundingBox.height) : null,
        title: t[0]?.characters ?? null,
        titleTop: t[0] ? r1(t[0].absoluteBoundingBox.y - c.absoluteBoundingBox.y) : null,
        titleLeft: t[0] ? r1(t[0].absoluteBoundingBox.x - c.absoluteBoundingBox.x) : null,
        items: t.slice(1).map((x) => x.characters),
      };
    }),
    rules: lines,
    cta: {
      nodeId: cta.id,
      top: r1(cta.absoluteBoundingBox.y - o.y),
      height: r1(cta.absoluteBoundingBox.height),
      image: ctaImg?.id ?? null,
      kicker: cT.find((t) => t.characters.startsWith("/"))?.characters ?? null,
      title: cT.find((t) => t.style.fontSize >= 50)?.characters ?? null,
      button: cT.find((t) => /Appointment/.test(t.characters))?.characters ?? null,
      contentTop: r1(cT[0].absoluteBoundingBox.y - cta.absoluteBoundingBox.y),
    },
    footerTop: r1(footer.absoluteBoundingBox.y - o.y),
  };
}
writeFileSync(join(ROOT, "src", "data", "categories.generated.json"), JSON.stringify(out, null, 2) + "\n");
console.log(Object.entries(out).map(([k, v]) => `${k}: ${v.cards.length} cards`).join(", "));
