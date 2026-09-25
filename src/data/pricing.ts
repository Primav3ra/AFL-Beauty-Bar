// Researched per-treatment pricing (docs/PRICING_RESEARCH.json, retrieved 2026-09-25).
// Never invent numbers: a null price renders "Price on consultation". See docs/PRICING_SOURCES.md.
import research from "../../docs/PRICING_RESEARCH.json";
import { REPEAT_EVERY_WEEKS } from "@/config/pricing-policy";

type Raw = {
  treatment: string;
  perSessionUSD: number | null;
  priceNote: string | null;
  unit: string | null;
  typicalSessions: number | null;
  typicalSessionsText: string | null;
  zones: string[] | null;
  lymphaticMassageUSD: number | null;
  lymphaticMassageSource: { name: string; url: string } | null;
  sourceName: string | null;
  sourceUrl: string | null;
  retrievedOn: string;
  sourceType: "afl" | "published-average";
};

type Source = { name: string | null; url: string | null };
export type AddOn = { usd: number; source: Source; per: "visit" | "protocol" };

export type Pricing = {
  /** Price per `unit`; null → "Price on consultation". */
  priceUSD: number | null;
  /** session = per session or per procedure (repeats per REPEAT_EVERY_WEEKS); one-time = per vial/syringe/package. */
  unit: "session" | "month" | "one-time";
  /** Weeks between sessions for `session` units; null = single treatment. */
  repeatEveryWeeks: number | null;
  /** Package priced for N syringes with extras at a fixed price (from the source's price text). */
  packageSyringes: { included: number; extraUSD: number } | null;
  /** Researched prices for the design's two accelerators (Figma 274:1564). */
  addOns: { lymphatic: AddOn | null; rf: AddOn | null };
  /** Human unit shown under the rate, e.g. "per vial". */
  unitLabel: string | null;
  priceNote: string | null;
  zones: string[];
  lymphaticMassageUSD: number | null;
  sourceName: string | null;
  sourceUrl: string | null;
  retrievedOn: string;
  sourceType: "afl" | "published-average";
};

const UNIT_LABEL: Record<string, string> = {
  session: "per session",
  month: "per month",
  procedure: "per procedure",
  vial: "per vial",
  syringe: "per syringe",
  package: "per package",
  unit: "per unit",
};

// The calculator's designed zone list (Figma 274:1550), used when research found no AFL service variants.
export const DESIGN_ZONES = [
  "Abdomen (Upper & Lower)",
  "Flanks (Love Handles)",
  " Inner Thighs",
  "Outer Thighs",
  "Submental (Under Chin)",
];

const byName = new Map((research as Raw[]).map((r) => [r.treatment, r]));

// A lymphatic massage costs the same whichever treatment it follows, so the one sourced price applies to all.
const massage = (research as Raw[]).find((r) => r.lymphaticMassageUSD != null);
const LYMPHATIC: AddOn | null = massage
  ? {
      usd: massage.lymphaticMassageUSD!,
      source: {
        name: massage.lymphaticMassageSource?.name ?? null,
        url: massage.lymphaticMassageSource?.url ?? null,
      },
      per: "visit",
    }
  : null;
// "Targeted RF Skin Tightening" has no add-on price anywhere; the researched Skin Tightening procedure price
// (non-invasive RF/ultrasound tightening) is used once per protocol.
const tight = byName.get("Skin Tightening");
const RF: AddOn | null =
  tight?.perSessionUSD != null
    ? {
        usd: tight.perSessionUSD,
        source: { name: tight.sourceName, url: tight.sourceUrl },
        per: "protocol",
      }
    : null;

export function pricingFor(treatmentName: string): Pricing {
  const r = byName.get(treatmentName);
  if (!r) throw new Error(`No pricing research row for "${treatmentName}"`);
  const unit =
    r.unit === "session" || r.unit === "procedure"
      ? "session"
      : r.unit === "month"
        ? "month"
        : "one-time";
  const pkg = /includes (\d+) syringes.*?additional syringes at \$([\d,]+)/i.exec(
    r.priceNote ?? "",
  );
  // Research zones sometimes include descriptive rows ("AFL menu: …") — keep only short option-like names.
  const zones = (r.zones ?? []).filter((z) => z.length <= 60 && !/^AFL menu:/i.test(z));
  return {
    priceUSD: r.perSessionUSD,
    unit,
    repeatEveryWeeks: REPEAT_EVERY_WEEKS[treatmentName]?.weeks ?? null,
    packageSyringes: pkg
      ? { included: Number(pkg[1]), extraUSD: Number(pkg[2].replace(/,/g, "")) }
      : null,
    addOns: { lymphatic: LYMPHATIC, rf: RF },
    unitLabel: r.unit ? (UNIT_LABEL[r.unit] ?? `per ${r.unit}`) : null,
    priceNote: r.priceNote,
    zones: zones.length ? zones : DESIGN_ZONES,
    lymphaticMassageUSD: LYMPHATIC?.usd ?? null,
    sourceName: r.sourceName,
    sourceUrl: r.sourceUrl,
    retrievedOn: r.retrievedOn,
    sourceType: r.sourceType,
  };
}
