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
  height: number;
  children?: ReactNode;
};

/** Leader profile (Figma 455:1268 / 464:1809): 576×645 portrait + stacked copy column, 95px top padding. */
export function LeaderSection({ id, role, name, lead, leadWidth, highlights, aboutLabel, bio, photo, photoAlt, photoFilter = "", bioWidth = 520, textSide, height, children }: Props) {
  const textLeft = textSide === "right" ? 782 : 146;
  const photoLeft = textSide === "right" ? 146.5 : 726.5;
  return (
    <section className="relative" style={{ height }} aria-labelledby={id}>
      <div className="group absolute top-[95px] h-[645px] w-[576px] overflow-hidden bg-black" style={{ left: photoLeft }}>
        <FigmaImage {...photo} alt={photoAlt} sizes="576px" className={`transition-transform duration-700 ease-out group-hover:scale-105 ${photoFilter}`} />
      </div>

      <div className="absolute top-[95px] flex w-[525px] flex-col items-start gap-[50px] text-espresso" style={{ left: textLeft }}>
        <div className="flex flex-col gap-[28px]">
          <Eyebrow>{role}</Eyebrow>
          <h2 id={id} className="text-[50px] leading-[60px] font-medium tracking-[-4px] whitespace-nowrap">
            {name}
          </h2>
        </div>

        <p className="text-[17px] leading-[30px] font-semibold" style={{ width: leadWidth }}>
          {lead}
        </p>

        <ul className="flex flex-col gap-[25px]">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex h-[91px] w-[520.5px] gap-[10px]">
              <Icon className="size-[35.5px] shrink-0" />
              <div className="w-[475px]">
                <h3 className="text-[17px] leading-[30px] font-bold">{title}</h3>
                <p className="text-[15px] leading-[30px]">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <Eyebrow>{aboutLabel}</Eyebrow>

        <p className="text-[15px] leading-[35px] font-medium" style={{ width: bioWidth }}>
          {bio}
        </p>

        <BookingLink className="flex h-[49px] w-[291px] items-center justify-center gap-[11.4px] bg-brown text-[17px] leading-5 font-medium tracking-[-0.5px] text-white transition-colors hover:bg-espresso">
          <CrownIcon className="size-6 shrink-0" />
          Book Your Consultation →
        </BookingLink>
      </div>
      {children}
    </section>
  );
}
