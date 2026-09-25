"use client";

import { useId, useState } from "react";

type Item = { q: string; a: string | null };

/** Figma "Frequently asked questions" list (e.g. 239:1102): 620px bordered boxes, first one open. */
export function FaqAccordion({ items }: { items: Item[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="flex w-[620px] flex-col gap-[15px]">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className="border border-black bg-white">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="font-manrope flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-6 pr-[18px] pl-[18px] text-left text-[17px] leading-[22px] font-extrabold text-black"
              >
                {it.q}
                <span aria-hidden className="relative size-5 shrink-0">
                  <span className="bg-graphite absolute top-[9px] left-[1.75px] h-0.5 w-[16.5px]" />
                  <span
                    className={`bg-graphite absolute top-0 left-[9.4px] h-5 w-[1.7px] transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <p
                  className={`font-manrope -mt-[3px] w-[582px] pb-[22px] pl-[18px] text-[17px] leading-[31px] font-medium tracking-[-0.3px] ${it.a ? "text-black" : "text-black/50"}`}
                >
                  {/* Figma has no real answers yet (the only one is filler text), so all show a placeholder. */}
                  {it.a ?? "Answer coming soon."}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
