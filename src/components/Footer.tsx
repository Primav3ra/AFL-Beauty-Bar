import Link from "next/link";
import { clinics, mapsHref, telHref } from "@/data/clinics";
import { place } from "@/lib/figma";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { GlobeSolid } from "./icons";

const F = "701:2117"; // Footer frame (page instances use the #f2e9e0 panel colour instead of #dcbfad)
const img = (id: string) => place(id, F);

const socials = [
  { label: "Instagram", id: "701:2142" },
  { label: "X", id: "701:2143" },
  { label: "Facebook", id: "701:2144" },
  { label: "LinkedIn", id: "701:2145" },
];
// Address text-box widths from the design, so lines wrap exactly as in Figma.
const addressWidth: Record<string, number> = { miami: 288, atlanta: 333, "new-york": 307, "los-angeles": 334 };
const strip = ["701:2120", "701:2121", "701:2122", "701:2123", "701:2124", "701:2125"];

/** Figma Footer 701:2117 — 1440×1249, positions are frame-relative. */
export function Footer() {
  const logo = img("701:2127");
  return (
    <footer className="relative mt-[39px] h-[1249px] overflow-hidden bg-white">
      <FigmaImage {...img("701:2118")} sizes="1440px" />

      <div className="absolute top-[113px] left-11 h-[825px] w-[1351px] bg-cream" />

      <Link href="/" aria-label="AFL Beauty Bar — home" className="absolute block" style={{ left: logo.place.box.x, top: logo.place.box.y, width: logo.place.box.w, height: logo.place.box.h }}>
        <FigmaImage src={logo.src} place={{ ...logo.place, box: { ...logo.place.box, x: 0, y: 0 } }} alt="AFL Beauty Bar" />
      </Link>
      <p className="absolute top-[288px] left-[152px] w-[395px] text-base leading-6 text-black">
        Elevate your confidence and enhance your existing beauty. AFL is a place where all people come to elevate their life and feel beautiful.
      </p>

      {socials.map((s) => {
        const p = img(s.id);
        return (
          <PlaceholderLink
            key={s.id}
            reason="no social URLs on the old site"
            aria-label={s.label}
            className="absolute block transition-opacity hover:opacity-60"
          >
            <span className="absolute" style={{ left: p.place.box.x, top: p.place.box.y, width: p.place.box.w, height: p.place.box.h }}>
              <FigmaImage src={p.src} place={{ ...p.place, box: { ...p.place.box, x: 0, y: 0 } }} />
            </span>
          </PlaceholderLink>
        );
      })}

      <div className="absolute top-[155px] left-[574px] flex h-11 items-center gap-2.5 p-2.5">
        <GlobeSolid className="size-6 text-black" />
        <span className="text-[17px] leading-[19px] font-semibold tracking-[-0.5px] text-black">Locations</span>
      </div>

      <dl className="absolute top-[218px] left-[618px] grid grid-cols-[334px_334px] gap-y-[27px]">
        {clinics.map((c) => (
          <div key={c.id}>
            <dt className="text-[17px] leading-[19px] font-bold tracking-[-0.5px] text-black">{c.label}:</dt>
            <dd className="mt-[13px] text-base leading-6 tracking-[-0.3px] text-black/60" style={{ width: addressWidth[c.id] }}>
              <a href={mapsHref(c.address)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
                {c.address}
              </a>{" "}
              <a href={telHref(c.phone)} className="underline underline-offset-2 transition-colors hover:text-black">
                {c.phone}
              </a>
            </dd>
          </div>
        ))}
      </dl>

      <hr className="absolute top-[474px] left-[100px] w-[1245px] border-t border-black/50" />
      <FigmaImage {...img("758:60")} alt="AFL Beauty Bar event" sizes="1228px" />

      {strip.map((id) => (
        <FigmaImage key={id} {...img(id)} sizes="209px" />
      ))}

      <p className="absolute top-[1185px] w-full text-center text-[17px] leading-[19px] tracking-[-0.5px] text-white">
        © AFL Beauty Bar • All rights reserved. All Sales are Final. All Deposits are Non-Refundable.
      </p>
    </footer>
  );
}
