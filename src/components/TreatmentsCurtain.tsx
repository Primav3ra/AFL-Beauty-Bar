import Link from "next/link";
import { categoryMeta } from "@/data/category-meta";
import { FigmaImage, type ImageRef } from "./FigmaImage";

type Card = { label: string; href: string; img: ImageRef; position: string };

// Figma 221:537 — the four category cards (photos framed as in the design).
export const curtainCards: Card[] = [
  { label: categoryMeta.body.name, href: categoryMeta.body.href, img: "978bbae5", position: "50% 45%" },
  // Same photo as the Signature page hero (758:483), framed on Fatema.
  { label: categoryMeta.signature.name, href: categoryMeta.signature.href, img: "2cd9ebcd", position: "50% 21%" },
  { label: categoryMeta["face-care"].name, href: categoryMeta["face-care"].href, img: "91460a2c", position: "50% 50%" },
  { label: categoryMeta.other.name, href: categoryMeta.other.href, img: "307366d1", position: "50% 40%" },
];

/** Desktop Treatments dropdown: four photo cards under the navbar. */
export function TreatmentsCurtain() {
  return (
    <div className="border-t border-brown bg-white py-7 shadow-[0_12px_24px_-12px_rgba(48,35,28,0.25)]">
      <ul className="container-site grid grid-cols-4 gap-3">
        {curtainCards.map((c) => (
          <li key={c.label}>
            <Link href={c.href} className="group relative block h-[152px] overflow-hidden bg-black">
              <FigmaImage src={c.img} cover sizes="300px" position={c.position} className="transition-transform duration-500 group-hover:scale-[1.04]" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-[15px] leading-5 font-medium tracking-[-0.3px] text-white">{c.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
