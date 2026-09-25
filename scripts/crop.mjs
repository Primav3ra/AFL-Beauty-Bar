#!/usr/bin/env node
// Crop a region of a render for close inspection:  node scripts/crop.mjs <png> <y> <h> [x=0] [w=full] [out]
import sharp from "sharp";
const [file, y, h, x = 0, w, out] = process.argv.slice(2);
const img = sharp(file);
const m = await img.metadata();
const W = w ? Number(w) : m.width - Number(x);
const H = Math.min(Number(h), m.height - Number(y));
const dest = out ?? `${process.env.TMPDIR ?? "."}/crop.png`;
await img.extract({ left: Number(x), top: Number(y), width: W, height: H }).png().toFile(dest);
console.log(dest);
