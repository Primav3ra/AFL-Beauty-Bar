import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book Appointment" };

// Booking swap point: every booking CTA lands here via links.booking / links.virtualConsult
// (?treatment=&clinic=&type=), see src/config/links.ts. Not in the Figma file, so intentionally empty
// until the MyAestheticsPro integration replaces it (or links.booking points straight at it).
export default function Page() {
  return null;
}
