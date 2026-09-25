"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Gentle scroll parallax: the child drifts up to ±`range`px as its frame crosses the viewport. Its
 * layer overhangs its frame by `range`px top and bottom so the drift never exposes an edge; the parent clips.
 * Off with reduced motion.
 */
export function Parallax({ children, range = 28 }: { children: ReactNode; range?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      const r = el.parentElement!.getBoundingClientRect();
      // -1 when the frame's centre is at the bottom of the viewport, +1 at the top.
      const k = Math.max(-1, Math.min(1, (innerHeight / 2 - (r.top + r.height / 2)) / (innerHeight / 2 + r.height / 2)));
      el.style.transform = `translate3d(0, ${(-k * range).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [range]);

  return (
    <div ref={ref} className="absolute inset-x-0 will-change-transform" style={{ top: -range, bottom: -range }}>
      {children}
    </div>
  );
}
