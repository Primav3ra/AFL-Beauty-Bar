import Link from "next/link";
import type { ReactNode } from "react";
import { FigmaImage, type ImageRef, type Placement } from "./FigmaImage";

export type Run = { text: string; accent: boolean };

/** Headline with serif-italic accent words, e.g. "Non-Surgical *Breast Lift*". */
export function Runs({ runs, accentClass = "text-[80px] font-medium" }: { runs: Run[]; accentClass?: string }) {
  return (
    <>
      {runs.map((r, i) =>
        r.accent ? (
          <span key={i} className={`font-serif italic ${accentClass}`}>
            {r.text}
          </span>
        ) : (
          <span key={i}>{r.text}</span>
        ),
      )}
    </>
  );
}

/** "/ Body" style label on a translucent black chip. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-10 items-center bg-black/60 px-10 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
      {children}
    </span>
  );
}

/** Small "/ The Process" eyebrow above section headings. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[15px] leading-4 tracking-[-0.3px] text-espresso/40 ${className}`}>{children}</p>;
}

export function DoubleRule() {
  return (
    <div className="h-[39px] border-y border-black/10" aria-hidden />
  );
}

type HeroProps = {
  image?: { src: ImageRef; place: Placement } | null;
  height: number;
  kicker: string | null;
  kickerTop: number;
  titleTop: number;
  title: Run[];
  /** Base (non-accent) font size; accent words are 80px. */
  titleSize?: number;
  /** Letter-spacing of the headline in px (Figma values: -4.2 … -5.6). */
  titleTracking?: number;
  description?: string | null;
  descriptionClass?: string;
  descriptionWidth?: number | null;
  /** Gap between title (77px line box) and description. */
  gap?: number;
  children?: ReactNode;
  /** Top offset of the blurred brown band (Figma Rectangle 1000002199, 2054×609, blur 171.4). */
  blurTop?: number;
  /**
   * Px of the hero hidden under the 111px header. Some frames start the hero above y=111 (e.g. 101.7);
   * the section is shortened by this much and its contents shifted up so everything below stays aligned.
   */
  overlap?: number;
};

/** Black hero with photo, brown blurred band, kicker chip and headline (category + detail pages). */
export function PageHero({
  image, height, kicker, kickerTop, titleTop, title, titleSize = 60, titleTracking = -4.2,
  description, descriptionClass = "text-[17px] leading-[23px]", descriptionWidth = 1162, gap = 36, children, blurTop = 402, overlap = 0,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-black" style={{ height: height - overlap }}>
      <div className="absolute inset-x-0" style={{ top: -overlap, height }}>
      {image && <FigmaImage {...image} priority sizes="1440px" />}
      <div aria-hidden className="absolute bg-brown blur-[86px]" style={{ left: -306, top: blurTop, width: 2054, height: 609 }} />
      {kicker && (
        <div className="absolute left-[139px]" style={{ top: kickerTop }}>
          <Kicker>{kicker}</Kicker>
        </div>
      )}
      <div className="absolute left-[139px] flex flex-col" style={{ top: titleTop, gap }}>
        <h1 className="leading-[76.6px] font-semibold whitespace-nowrap text-white" style={{ fontSize: titleSize, letterSpacing: titleTracking }}>
          <Runs runs={title} />
        </h1>
        {description && (
          <p className={`whitespace-pre-line text-white ${descriptionClass}`} style={{ width: descriptionWidth ?? undefined }}>
            {description}
          </p>
        )}
        {children}
      </div>
      </div>
    </section>
  );
}

type CtaProps = {
  image: { src: ImageRef; place: Placement };
  height: number;
  contentTop: number;
  kicker: string;
  title: string;
  titleClass: string;
  button: string;
  href: string;
  gap?: number;
  width?: number;
  /** The category CTAs left-align the headline inside its 868px box; the landing one centres it. */
  titleAlign?: "left" | "center";
};

/** "Schedule your consultation or book your appointment online today" banner. */
export function CtaBanner({ image, height, contentTop, kicker, title, titleClass, button, href, gap = 16, width = 868, titleAlign = "center" }: CtaProps) {
  return (
    <section className="relative overflow-hidden bg-black" style={{ height }}>
      <FigmaImage {...image} sizes="1440px" />
      <div className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center text-center" style={{ top: contentTop, gap, width }}>
        <p className="text-[17px] leading-4 tracking-[-0.3px] text-cream">{kicker}</p>
        <h2 className={`w-full font-medium text-white ${titleAlign === "left" ? "text-left" : ""} ${titleClass}`}>{title}</h2>
        <Link
          href={href}
          className="flex h-[48.9px] min-w-[208.3px] items-center justify-center bg-white px-5 text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] text-cocoa transition-colors hover:bg-cream"
        >
          {button}
        </Link>
      </div>
    </section>
  );
}

/** White / outlined pair of CTA buttons used in the heroes. */
export function HeroButtons({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return <div className="flex gap-[22px]">{primary}{secondary}</div>;
}

export const btnWhite =
  "flex h-[49px] items-center justify-center bg-white px-5 text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] transition-colors hover:bg-cream";
export const btnOutline =
  "flex h-[49px] items-center justify-center border border-white/90 px-5 text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] text-white transition-colors hover:bg-white hover:text-black";
