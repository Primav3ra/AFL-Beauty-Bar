"use client";

import Link from "next/link";
import { useState } from "react";
import { FigmaImage } from "@/components/FigmaImage";
import { bookingHref } from "@/config/links";
import { clinics, mapsHref, telHref } from "@/data/clinics";
import { Briefcase, Phone, Pin } from "./icons";
import type { Placed } from "./ProductGrid";

// Only Miami is designed (480:2051). The four bars imply one slide per clinic, so the other slides
// reuse the footer's clinic details (src/data/clinics.ts) with a black photo placeholder.
const slides = clinics.map((c) =>
  c.id === "miami"
    ? { clinic: c, title: "Miami, FL | Main Office", address: "51-53 NE 24th St Suite 107 Miami FL 33137", phone: "786-750-2355" }
    : { clinic: c, title: c.short, address: c.address, phone: c.phone },
);

/** Brown location card 480:2051 (1203×464) with the Miami storefront photo. */
export function LocationsSlider({ photo }: { photo: Placed }) {
  const [i, setI] = useState(0);
  const s = slides[i];

  return (
    <div className="relative mx-auto mt-[30px] h-[464px] w-[1203px] overflow-hidden bg-brown" role="region" aria-roledescription="carousel" aria-label="Our clinic locations">
      <div className="absolute top-12 left-[54px] w-[405px]" aria-live="polite">
        <p className="text-[15px] leading-4 tracking-[-0.3px] text-white/40">/ Our Locations</p>
        <h3 className="mt-[35px] text-[40px] leading-[60px] font-medium tracking-[-3.2px] whitespace-nowrap text-white">{s.title}</h3>
        <div className="mt-[35px] flex h-[60px] text-[15px] leading-5 font-medium text-white">
          <a href={mapsHref(s.clinic.address)} target="_blank" rel="noopener noreferrer" className="flex w-[205px] gap-[10px] py-[10px] hover:underline">
            <span className="flex size-6 shrink-0 items-center justify-center">
              <Pin className="h-5 w-4" />
            </span>
            <span className="w-[171px]">{s.address}</span>
          </a>
          <a href={telHref(s.phone)} className="flex h-11 items-center gap-[10px] self-start p-[10px] hover:underline">
            <span className="flex size-6 shrink-0 items-center justify-center">
              <Phone className="size-[18px]" />
            </span>
            {s.phone}
          </a>
        </div>
        <Link
          href={bookingHref({ clinic: s.clinic.id })}
          className="mt-[35px] flex h-[49px] w-[291px] items-center justify-center gap-[11.5px] bg-white pr-[0.5px] text-[17px] leading-5 font-semibold tracking-[-0.5px] text-black transition-colors hover:bg-cream"
        >
          <span className="flex size-6 items-center justify-center">
            <Briefcase className="h-[19px] w-5" />
          </span>
          Book Your Location →
        </Link>
      </div>

      <div className="absolute top-[397px] left-[153.4px] flex gap-[16.4px]">
        {slides.map((x, n) => (
          <button
            key={x.clinic.id}
            type="button"
            aria-label={`Show ${x.clinic.short}`}
            aria-current={n === i || undefined}
            onClick={() => setI(n)}
            className="group flex h-4 w-[41.5px] cursor-pointer items-center"
          >
            <span className={`block w-full transition-all ${n === i ? "h-[3.9px] bg-white" : "h-[1.9px] bg-white/40 group-hover:bg-white/70"}`} />
          </button>
        ))}
      </div>

      <div className="absolute top-0 left-[552px] h-[464px] w-[651px] bg-black" aria-hidden />
      {s.clinic.id === "miami" && <FigmaImage {...photo} alt="AFL Beauty Bar storefront in Miami" />}
    </div>
  );
}
