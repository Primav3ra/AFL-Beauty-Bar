"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRight } from "./icons";

export type BaCase = { id: string; title: string; href: string | null };

const AUTO_MS = 6000;
const img = (id: string, half: "before" | "after") => `/img/ba/${id}-${half}.webp`;
const RM = "(prefers-reduced-motion: reduce)";
const subscribeRM = (cb: () => void) => {
  const m = matchMedia(RM);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/**
 * Before/after comparison: both photos share one frame and a divider reveals the "after" side.
 * On each case the divider sweeps in; visitors can drag it (or use the arrow keys, it's a range input).
 * Cases advance on their own with a progress line, paused while the section is hovered or focused.
 * Photos come from scripts/crop-before-after.mjs.
 */
export function BeforeAfter({ cases }: { cases: BaCase[] }) {
  const [i, setI] = useState(0);
  const [pos, setPos] = useState(50);
  const [sweeping, setSweeping] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeRM, () => matchMedia(RM).matches, () => false);
  const started = useRef(false);
  const root = useRef<HTMLDivElement>(null);
  const c = cases[i];

  // Sweep the divider in whenever a case opens (after the first time the section scrolls into view).
  const show = (n: number) => {
    setI(n);
    if (reduced) return setPos(50);
    setSweeping(true);
    setPos(88);
    requestAnimationFrame(() => requestAnimationFrame(() => setPos(50)));
  };
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        show(0);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => show((i + 1) % cases.length), AUTO_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused, reduced, cases.length]);

  return (
    <div
      ref={root}
      className="flex items-center gap-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="w-[380px] shrink-0">
        <ul className="border-t border-espresso/15">
          {cases.map((k, n) => {
            const active = n === i;
            return (
              <li key={k.id} className="relative border-b border-espresso/15">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => show(n)}
                  className="group flex w-full cursor-pointer items-center gap-5 py-4 text-left"
                >
                  <span className="relative h-14 w-20 shrink-0 overflow-hidden bg-linen">
                    <Image src={img(k.id, "after")} alt="" fill sizes="80px" className={`object-cover transition-opacity ${active ? "" : "opacity-60 group-hover:opacity-100"}`} />
                  </span>
                  <span className={`text-[19px] leading-6 font-semibold tracking-[-0.5px] transition-colors ${active ? "text-espresso" : "text-espresso/45 group-hover:text-espresso"}`}>
                    {k.title}
                  </span>
                </button>
                {/* Time until the next case. */}
                {/* Hidden while paused: the timer restarts when the pointer or focus leaves. */}
                {active && !reduced && !paused && (
                  <span
                    key={k.id}
                    aria-hidden
                    className="absolute -bottom-px left-0 h-0.5 bg-brown"
                    style={{ animation: `ba-progress ${AUTO_MS}ms linear forwards` }}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {c.href && (
          <Link href={c.href} className="mt-8 inline-flex items-center gap-2 text-[17px] leading-6 font-medium tracking-[-0.5px] text-espresso underline underline-offset-4 transition-colors hover:text-brown">
            See {c.title.toLowerCase()} <ArrowRight className="h-[10px] w-[16px]" />
          </Link>
        )}
      </div>

      <figure className="relative h-[350px] flex-1 overflow-hidden bg-linen outline-offset-4 outline-brown select-none has-[input:focus-visible]:outline-2">
        <Image key={`${c.id}-b`} src={img(c.id, "before")} alt={`${c.title}, before`} fill sizes="700px" className="animate-[fade-in_.5s_ease-out] object-cover" />
        <div
          className={`absolute inset-0 ${sweeping ? "transition-[clip-path] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)]" : ""}`}
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
          onTransitionEnd={() => setSweeping(false)}
        >
          <Image key={`${c.id}-a`} src={img(c.id, "after")} alt={`${c.title}, after`} fill sizes="700px" className="animate-[fade-in_.5s_ease-out] object-cover" />
        </div>

        <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[14px] leading-5 font-medium text-espresso">Before</span>
        <span className="absolute top-4 right-4 bg-white/90 px-3 py-1 text-[14px] leading-5 font-medium text-espresso">After</span>

        {/* Divider + handle */}
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white ${sweeping ? "transition-[left] duration-[1100ms] ease-[cubic-bezier(.2,.7,.2,1)]" : ""}`}
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-11 -translate-1/2 items-center justify-center rounded-full bg-white text-espresso shadow-[0_6px_20px_rgba(27,8,4,0.3)]">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </span>

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => {
            setSweeping(false);
            setPos(Number(e.target.value));
          }}
          aria-label={`Compare ${c.title} before and after`}
          className="ba-range absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </figure>
    </div>
  );
}
