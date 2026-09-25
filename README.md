# AFL Beauty Bar: website

Marketing site for AFL Beauty Bar, built from the AFL Beauty Bar Figma file for team, designer and owner review. Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4. Every route is statically generated.

The layout is responsive from 375px phones up to wide desktop screens. The Figma file is a 1440px mock-up, so copy, images and colours come from Figma, while spacing and type follow the design system below (the Figma sizes at 90%, which is how the design reads in a browser).

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all routes static)
npm run typecheck && npm run lint
```

To check the mobile layout, open DevTools in Chrome, toggle the device toolbar (`Ctrl+Shift+M`), pick a phone and reload the page (touch behaviour only switches on after a reload).

## Pages

| Route | Page |
|---|---|
| `/` | Landing |
| `/treatments/body`, `/treatments/signature` | Category pages: Body, Fatema’s Signature Treatments |
| `/treatments/face-care`, `/treatments/other` | Category pages shown as **Facial Treatments** and **Wellness & Longevity** (Figma routes kept; `/treatments/acne-therapy` and `/treatments/wellness-longevity` redirect here) |
| `/treatments/[slug]` | 32 treatment detail pages |
| `/academy`, `/membership`, `/about`, `/shop` | Academy, Membership (tiers grouped in tabs), About, Shop |
| `/book` | Empty booking page: every booking button links here until the booking system is connected (not in Figma) |

## Design system

Defined once in `src/app/globals.css`; pages don't set their own sizes or gaps.

| Token | Use |
|---|---|
| `text-h1` / `text-h2` / `text-h3` | Hero headline (54px), section titles (44px, everywhere), card titles (19px). All shrink with `clamp()` on small screens |
| `text-lead` / `text-body` / `text-small` | Hero subtext (18px), body copy (15px), captions and card text (14px) |
| `container-site` | Centred content column: 1200px plus 24px side padding |
| `section` | Vertical rhythm for cream content sections: 72px between sections (48px on phones), neighbours share one gap |

Full-width coloured blocks (heroes, banners, the white review and FAQ blocks, the footer) are not `section`s: they carry their own padding and sit flush against each other.

Shared building blocks in `src/components/`:

| Component | What it does |
|---|---|
| `blocks.tsx` | `PageHero` (two heights: 440px for category and treatment pages, 540px for the rest), `CtaBanner`, `SectionIntro`, `Eyebrow`, button styles |
| `StickySplit.tsx` + `StickyIndex.tsx` | Card grid with a pinned index beside it that highlights the row in view (from 1024px) |
| `Marquee.tsx` + `AutoScroll.tsx` | Endless auto-scrolling rows that can also be swiped or scrolled by hand (logos, featured treatments, footer photos) |
| `BeforeAfter.tsx` | Draggable before/after comparison with auto-advancing cases |
| `membership/MembershipTabs.tsx` | Membership categories as tabs, tiers compared side by side |
| `ScrollReveal.tsx` | Fades content in just before it scrolls into view (`data-reveal`, `data-reveal="stagger"`); off for visitors who prefer reduced motion |
| `PlaceholderLink.tsx` | Links without a real target yet: look as designed, show a "Coming soon" toast and carry `data-placeholder="<reason>"` |

## Content and data

| What | Where |
|---|---|
| **Integration swap point** (booking, virtual consult, shop, cart, gift cards, old-site links) | `src/config/links.ts` |
| **Google Reviews** (shaped like Google Places reviews; replace the list when the integration lands) | `src/data/reviews.ts` |
| Clinics: addresses, phone numbers, office photos | `src/data/clinics.ts`, photos in `public/img/locations/` |
| Treatment detail content (from Figma) | `src/data/treatments.generated.json`, copy fixes in `src/data/treatment-copy.ts` |
| Category pages (from Figma), renames and card links | `src/data/categories.generated.json`, `src/data/categories.ts`, `src/data/category-meta.ts` |
| Treatment FAQs, written as comments in the Figma file | `src/data/faqs.generated.json` |
| FAQs for Sclerotherapy and Men’s Procedure (drafted, **pending owner review**) | `src/data/faqs.drafted.ts` |
| Membership tiers | `src/components/membership/tiers.ts` |
| Shop products | `src/components/shop/products.ts` |
| Calculator pricing (researched) and its sources | `src/data/pricing.ts`, `docs/PRICING_RESEARCH.json`, `docs/PRICING_SOURCES.md` |
| Package-discount policy (currently 0%, **owner to confirm**) | `src/config/pricing-policy.ts` |
| Images | `public/img/` (from Figma), `public/img/featured/` (landing carousel), `public/img/ba/` (before/after halves), `public/img/locations/` (offices) |

## Still needed from the owner

- Booking system (MyAestheticsPro) and Google Reviews integrations; commerce platform for the shop.
- Photos for the membership tiers (linen placeholders for now) and results photos for the treatment pages.
- Higher-resolution originals of the Lip Filler and Chin Filler before/after photos.
- Review of the drafted Sclerotherapy and Men’s Procedure FAQs.
- Package-discount percentage for the price calculator.

## Figma pipeline

Put a Figma personal access token (scope `file_content:read`) in `.env.local` as `FIGMA_TOKEN=…` (see `.env.example`; the file is gitignored, never commit it). Downloads go to `design/`, which is also gitignored.

```bash
npm run figma:pull                      # caches design/file.json, frame renders, image fills
node scripts/optimize-images.mjs        # right-sized WebP into public/img
node scripts/gen-placements.mjs         # image placements → src/data/placements.generated.json
node scripts/extract-treatments.mjs     # 32 detail pages → src/data/treatments.generated.json
node scripts/extract-categories.mjs     # 4 category pages → src/data/categories.generated.json
npm run figma:q -- text <nodeId>        # inspect any node (tree | text | node | find | images …)
```

Re-running an extract script overwrites its `.generated.json` file; hand edits belong in the matching `.ts` file (`treatment-copy.ts`, `categories.ts`).

## Deploy

The Vercel project is connected to this GitHub repository: every push to `main` deploys to production, and other branches get preview URLs. Search indexing is switched off (`robots: noindex` in `src/app/layout.tsx`) while the site is in review; remove it at launch.
