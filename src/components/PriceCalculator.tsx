"use client";

import { useId, useState } from "react";
import type { Pricing } from "@/data/pricing";
import { estimate, type Estimate } from "@/lib/estimate";
import type { Treatment } from "@/data/treatments";
import { ChevronDown } from "./icons";

type Props = { labels: Treatment["calc"]; pricing: Pricing };

const usd = (n: number) => `$ ${Math.round(n).toLocaleString("en-US")}`;

// Slider geometry from Figma 239:1407: 500px track, 8 ticks from x=47 spaced 58.57px.
const TICK_START = 47;
const TICK_STEP = 58.57;

/** Figma 274:1570 — 75×35 pill switch (off #e5ddd2, on brown). */
function Toggle({
  on,
  onChange,
  label,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-[35px] w-[65px] shrink-0 cursor-pointer rounded-full transition-colors ${on ? "bg-brown" : "bg-linen"}`}
    >
      <span
        className={`absolute top-[3px] size-[29px] rounded-full bg-white shadow-sm transition-all ${on ? "left-[33px]" : "left-[3px]"}`}
      />
    </button>
  );
}

/**
 * "Okay, but what's this actually going to cost me?" — estimate from researched pricing (src/data/pricing.ts);
 * the maths lives in src/lib/estimate.ts.
 */
export function PriceCalculator({ labels, pricing }: Props) {
  const id = useId();
  const weeks = labels.weeks.length ? labels.weeks : [1, 2, 4, 6, 8, 10, 12, 14];
  const [zone, setZone] = useState("");
  const [weekIdx, setWeekIdx] = useState(Math.max(0, weeks.indexOf(6)));
  const [accel, setAccel] = useState<boolean[]>(() => labels.accelerators.map(() => false));

  const w = weeks[weekIdx];
  const isOn = (re: RegExp) => labels.accelerators.some((a, i) => accel[i] && re.test(a));
  const est = estimate(pricing, zone, w, {
    lymphatic: isOn(/lymphatic/i),
    rf: isOn(/\bRF\b|radiofrequency/i),
  });
  const { rate: price, discount, total } = est;

  const bigCls = "text-[65px] leading-[74px] font-medium tracking-[-5.2px] whitespace-nowrap";
  const consult = (
    <span className="block text-[28px] leading-[74px] font-medium tracking-[-1px]">
      Price on consultation
    </span>
  );

  return (
    <div>
      <div className="relative mx-auto h-[524px] w-[1304px] bg-white">
        {/* Inputs */}
        <div className="absolute top-[68px] left-[70px] w-[500px]">
          <label htmlFor={`${id}-zone`} className="text-espresso block text-[17px] leading-[23px]">
            {labels.zonesLabel}
          </label>
          <div className="relative mt-[13px]">
            <select
              id={`${id}-zone`}
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="bg-cream focus-visible:ring-brown h-[51px] w-full cursor-pointer appearance-none pr-10 pl-2.5 text-[17px] leading-[23px] font-medium text-black outline-none focus-visible:ring-2"
            >
              <option value="" disabled>
                {labels.zonesPlaceholder ?? "Select Your Choice"}
              </option>
              {pricing.zones.map((z) => (
                <option key={z} value={z.trim()}>
                  {z.trim()}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-[12px] h-[7.2px] w-[12.6px] -translate-y-1/2" />
          </div>

          <label
            htmlFor={`${id}-weeks`}
            className="text-espresso mt-[25px] block text-[17px] leading-[23px]"
          >
            {labels.durationLabel}
          </label>
          <div className="relative mt-[23px] h-[46px]">
            <div className="bg-linen absolute top-0 left-0 h-1.5 w-full" />
            <div
              className="bg-brown absolute top-0 left-0 h-1.5"
              style={{ width: TICK_START + weekIdx * TICK_STEP }}
            />
            {weeks.map((n, i) => (
              <span
                key={n}
                className="absolute top-[10px] flex -translate-x-1/2 flex-col items-center"
                style={{ left: TICK_START + i * TICK_STEP }}
              >
                <span className="h-2.5 w-px bg-black/20" />
                <span className="text-[17px] leading-[23px] font-medium text-black">{n}</span>
              </span>
            ))}
            <input
              id={`${id}-weeks`}
              type="range"
              min={0}
              max={weeks.length - 1}
              step={1}
              value={weekIdx}
              onChange={(e) => setWeekIdx(Number(e.target.value))}
              aria-valuetext={`${w} weeks`}
              className="calc-range absolute -top-[7px] h-5 cursor-pointer"
              style={{ left: TICK_START - 9.5, width: (weeks.length - 1) * TICK_STEP + 19 }}
            />
          </div>

          <p className="text-espresso mt-[20px] text-[17px] leading-[23px]">
            {labels.acceleratorsLabel}
          </p>
          <ul className="mt-[13px] flex w-[464px] flex-col gap-5 p-2.5">
            {labels.accelerators.map((a, i) => (
              <li key={a} className="flex h-[35px] items-center justify-between">
                <span className="text-[17px] leading-[23px] font-medium text-black">{a}</span>
                <Toggle
                  on={accel[i]}
                  label={a}
                  onChange={(v) => setAccel((s) => s.map((x, j) => (j === i ? v : x)))}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Outputs */}
        <output
          htmlFor={`${id}-zone ${id}-weeks`}
          className="bg-cream text-espresso absolute top-8 left-[764px] flex h-[469px] w-[504px] flex-col items-center text-center"
        >
          <p className="mt-[27px] text-[17px] leading-[23px] font-medium">{labels.rateLabel}</p>
          <p className={`relative mt-5 ${bigCls}`}>
            {price == null ? consult : usd(price)}
            {price != null && pricing.unitLabel && pricing.unitLabel !== "per session" && (
              <span className="text-espresso/60 absolute top-[68px] left-1/2 -translate-x-1/2 text-[13px] leading-4 tracking-normal">
                {pricing.unitLabel}
              </span>
            )}
          </p>
          <p className="mt-7 text-[17px] leading-[23px] font-medium">{labels.discountLabel}</p>
          <p className={`mt-5 ${bigCls}`}>{discount}%</p>
          <span className="mt-[18px] block h-px w-[385px] bg-black" />
          <p className="mt-[29px] text-[17px] leading-[23px] font-medium">{labels.totalLabel}</p>
          <p className={`mt-2.5 ${bigCls}`}>
            {total == null ? consult : total === 0 ? "$ 0.0" : usd(total)}
          </p>
        </output>
      </div>
      {/* Figma 239:1385 — verbatim footnote bar */}
      <p className="text-espresso mx-auto mt-[50px] w-[1290px] px-[18px] py-[11px] text-center text-[17px] leading-[23px] italic">
        {labels.footnote}
      </p>
      <CalcNotes pricing={pricing} est={est} />
    </div>
  );
}

/** How the estimate was worked out + sources, under the white box (the design's footnote bar stays verbatim). */
function CalcNotes({ pricing, est }: { pricing: Pricing; est: Estimate }) {
  const link = (s: { name: string | null; url: string | null }) =>
    s.url ? (
      <a
        href={s.url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-espresso underline"
      >
        {s.name}
      </a>
    ) : (
      s.name
    );
  return (
    <div className="text-espresso/60 mt-1.5 text-center text-[13px] leading-5" data-calc-notes>
      {est.notes.map((n) => (
        <p key={n}>{n}</p>
      ))}
      <p>
        {pricing.priceUSD == null ? (
          "No published price found for this treatment. Price on consultation."
        ) : (
          <>
            Estimate based on published averages; pricing confirmed after consultation. Source:{" "}
            {link({ name: pricing.sourceName, url: pricing.sourceUrl })}
            {est.addOnSources.map((a) => (
              <span key={a.label}>
                ; {a.label}: {link(a.source)}
              </span>
            ))}
            , retrieved {pricing.retrievedOn}.
          </>
        )}
      </p>
    </div>
  );
}
