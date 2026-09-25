"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { links } from "@/config/links";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { Bookmark, ChevronDown, Globe } from "./icons";
import { TreatmentsCurtain, curtainCards } from "./TreatmentsCurtain";

const LOGO = { box: { x: 0, y: 0, w: 100, h: 50 }, img: { x: -25.5, y: -23.7, w: 151.4, h: 100.6 }, fit: "fill" } as const;
const PAGES = [
  { href: "/academy", label: "Academy" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
];

const navText = "text-[15px] leading-6 font-medium tracking-[-0.3px] text-ink";

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");
  return (
    <Link href={href} className={`group flex h-8 items-center ${navText}`} aria-current={active ? "page" : undefined}>
      <span className="relative">
        {label}
        <span className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
      </span>
    </Link>
  );
}

/** Figma 325:85 + Treatments curtain 221:537. Below 1024px: logo, booking button and a hamburger menu. */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close on route change (adjusting state during render), Escape, and outside click.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setMenu(false);
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMenu(false);
      }
    };
    const onClick = (e: MouseEvent) => !wrapRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);
  // No page scrolling behind the open mobile menu.
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menu]);

  const show = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div ref={wrapRef} className="sticky top-0 z-50 shadow-[0_1px_0_rgba(48,35,28,0.08)]" onMouseLeave={hide}>
      <nav className="bg-white" aria-label="Main">
        <div className="container-site flex h-16 items-center justify-between gap-6">
          <Link href="/" aria-label="AFL Beauty Bar — home" className="relative block h-[50px] w-[100px] shrink-0">
            {/* Figma 325:87 "Gold Logo FINAL 1" — cropped fill (see scripts/crops.mjs 325:85) */}
            <FigmaImage src="eb07e6b7" alt="AFL Beauty Bar" priority place={LOGO} />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <button
              type="button"
              className={`flex h-8 cursor-pointer items-center gap-2.5 ${navText}`}
              aria-expanded={open}
              aria-controls="treatments-curtain"
              onMouseEnter={show}
              // Hover already opened it for mouse users, so a mouse click keeps it open (a toggle would close it
              // right away); keyboard activation (detail 0) toggles. Mouse-leave / Escape / outside click close it.
              onClick={(e) => (e.detail === 0 ? setOpen((v) => !v) : show())}
            >
              Treatments
              <ChevronDown className={`h-[7px] w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>
            <div onMouseEnter={hide} className="contents">
              {PAGES.map((p) => (
                <NavItem key={p.href} {...p} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PlaceholderLink
              reason="language switcher not designed"
              className="hidden h-11 items-center gap-1 border border-espresso px-3 text-[15px] leading-6 font-medium text-espresso transition-colors hover:bg-espresso hover:text-white lg:flex"
            >
              EN <Globe className="size-5" />
            </PlaceholderLink>
            <Link
              href={links.booking}
              className="flex h-11 items-center justify-center gap-2 bg-brown px-4 text-[14px] leading-5 font-medium whitespace-nowrap text-white transition-colors hover:bg-espresso sm:px-5 sm:text-[15px]"
            >
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Appointment</span>
              <Bookmark className="hidden size-5 sm:block" />
            </Link>
            <button
              type="button"
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-menu"
              onClick={() => setMenu((v) => !v)}
              className="flex size-11 cursor-pointer items-center justify-center text-espresso lg:hidden"
            >
              <span aria-hidden className="relative block h-3.5 w-5">
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute top-1.5 left-0 h-[1.5px] w-5 bg-current transition-opacity ${menu ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-300 ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div id="treatments-curtain" onMouseEnter={show} className="absolute inset-x-0 top-full hidden animate-[curtain-in_.18s_ease-out] lg:block">
          <TreatmentsCurtain />
        </div>
      )}

      {menu && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] animate-[curtain-in_.18s_ease-out] overflow-y-auto bg-white lg:hidden">
          <div className="container-site py-6">
            <p className="text-small font-medium text-brown">Treatments</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {curtainCards.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="group relative block h-24 overflow-hidden bg-black">
                    <FigmaImage src={c.img} cover sizes="50vw" position={c.position} />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <span className="absolute inset-x-0 bottom-0 p-3 text-[14px] leading-[18px] font-medium text-white">{c.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-6 border-t border-espresso/10">
              {PAGES.map((p) => (
                <li key={p.href} className="border-b border-espresso/10">
                  <Link href={p.href} className="flex h-14 items-center text-[18px] font-medium tracking-[-0.4px] text-espresso" aria-current={pathname === p.href ? "page" : undefined}>
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={links.virtualConsult} className="mt-6 flex h-12 items-center justify-center border border-espresso text-[15px] font-medium text-espresso">
              Schedule Virtual Consultation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
