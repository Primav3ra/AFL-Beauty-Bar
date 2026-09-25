"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Number that counts up from 0 once it scrolls into view (1.2s, ease-out). Renders the final value on the
 * server and without JS / with reduced motion, so the real price is always what's read first.
 */
export function CountUp({ value, ms = 1200 }: { value: number; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / ms);
        setN(Math.round(value * (1 - (1 - k) ** 3)));
        if (k < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    // Start from zero only if it's still below the fold, so a visible price never jumps.
    if (el.getBoundingClientRect().top > innerHeight) setN(0);
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, ms]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
    </span>
  );
}
