// Clinic details exactly as written in the Figma footer (701:2117).
export type Clinic = {
  id: "miami" | "atlanta" | "new-york" | "los-angeles";
  /** Footer label, e.g. "Miami:" without the colon. */
  label: string;
  /** Selector label, e.g. "Miami, FL" (the only one shown in the design is Miami). */
  short: string;
  address: string;
  phone: string;
};

export const clinics: Clinic[] = [
  {
    id: "miami",
    label: "Miami",
    short: "Miami, FL",
    address: "51-53 NE 24th Street STE 107 Miami, FL 33137",
    phone: "(786) 750-2355",
  },
  {
    id: "atlanta",
    label: "Atlanta",
    short: "Atlanta, GA",
    address: "3610 Piedmont Road NE Suite 200, Atlanta, GA 30305",
    phone: "(678) 822-6299",
  },
  {
    id: "new-york",
    label: "New York",
    short: "New York, NY",
    address: "65 West 36th Street Suite 10, New York, NY 10018",
    phone: "(718) 350-7305",
  },
  {
    id: "los-angeles",
    label: "Los Angeles",
    short: "Los Angeles, CA",
    address: "99 N La Cienega Blvd Ste. 301 Beverly Hills, CA 90211",
    phone: "(917) 993-4338",
  },
];

export const DEFAULT_CLINIC = clinics[0];

export const telHref = (phone: string) => `tel:+1${phone.replace(/\D/g, "")}`;
export const mapsHref = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`AFL Beauty Bar ${address}`)}`;
export const clinicById = (id: string | null | undefined) => clinics.find((c) => c.id === id);
