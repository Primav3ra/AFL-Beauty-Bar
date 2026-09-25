import "server-only";
// Best available photo per treatment, gathered from every place the design shows one: the detail-page
// hero, the category card, and the landing-page tiles. Most detail frames have no hero photo, so this
// lets cards and heroes use the treatment's own imagery instead of an empty black box.
import type { ImageRef } from "@/components/FigmaImage";
import { refOf } from "@/lib/figma";
import { categories, categoryLinkFor } from "./categories";
import { treatments } from "./treatments";

// Landing page (12:1078) goal tiles and featured cards, by treatment name.
const LANDING: [string, string][] = [
  ["Neurotoxins", "951:4390"],
  ["Facial Balancing", "90:1232"],
  ["Microneedling", "951:4387"],
  ["Non-surgical BBL", "955:4408"],
  ["IV Therapy", "951:4394"],
  ["Salmon DNA Facial", "90:1247"],
];

const byHref = new Map<string, ImageRef>();
const byName = new Map<string, ImageRef>();

for (const t of treatments) if (t.hero.image) byName.set(t.name, t.hero.image.ref);
for (const c of Object.values(categories))
  for (const card of c.cards) {
    if (!card.image || !card.title) continue;
    const href = categoryLinkFor(card.title);
    if (href && !byHref.has(href)) byHref.set(href, refOf(card.image));
  }
for (const [name, node] of LANDING) if (!byName.has(name)) byName.set(name, refOf(node));

/** Photo for a treatment detail page (by canonical name). */
export function treatmentImage(name: string): ImageRef | null {
  const t = treatments.find((x) => x.name === name);
  return byName.get(name) ?? (t ? byHref.get(`/treatments/${t.slug}`) : undefined) ?? null;
}

/** Photo for a category card: its own design image, else the photo of the treatment it links to. */
export function cardImage(card: { image: string | null; title: string | null }): ImageRef | null {
  if (card.image) return refOf(card.image);
  const href = card.title ? categoryLinkFor(card.title) : null;
  const t = href ? treatments.find((x) => `/treatments/${x.slug}` === href) : undefined;
  return t ? treatmentImage(t.name) : null;
}
