"use client";

import Link from "next/link";
import { useState } from "react";
import { FigmaImage, type ImageRef, type Placement } from "@/components/FigmaImage";
import { bookingHref } from "@/config/links";
import { mapsHref, telHref, type Clinic } from "@/data/clinics";
import { BriefcaseIcon, PhoneIcon, PinIcon } from "./icons";

export type LocationSlide = {
  id: Clinic["id"];
  title: string;
  /** Address as displayed (Figma copy for Miami). */
  address: string;
  /** Full address used for the maps link. */
  mapsAddress: string;
  phone: string;
  photo: { src: ImageRef; place: Placement } | null;
  photoAlt: string;
};

/**
 * Brown location card (Figma Frame 6, 455:1323, 1203×464). Only the Miami slide is designed; the four
 * indicator bars (480:1948) switch between the clinics.
 */
export function LocationsCarousel({ slides }: { slides: LocationSlide[] }) {
  const [current, setCurrent] = useState(0);
  const s = slides[current];
  return (
    <div className="relative h-[464px] w-[1203px] overflow-hidden bg-brown" role="region" aria-roledescription="carousel" aria-label="Our locations">
      <div className="absolute top-[48px] left-[54px] flex w-[405px] flex-col items-start gap-[35px] text-white" aria-live="polite">
        <p className="text-[15px] leading-4 tracking-[-0.3px] text-white/40">/ Our Locations</p>
        <h3 className="text-[40px] leading-[60px] font-medium tracking-[-3.2px] whitespace-nowrap">{s.title}</h3>
        <div className="flex h-[60px] text-[15px] leading-5 font-medium">
          <a
            href={mapsHref(s.mapsAddress)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-[205px] gap-[10px] py-[10px] hover:underline"
          >
            <PinIcon className="size-6 shrink-0" />
            <span className="w-[171px]">{s.address}</span>
          </a>
          <a href={telHref(s.phone)} className="flex h-[44px] gap-[10px] p-[10px] hover:underline">
            <PhoneIcon className="size-6 shrink-0" />
            <span className="pt-[2px]">{s.phone}</span>
          </a>
        </div>
        <Link
          href={bookingHref({ clinic: s.id })}
          className="flex h-[49px] w-[291px] items-center justify-center gap-[11.4px] bg-white text-[17px] leading-5 font-semibold tracking-[-0.5px] text-black transition-colors hover:bg-cream"
        >
          <BriefcaseIcon className="size-6 shrink-0" />
          Book Your Location →
        </Link>
      </div>

      <div className="absolute top-[397px] left-[153.4px] flex gap-[16.4px]">
        {slides.map((sl, i) => (
          <button
            key={sl.id}
            type="button"
            aria-label={`Show ${sl.title}`}
            aria-current={i === current || undefined}
            onClick={() => setCurrent(i)}
            className="group flex h-4 w-[41.5px] cursor-pointer items-center"
          >
            <span className={`block w-full bg-white transition-all ${i === current ? "h-[3.9px]" : "h-[1.9px] opacity-40 group-hover:opacity-80"}`} />
          </button>
        ))}
      </div>

      <div className="group absolute top-0 left-[552px] h-[464px] w-[651px] overflow-hidden bg-black">
        {s.photo && (
          <FigmaImage
            key={s.id}
            {...s.photo}
            alt={s.photoAlt}
            sizes="651px"
            className="transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
    </div>
  );
}
