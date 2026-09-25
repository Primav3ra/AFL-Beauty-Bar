// node scripts/crops.mjs <containerId>...  — every visible image fill under each container,
// printed as a FigmaImage `place` relative to that container.
import { loadDoc, imageBox, imageFill } from "./lib.mjs";

const { byId } = loadDoc();
for (const id of process.argv.slice(2)) {
  const c = byId.get(id);
  const o = c.absoluteBoundingBox;
  const out = [];
  (function walk(n) {
    if (n.visible === false) return;
    if (imageFill(n)) {
      const { ref, box, img, fit } = imageBox(n, o);
      const place = JSON.stringify({ box, ...(img ? { img } : {}), fit }).replace(/"(\w+)":/g, "$1:");
      out.push(`${ref} ${place}  // ${n.name}`);
    }
    n.children?.forEach(walk);
  })(c);
  console.log(`${id} ${c.name} ${Math.round(o.width)}×${Math.round(o.height)}`);
  for (const line of out) console.log(`  ${line}`);
}
