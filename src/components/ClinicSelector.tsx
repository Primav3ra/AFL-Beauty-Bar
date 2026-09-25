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
      {open && (
        <ul role="listbox" aria-label="Choose a clinic" className="absolute top-full left-0 z-20 mt-4 w-[240px] animate-[curtain-in_.15s_ease-out] bg-white py-2 text-ink shadow-xl">
          {clinics.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                role="option"
                aria-selected={c.id === clinic.id}
                onClick={() => {
                  setSelectedClinic(c.id);
                  setOpen(false);
                }}
                className={`w-full cursor-pointer px-5 py-2.5 text-left text-[17px] leading-6 font-medium tracking-[-0.5px] transition-colors hover:bg-cream ${c.id === clinic.id ? "text-brown" : ""}`}
              >
                {c.short}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
