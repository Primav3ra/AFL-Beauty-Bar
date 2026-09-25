// Simple glyphs redrawn to match the Figma vectors (SVG export was unavailable: Figma
// rate-limited the render endpoint on the Starter plan).
type P = { className?: string };

export const ChevronDown = ({ className }: P) => (
  <svg viewBox="0 0 14 8" fill="none" className={className} aria-hidden>
    <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Globe = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="9.2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M2.8 12h18.4M12 2.8c2.6 2.6 3.8 5.7 3.8 9.2s-1.2 6.6-3.8 9.2c-2.6-2.6-3.8-5.7-3.8-9.2S9.4 5.4 12 2.8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const GlobeSolid = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <circle cx="12" cy="12" r="10" fill="currentColor" />
    <path d="M7 5.5c1.6.4 2.2 1.6 1.6 2.8-.5 1-1.9 1-2.2 2.2-.3 1.3 1.2 1.7 1.3 3 .1 1.1-.9 1.8-.6 3 .2.8 1 1.2 1.4 1.9A8.2 8.2 0 0 1 5 7.2c.6-.7 1.3-1.3 2-1.7Zm7.6-1.2c-.4.9-1.4 1.1-1.5 2.2-.1 1.2 1.4 1.5 2.5 1.2 1.2-.3 2.3.3 2.3 1.5 0 1.1-1.3 1.4-1.4 2.6-.1 1.3 1.5 1.6 1.9 2.8.3 1-.3 2.1-1.1 2.8a8.1 8.1 0 0 0-2.7-13.1Z" fill="#f2e9e0" />
  </svg>
);

export const Bookmark = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 2.75h14c.14 0 .25.11.25.25v18.2l-7.25-4.5-7.25 4.5V3c0-.14.11-.25.25-.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13 2.75h3.5v7.5l-1.75-1.2L13 10.25v-7.5Z" fill="currentColor" />
  </svg>
);

export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 16 12" fill="none" className={className} aria-hidden>
    <path d="M1 6h13.5M9.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Long thin arrow used in the category lists (a 19px line + head). */
export const ArrowLong = ({ className }: P) => (
  <svg viewBox="0 0 20 8" fill="none" className={className} aria-hidden>
    <path d="M0 4h19M15.5 1 19 4l-3.5 3" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export const Plus = ({ className }: P) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Star = ({ className, fill = 1 }: P & { fill?: number }) => {
  const id = `star-${Math.round(fill * 100)}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={fill} stopColor="#ffae00" />
          <stop offset={fill} stopColor="#d9d9d9" />
        </linearGradient>
      </defs>
      <path d="m12 1.8 3.1 6.6 7.1.9-5.2 5 1.3 7.1L12 18l-6.3 3.4L7 14.3l-5.2-5 7.1-.9L12 1.8Z" fill={`url(#${id})`} />
    </svg>
  );
};

export const Check = ({ className }: P) => (
  <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
    <path d="m3 8.5 3.2 3L13 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
