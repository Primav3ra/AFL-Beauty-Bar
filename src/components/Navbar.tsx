"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { links } from "@/config/links";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { Bookmark, ChevronDown, Globe } from "./icons";
import { TreatmentsCurtain } from "./TreatmentsCurtain";

const LOGO = { box: { x: 0, y: 0, w: 111, h: 56 }, img: { x: -28.3, y: -26.3, w: 168.2, h: 111.8 }, fit: "fill" } as const;

const navText = "text-[15px] leading-[24.1px] font-medium tracking-[-0.4px] text-ink";

function NavItem({ href, label, chevron = false }: { href: string; label: string; chevron?: boolean }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link href={href} className={`group flex h-[31.5px] items-center gap-[11.5px] ${navText}`} aria-current={active ? "page" : undefined}>
      <span className="relative">
        {label}
        <span className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
      </span>
      {chevron && <ChevronDown className="h-[7.2px] w-[12.6px]" />}
    </Link>
  );
}

/** Figma 325:85 (1440×69) + Treatments curtain 221:537. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on route change (adjusting state during render), Escape, and outside click.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => !wrapRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={wrapRef} className="relative z-50" onMouseLeave={hide}>
      <nav className="flex h-[69px] items-center bg-white pl-[89px]">
        <div className="flex h-14 items-center gap-[180px]">
          <Link href="/" aria-label="AFL Beauty Bar — home" className="relative block h-14 w-[111px] shrink-0">
            {/* Figma 325:87 "Gold Logo FINAL 1" — cropped fill (see scripts/crops.mjs 325:85) */}
            <FigmaImage src="eb07e6b7" alt="AFL Beauty Bar" priority place={LOGO} />
          </Link>

          <div className="flex w-[494px] items-center gap-[28.6px]">
            <button
              type="button"
              className={`flex h-[31.5px] cursor-pointer items-center gap-[11.5px] ${navText}`}
              aria-expanded={open}
              aria-controls="treatments-curtain"
              onMouseEnter={show}
              // Hover already opened it for mouse users, so a mouse click keeps it open (a toggle would close it
              // right away); keyboard activation (detail 0) toggles. Mouse-leave / Escape / outside click close it.
              onClick={(e) => (e.detail === 0 ? setOpen((v) => !v) : show())}
            >
              Treatments
              <ChevronDown className={`h-[7.2px] w-[12.6px] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            <div onMouseEnter={hide} className="contents">
              <NavItem href="/academy" label="Academy" />
              <NavItem href="/membership" label="Membership" />
              <NavItem href="/about" label="About" chevron />
              <NavItem href="/shop" label="Shop" chevron />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <PlaceholderLink
              reason="language switcher not designed"
              className="flex h-[48.9px] items-center gap-[4.5px] border border-espresso px-[15px] text-[15px] leading-[24.1px] font-medium tracking-[-0.4px] text-espresso transition-colors hover:bg-espresso hover:text-white"
            >
              EN <Globe className="size-6" />
            </PlaceholderLink>
            <Link
              href={links.booking}
              className="flex h-[48.9px] w-[208.3px] items-center justify-center gap-[11.5px] bg-brown text-[15px] leading-[24.1px] font-medium tracking-[-0.4px] text-white transition-colors hover:bg-espresso"
            >
              Book Appointment <Bookmark className="size-6" />
            </Link>
          </div>
        </div>
      </nav>

      {open && (
        <div id="treatments-curtain" onMouseEnter={show} className="absolute inset-x-0 top-full animate-[curtain-in_.18s_ease-out]">
          <TreatmentsCurtain />
        </div>
      )}
    </div>
  );
}
