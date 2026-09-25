// Typed access to the 32 treatment detail pages.
// Content is generated verbatim from Figma by scripts/extract-treatments.mjs — edit the design, then re-run.
// Copy fixes (placeholder/duplicated template text, typos) are applied by ./treatment-copy.ts.
import raw from "./treatments.generated.json";
import { applyCopyFixes } from "./treatment-copy";
import type { ImageRef, Placement } from "@/components/FigmaImage";

export type Run = { text: string; accent: boolean };
export type Img = { ref: ImageRef; place: Placement } | null;

export type Treatment = {
  frameId: string;
  slug: string;
  name: string;
  heroTitle: string;
  category: string | null;
  hero: { kicker: string | null; title: Run[]; subtitle: string | null; primaryCta: string | null; secondaryCta: string | null; image: Img };
  process: { kicker: string | null; title: string | null; description: string | null; slides: { number: string | null; title: string | null; image: Img }[] };
  outcomes: {
    kicker: string | null; title: string | null; subtitle: string | null; caseTitle: string | null;
    facts: { label: string; value: string; width: number }[]; before: string; after: string; images: Img[];
  };
  why: { title: string | null; subtitle: string | null; cards: { title: string | null; description: string | null; descriptionWidth: number; link: string | null; image: Img }[] };
  calc: {
    kicker: string | null; title: string | null; subtitle: string | null; zonesLabel: string | null; zonesPlaceholder: string | null;
    durationLabel: string | null; weeks: number[]; acceleratorsLabel: string | null; accelerators: string[];
    rateLabel: string | null; discountLabel: string | null; totalLabel: string | null; footnote: string | null;
  };
  family: { kicker: string | null; title: string | null; text: string | null; cta: string | null; image: Img };
  faq: { title: string | null; image: Img; items: { q: string; a: string | null }[] };
};

export const treatments = applyCopyFixes(raw as unknown as Treatment[]);

export const treatmentBySlug = (slug: string) => treatments.find((t) => t.slug === slug);

/** href for a treatment detail page by its canonical name; throws at build time on typos. */
export function treatmentHref(name: string) {
  const t = treatments.find((x) => x.name === name);
  if (!t) throw new Error(`No treatment named "${name}"`);
  return `/treatments/${t.slug}`;
}
