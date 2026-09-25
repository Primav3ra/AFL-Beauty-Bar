// Obvious copy fixes applied on top of the verbatim Figma extraction (treatments.generated.json):
// - "Fequently asked questions" → "Frequently asked questions" (all 32 pages)
// - Hand Rejuvenation's headings say "Hair Rejuvenation"
// - The only written FAQ answer is lorem-ipsum filler ("Offending belonging promotion…") → left empty
import type { Treatment } from "./treatments";

const isFiller = (a: string | null) => !!a && /^Offending belonging/.test(a);

export function applyCopyFixes(list: Treatment[]): Treatment[] {
  return list.map((t) => {
    const hand = (s: string | null) =>
      t.slug === "hand-rejuvenation"
        ? (s?.replace("Hair Rejuvenation", "Hand Rejuvenation") ?? null)
        : s;
    return {
      ...t,
      outcomes: { ...t.outcomes, title: hand(t.outcomes.title) },
      why: { ...t.why, title: hand(t.why.title) },
      faq: {
        ...t.faq,
        title: t.faq.title?.replace("Fequently", "Frequently") ?? null,
        items: t.faq.items.map((i) => ({ ...i, a: isFiller(i.a) ? null : i.a })),
      },
    };
  });
}
