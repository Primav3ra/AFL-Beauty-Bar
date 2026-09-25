import "server-only";
import type { LocationSlide } from "@/components/about/LocationsCarousel";
import { clinics } from "@/data/clinics";
import { refOf } from "./figma";

/**
 * One slide per clinic for the location card (About + Shop). Only Miami is designed (455:1323), with its
 * storefront photo and address copy; the other clinics use their data and the owner's office photos.
 */
export function locationSlides(): LocationSlide[] {
  return clinics.map((c) =>
    c.id === "miami"
      ? { id: c.id, title: "Miami, FL | Main Office", address: "51-53 NE 24th St Suite 107 Miami FL 33137", mapsAddress: c.address, phone: "786-750-2355", photoRef: refOf("556:91"), photoAlt: "AFL Beauty Bar sign on the Miami clinic" }
      : { id: c.id, title: c.short, address: c.address, mapsAddress: c.address, phone: c.phone, photoUrl: c.photo?.src, photoAlt: c.photo?.alt ?? "" },
  );
}
