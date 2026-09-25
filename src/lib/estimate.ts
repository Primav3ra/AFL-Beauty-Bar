// Price-calculator maths (pure, no React). Inputs: researched pricing, the selected zone, protocol weeks and
// the two accelerator toggles. See docs/PRICING_SOURCES.md for the rules and src/config/pricing-policy.ts
// for the owner-confirmable assumptions.
import { WEEKS_PER_MONTH, discountFor } from "@/config/pricing-policy";
import type { AddOn, Pricing } from "@/data/pricing";

export type Estimate = {
  /** Rate shown under "Standard per session rate"; null → "Price on consultation". */
  rate: number | null;
  discount: number;
  /** null → "Price on consultation"; 0 → nothing selected yet ("$ 0.0" as designed). */
  total: number | null;
  /** How the total was worked out, shown under the calculator. */
  notes: string[];
  addOnSources: { label: string; source: AddOn["source"] }[];
};

const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
const num = (s: string) => Number(s.replace(/,/g, ""));
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

/** A zone can carry its own researched price: "Light (superficial) $230" or "Frown lines: …, $180 to $375". */
function zonePrice(zone: string): { usd: number; range: boolean } | null {
  const range = /\$([\d,]+)\s*to\s*\$([\d,]+)/.exec(zone);
  if (range) return { usd: (num(range[1]) + num(range[2])) / 2, range: true };
  const single = /^[^$]*\$([\d,]+)[^$]*$/.exec(zone);
  return single ? { usd: num(single[1]), range: false } : null;
}

export function estimate(
  p: Pricing,
  zone: string,
  weeks: number,
  on: { lymphatic: boolean; rf: boolean },
): Estimate {
  const zp = zone ? zonePrice(zone) : null;
  const rate = zp?.usd ?? p.priceUSD;
  const notes: string[] = [];
  const addOnSources: Estimate["addOnSources"] = [];
  if (rate == null) return { rate, discount: 0, total: null, notes, addOnSources };

  // Visits = how many times the client comes in over the protocol (drives the massage add-on too).
  let visits = 1;
  let base = rate;
  if (p.unit === "session") {
    visits = p.repeatEveryWeeks ? 1 + Math.floor((weeks - 1) / p.repeatEveryWeeks) : 1;
    base = rate * visits;
    notes.push(
      p.repeatEveryWeeks
        ? `${plural(visits, "session")} over ${plural(weeks, "week")} (one every ${plural(p.repeatEveryWeeks, "week")}) × ${money(rate)}.`
        : `Single treatment (${money(rate)} ${p.unitLabel ?? "per session"}); a longer protocol doesn't add sessions.`,
    );
  } else if (p.unit === "month") {
    visits = Math.ceil(weeks / WEEKS_PER_MONTH);
    base = rate * visits;
    notes.push(`${plural(visits, "month")} × ${money(rate)} per month.`);
  } else {
    const vials =
      p.unitLabel === "per vial" ? Number(/\((\d+)\s*vials?\)/i.exec(zone)?.[1] ?? 0) : 0;
    const ml = p.packageSyringes ? Number(/\((\d+)\s*mL\)/i.exec(zone)?.[1] ?? 0) : 0;
    if (vials) {
      base = rate * vials;
      notes.push(`${vials} vials × ${money(rate)} per vial, one-time.`);
    } else if (ml && p.packageSyringes) {
      const extra = Math.max(0, ml - p.packageSyringes.included);
      base = rate + extra * p.packageSyringes.extraUSD;
      notes.push(
        `${money(rate)} package (${p.packageSyringes.included} syringes)` +
          (extra ? ` + ${extra} extra × ${money(p.packageSyringes.extraUSD)}` : "") +
          ", one-time.",
      );
    } else
      notes.push(
        `One-time price (${p.unitLabel ?? "per treatment"}); the protocol duration doesn't change it.`,
      );
  }
  if (zone && zp?.range) notes.push("Area price is the midpoint of the published range.");
  else if (zone && !zp && !/\(\d+\s*(vials?|mL)\)/i.test(zone))
    notes.push(
      "The published price is an average for this treatment, so every area shows the same rate; area pricing is confirmed at consultation.",
    );

  const discount = p.unit === "session" ? discountFor(visits) : 0;
  let addOns = 0;
  const { lymphatic, rf } = p.addOns;
  if (on.lymphatic && lymphatic) {
    addOns += lymphatic.usd * visits;
    notes.push(`Lymphatic massage: ${plural(visits, "session")} × ${money(lymphatic.usd)}.`);
    addOnSources.push({ label: "lymphatic massage", source: lymphatic.source });
  }
  if (on.rf && rf) {
    addOns += rf.usd;
    notes.push(
      `RF skin tightening: ${money(rf.usd)}, once per protocol (published average for non-invasive skin tightening).`,
    );
    addOnSources.push({ label: "RF skin tightening", source: rf.source });
  }

  const total = zone ? base * (1 - discount / 100) + addOns : 0;
  return {
    rate,
    discount,
    total,
    notes: zone ? notes : [],
    addOnSources: zone ? addOnSources : [],
  };
}
