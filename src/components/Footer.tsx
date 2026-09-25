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
const CELL = { w: 176, h: 110 };
const SCALE = CELL.w / 209;

/**
 * Figma Footer 701:2117 as the client designed it (sand texture, cream card with brand, locations and the
 * event photo), compacted: 48px of texture above the card, 40px card padding, the event photo in its Figma framing, then the
 * six-image strip as an endless scrolling band and the legal line. Stacks on phones.
 */
export function Footer() {
  const logo = img("701:2127");
  return (
    <footer className="relative overflow-hidden bg-umber">
      <FigmaImage src={refOf("701:2118")} cover />

      <div className="container-site relative pt-12">
        <div className="bg-cream p-6 sm:px-10 sm:pt-9 sm:pb-8">
          <div data-reveal className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <div className="lg:w-[340px] lg:shrink-0">
              <Link href="/" aria-label="AFL Beauty Bar — home" className="relative block h-[70px] w-[146px]">
                <FigmaImage src={logo.src} place={{ ...logo.place, box: { x: 0, y: 0, w: 146, h: 70 }, img: logo.place.img && scaleRect(logo.place.img, 146 / logo.place.box.w) }} alt="AFL Beauty Bar" />
              </Link>
              <p className="mt-5 text-small text-black/80">
                Elevate your confidence and enhance your existing beauty. AFL is a place where all people come to elevate their life and feel beautiful.
              </p>
              <ul className="mt-4 -ml-2 flex gap-1">
                {socials.map(({ label, Icon }) => (
                  <li key={label}>
                    <PlaceholderLink
                      reason="no social URLs on the old site"
                      aria-label={label}
                      className="flex size-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/5 hover:text-brown"
                    >
                      <Icon className="size-5" />
                    </PlaceholderLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1">
              <p className="flex items-center gap-2 text-[15px] leading-5 font-semibold text-black">
                <GlobeSolid className="size-5" /> Locations
              </p>
              <dl className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {clinics.map((c) => (
                  <div key={c.id}>
                    <dt className="text-[15px] leading-5 font-bold text-black">{c.label}:</dt>
                    <dd className="mt-1.5 text-small text-black/60">
                      <a href={mapsHref(c.address)} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-black">
                        {c.address}
                      </a>{" "}
                      <a href={telHref(c.phone)} className="whitespace-nowrap underline underline-offset-2 transition-colors hover:text-black">
                        {c.phone}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <hr className="mt-7 border-t border-black/40" />
          {/* The client wants this photo as designed: the Figma frame (1228×413) and crop, scaled to the card. */}
          <div data-reveal className="relative mt-5 aspect-[1228/413] overflow-hidden">
            <FigmaImage src={refOf("758:60")} cover sizes="1200px" position="50% 9%" alt="AFL Beauty Bar event on stage" />
          </div>
        </div>
      </div>

      {/* The original strip as a gapless, endlessly scrolling band */}
      <div className="relative mt-5">
        <Marquee label="Moments at AFL Beauty Bar" itemWidth={CELL.w} gap={0} seconds={40}>
          {strip.map((id) => {
            const p = img(id);
            const r = p.place.img ?? { x: 0, y: 0, w: p.place.box.w, h: p.place.box.h };
            const scaled = { box: { x: 0, y: 0, ...CELL }, img: scaleRect(r, SCALE), fit: p.place.fit };
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

      <p className="container-site relative py-4 text-center text-small text-white">
        © AFL Beauty Bar • All rights reserved. All Sales are Final. All Deposits are Non-Refundable.
      </p>
    </footer>
  );
}

function scaleRect(r: { x: number; y: number; w: number; h: number }, k: number) {
  return { x: r.x * k, y: r.y * k, w: r.w * k, h: r.h * k };
}
