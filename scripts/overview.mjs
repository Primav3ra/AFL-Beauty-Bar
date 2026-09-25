// node scripts/overview.mjs <png> <out> [y0] [y1] [scale=0.4]   — downscaled overview of a slice
import sharp from "sharp";
const [file, out, y0 = 0, y1, scale = 0.4] = process.argv.slice(2);
const m = await sharp(file).metadata();
const top = Number(y0), bottom = Math.min(y1 ? Number(y1) : m.height, m.height);
await sharp(file).extract({ left: 0, top, width: m.width, height: bottom - top }).resize({ width: Math.round(m.width * Number(scale)) }).png().toFile(out);
console.log(out);
