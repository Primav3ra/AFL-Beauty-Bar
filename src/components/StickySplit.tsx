import type { ReactNode } from "react";
import { BookingLink } from "./BookingLink";
import { StickyIndex, type IndexItem } from "./StickyIndex";
import { INTRO_GAP, SectionIntro, btnBrown } from "./blocks";

/**
 * Sticky-scroll section (Figma note 130:1474: "all these empty spaces are for the sticky scroll"):
 * a centred heading, then a pinned left column (an index of the cards + booking CTA) beside a card grid
 * that scrolls past it. Below 1024px the index is dropped and the grid runs full width.
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
    <section className={`section container-site ${className}`} aria-labelledby={id}>
      <SectionIntro id={id} eyebrow={eyebrow} title={title} text={text} />
      <div className={`${INTRO_GAP} flex items-start gap-12`}>
        <div className="sticky top-[88px] hidden w-[220px] shrink-0 lg:block" data-reveal>
          <StickyIndex items={index} label={indexLabel} />
          <BookingLink className={`${btnBrown} mt-8`}>Book a consultation</BookingLink>
        </div>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}

/**
 * Card grid for StickySplit: 2 columns below 1024px, 3 from 1024px (a 6-track grid, each card spanning 2;
 * a short last row stretches its cards so the grid ends flush). On phones, `wide` cards (ones with a
 * sub-list) take a full row, and a card that would be left alone in a row stretches to fill it.
 */
export function SplitGrid({ children, wide = [] }: { children: ReactNode[]; wide?: boolean[] }) {
  const n = children.length;
  const rest = n % 3;
  const lg = (i: number) => (rest && i >= n - rest ? (rest === 1 ? "lg:col-span-6" : "lg:col-span-3") : "lg:col-span-2");
  // Phone layout (2 columns, wide cards on their own row).
  const full = new Set<number>();
  let open: number | null = null; // index of a narrow card waiting for a partner
  children.forEach((_, i) => {
    if (wide[i]) {
      if (open !== null) full.add(open);
      open = null;
      full.add(i);
    } else if (open === null) open = i;
    else open = null;
  });
  if (open !== null) full.add(open);
  const sm = (i: number) => (n % 2 === 1 && i === n - 1 ? "sm:col-span-2" : "sm:col-span-1");
  return (
    <ul data-reveal="stagger" className="relative grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
      {children.map((child, i) => (
        <li key={i} className={`${full.has(i) ? "col-span-2" : ""} ${sm(i)} ${lg(i)}`}>
          {child}
        </li>
      ))}
    </ul>
  );
}
