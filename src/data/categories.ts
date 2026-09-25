// Category pages (Body, Face Care, Other, Signature). Layout + copy are generated verbatim from Figma
// by scripts/extract-categories.mjs; this file adds the card → detail-page wiring (BUILD_PLAN §4).
import raw from "./categories.generated.json";
import { treatmentHref, type Run } from "./treatments";

export type CategoryKey = "body" | "face-care" | "other" | "signature";

type Box = { x: number; y: number; w: number; h: number };
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
  cards: {
    nodeId: string;
    box: Box;
    image: string | null;
    gradientHeight: number | null;
    title: string | null;
    titleTop: number | null;
    titleLeft: number | null;
    items: string[];
  }[];
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
const LABEL_FIX: Record<string, string> = { Biosimulators: "Biostimulators" };
/** Card / list label as displayed. */
export const displayLabel = (label: string) => LABEL_FIX[label] ?? label;

export const categories = raw as unknown as Record<CategoryKey, Category>;

/**
 * Card / list label (verbatim from the design) → treatment detail page name.
 * `null` = no unambiguous target → rendered as a placeholder.
 */
const LINKS: Record<string, string | null> = {
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
  // Face Care
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
  // Other
  "Testosterone Replacement Therapy": "Testosterone Replacement Therapy",
  "Hormone Replacement Therapy": "Hormone Replacement Therapy",
  "IV Therapy": "IV Therapy",
  Section: null,
  "Metabolic Reset": "Metabolic Reset",
  "Anti Aging and Longevity": "Anti Aging and Longevity",
  // Signature
  "Salmon DNA Facial": "Salmon DNA Facial",
  "Wellness & longevity": null,
  "Non-Invasive BBL": "Non-Invasive BBL",
};

/** Resolves a label to a detail href, or null for placeholders. Throws on unmapped labels (build-time check). */
export function categoryLinkFor(label: string): string | null {
  if (!(label in LINKS))
    throw new Error(
      `Unmapped category label "${label}" — add it to LINKS in src/data/categories.ts`,
    );
  const name = LINKS[label];
  return name ? treatmentHref(name) : null;
}
