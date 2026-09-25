"use client";

import { useEffect } from "react";

/**
 * Marks every [data-reveal] element with data-shown once it scrolls into view (styles in globals.css).
 * Mounted once in the root layout; a MutationObserver picks up elements added by client navigation.
 */
export function ScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-shown", "");
          io.unobserve(e.target);
        }
      },
      // Fire ~150px before the element scrolls in, so nothing is still blank when it arrives.
      { rootMargin: "0px 0px 150px 0px", threshold: 0 },
    );
    const scan = () => document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
