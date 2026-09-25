import type { ComponentType, ReactNode } from "react";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage, type ImageRef, type Placement } from "@/components/FigmaImage";
import { Eyebrow } from "@/components/blocks";
import { CrownIcon } from "./icons";

export type Highlight = { icon: ComponentType<{ className?: string }>; title: string; body: string };

type Props = {
  id: string;
  role: string;
  name: string;
  lead: string;
  leadWidth: number;
  highlights: Highlight[];
  aboutLabel: string;
  bio: string;
  photo: { src: ImageRef; place: Placement };
  photoAlt: string;
  /** CSS approximation of the Figma image filters (exposure/contrast/saturation). */
  photoFilter?: string;
  bioWidth?: number;
  /** "right": text column on the right (Founder), "left": text on the left (COO). */
  textSide: "left" | "right";
  children?: ReactNode;
};

/**
 * Leader profile (Figma 455:1268 / 464:1809): portrait beside a compact copy column, sized so the whole
 * profile fits one screen. The portrait stays pinned and travels with the reader while the copy scrolls past.
 */
export function LeaderSection({ id, role, name, lead, highlights, aboutLabel, bio, photo, photoAlt, photoFilter = "", textSide, children }: Props) {
  return (
    <section className={`mt-24 flex items-start justify-center gap-20 px-[111px] ${textSide === "left" ? "flex-row-reverse" : ""}`} aria-labelledby={id}>
      <div data-reveal={textSide === "left" ? "from-right" : "from-left"} className="group sticky top-[117px] h-[560px] w-[460px] shrink-0 overflow-hidden bg-black">
        <FigmaImage src={photo.src} cover sizes="460px" position="50% 20%" alt={photoAlt} className={`transition-transform duration-700 ease-out group-hover:scale-105 ${photoFilter}`} />
      </div>

      <div data-reveal className="flex w-[420px] flex-col items-start text-espresso">
        <Eyebrow>{role}</Eyebrow>
        <h2 id={id} className="mt-4 text-[44px] leading-[52px] font-medium tracking-[-3px] whitespace-nowrap">
          {name}
        </h2>
        <p className="mt-6 text-[16px] leading-[28px] font-semibold">{lead}</p>

        <ul className="mt-9 flex flex-col gap-6">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <Icon className="size-7 shrink-0" />
              <div>
                <h3 className="text-[15px] leading-6 font-bold">{title}</h3>
                <p className="mt-1 text-[14px] leading-6 text-espresso/80">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-9 text-[14px] leading-[27px] text-espresso/80">
          <span className="font-semibold text-brown">{aboutLabel}. </span>
          {bio}
        </p>

        <BookingLink className="mt-9 flex h-[46px] items-center justify-center gap-[10px] bg-brown px-6 text-[15px] leading-5 font-medium tracking-[-0.3px] text-white transition-colors hover:bg-espresso">
          <CrownIcon className="size-5 shrink-0" />
          Book Your Consultation →
        </BookingLink>
      </div>
      {children}
    </section>
  );
}
