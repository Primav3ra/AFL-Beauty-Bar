// Academy glyphs redrawn to match the Figma vectors (the local cache has no vector geometry).
type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/** 1-on-1 Mentorship: seated figure (436:1015). */
export const Mentor = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="14.5" cy="6" r="3" />
    <path d="M7.5 3C5.8 5.4 5.2 8.6 6 12l1.2 5.2h10.3a2.4 2.4 0 0 0 0-4.8H11.5" />
    <path d="M3.5 21.5h17" strokeWidth={2.4} strokeLinecap="butt" />
  </svg>
);

/** Supplier & Vendor Access: storefront (436:1034). */
export const Storefront = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 4h16l1 5a2.25 2.25 0 0 1-4.5.4 2.25 2.25 0 0 1-4.5 0 2.25 2.25 0 0 1-4.5 0A2.25 2.25 0 0 1 3 9Z" />
    <path d="M8 4v5.4M12 4v5.4M16 4v5.4" />
    <path d="M4.5 11v8.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V11" />
  </svg>
);

/** Turnkey Legal Assets: rosette (436:1040). */
export const Rosette = ({ className }: P) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="9" r="6.5" />
    <circle cx="12" cy="9" r="2.4" fill="currentColor" stroke="none" />
    <path d="M8.5 14.6V22l3.5-2.2 3.5 2.2v-7.4" />
  </svg>
);

/** Growth & Marketing Playbook: bars + rising arrow (436:1037). */
export const Growth = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4 17V10M8 13V6M12 12V2.5" strokeLinecap="butt" />
    <path d="m3 21.5 5-5.5 3.5 3.5L19.5 11" />
    <path d="M15 11h4.5v4.5" />
  </svg>
);

/** Full-Scale Launch Roadmap: rocket (436:1043). */
export const Rocket = ({ className }: P) => (
  <svg {...base} className={className}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    <circle cx="16" cy="8" r="1" fill="currentColor" />
  </svg>
);

/** Medical Compliance: medical case (701:2590). */
export const MedicalCase = ({ className }: P) => (
  <svg {...base} className={className}>
    <rect x="2.5" y="7" width="19" height="14" rx="1" />
    <path d="M8.5 7V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v3" />
    <path d="M12 10.5v7M8.5 14h7" />
  </svg>
);

/** "Claim Your Mentorship" crown (436:1008). */
export const Crown = ({ className }: P) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="M4 16 2.5 7.5l5 3.5L12 4.5l4.5 6.5 5-3.5L20 16Z" />
    <path d="M4.5 20h15" />
  </svg>
);

/** "Start Your Application" document (445:1182). */
export const Doc = ({ className }: P) => (
  <svg {...base} strokeWidth={1.8} className={className}>
    <path d="M14 2.5H7a1.5 1.5 0 0 0-1.5 1.5v16A1.5 1.5 0 0 0 7 21.5h10a1.5 1.5 0 0 0 1.5-1.5V7Z" />
    <path d="M14 2.5V7h4.5" />
    <path d="M9 13h6M9 17h4" />
  </svg>
);
