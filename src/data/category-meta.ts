// Public route + menu name of each category page (kept separate from categories.ts so client components
// like the Treatments menu don't bundle the generated category data).
export type CategoryKey = "body" | "face-care" | "other" | "signature";

export const categoryMeta: Record<CategoryKey, { href: string; name: string }> = {
  body: { href: "/treatments/body", name: "Body" },
  "face-care": { href: "/treatments/face-care", name: "Facial Treatments" },
  other: { href: "/treatments/other", name: "Wellness & Longevity" },
  signature: { href: "/treatments/signature", name: "Fatema’s Signature Treatments" },
};
