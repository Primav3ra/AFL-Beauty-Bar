"use client";

import { useEffect, useRef, useState } from "react";
import { clinics } from "@/data/clinics";
import { setSelectedClinic, useSelectedClinic } from "@/lib/clinic-store";
import { ChevronDown } from "./icons";

/** "Selected Clinic / Miami, FL ⌄" — Landing hero (Figma 311:6). Local state only, no backend. */
export function ClinicSelector({ className = "" }: { className?: string }) {
  const clinic = useSelectedClinic();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className={`relative text-white ${className}`}>
      <p className="text-xl leading-[19.2px]">Selected Clinic</p>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-2.5 flex h-[22px] cursor-pointer items-center gap-[22px] text-[30px] leading-[41.5px] font-semibold whitespace-nowrap"
      >
        {clinic.short}
        <ChevronDown className={`h-[8.5px] w-[15px] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Opens upwards: the selector sits at the foot of the hero, which clips anything below it. */}
      {open && (
        <ul role="listbox" aria-label="Choose a clinic" className="absolute right-0 bottom-full z-20 mb-4 w-[300px] animate-[curtain-in_.15s_ease-out] bg-white py-2 text-ink shadow-[0_18px_40px_-12px_rgba(27,8,4,0.45)]">
          {clinics.map((c) => {
            const selected = c.id === clinic.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setSelectedClinic(c.id);
                    setOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-cream ${selected ? "bg-cream/60" : ""}`}
                >
                  <span aria-hidden className={`mt-[7px] size-2 shrink-0 rounded-full ${selected ? "bg-brown" : "border border-espresso/30"}`} />
                  <span>
                    <span className={`block text-[17px] leading-6 font-semibold tracking-[-0.5px] ${selected ? "text-brown" : ""}`}>{c.short}</span>
                    <span className="block text-[13px] leading-[18px] text-espresso/60">{c.address}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
