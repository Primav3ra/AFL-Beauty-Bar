// About-page glyphs, redrawn from the Figma render (vector geometry isn't in the local cache).
type P = { className?: string };

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinejoin: "round", strokeLinecap: "round" } as const;

/** Brand Genesis — crowned tower (Figma 455:1278, 35.5px frame). */
export const TowerIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <path d="M8.5 3.8 10.8 9h13.6l2.4-5.2-4.4 2.4-4.9-3-4.9 3Z" {...line} />
    <path d="M11 9v16M24.3 9v16M6 16.6h22.6" {...line} strokeLinecap="butt" />
    <rect x="5.2" y="25" width="24.9" height="6.2" {...line} />
  </svg>
);

const badge = (() => {
  const cx = 17.4, cy = 16.8, pts: string[] = [];
  for (let i = 0; i < 20; i++) {
    const a = ((i * 18 - 90 + 18) * Math.PI) / 180;
    const r = i % 2 === 0 ? 14 : 11.3;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
})();

/** Celebrity Trust — scalloped badge with check (455:1282). */
export const BadgeCheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <path d={badge} {...line} />
    <path d="m11.8 17 4.3 3.8 6.9-7.5" {...line} />
  </svg>
);

/** Clinical Specialty — ID badge with medical cross (466:1846). */
export const IdBadgeIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <path d="M14.2 11.6H5.1v18.8h25.6V11.6h-9.6" {...line} strokeLinecap="butt" strokeLinejoin="miter" />
    <rect x="14.3" y="4" width="6.8" height="11" rx="3.2" {...line} />
    <path d="M12 17.6v8M8 21.6h8M18.8 19.9h8.6M18.8 23.9h5.2" {...line} strokeLinecap="butt" />
  </svg>
);

/** Pre-Med Precision — test tube with magnifier (464:1819). */
export const TubeSearchIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <rect x="1.2" y="2.8" width="21.2" height="6" rx="1" {...line} />
    <path d="M4.3 8.8v18.7c0 2.8 2 4.9 4.8 4.9h6.5M17 8.8v7.1h-5.4" {...line} />
    <path d="M12.1 23.9h1.6" {...line} strokeWidth={2.6} strokeLinecap="butt" />
    <circle cx="23.9" cy="25.1" r="4.9" {...line} />
    <path d="m27.6 28.8 5.3 4.8" {...line} />
  </svg>
);

/** Operational Leadership — bar chart (464:1823). */
export const BarsIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <path d="M3.9 30.3V15h8.8v15.3M12.7 30.3V5.8h9.2v24.5M21.9 30.3V18h9.4v12.3M3 30.3h29.2" {...line} strokeWidth={2.6} strokeLinejoin="miter" strokeLinecap="butt" />
  </svg>
);

/** Clinical Advancement — document with person (472:1869). */
export const DocPersonIcon = ({ className }: P) => (
  <svg viewBox="0 0 36 36" className={className} aria-hidden>
    <path d="M12.6 29.7H8c-1.2 0-2.2-1-2.2-2.2V8.2C5.8 7 6.8 6 8 6h19.6c1.2 0 2.2 1 2.2 2.2v5.6" {...line} />
    <path d="M10.4 12.4h13.4M10.4 17.9h6.8M10.4 23.4h5.6" {...line} />
    <circle cx="24.7" cy="19.3" r="3" {...line} />
    <path d="M17.6 33v-2.6c0-2 1.6-3.6 3.6-3.6h7c2 0 3.6 1.6 3.6 3.6V33Z" {...line} />
  </svg>
);

/** Crown on the "Book Your Consultation →" buttons (455:1303, 24px). */
export const CrownIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="m2.6 6.6 3 9.6h13.1l2-9.6-4.2 3.4-4.4-7.4-4.6 7.4Z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M5.6 20h13.1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M12 21c-3.2-3.6-7-7.4-7-11.4a7 7 0 0 1 14 0c0 4-3.8 7.8-7 11.4Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="9.6" r="1.7" fill="currentColor" />
  </svg>
);

export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
  </svg>
);

export const BriefcaseIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <rect x="2.4" y="6.4" width="19.2" height="13.8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 6.4v13.8M17.9 6.4v13.8M8.5 6.4V2.4h6.2v4" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

/** Inter renders "-->" as a long arrow; this matches it where the glyph is drawn separately. */
export const LongArrow = ({ className }: P) => (
  <svg viewBox="0 0 20 12" className={className} aria-hidden>
    <path d="M1 6h17M13.5 1.5 18 6l-4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
