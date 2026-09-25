"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scrollable row that also moves on its own. Its content is two identical halves, so when the position
 * passes the middle it jumps back by one half (and forward again if the user swipes back past the start):
 * the loop never runs out in either direction. Auto-scroll pauses while the row is hovered with a mouse,
 * focused, touched, or off screen, and resumes ~2s after the user stops swiping or wheeling.
 * With reduced motion it's a plain swipeable row.
 */
export function AutoScroll({ children, seconds, label }: { children: ReactNode; seconds: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const half = () => el.scrollWidth / 2;

    let pos = 0; // sub-pixel position (scrollLeft rounds)
    let last = 0; // scrollLeft we set ourselves, to tell our scrolling from the user's
    let hovered = false;
    let focused = false;
    let touching = false;
    let visible = false;
    let resumeAt = 0;
    let raf = 0;
    let prev = 0;

    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (pos >= h) pos -= h;
      else if (pos < 1) pos += h;
    };
    const set = () => {
      el.scrollLeft = pos;
      last = el.scrollLeft;
    };

    const tick = (t: number) => {
      const dt = prev ? Math.min(64, t - prev) : 0;
      prev = t;
      if (!reduced && visible && !hovered && !focused && !touching && t >= resumeAt) {
        pos += (half() / (seconds * 1000)) * dt;
        wrap();
        set();
      }
      raf = requestAnimationFrame(tick);
    };

    const idle = () => (resumeAt = performance.now() + 2000);
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - last) < 2) return; // our own step
      pos = el.scrollLeft;
      const before = pos;
      wrap();
      if (pos !== before) set();
      last = el.scrollLeft;
      idle();
    };
    const onEnter = (e: PointerEvent) => e.pointerType === "mouse" && (hovered = true);
    const onLeave = (e: PointerEvent) => e.pointerType === "mouse" && (hovered = false);
    const onDown = () => (touching = true);
    const onUp = () => {
      touching = false;
      idle();
    };
    const onFocusIn = () => (focused = true);
    const onFocusOut = () => (focused = false);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    // Start one step in, so a swipe back towards the start already has room to wrap.
    pos = 1;
    set();

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp);
    el.addEventListener("touchcancel", onUp);
    el.addEventListener("wheel", idle, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("touchcancel", onUp);
      el.removeEventListener("wheel", idle);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [seconds]);

  return (
    <div ref={ref} className="marquee" role="region" aria-label={label}>
      {children}
    </div>
  );
}
