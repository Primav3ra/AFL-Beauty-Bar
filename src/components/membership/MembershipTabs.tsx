"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { CountUp } from "@/components/CountUp";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { btnBrown } from "@/components/blocks";
import { Crown } from "./icons";
import type { Tier } from "./tiers";

export type MembershipGroup = {
  id: string;
  label: string;
  title: string;
  note?: string;
  tiers: Tier[];
  /** Optional photo panel shown beside a single-tier group. */
  media?: ReactNode;
};

/** Figma CTAs end in "-->" (Inter's long-arrow ligature); show a plain arrow. */
const ctaText = (s: string) => s.replace(/\s*(-->|→)\s*$/, "") + " →";

function TierCard({ t, featured }: { t: Tier; featured?: boolean }) {
  return (
    <article aria-labelledby={`tier-${t.id}`} className={`flex h-full flex-col bg-white p-6 sm:p-7 ${featured ? "ring-1 ring-brown" : ""}`}>
      <p className="text-small font-medium text-brown">{t.kicker.replace(/^Best for:\s*/i, "Best for ")}</p>
      <h3 id={`tier-${t.id}`} className="mt-2 text-[clamp(1.5rem,1.25rem+0.7vw,2rem)] leading-tight font-medium tracking-[-0.04em] text-espresso">
        {t.title.replace(/^Option #\d+:\s*/, "")}
      </h3>
      <p className="mt-5 flex items-baseline gap-1 text-espresso">
        <span className="text-[22px] font-semibold">$</span>
        <span className="text-[clamp(2.25rem,1.9rem+1vw,2.75rem)] leading-none font-bold tracking-[-0.05em]">
          <CountUp value={Number(t.price)} />
        </span>
        <span className="text-body font-medium text-espresso/70">/ month</span>
      </p>
      <p className="mt-2 text-small text-espresso/70">{t.commitment}</p>

      <p className="mt-6 border-t border-espresso/10 pt-5 text-small font-semibold text-espresso">{t.listHeading}</p>
      <ul className="mt-3 flex flex-1 flex-col gap-2.5">
        {t.items.map((lines, i) => (
          <li key={i} className="flex gap-2.5 text-small text-espresso/85">
            <span aria-hidden className="mt-[7px] size-1.5 shrink-0 rounded-full bg-brown" />
            <span>{lines.join(" ").trim()}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex flex-wrap gap-2">
        <PlaceholderLink reason={`membership sign-up (${t.title}) has no integration yet`} className={btnBrown}>
          <Crown className="h-[16px] w-[18px] shrink-0" />
          {ctaText(t.cta)}
        </PlaceholderLink>
        {t.secondaryCta && (
          <PlaceholderLink
            reason="rewards sign-up has no integration yet"
            className="inline-flex h-12 items-center justify-center border border-brown px-5 text-[15px] font-medium text-brown transition-colors hover:bg-brown hover:text-white"
          >
            {t.secondaryCta}
          </PlaceholderLink>
        )}
      </div>
    </article>
  );
}

/**
 * The membership categories as tabs (Figma sections 736:3607, 778:491, 778:618), each showing its tiers
 * side by side for comparison. Arrow keys move between tabs; cards stack on phones.
 */
export function MembershipTabs({ groups }: { groups: MembershipGroup[] }) {
  const base = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const g = groups[active];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + groups.length) % groups.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  const cols = g.tiers.length >= 3 ? "lg:grid-cols-3" : g.tiers.length === 2 ? "md:grid-cols-2" : "";

  return (
    <div>
      <div>
        <div role="tablist" aria-label="Membership categories" onKeyDown={onKey} className="mx-auto grid grid-cols-2 gap-1 bg-linen p-1 sm:flex sm:w-max">
          {groups.map((x, i) => (
            <button
              key={x.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${base}-tab-${x.id}`}
              aria-selected={i === active}
              aria-controls={`${base}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={`min-h-11 cursor-pointer px-3 py-2 text-small leading-tight transition-colors sm:px-5 sm:text-body sm:whitespace-nowrap ${i === active ? "bg-brown font-semibold text-white" : "font-medium text-espresso/70 hover:text-espresso"}`}
            >
              {x.label}
            </button>
          ))}
        </div>
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${g.id}`} className="mt-8">
        <div key={g.id} className="animate-[fade-in_.35s_ease-out]">
          <div className="text-center">
            <h3 className="text-[clamp(1.375rem,1.2rem+0.6vw,1.75rem)] leading-tight font-medium tracking-[-0.04em] text-espresso">{g.title}</h3>
            {g.note && <p className="mt-2 text-small text-espresso/70">{g.note}</p>}
          </div>
          {g.media ? (
            <div className="mx-auto mt-6 grid max-w-[1000px] gap-4 md:grid-cols-2">
              <div className="relative min-h-[300px] overflow-hidden bg-black">{g.media}</div>
              <TierCard t={g.tiers[0]} featured />
            </div>
          ) : (
            <ul className={`mt-6 grid gap-4 ${cols}`}>
              {g.tiers.map((t) => (
                <li key={t.id}>
                  <TierCard t={t} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
