"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Long copy that's collapsed to three lines on phones, with "Read more" fading the rest in. From 768px the
 * full text always shows (there the pinned photo beside it needs the height).
 */
export function ReadMore({ children, className = "" }: { children: ReactNode; className?: string }) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className={className}>
      <div
        id={id}
        key={String(open)}
        className={open ? "animate-[read-more_.5s_ease-out]" : "relative [&_p]:line-clamp-3 md:[&_p]:line-clamp-none"}
      >
        {children}
        {!open && (
          <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-cream to-transparent md:hidden" />
        )}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="mt-2 cursor-pointer text-small font-semibold text-brown underline underline-offset-4 transition-colors hover:text-espresso md:hidden"
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
