"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  gap: number;
  /** Left padding of the track (first card's x in the design). */
  inset: number;
  /** "single": one active bar (current card). "range": every fully visible card is dark. */
  mode?: "single" | "range";
  className?: string;
  /** Gap between track and indicator bars. */
  barsGap: number;
  label: string;
};

/** Horizontal scroll-snap carousel with the design's 43px indicator bars (active: 4px black, idle: 2px grey). */
export function Carousel({ children, gap, inset, mode = "single", className = "", barsGap, label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const count = Children.count(children);
  const [visible, setVisible] = useState<boolean[]>(() => Array.from({ length: count }, (_, i) => i === 0));
  const [current, setCurrent] = useState(0);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    const items = [...el.children] as HTMLElement[];
    setVisible(items.map((c) => {
      const r = c.getBoundingClientRect();
      return r.left >= box.left - 2 && r.right <= box.right + 2;
    }));
    const step = items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 && el.scrollLeft > 0;
    setCurrent(atEnd ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / step)));
  }, [count]);

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const go = (i: number) => {
    const el = track.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (el && item) el.scrollTo({ left: item.offsetLeft - inset, behavior: "smooth" });
  };

  const active = (i: number) => (mode === "range" ? visible[i] : i === current);

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={track}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap, paddingLeft: inset, paddingRight: inset, scrollPaddingLeft: inset }}
      >
        {Children.map(children, (child) => (
          <div className="shrink-0 snap-start">{child}</div>
        ))}
      </div>
      <div className="flex justify-center gap-[17px]" style={{ marginTop: barsGap }}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={active(i) || undefined}
            onClick={() => go(i)}
            className="group flex h-4 w-[43px] cursor-pointer items-center"
          >
            <span className={`block w-full transition-all ${active(i) ? "h-1 bg-black" : "h-0.5 bg-[#9e9e9e] group-hover:bg-black/60"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
