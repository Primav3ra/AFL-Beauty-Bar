import Link from "next/link";
import { links } from "@/config/links";
import { FigmaImage, type ImageRef, type Placement } from "./FigmaImage";

type Card = {
  label: string;
  href: string;
  external?: boolean;
  img: ImageRef;
  place: Placement;
  /** Colour of the blurred band behind the label (Figma "Rectangle 1000002199"). */
  tint: string;
};

// Figma 221:537 — placements relative to each 290×169 card (scripts/crops.mjs 221:539 221:557 221:575 221:592).
const cards: Card[] = [
  { label: "Body", href: "/treatments/body", img: "978bbae5", place: { box: { x: 0, y: -75.6, w: 373, h: 248.7 } }, tint: "#3e1b0d" },
  {
    label: "Fatima's Signature Treatments",
    href: "/treatments/signature",
    img: "688c437e",
    place: { box: { x: -25, y: -111, w: 339, h: 345 }, img: { x: 0, y: 0, w: 344.4, h: 345 }, fit: "fill" },
    tint: "#593a23",
  },
  { label: "Acne Therapy", href: links.acneTherapy, external: true, img: "91460a2c", place: { box: { x: 0, y: -9.5, w: 289, h: 289 } }, tint: "#653314" },
  { label: "Other Treatments", href: "/treatments/other", img: "307366d1", place: { box: { x: 0, y: -132.5, w: 290, h: 435 } }, tint: "#653314" },
];

export function TreatmentsCurtain() {
  return (
    <div className="flex h-[271px] items-center justify-center border-t border-brown bg-white shadow-[0_12px_24px_-12px_rgba(48,35,28,0.25)]">
      <ul className="flex gap-[13px]">
        {cards.map((c) => {
          const inner = (
            <>
              <FigmaImage src={c.img} place={c.place} className="transition-transform duration-500 group-hover:scale-[1.04]" />
              {/* Figma layer blur 68.4 on a 414×116 rect starting 122.5px down → soft tinted band. */}
              <span
                aria-hidden
                className="absolute blur-[34px]"
                style={{ left: -72, top: 122.5, width: 414, height: 116, background: c.tint }}
              />
              <span className="absolute top-[133.7px] left-[19px] text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] text-white">
                {c.label}
              </span>
            </>
          );
          const cls = "group relative block h-[169px] w-[290px] overflow-hidden bg-black";
          return (
            <li key={c.label}>
              {c.external ? (
                <a href={c.href} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link href={c.href} className={cls}>
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
