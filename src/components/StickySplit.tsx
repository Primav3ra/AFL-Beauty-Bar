import type { ReactNode } from "react";
import { BookingLink } from "./BookingLink";
import { StickyIndex, type IndexItem } from "./StickyIndex";
import { SectionIntro } from "./blocks";

/**
 * Sticky-scroll section (Figma note 130:1474: "all these empty spaces are for the sticky scroll"):
 * a centred heading, then a pinned left column (an index of the cards + booking CTA) beside a card grid
 * that scrolls past it. Spans the full 1440 column with the page's 111px margins.
 */
export function StickySplit({ id, eyebrow, title, text, index, indexLabel, className = "", children }: {
  id: string;
  eyebrow?: string | null;
  title: ReactNode;
  text?: ReactNode;
  index: IndexItem[];
  indexLabel: string;
  className?: string;
  /** The grid; give each card the id used in `index`. */
  children: ReactNode;
}) {
  return (
    <section className={`px-[111px] ${className}`} aria-labelledby={id}>
      <SectionIntro id={id} eyebrow={eyebrow} title={title} text={text} />
      <div className="mt-14 flex items-start gap-16">
        <div className="sticky top-[117px] w-[280px] shrink-0" data-reveal>
          <StickyIndex items={index} label={indexLabel} />
          <BookingLink className="mt-9 inline-flex h-[49px] items-center gap-3 bg-brown px-7 text-[15px] leading-5 font-medium tracking-[-0.3px] text-white transition-colors hover:bg-espresso">
            Book a consultation
          </BookingLink>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}

/**
 * 3-column grid for StickySplit (a 6-track grid, each card spanning 2). A short last row stretches its
 * cards to fill the row, so the grid always ends flush.
 */
export function SplitGrid({ children }: { children: ReactNode[] }) {
  const n = children.length;
  const rest = n % 3;
  const span = (i: number) => (rest && i >= n - rest ? (rest === 1 ? "col-span-6" : "col-span-3") : "col-span-2");
  return (
    <ul data-reveal="stagger" className="relative grid grid-cols-6 gap-4">
      {children.map((child, i) => (
        <li key={i} className={span(i)}>
          {child}
        </li>
      ))}
    </ul>
  );
}
