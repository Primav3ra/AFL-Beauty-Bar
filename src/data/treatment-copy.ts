// Obvious copy fixes applied on top of the verbatim Figma extraction (treatments.generated.json):
// - "Fequently asked questions" → "Frequently asked questions" (all 32 pages)
// - Hand Rejuvenation's headings say "Hair Rejuvenation"
// - The only written FAQ answer is lorem-ipsum filler ("Offending belonging promotion…") → left empty
// - FAQs come from Sanskriti's Figma comments (scripts/extract-faqs.mjs → faqs.generated.json). Where
//   none are written, AI-drafted FAQs from ./faqs.drafted.ts are used (Sclerotherapy, Men's Procedure; pending
//   owner review); otherwise only the design's real questions are kept and lorem-ipsum ones are dropped.
import { draftedFaqs } from "./faqs.drafted";
import faqs from "./faqs.generated.json";
import type { Treatment } from "./treatments";

const written = faqs as Record<string, { q: string; a: string }[]>;
const isFiller = (a: string | null) => !!a && /^Offending belonging/.test(a);
// The template's lorem-ipsum questions (they appear on every frame that wasn't filled in).
const LOREM_Q = [/^The expense windows/, /^Six curiosity day/, /^Produce say the ten/, /^Simple innate summer/, /^Outward clothes promise/];
const isLoremQ = (q: string) => LOREM_Q.some((r) => r.test(q));

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
        items:
          written[t.slug] ??
          draftedFaqs[t.slug] ??
          t.faq.items
            .filter((i) => !isLoremQ(i.q))
            .map((i) => ({ q: i.q.replace(/`$/, ""), a: isFiller(i.a) ? null : i.a })),
      },
    };
  });
}
