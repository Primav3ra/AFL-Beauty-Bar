import "server-only";
import data from "@/data/placements.generated.json";
import type { ImageRef, Placement, Rect } from "@/components/FigmaImage";

type ImageNode = { ref: ImageRef; box: Rect; img?: Rect; fit: "cover" | "fill"; opacity?: number };
const images = data.images as unknown as Record<string, ImageNode>;
const boxes = data.boxes as Record<string, Rect>;

// Flips aren't exposed in the REST file JSON; these were found by visual comparison with the renders.
const FLIP_Y = new Set(["6c1f024e"]);

/**
 * Pixel-exact placement of Figma image node `id`, relative to its ancestor `anchor`
 * (the element you render as `relative overflow-hidden`). Throws at build time if ids are wrong.
 */
export function place(id: string, anchor: string): { src: ImageRef; place: Placement } {
  const n = images[id];
  const a = boxes[anchor];
  if (!n) throw new Error(`Figma image node ${id} not found (run scripts/gen-placements.mjs)`);
  if (!a) throw new Error(`Figma anchor ${anchor} is not an ancestor of an image node`);
  const r = (v: number) => Math.round(v * 10) / 10;
  return {
    src: n.ref,
    place: {
      box: { x: r(n.box.x - a.x), y: r(n.box.y - a.y), w: n.box.w, h: n.box.h },
      img: n.img,
      fit: n.fit,
      opacity: n.opacity,
      flipY: FLIP_Y.has(n.ref) || undefined,
    },
  };
}
