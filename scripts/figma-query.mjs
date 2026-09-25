#!/usr/bin/env node
// Query the cached Figma tree (design/file.json) without reading it by hand.
//
//   node scripts/figma-query.mjs tree <id> [depth=2]    # outline: type, name, id, box (relative to root)
//   node scripts/figma-query.mjs text <id>              # every TEXT node: y, x, style, characters
//   node scripts/figma-query.mjs node <id> [depth=0]    # raw JSON (children trimmed beyond depth)
//   node scripts/figma-query.mjs find <regex>           # nodes whose name OR text matches
//   node scripts/figma-query.mjs frames                 # top-level frames on the page
//   node scripts/figma-query.mjs styles                 # paint/text styles with resolved values
//   node scripts/figma-query.mjs fonts [id]             # font families/weights/sizes used
//   node scripts/figma-query.mjs images <id>            # image fill refs used under a node
//   node scripts/figma-query.mjs links <id>             # prototype interactions under a node

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const doc = JSON.parse(readFileSync(join(ROOT, "design", "file.json"), "utf8"));

const byId = new Map();
const parent = new Map();
(function index(n, p) {
  byId.set(n.id, n);
  if (p) parent.set(n.id, p.id);
  n.children?.forEach((c) => index(c, n));
})(doc.document);

