// Single swap point for every external / integration URL.
// Old-site URLs verified against https://aflbeautybar.com on 2026-09-25.
export const links = {
  // TODO integrate MyAestheticsPro (current live: https://web2.myaestheticspro.com/BN/index.cfm?0A342B84DA245EBD2DB52E6754C0065D)
  booking: "/book",
  virtualConsult: "/book?type=virtual",
  // Old WooCommerce store, pending the WooCommerce vs Shopify decision.
  shop: "https://aflbeautybar.com/shop/",
  cart: "https://aflbeautybar.com/cart/",
  // Linked from the old site's nav; the "alf" subdomain spelling is theirs.
  giftCards: "https://alfbeautybar.repeatmd.app/gift-cards/purchase",
  acneTherapy: "https://aflbeautybar.com/acne-therapy/",
  googleReviews:
    "https://www.google.com/search?q=afl+beauty+bar#lrd=0x89c25f64e2136e31:0x2a9190f6a8c3a50a,1,,,,",
} as const;

export type LinkKey = keyof typeof links;

/** Booking URL prefilled with treatment / clinic where known. */
export function bookingHref(opts: { treatment?: string; clinic?: string; type?: "virtual" } = {}) {
  const base = opts.type === "virtual" ? links.virtualConsult : links.booking;
  const [path, existing] = base.split("?");
  const q = new URLSearchParams(existing);
  if (opts.treatment) q.set("treatment", opts.treatment);
  if (opts.clinic) q.set("clinic", opts.clinic);
  const s = q.toString();
  return s ? `${path}?${s}` : path;
}
