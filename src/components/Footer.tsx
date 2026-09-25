import Link from "next/link";
import { clinics, mapsHref, telHref } from "@/data/clinics";
import { place, refOf } from "@/lib/figma";
import { FigmaImage } from "./FigmaImage";
import { Marquee } from "./Marquee";
import { PlaceholderLink } from "./PlaceholderLink";
import { Facebook, GlobeSolid, Instagram, LinkedIn, XLogo } from "./icons";

const F = "701:2117"; // Footer frame
const img = (id: string) => place(id, F);

const socials = [
  { label: "Instagram", Icon: Instagram },
  { label: "X", Icon: XLogo },
  { label: "Facebook", Icon: Facebook },
  { label: "LinkedIn", Icon: LinkedIn },
];
// The design's six-image strip (701:2120–2125), each keeping its Figma crop, scaled from 209×132 cells.
const strip = ["701:2120", "701:2121", "701:2122", "701:2123", "701:2124", "701:2125"];
const CELL = { w: 270, h: 170 };
const SCALE = CELL.w / 209;

/**
 * Figma Footer 701:2117 as the client designed it: the sand texture edge to edge, the cream panel with brand,
 * locations and the event photo (exact Figma crop), then the original six-image strip, here as an endless
 * scrolling band, and the legal line.
 */
export function Footer() {
  const logo = img("701:2127");
  const event = img("758:60");
  return (
    <footer className="relative overflow-hidden bg-umber">
      <FigmaImage src={refOf("701:2118")} cover />

      <div className="frame px-11 pt-[113px]">
        <div className="bg-cream px-[73px] pt-16 pb-[31px]">
          <div data-reveal className="flex gap-20 px-[35px]">
            <div className="w-[395px] shrink-0">
              <Link href="/" aria-label="AFL Beauty Bar — home" className="relative block" style={{ width: logo.place.box.w, height: logo.place.box.h }}>
                <FigmaImage src={logo.src} place={{ ...logo.place, box: { ...logo.place.box, x: 0, y: 0 } }} alt="AFL Beauty Bar" />
              </Link>
              <p className="mt-10 text-base leading-6 text-black">
                Elevate your confidence and enhance your existing beauty. AFL is a place where all people come to elevate their life and feel beautiful.
              </p>
              <ul className="mt-8 flex gap-2">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <PlaceholderLink
                      reason="no social URLs on the old site"
                      aria-label={label}
                      className="flex size-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 hover:text-brown"
                    >
                      <Icon className="size-[22px]" />
                    </PlaceholderLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <p className="flex items-center gap-2.5 text-[17px] leading-5 font-semibold tracking-[-0.5px] text-black">
                <GlobeSolid className="size-6" /> Locations
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-12 gap-y-7 pl-8">
                {clinics.map((c) => (
                  <div key={c.id}>
                    <dt className="text-[17px] leading-5 font-bold tracking-[-0.5px] text-black">{c.label}:</dt>
                    <dd className="mt-3 text-base leading-6 tracking-[-0.3px] text-black/60">
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
            </div>
          </div>

          <hr className="mt-12 border-t border-black/50" />
          <div data-reveal className="relative mt-5 ml-[17px] overflow-hidden" style={{ width: event.place.box.w, height: event.place.box.h }}>
            <FigmaImage src={event.src} place={{ ...event.place, box: { ...event.place.box, x: 0, y: 0 } }} sizes="1228px" alt="AFL Beauty Bar event on stage" />
          </div>
        </div>
      </div>

      {/* The original strip as a gapless, endlessly scrolling band */}
      <div className="relative mt-10">
        <Marquee label="Moments at AFL Beauty Bar" itemWidth={CELL.w} gap={0} seconds={40}>
          {strip.map((id) => {
            const p = img(id);
            const r = p.place.img ?? { x: 0, y: 0, w: p.place.box.w, h: p.place.box.h };
            const scaled = { box: { x: 0, y: 0, ...CELL }, img: { x: r.x * SCALE, y: r.y * SCALE, w: r.w * SCALE, h: r.h * SCALE }, fit: p.place.fit };
            return (
              <span key={id} className="group relative block overflow-hidden" style={{ width: CELL.w, height: CELL.h }}>
                <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  <FigmaImage src={p.src} place={scaled} sizes={`${CELL.w}px`} />
                </span>
              </span>
            );
          })}
        </Marquee>
      </div>

      <p className="frame relative py-9 text-center text-[17px] leading-[19px] tracking-[-0.5px] text-white">
        © AFL Beauty Bar • All rights reserved. All Sales are Final. All Deposits are Non-Refundable.
      </p>
    </footer>
  );
}
