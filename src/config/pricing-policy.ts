// ⚠️ AFL BUSINESS POLICY — NOT RESEARCHED DATA. Owner must confirm before launch.
//
// AFL publishes no package discount anywhere (checked all aflbeautybar.com pages, WooCommerce and the
// AestheticsPro booking menu on 2026-09-25). The only discounts are membership perks (see /membership).
// Until the owner provides tiers, the calculator applies 0% and shows "Package Discount Applied 0%".
//
// Example shape once confirmed: [{ minSessions: 4, percent: 10 }, { minSessions: 8, percent: 15 }]
export const PACKAGE_DISCOUNT_TIERS: { minSessions: number; percent: number }[] = [];

export const WEEKS_PER_MONTH = 4;

/**
 * How often a session/procedure-priced treatment repeats, in weeks. The calculator counts one session at
 * week 1, then one every N weeks within the chosen protocol duration (e.g. every 4 weeks over 14 weeks = 4).
 * `null` = a single treatment (duration doesn't add sessions). Treatments priced per month, vial, syringe or
 * package aren't listed here.
 *
 * "source" entries follow the guidance quoted in docs/PRICING_RESEARCH.json (typicalSessionsText);
 * "assumption" entries are common practice and must be confirmed by the owner.
 */
export const REPEAT_EVERY_WEEKS: Record<
  string,
  { weeks: number | null; basis: "source" | "assumption" }
> = {
  "Non-Surgical Breast Lift": { weeks: null, basis: "assumption" },
  Sclerotherapy: { weeks: 4, basis: "source" }, // "spaced 3 to 4 weeks apart"
  Microneedling: { weeks: 4, basis: "source" }, // "every four to six weeks"
  "Vaginal Rejuvenation": { weeks: 4, basis: "assumption" },
  "Laser Treatments": { weeks: 4, basis: "assumption" }, // source: "spaced several weeks apart"
  "Hair Restoration": { weeks: 4, basis: "assumption" },
  "Skin Tightening": { weeks: 4, basis: "assumption" },
  Biostimulators: { weeks: 6, basis: "assumption" },
  "Hydra Facial": { weeks: 4, basis: "assumption" },
  "PDO Threadlifts": { weeks: null, basis: "assumption" },
  "Salmon DNA Facial": { weeks: 4, basis: "assumption" },
  "IV Therapy": { weeks: 1, basis: "assumption" },
  "CO2 Laser": { weeks: null, basis: "assumption" },
  Neurotoxins: { weeks: 12, basis: "source" }, // "results typically last three to four months"
  "Chemical Peel": { weeks: 4, basis: "assumption" }, // source: "3-6 sessions" for mild peels
  "Lip Fillers": { weeks: null, basis: "assumption" },
  "Pico Laser": { weeks: 4, basis: "assumption" },
  "Skin Boosters": { weeks: 4, basis: "assumption" },
  "Tattoo Removal": { weeks: 6, basis: "source" }, // "a six-week interval between each removal treatment"
};

export function discountFor(sessions: number) {
  return PACKAGE_DISCOUNT_TIERS.filter((t) => sessions >= t.minSessions).reduce(
    (best, t) => Math.max(best, t.percent),
    0,
  );
}
