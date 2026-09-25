import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { FigmaImage, focalPoint, type ImageRef, type Placement } from "./FigmaImage";

type Placed = { src: ImageRef; place: Placement };

/**
 * Edge-to-edge coloured band (hero, banner). `backdrop` fills it with object-cover, framed like the design's
 * `frameH`-tall placement; children sit in the centred site container. Bands carry their own padding and
 * sit flush against each other and against .section blocks.
 */
export function Band({
  backdrop, frameH, priority, imageClass = "", className = "", innerClass = "", style, children, underlay, ...rest
}: {
  backdrop?: Placed | null;
  frameH?: number;
  priority?: boolean;
  imageClass?: string;
  className?: string;
  /** Classes for the inner container (layout of the content). */
  innerClass?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Full-width layer between the photo and the content (scrims, blurred colour bands). */
  underlay?: ReactNode;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-black ${className}`} style={style} {...rest}>
      {backdrop && (
        <FigmaImage src={backdrop.src} cover priority={priority} position={focalPoint(backdrop.place, 1440, frameH ?? 633)} className={imageClass} />
      )}
      {underlay}
      <div className={`container-site relative w-full ${innerClass}`}>{children}</div>
    </section>
  );
}

/** Heading → content gap (32px). */
export const INTRO_GAP = "mt-8";

/** Centred eyebrow / heading / text above a section's content (reveals on scroll). */
export function SectionIntro({ eyebrow, title, text, id, className = "", align = "center" }: {
  eyebrow?: string | null; title: ReactNode; text?: ReactNode; id?: string; className?: string; align?: "center" | "left";
}) {
  const a = align === "center" ? "mx-auto items-center text-center" : "items-start text-left";
  return (
    <div data-reveal className={`flex max-w-[760px] flex-col ${a} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 id={id} className={`text-h2 font-medium whitespace-pre-line text-espresso ${eyebrow ? "mt-3" : ""}`}>
        {title}
      </h2>
      {text && <p className="mt-4 max-w-[600px] text-body text-espresso/80">{text}</p>}
    </div>
  );
}

export type Run = { text: string; accent: boolean };

/** Headline with serif-italic accent words, e.g. "Non-Surgical *Breast Lift*" (accent ≈ 1.2× the headline). */
export function Runs({ runs, accentClass = "text-[1.2em] font-medium" }: { runs: Run[]; accentClass?: string }) {
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

/** Drops the design's leading "/ " from labels ("/ Body Treatments" → "Body Treatments"). */
export const label = (s: ReactNode) => (typeof s === "string" ? s.replace(/^\s*\/\s*/, "") : s);

/** Category label on a translucent black chip. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-9 items-center bg-black/50 px-5 text-small font-medium text-white backdrop-blur-sm">{label(children)}</span>
  );
}

/** Small eyebrow above section headings. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-small font-medium text-brown ${className}`}>{label(children)}</p>;
}

/**
 * Hero heights: "page" for category + treatment pages (next section peeks above the fold), "feature" for
 * Home / About / Academy / Membership / Shop. Content sits at the bottom with 56–64px of padding.
 */
export const HERO = {
  page: "min-h-[380px] md:min-h-[440px]",
  feature: "min-h-[460px] md:min-h-[540px]",
} as const;

type HeroProps = {
  image?: { src: ImageRef; place: Placement } | null;
  /** Figma frame height of the hero, used only to frame the photo like the design. */
  frameH?: number;
  size?: keyof typeof HERO;
  kicker?: string | null;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Scrim colour behind the copy. */
  tint?: "brown" | "black";
  align?: "left" | "center";
  id?: string;
  imageClass?: string;
  underlay?: ReactNode;
  /** Extra content pinned inside the hero (e.g. the clinic selector), positioned by the caller. */
  aside?: ReactNode;
};

/** Photo hero with a soft colour scrim, kicker chip, headline, lead and CTAs. */
export function PageHero({
  image, frameH = 680, size = "page", kicker, title, description, children, tint = "brown", align = "left", id, imageClass, underlay, aside,
}: HeroProps) {
  const scrim = tint === "brown" ? "from-brown/95 via-brown/50" : "from-black/90 via-black/45";
  const center = align === "center";
  return (
    <Band
      backdrop={image}
      frameH={frameH}
      priority
      imageClass={imageClass}
      className={`flex ${HERO[size]}`}
      innerClass={`flex flex-col justify-end gap-8 pt-24 pb-14 md:flex-row md:items-end md:justify-between md:pb-16 ${center ? "md:justify-center" : ""}`}
      aria-labelledby={id}
      underlay={
        <>
          <span aria-hidden className={`absolute inset-0 bg-gradient-to-t ${scrim} to-transparent`} />
          {underlay}
        </>
      }
    >
      <div className={`hero-in flex max-w-[760px] flex-col ${center ? "items-center text-center" : "items-start"}`}>
        {kicker && <Kicker>{kicker}</Kicker>}
        <h1 id={id} className={`text-h1 font-semibold text-white ${kicker ? "mt-5" : ""}`}>
          {title}
        </h1>
        {description && <p className="mt-4 max-w-[640px] text-lead whitespace-pre-line text-white/90">{description}</p>}
        {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
      </div>
      {aside}
    </Band>
  );
}

type CtaProps = {
  image: { src: ImageRef; place: Placement };
  frameH?: number;
  kicker?: string | null;
  title: ReactNode;
  children?: ReactNode;
  /** Simple link button; use `children` for anything else. */
  button?: string;
  href?: string;
  text?: ReactNode;
  id?: string;
  imageClass?: string;
};

/** Photo banner with centred copy and one CTA ("Schedule your consultation…", "Be a part of the family"). */
export function CtaBanner({ image, frameH = 617, kicker, title, children, button, href, text, id, imageClass }: CtaProps) {
  return (
    <Band
      backdrop={image}
      frameH={frameH}
      imageClass={imageClass}
      className="flex min-h-[340px]"
      innerClass="flex flex-col items-center justify-center py-[72px] text-center"
      aria-labelledby={id}
      underlay={<span aria-hidden className="absolute inset-0 bg-black/35" />}
    >
      <div data-reveal className="flex max-w-[800px] flex-col items-center">
        {kicker && <p className="text-small text-cream">{label(kicker)}</p>}
        <h2 id={id} className="mt-3 text-[clamp(1.75rem,1.4rem+1.1vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.04em] text-balance text-white">
          {title}
        </h2>
        {text && <p className="mt-4 max-w-[640px] text-body text-white/85">{text}</p>}
        <div className="mt-7">
          {children ??
            (button && href && (
              <Link href={href} className={`${btnWhite} text-cocoa`}>
                {button}
              </Link>
            ))}
        </div>
      </div>
    </Band>
  );
}

export const btnWhite =
  "inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-[15px] leading-5 font-medium tracking-[-0.3px] whitespace-nowrap transition-colors hover:bg-cream";
export const btnOutline =
  "inline-flex h-12 items-center justify-center gap-2 border border-white/90 px-6 text-[15px] leading-5 font-medium tracking-[-0.3px] whitespace-nowrap text-white transition-colors hover:bg-white hover:text-black";
export const btnBrown =
  "inline-flex h-12 items-center justify-center gap-2 bg-brown px-6 text-[15px] leading-5 font-medium tracking-[-0.3px] whitespace-nowrap text-white transition-colors hover:bg-espresso";
