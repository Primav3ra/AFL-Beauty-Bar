# AFL Beauty Bar: website (Figma build)

Desktop-only (1440px design, min-width 1280px) build of the AFL Beauty Bar Figma file, for team and designer review. Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4. Every route is statically generated.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build (all routes static)
npm run typecheck && npm run lint
```

## Where things live

| What | Where |
|---|---|
| Pages | `src/app/` (landing, `treatments/{body,face-care,other,signature}`, `treatments/[slug]` = 32 detail pages, `academy`, `membership`, `about`, `shop`; `book` = empty booking swap point, not in Figma) |
| **Integration swap point** (booking, virtual consult, shop, cart, gift cards, old-site links) | `src/config/links.ts` |
| Package-discount policy (currently 0%, **owner to confirm**) | `src/config/pricing-policy.ts` |
| Treatment detail content (verbatim from Figma) | `src/data/treatments.generated.json` ← `scripts/extract-treatments.mjs` |
| Researched calculator pricing | `docs/PRICING_RESEARCH.json`, `docs/PRICING_SOURCES.md` |

Links without a real target yet use `<PlaceholderLink>`: it looks as designed, shows a "Coming soon" toast and carries `data-placeholder="<reason>"`.

## Figma pipeline (no Figma MCP needed)

Put a Figma personal access token (scope `file_content:read`) in `.env.local` as `FIGMA_TOKEN=…` (gitignored; never commit it).

```bash
npm run figma:pull                      # caches design/file.json, frame renders, image fills
node scripts/optimize-images.mjs        # right-sized WebP into public/figma
node scripts/gen-placements.mjs         # pixel-exact image placements
node scripts/extract-treatments.mjs     # 32 detail pages → src/data/treatments.generated.json
node scripts/extract-categories.mjs     # 4 category pages
node scripts/extract-faqs.mjs           # treatment FAQs from Figma comments → src/data/faqs.generated.json
npm run figma:q -- text <nodeId>        # inspect any node (tree | text | node | find | images …)
```

## Deploy (review URL)

No GitHub connection. Run `npx vercel login` once, then `npx vercel` for a preview and `npx vercel --prod` for the stable `*.vercel.app` URL.
