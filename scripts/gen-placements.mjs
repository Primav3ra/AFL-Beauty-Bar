#!/usr/bin/env node
// Generates src/data/placements.generated.json: for every visible image node in the built frames,
// its absolute Figma box + crop, and the absolute boxes of all its ancestors (anchors), so
// components can call place("<imageNodeId>", "<ancestorId>") and get pixel-exact positioning.
//
//   node scripts/gen-placements.mjs

import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { FRAMES } from "./frames.mjs";
import { ROOT, loadDoc, imageBox, imageFill } from "./lib.mjs";

const { byId } = loadDoc();
const parent = new Map();
(function index(n) { n.children?.forEach((c) => { parent.set(c.id, n.id); index(c); }); })([...byId.values()][0]);

const r1 = (v) => Math.round(v * 10) / 10;
const box = (n) => { const b = n.absoluteBoundingBox; return { x: r1(b.x), y: r1(b.y), w: r1(b.width), h: r1(b.height) }; };

const images = {};
const boxes = {};
for (const fid of FRAMES) {
  (function walk(n) {
    if (n.visible === false) return;
    if (imageFill(n) && n.absoluteBoundingBox) {
      const { ref, img, fit } = imageBox(n, { x: 0, y: 0 });
      images[n.id] = { ref, box: box(n), ...(img ? { img } : {}), fit, ...(n.opacity != null && n.opacity < 1 ? { opacity: r1(n.opacity * 100) / 100 } : {}) };
      for (let p = parent.get(n.id); p && byId.get(p).type !== "CANVAS"; p = parent.get(p)) boxes[p] ??= box(byId.get(p));
    }
    n.children?.forEach(walk);
  })(byId.get(fid));
}

writeFileSync(join(ROOT, "src", "data", "placements.generated.json"), JSON.stringify({ images, boxes }) + "\n");
console.log(`${Object.keys(images).length} image nodes, ${Object.keys(boxes).length} anchors`);
