import type { ComponentType } from "react";
import { BookingLink } from "@/components/BookingLink";
import { ReadMore } from "@/components/ReadMore";
import { FigmaImage, type ImageRef, type Placement } from "@/components/FigmaImage";
import { Eyebrow, btnBrown } from "@/components/blocks";
import { CrownIcon } from "./icons";

export type Highlight = { icon: ComponentType<{ className?: string }>; title: string; body: string };

type Props = {
  id: string;
  role: string;
  name: string;
  lead: string;
  highlights: Highlight[];
  aboutLabel: string;
  bio: string;
  photo: { src: ImageRef; place: Placement };
  photoAlt: string;
  /** CSS approximation of the Figma image filters (exposure/contrast/saturation). */
  photoFilter?: string;
  /** "right": text column on the right (Founder), "left": text on the left (COO). */
  textSide: "left" | "right";
};

/**
 * Leader profile (Figma 455:1268 / 464:1809): portrait beside a narrow copy column. From 768px the portrait
 * stays pinned and travels with the reader while the (taller) copy scrolls past; on phones they stack, with
 * a shorter photo and the bio collapsed behind "Read more".
 */
export function LeaderSection({ id, role, name, lead, highlights, aboutLabel, bio, photo, photoAlt, photoFilter = "", textSide }: Props) {
  return (
    <section
      className={`section container-site flex flex-col gap-8 md:flex-row md:items-start md:justify-center md:gap-14 lg:gap-20 ${textSide === "left" ? "md:flex-row-reverse" : ""}`}
      aria-labelledby={id}
    >
      <div
        data-reveal={textSide === "left" ? "from-right" : "from-left"}
        className="group relative h-[280px] w-full shrink-0 overflow-hidden bg-black sm:h-[400px] md:sticky md:top-[88px] md:h-[500px] md:w-[360px] lg:w-[410px]"
      >
        <FigmaImage src={photo.src} cover sizes="(min-width: 768px) 410px, 100vw" position="50% 20%" alt={photoAlt} className={`transition-transform duration-700 ease-out group-hover:scale-105 ${photoFilter}`} />
      </div>

      <div data-reveal className="flex flex-col items-start text-espresso md:w-[380px]">
        <Eyebrow>{role}</Eyebrow>
        <h2 id={id} className="mt-3 text-h2 font-medium">
          {name}
        </h2>
        <p className="mt-5 text-body font-semibold">{lead}</p>

        <ul className="mt-8 flex flex-col gap-5">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-3">
              <Icon className="size-6 shrink-0" />
              <div>
                <h3 className="text-body font-bold">{title}</h3>
                <p className="mt-0.5 text-small text-espresso/80">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <ReadMore className="mt-8">
          <p className="text-small leading-[1.85] text-espresso/80">
            <span className="font-semibold text-brown">{aboutLabel}. </span>
            {bio}
          </p>
        </ReadMore>

        <BookingLink className={`${btnBrown} mt-8`}>
          <CrownIcon className="size-5 shrink-0" />
          Book Your Consultation →
        </BookingLink>
      </div>
    </section>
  );
}
