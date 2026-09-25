"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type IndexItem = { id: string; label: string };

/**
 * List of the cards beside it, for the pinned column of a sticky-scroll section (Figma note 130:1474).
 * The cards sit in rows, so a whole row is "current" at once: its names are highlighted and one bar glides
 * to span them. Clicking a name scrolls to its card.
 */
export function StickyIndex({ items, label }: { items: IndexItem[]; label: string }) {
  const [active, setActive] = useState<string[]>([]);
  const [bar, setBar] = useState({ top: 0, height: 0 });
  const list = useRef<HTMLUListElement>(null);

  // Current row = the last row of cards whose top has passed a line 45% down the viewport. Rows come from
  // layout positions (offsetTop), which the cards' entrance transforms don't affect.
  useEffect(() => {
    const els = items.map((it) => document.getElementById(it.id)?.closest("li")).filter((e): e is HTMLLIElement => !!e);
    const grid = els[0]?.parentElement;
    if (!grid) return;
    let raf = 0;
    const update = () => {
      const line = innerHeight * 0.45 - grid.getBoundingClientRect().top;
      const rows = [...new Set(els.map((e) => e.offsetTop))].sort((x, y) => x - y);
      const row = rows.filter((t) => t <= line).at(-1) ?? rows[0];
      const ids = items.filter((_, i) => els[i]?.offsetTop === row).map((it) => it.id);
      setActive((prev) => (prev.join() === ids.join() ? prev : ids));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  // Bar spans the first to the last highlighted name.
  useLayoutEffect(() => {
    const ul = list.current;
    if (!ul || !active.length) return;
    // Names only: the bar itself is also a child of the list.
    const lis = [...ul.querySelectorAll<HTMLElement>(":scope > li")];
    const idx = active.map((id) => items.findIndex((it) => it.id === id)).filter((i) => i >= 0);
    const first = lis[Math.min(...idx)];
    const last = lis[Math.max(...idx)];
    if (first && last) setBar({ top: first.offsetTop, height: last.offsetTop + last.offsetHeight - first.offsetTop });
  }, [active, items]);

  return (
    <nav aria-label={label}>
      <ul ref={list} className="relative border-l border-espresso/15">
        <span
          aria-hidden
          className="absolute -left-px w-0.5 bg-brown transition-[top,height] duration-300 ease-out"
          style={{ top: bar.top, height: bar.height }}
        />
        {items.map((it) => {
          const on = active.includes(it.id);
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                aria-current={on || undefined}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(it.id)?.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                }}
                className={`flex items-center py-[7px] pl-5 text-[15px] leading-5 font-medium tracking-[-0.3px] transition-colors duration-300 ${on ? "text-espresso" : "text-espresso/45 hover:text-espresso"}`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
