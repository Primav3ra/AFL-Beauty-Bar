// Category pages (Body, Facial Treatments, Wellness & Longevity, Signature). Layout + copy are generated from
// Figma by scripts/extract-categories.mjs; this file adds the owner's renames and the card → page wiring.
// Routes and keys stay as in Figma ("face-care" is shown as Facial Treatments, "other" as Wellness & Longevity).
import raw from "./categories.generated.json";
import { categoryMeta, type CategoryKey } from "./category-meta";
import { treatmentHref, type Run } from "./treatments";

export { categoryMeta, type CategoryKey };

type Box = { x: number; y: number; w: number; h: number };
export type Card = {
  nodeId: string;
  box: Box;
  image: string | null;
  gradientHeight: number | null;
  title: string | null;
  titleTop: number | null;
  titleLeft: number | null;
  items: string[];
};
export type Category = {
  frameId: string;
  hero: {
    nodeId: string;
    height: number;
    top: number;
    image: string | null;
    kicker: string | null;
    kickerTop: number;
    title: Run[];
    titleTop: number;
    titleSize: number;
    titleTracking: number;
    description: string | null;
    descriptionWidth: number | null;
    descriptionLineHeight: number | null;
    descriptionGap: number | null;
  };
  column: {
    eyebrow: string | null;
    title: string | null;
    titleWidth: number | null;
    text: string | null;
    textWidth: number | null;
    textLineHeight: number | null;
    x: number | null;
    eyebrowTop: number | null;
    titleTop: number | null;
    textTop: number | null;
  };
  grid: Box;
  cards: Card[];
  rules: number[];
  cta: {
    nodeId: string;
    top: number;
    height: number;
    image: string | null;
    kicker: string | null;
    title: string | null;
    button: string | null;
    contentTop: number;
  };
  footerTop: number;
};

// The one misspelled card label ("Biosimulators") is fixed at render time via displayLabel(), so LINKS
// below stays keyed by the original Figma label.
const LABEL_FIX: Record<string, string> = {
  Biosimulators: "Biostimulators",
  "PDO ThreadLIfts": "PDO Threadlifts",
  "Hydra facial": "HydraFacial",
  "Wellness & longevity": "Wellness & Longevity",
  "Laser Hair removal": "Laser Hair Removal",
  "Micro-needling": "Microneedling",
  "Facial balancing": "Facial Balancing",
  "Men’s procedures": "Men’s Procedures",
  Co2: "CO2 Laser",
  Pico: "Pico Laser",
};
/** Card / list label as displayed. */
export const displayLabel = (label: string) => LABEL_FIX[label] ?? label;

const generated = raw as unknown as Record<CategoryKey, Category>;

const face = generated["face-care"];
const other = generated.other;

export const categories: Record<CategoryKey, Category> = {
  ...generated,
  // Figma "Face Care": title, copy and cards as designed; only the label reads "Facial Treatments".
  "face-care": { ...face, hero: { ...face.hero, kicker: "Facial Treatments" } },
  other: {
    ...other,
    hero: {
      ...other.hero,
      kicker: "Wellness & Longevity",
      description:
        "Care that works from the inside out. Hormone balancing, IV nutrient therapy and metabolic support, planned around your labs, your goals and how you want to feel day to day.",
    },
    // "Section" is an unnamed placeholder card in the design.
    cards: other.cards.filter((c) => c.title !== "Section"),
  },
};

/**
 * Card / list label (verbatim from the design) → treatment detail page name, or a direct href.
 * `null` = no unambiguous target → rendered as a placeholder.
 */
const LINKS: Record<string, string | { href: string } | null> = {
  // Body
  "Body Contouring": null,
  "Non-Surgical BBL": "Non-surgical BBL",
  "Non-Surgical Breast Lift": "Non-Surgical Breast Lift",
  "Non-Surgical Male Pectoral Sculpting": "Non-Surgical Male Pectoral Sculpting",
  "Weight Loss": "Weight loss",
  "Hair Restoration": "Hair Restoration",
  "Hand Rejuvenation": "Hand Rejuvenation",
  "Vaginal Rejuvenation": "Vaginal Rejuvenation",
  "Slim Shots": "Slim Shots",
  Sclerotherapy: "Sclerotherapy",
  "Skin Tightening": "Skin Tightening",
  "Laser Hair removal": null,
  Co2: "CO2 Laser",
  Pico: "Pico Laser",
  "Tattoo Removal": "Tattoo Removal",
  // Facial Treatments (Figma "Face Care")
  "Chemical Peel": "Chemical Peel",
  "Hydra facial": "Hydra Facial",
  "Skin Boosters": "Skin Boosters",
  "Lip Fillers": "Lip Fillers",
  "Laser Treatments": "Laser Treatments",
  "PDO ThreadLIfts": "PDO Threadlifts",
  Neurotoxins: "Neurotoxins",
  "Micro-needling": "Microneedling",
  "Men’s procedures": "Men's Procedure",
  "Facial balancing": "Facial Balancing",
  Biosimulators: "Biostimulators",
  // Wellness & Longevity (Figma "Other")
  "Testosterone Replacement Therapy": "Testosterone Replacement Therapy",
  "Hormone Replacement Therapy": "Hormone Replacement Therapy",
  "IV Therapy": "IV Therapy",
  Section: null,
  "Metabolic Reset": "Metabolic Reset",
  "Anti Aging and Longevity": "Anti Aging and Longevity",
  // Signature
  "Salmon DNA Facial": "Salmon DNA Facial",
  "Wellness & longevity": { href: categoryMeta.other.href },
  "Non-Invasive BBL": "Non-Invasive BBL",
};

/** Resolves a label to a detail href, or null for placeholders. Throws on unmapped labels (build-time check). */
export function categoryLinkFor(label: string): string | null {
  if (!(label in LINKS))
    throw new Error(
      `Unmapped category label "${label}" — add it to LINKS in src/data/categories.ts`,
    );
  const target = LINKS[label];
  if (!target) return null;
  return typeof target === "string" ? treatmentHref(target) : target.href;
}

/** Category a treatment detail page belongs to (first category page that lists it). */
export function categoryOfTreatment(name: string): CategoryKey | null {
  for (const key of ["face-care", "other", "body", "signature"] as CategoryKey[]) {
    const c = categories[key];
    const labels = c.cards.flatMap((card) => [card.title ?? "", ...card.items]);
    if (labels.some((l) => typeof LINKS[l] === "string" && LINKS[l] === name)) return key;
  }
  return null;
}
