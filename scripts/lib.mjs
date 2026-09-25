// Shared helpers for reading design/file.json.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = fileURLToPath(new URL("..", import.meta.url));

export function loadDoc() {
  const doc = JSON.parse(readFileSync(join(ROOT, "design", "file.json"), "utf8"));
  const byId = new Map();
  (function index(n) { byId.set(n.id, n); n.children?.forEach(index); })(doc.document);
  return { doc, byId };
}

const r1 = (v) => Math.round(v * 10) / 10;

export const imageFill = (n) => n.fills?.find((f) => f.type === "IMAGE" && f.visible !== false && f.imageRef);

/**
 * Where to draw an image fill so it looks exactly like Figma.
 * Returns the node's box relative to `origin` (a clipping box) and the image rect inside that box.
 * - FILL: image covers the node box.
 * - STRETCH + imageTransform (Figma "Crop"): the transform maps the node's unit square into image
 *   space ([[a,0,tx],[0,d,ty]]); the full image is (w/a × h/d), offset by (-tx·W, -ty·H).
 */
export function imageBox(node, origin) {
  const f = imageFill(node);
  if (!f) return null;
  const b = node.absoluteBoundingBox;
  const box = { x: r1(b.x - origin.x), y: r1(b.y - origin.y), w: r1(b.width), h: r1(b.height) };
  let img = null;
  let fit = "cover";
  if (f.scaleMode === "STRETCH") {
    fit = "fill";
    const t = f.imageTransform;
    if (t && t[0][0] > 0 && t[1][1] > 0 && (t[0][0] !== 1 || t[1][1] !== 1 || t[0][2] || t[1][2])) {
      const W = b.width / t[0][0], H = b.height / t[1][1];
      img = { x: r1(-t[0][2] * W), y: r1(-t[1][2] * H), w: r1(W), h: r1(H) };
    }
  }
  return { ref: f.imageRef.slice(0, 8), fullRef: f.imageRef, box, ...(img ? { img } : {}), fit };
}

/** Largest on-screen size (w,h) the full image needs, for resizing. */
export function renderedSize(node) {
  const f = imageFill(node);
  const b = node.absoluteBoundingBox;
  if (f?.scaleMode === "STRETCH" && f.imageTransform?.[0][0] > 0 && f.imageTransform?.[1][1] > 0)
    return { w: b.width / f.imageTransform[0][0], h: b.height / f.imageTransform[1][1] };
  return { w: b.width, h: b.height };
}
