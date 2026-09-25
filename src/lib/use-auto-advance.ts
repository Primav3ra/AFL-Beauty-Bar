"use client";

import { useEffect, useState } from "react";

/**
 * Steps a slide index every `ms` while the slider isn't hovered/focused; off with reduced motion.
 * Spread the returned handlers on the slider root.
 */
export function useAutoAdvance(count: number, setIndex: (f: (i: number) => number) => void, ms = 5000) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || count < 2 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => clearInterval(t);
  }, [paused, count, ms, setIndex]);
  return {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  };
}
