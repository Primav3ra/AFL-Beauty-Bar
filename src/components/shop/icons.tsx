// Shop-only glyphs redrawn from the Figma vectors in 480:1955 (no SVG export available).
type P = { className?: string };

/** Five-point star (Figma STAR, 16.9px). */
export const StarSolid = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path d="m12 1.2 3.2 7.1 7.7.6-5.9 5.1 1.8 7.6L12 17.5l-6.8 4.1L7 14l-5.9-5.1 7.7-.6L12 1.2Z" fill="currentColor" />
  </svg>
);

/** Outline bookmark (Figma 483:2283, 14×18 in a 24px frame). */
export const BookmarkOutline = ({ className }: P) => (
  <svg viewBox="0 0 14 18" fill="none" className={className} aria-hidden>
    <path d="M1 1h12v15.6l-6-4.4-6 4.4V1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

/** Cart with a plus (Figma 483:2293, 20.7×21). */
export const CartPlus = ({ className }: P) => (
  <svg viewBox="0 0 21 21" fill="none" className={className} aria-hidden>
    <path d="M1 2h2.6l2.3 10.6h10.4L19 5.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6.6 15.6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M11.2 1.2v6.4M8 4.4h6.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="7.6" cy="19" r="1.6" fill="currentColor" />
    <circle cx="15.6" cy="19" r="1.6" fill="currentColor" />
  </svg>
);

export const Pin = ({ className }: P) => (
  <svg viewBox="0 0 16 20" fill="none" className={className} aria-hidden>
    <path d="M8 19s-6.6-6.1-6.6-11A6.6 6.6 0 0 1 8 1.4 6.6 6.6 0 0 1 14.6 8c0 4.9-6.6 11-6.6 11Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="8" cy="8" r="2.3" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const Phone = ({ className }: P) => (
  <svg viewBox="0 0 18 18" fill="none" className={className} aria-hidden>
    <path
      d="M5.9 1.2 3.4 1.1C2 1.2.9 2.5 1.1 3.9c.8 6.6 6.3 12.1 12.9 12.9 1.4.2 2.7-.9 2.8-2.3v-2.5c0-.6-.4-1.1-1-1.3l-2.6-.8c-.5-.1-1 0-1.3.4l-1.2 1.2A11 11 0 0 1 6.5 7.3l1.2-1.2c.4-.4.5-.9.4-1.3l-.8-2.6c-.2-.6-.8-1-1.4-1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  </svg>
);

export const Briefcase = ({ className }: P) => (
  <svg viewBox="0 0 20 19" fill="none" className={className} aria-hidden>
    <rect x="1" y="5" width="18" height="13" rx="1.2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6.5 5V2.2c0-.6.5-1 1-1h5c.6 0 1 .4 1 1V5M6.5 5v13M13.5 5v13" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

export const Chevron = ({ className }: P) => (
  <svg viewBox="0 0 12 8" fill="none" className={className} aria-hidden>
    <path d="m1 1 5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
