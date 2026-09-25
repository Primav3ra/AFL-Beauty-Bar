"use client";

import { useId, useState } from "react";
import type { Pricing } from "@/data/pricing";
import { estimate } from "@/lib/estimate";
import type { Treatment } from "@/data/treatments";
import { ChevronDown } from "./icons";

type Props = { labels: Treatment["calc"]; pricing: Pricing };

const usd = (n: number) => `$ ${Math.round(n).toLocaleString("en-US")}`;

// Week slider: ticks sit under the thumb's centre, which travels from 9.5px to (100% - 9.5px) (19px thumb).
const at = (i: number, n: number) => `calc(9.5px + (100% - 19px) * ${n > 1 ? i / (n - 1) : 0})`;

/** Figma 274:1570 pill switch (off #e5ddd2, on brown). */
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
      className={`relative h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full transition-colors ${on ? "bg-brown" : "bg-linen"}`}
    >
      <span
        className={`absolute top-[3px] size-6 rounded-full bg-white shadow-sm transition-all ${on ? "left-[29px]" : "left-[3px]"}`}
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

  const bigCls = "text-[clamp(2.25rem,1.8rem+1.5vw,3.25rem)] leading-[1.15] font-medium tracking-[-0.06em] whitespace-nowrap";
  const consult = <span className="block text-[24px] leading-[1.4] font-medium tracking-[-0.5px]">Price on consultation</span>;
  const labelCls = "block text-body text-espresso";

  return (
    <div>
      <div className="grid gap-6 bg-white p-5 sm:p-8 md:grid-cols-[1fr_minmax(0,440px)] md:gap-10 md:p-10">
        {/* Inputs */}
        <div className="min-w-0 md:max-w-[480px]">
          <label htmlFor={`${id}-zone`} className={labelCls}>
            {labels.zonesLabel}
          </label>
          <div className="relative mt-3">
            <select
              id={`${id}-zone`}
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="bg-cream focus-visible:ring-brown h-12 w-full cursor-pointer appearance-none pr-10 pl-3 text-body font-medium text-black outline-none focus-visible:ring-2"
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
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-[7px] w-3 -translate-y-1/2" />
          </div>

          <label htmlFor={`${id}-weeks`} className={`${labelCls} mt-6`}>
            {labels.durationLabel}
          </label>
          <div className="relative mt-5 h-12">
            <div className="bg-linen absolute top-0 left-0 h-1.5 w-full" />
            <div className="bg-brown absolute top-0 left-0 h-1.5" style={{ width: at(weekIdx, weeks.length) }} />
            {weeks.map((n, i) => (
              <span key={n} className="absolute top-[10px] flex -translate-x-1/2 flex-col items-center" style={{ left: at(i, weeks.length) }}>
                <span className="h-2 w-px bg-black/20" />
                <span className="text-small font-medium text-black">{n}</span>
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
              className="calc-range absolute -top-[7px] left-0 h-5 w-full cursor-pointer"
            />
          </div>

          <p className={`${labelCls} mt-4`}>{labels.acceleratorsLabel}</p>
          <ul className="mt-3 flex flex-col gap-4">
            {labels.accelerators.map((a, i) => (
              <li key={a} className="flex items-center justify-between gap-4">
                <span className="text-body font-medium text-black">{a}</span>
                <Toggle on={accel[i]} label={a} onChange={(v) => setAccel((s) => s.map((x, j) => (j === i ? v : x)))} />
              </li>
            ))}
          </ul>
        </div>

        {/* Outputs */}
        <output htmlFor={`${id}-zone ${id}-weeks`} className="bg-cream text-espresso flex flex-col items-center px-5 py-6 text-center md:py-7">
          <p className="text-body font-medium">{labels.rateLabel}</p>
          <p className={`mt-2 ${bigCls}`}>{price == null ? consult : usd(price)}</p>
          {price != null && pricing.unitLabel && pricing.unitLabel !== "per session" && (
            <span className="text-espresso/60 text-[13px] leading-4">{pricing.unitLabel}</span>
          )}
          <p className="mt-5 text-body font-medium">{labels.discountLabel}</p>
          <p className={`mt-2 ${bigCls}`}>{discount}%</p>
          <span className="mt-4 block h-px w-full max-w-[340px] bg-black" />
          <p className="mt-5 text-body font-medium">{labels.totalLabel}</p>
          <p className={`mt-2 ${bigCls}`}>{total == null ? consult : total === 0 ? "$ 0.0" : usd(total)}</p>
        </output>
      </div>
      {/* Figma 239:1385 footnote. Price sources stay in src/data/pricing.ts and docs/, not on the page. */}
      <p className="text-espresso/70 mx-auto mt-6 max-w-[900px] text-center text-small">{labels.footnote?.replace(/^\*/, "")}</p>
    </div>
  );
}
