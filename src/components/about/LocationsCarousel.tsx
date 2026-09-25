"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FigmaImage, type ImageRef } from "@/components/FigmaImage";
import { bookingHref } from "@/config/links";
import { useAutoAdvance } from "@/lib/use-auto-advance";
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
  /** Figma image (Miami storefront) … */
  photoRef?: ImageRef;
  /** … or a plain image URL (office photos from the owner). */
  photoUrl?: string;
  photoAlt: string;
};

/**
 * Brown location card (Figma Frame 6, 455:1323 / 480:2051): clinic details beside its photo, one slide per
 * clinic (the design shows Miami; bars switch between clinics and it advances on its own). Stacks on phones.
 * Used on About and Shop.
 */
export function LocationsCarousel({ slides, label = "Our locations" }: { slides: LocationSlide[]; label?: string }) {
  const [current, setCurrent] = useState(0);
  const auto = useAutoAdvance(slides.length, setCurrent);
  const s = slides[current];
  return (
    <div {...auto} className="flex flex-col-reverse overflow-hidden bg-brown md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]" role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="flex flex-col items-start p-6 text-white sm:p-10" aria-live="polite">
        <p className="text-small text-white/50">Our Locations</p>
        <h3 className="mt-3 text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] leading-tight font-medium tracking-[-0.05em]">{s.title}</h3>
        <div className="mt-5 flex flex-col gap-2 text-small font-medium sm:flex-row sm:gap-6">
          <a href={mapsHref(s.mapsAddress)} target="_blank" rel="noopener noreferrer" className="flex max-w-[240px] gap-2.5 hover:underline">
            <PinIcon className="size-5 shrink-0" />
            <span>{s.address}</span>
          </a>
          <a href={telHref(s.phone)} className="flex gap-2.5 whitespace-nowrap hover:underline">
            <PhoneIcon className="size-5 shrink-0" />
            {s.phone}
          </a>
        </div>
        <Link
          href={bookingHref({ clinic: s.id })}
          className="mt-7 inline-flex h-12 items-center justify-center gap-2.5 bg-white px-6 text-[15px] leading-5 font-semibold text-black transition-colors hover:bg-cream"
        >
          <BriefcaseIcon className="size-5 shrink-0" />
          Book Your Location →
        </Link>
        <div className="mt-8 flex gap-3 md:mt-auto md:pt-8">
          {slides.map((sl, i) => (
            <button
              key={sl.id}
              type="button"
              aria-label={`Show ${sl.title}`}
              aria-current={i === current || undefined}
              onClick={() => setCurrent(i)}
              className="group flex h-4 w-10 cursor-pointer items-center"
            >
              <span className={`block w-full bg-white transition-all ${i === current ? "h-1" : "h-0.5 opacity-40 group-hover:opacity-80"}`} />
            </button>
          ))}
        </div>
      </div>

      <div className="group relative h-[240px] overflow-hidden bg-black sm:h-[320px] md:h-auto md:min-h-[400px]">
        {s.photoUrl && (
          <Image key={s.id} src={s.photoUrl} alt={s.photoAlt} fill sizes="(min-width: 768px) 660px, 100vw" className="animate-[fade-in_.5s_ease-out] object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
        {s.photoRef && (
          <FigmaImage key={s.id} src={s.photoRef} cover alt={s.photoAlt} sizes="(min-width: 768px) 660px, 100vw" className="transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
      </div>
    </div>
  );
}