const [cmd, arg, arg2] = process.argv.slice(2);
const get = (id) => {
  const n = byId.get(id);
  if (!n) { console.error(`no node ${id}`); process.exit(1); }
  return n;
};
const walk = (n, fn, d = 0) => { fn(n, d); n.children?.forEach((c) => walk(c, fn, d + 1)); };
const r = (v) => Math.round(v * 10) / 10;
const box = (n, o) => {
  const b = n.absoluteBoundingBox;
  return b ? `${r(b.x - o.x)},${r(b.y - o.y)} ${r(b.width)}×${r(b.height)}` : "";
};
const hex = (c, a = c?.a ?? 1) =>
  c ? "#" + [c.r, c.g, c.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("") + (a < 1 ? ` a${r(a)}` : "") : "";
const fillStr = (n) =>
  (n.fills ?? []).filter((f) => f.visible !== false).map((f) =>
    f.type === "SOLID" ? hex(f.color, (f.color.a ?? 1) * (f.opacity ?? 1)) : f.type === "IMAGE" ? `img:${f.imageRef?.slice(0, 8)}` : f.type.toLowerCase(),
  ).join(" ");
const styleStr = (s) => s ? `${s.fontFamily} ${s.fontWeight}${s.italic ? "i" : ""} ${s.fontSize}/${s.lineHeightPx ? r(s.lineHeightPx) : "auto"}${s.letterSpacing ? ` ls${r(s.letterSpacing)}` : ""}${s.textCase && s.textCase !== "ORIGINAL" ? ` ${s.textCase}` : ""}` : "";

// Mixed-style text: returns [{text, s, c}] runs for characters whose style differs from the base.
function styleRuns(n) {
  const ov = n.characterStyleOverrides;
  if (!ov?.length || !ov.some(Boolean)) return null;
  const runs = [];
  const chars = [...n.characters];
  for (let i = 0; i < chars.length; i++) {
    const k = ov[i] ?? 0;
    const last = runs.at(-1);
    if (last && last.k === k) last.text += chars[i];
    else runs.push({ k, text: chars[i] });
  }
  return runs.filter((r) => r.k).map((r) => {
    const s = { ...n.style, ...n.styleOverrideTable[r.k] };
    const fill = n.styleOverrideTable[r.k]?.fills?.[0];
    return { text: r.text, s: styleStr(s) + (s.textDecoration ? ` ${s.textDecoration}` : ""), c: fill?.color ? hex(fill.color) : "" };
  });
}

switch (cmd) {
  case "tree": {
    const root = get(arg);
    const max = Number(arg2 ?? 2);
    const o = root.absoluteBoundingBox ?? { x: 0, y: 0 };
    walk(root, (n, d) => {
      if (d > max) return;
      const layout = n.layoutMode ? ` [${n.layoutMode} gap${n.itemSpacing ?? 0} p${n.paddingTop ?? 0},${n.paddingRight ?? 0},${n.paddingBottom ?? 0},${n.paddingLeft ?? 0}]` : "";
      const txt = n.type === "TEXT" ? ` {${styleStr(n.style)}${n.style?.textAlignHorizontal && n.style.textAlignHorizontal !== "LEFT" ? " " + n.style.textAlignHorizontal : ""}} "${n.characters.slice(0, 70).replace(/\n/g, "⏎")}"` : "";
      const hidden = n.visible === false ? " (hidden)" : "";
      const rad = n.cornerRadius ? ` r${r(n.cornerRadius)}` : n.rectangleCornerRadii ? ` r${n.rectangleCornerRadii.map(r).join("/")}` : "";
      const strokes = (n.strokes ?? []).filter((s) => s.visible !== false && s.type === "SOLID");
      const stroke = strokes.length ? ` stroke:${hex(strokes[0].color, (strokes[0].color.a ?? 1) * (strokes[0].opacity ?? 1))}/${r(n.strokeWeight ?? 1)}` : "";
      const fx = (n.effects ?? []).filter((e) => e.visible !== false).map((e) => ` ${e.type.toLowerCase()}${e.radius ? r(e.radius) : ""}`).join("");
      const op = n.opacity != null && n.opacity < 1 ? ` op${r(n.opacity)}` : "";
      const mask = n.isMask ? " MASK" : "";
      const comp = n.type === "INSTANCE" && n.componentId ? ` comp:${n.componentId}` : "";
      console.log(`${"  ".repeat(d)}${n.type} ${n.name} <${n.id}> ${box(n, o)} ${fillStr(n)}${rad}${stroke}${fx}${op}${mask}${comp}${layout}${txt}${hidden}`);
    });
    break;
  }
  case "text": {
    const root = get(arg);
    const o = root.absoluteBoundingBox;
    const rows = [];
    walk(root, (n) => {
      if (n.type === "TEXT" && n.visible !== false) {
        const b = n.absoluteBoundingBox;
        rows.push({ y: r(b.y - o.y), x: r(b.x - o.x), w: r(b.width), id: n.id, s: styleStr(n.style), c: hex(n.fills?.[0]?.color), t: n.characters });
      }
    });
    rows.sort((a, b) => a.y - b.y || a.x - b.x);
    for (const t of rows) {
      console.log(`[${t.y},${t.x} w${t.w}] <${t.id}> ${t.s} ${t.c} :: ${JSON.stringify(t.t)}`);
      const runs = styleRuns(byId.get(t.id));
      if (runs) for (const run of runs) console.log(`      ↳ ${JSON.stringify(run.text)} {${run.s}${run.c ? " " + run.c : ""}}`);
    }
    break;
  }
  case "node": {
    const max = Number(arg2 ?? 0);
    const trim = (n, d) => ({ ...n, children: n.children && (d < max ? n.children.map((c) => trim(c, d + 1)) : `[${n.children.length} children]`) });
    console.log(JSON.stringify(trim(get(arg), 0), null, 1));
    break;
  }
  case "find": {
    const re = new RegExp(arg, "i");
    walk(doc.document, (n) => {
      if (re.test(n.name) || (n.type === "TEXT" && re.test(n.characters))) {
        let top = n.id; while (parent.get(top) && byId.get(parent.get(top)).type !== "CANVAS") top = parent.get(top);
        console.log(`${n.type} ${n.name} <${n.id}> in <${top}> ${n.type === "TEXT" ? JSON.stringify(n.characters.slice(0, 80)) : ""}`);
      }
    });
    break;
  }
  case "frames": {
    for (const page of doc.document.children)
      for (const f of page.children) console.log(`${f.type} ${f.name} <${f.id}> ${box(f, { x: 0, y: 0 })}${f.visible === false ? " (hidden)" : ""}`);
    break;
  }
  case "styles": {
    const used = new Map();
    walk(doc.document, (n) => {
      for (const [kind, sid] of Object.entries(n.styles ?? {})) if (!used.has(sid)) used.set(sid, { kind, n });
    });
    for (const [sid, meta] of Object.entries(doc.styles)) {
      const u = used.get(sid);
      const val = !u ? "(unused)" : meta.styleType === "TEXT" ? styleStr(u.n.style) : meta.styleType === "FILL" ? fillStr(u.n) : "";
      console.log(`${meta.styleType} ${meta.name} <${sid}> ${val}`);
    }
    break;
  }
  case "fonts": {
    const counts = new Map();
    walk(arg ? get(arg) : doc.document, (n) => {
      if (n.type !== "TEXT" || n.visible === false) return;
      const all = [n.style, ...Object.values(n.styleOverrideTable ?? {})];
      for (const s of all) if (s?.fontFamily) { const k = `${s.fontFamily} ${s.fontWeight}${s.italic ? " italic" : ""}`; counts.set(k, (counts.get(k) ?? 0) + 1); }
    });
    [...counts].sort().forEach(([k, v]) => console.log(`${k}  ×${v}`));
    break;
  }
  case "images": {
    const refs = new Map();
    walk(get(arg), (n) => (n.fills ?? []).forEach((f) => f.type === "IMAGE" && refs.set(f.imageRef, `${n.name} <${n.id}> ${f.scaleMode}`)));
    refs.forEach((v, k) => console.log(`${k}  ${v}`));
    break;
  }
  case "links": {
    walk(get(arg), (n) => {
      for (const it of n.interactions ?? [])
        for (const a of it.actions ?? []) console.log(`${n.name} <${n.id}> ${it.trigger?.type} → ${a.type} ${a.destinationId ?? a.url ?? ""} ${a.destinationId ? byId.get(a.destinationId)?.name ?? "" : ""}`);
    });
    break;
  }
  default:
    console.log(readFileSync(new URL(import.meta.url), "utf8").split("\n").slice(1, 13).join("\n"));
}
