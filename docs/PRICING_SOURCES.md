# Pricing sources (AFL Beauty Bar calculator)

Retrieved 2026-09-25. Every number below comes from a page that was fetched on that date. Machine-readable version: `docs/PRICING_RESEARCH.json`.

## How the calculator uses this data

Code: `src/lib/estimate.ts` (maths), `src/data/pricing.ts` (reads `docs/PRICING_RESEARCH.json`), `src/config/pricing-policy.ts` (owner-confirmable assumptions). Every estimate prints a one-line explanation under the calculator, e.g. "4 sessions over 14 weeks (one every 4 weeks) × $1,236".

| Unit in research | Estimate |
|---|---|
| `session`, `procedure` | rate × sessions. The first session is in week 1, then one every N weeks within the chosen duration (`REPEAT_EVERY_WEEKS`). N comes from the source where it states an interval (Sclerotherapy 4, Microneedling 4, Neurotoxins 12, Tattoo Removal 6). **The others are assumptions for the owner to confirm.** Single treatments (Breast Lift, PDO Threadlifts, CO2 Laser, Lip Fillers) = 1 session at any duration. Package discount applies (0% for now). |
| `month` | rate × ⌈weeks ÷ 4⌉ months. |
| `vial` | per-vial price × the vial count in the zone name (e.g. "(20 Vials)"), one-time. |
| `package` | Facial Balancing: $1,750 includes 3 syringes, extra syringes $450 each (from the source's price text); the zone's "(N mL)" sets the count. Other packages are one-time. |
| `syringe` | one-time. |
| `null` | "Price on consultation" everywhere, plus a note. |

- **Zones.** The research found one published price per treatment, not per area, so most zones show the same rate (a note says so). Exceptions: a zone with its own price ("Light (superficial) $230") uses it, and a price range ("$180 to $375") uses the midpoint.
- **"Add Post-Treatment Lymphatic Massage"**: $95 per session, on every treatment (a massage costs the same whichever treatment it follows). **Low-confidence source**, see below.
- **"Add Targeted RF Skin Tightening"**: no add-on price exists anywhere, so it uses the researched Skin Tightening price ($2,326, ASPS national average for non-invasive skin tightening) **once per protocol**. This is an assumption for the owner to confirm.
- **Package discount = 0%.** AFL publishes no package-discount policy (see below). The owner must set tiers in `PACKAGE_DISCOUNT_TIERS` before launch.
- The total stays "$ 0.0" (as designed) until a zone is selected.
- Under every calculator: "Estimate based on published averages; pricing confirmed after consultation. Source: <linked names>, retrieved <date>." The design's italic footnote stays verbatim above it.

## Headline finding: AFL publishes no treatment prices

- All 78 non-image, non-product page URLs from the aflbeautybar.com sitemaps, plus the two old /acne-therapy-cloned/ URLs (80 in total), were fetched with curl. Every page returned 200 as server-rendered HTML. The only dollar amounts on the whole site are: membership fees (`/membership/`), retail skincare/make-up/apparel prices (`/shop/` and the WooCommerce Store API), a '$25 when you become a member' banner, 'Financing up to $22,500 per patient' (on `/home-2/`, which looks like a draft page), and '$27,000' on the academy page.
- `/payment-plans/` is only an embedded Cherry financing widget (JavaScript), with no prices.
- The WooCommerce Store API (`/wp-json/wc/store/v1/products?per_page=100`) returns 23 products, all retail items in the Skin Care, Make-Up and Apparel categories. None are treatments or deposits.
- The 'Book Appointment' button opens AestheticsPro (`web2.myaestheticspro.com/BN/...`). Its Miami service menu (123 services) and each service's detail page (`/bn/dsp_serviceinfo.cfm`) were fetched. They show service names and descriptions only, with prices hidden. Those service names are used below as AFL's 'zones'/variants, with no prices attached.
- `alfbeautybar.repeatmd.app` (gift cards/rewards) is a JavaScript-only single-page app, and plain HTTP returns an empty shell. Not checked further.
- RealSelf `/cost` pages return **403** to both curl and WebFetch, and the only Wayback copies are from 2015-2020, so RealSelf was not used. The live ASPS 2023 fee PDF now returns 404, so the 2026-04-14 Wayback Machine copy of the same URL was used. The ASPS 2024 fee table has surgical procedures only, and the 2025 report has no fee table. AmSpa State of the Industry is paywalled and was not used.

## Treatment table

| # | Treatment | Price (USD) | Unit | Verbatim price text | State avgs (FL/GA/NY/CA) | Typical sessions | Source | Type |
|---|---|---|---|---|---|---|---|---|
| 1 | Non-Surgical Breast Lift | 5349 | procedure | The national average cost* of a scarless breast lift is $5,349, with costs ranging between $2,750 and $9,500. | 5761/4706/4789/5294 |  | [CareCredit - Scarless (Non-Invasive) Breast Lift Cost (2023 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/scarless-non-invasive-breast-lift-cost/) | published-average |
| 2 | Weight loss | 450 | month | Semaglutide ... Regular: $450 Per Month |  |  | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 3 | Sclerotherapy | 497 | session | The average cost* of one injection of sclerotherapy to treat spider and varicose veins is $497 with a range from $250 to $825 per injection. | 480/447/401/507 | 2 (min). Typically, 2 to 4 sessions are required for optimal results, with treatments spaced 3 to 4 weeks apart. | [CareCredit - Spider Vein / Sclerotherapy Cost (2023 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/spider-vein-treatment-cost-and-sclerotherapy-financing/) | published-average |
| 4 | Microneedling | 938 | session | The national average cost** of a microneedling treatment is $938 but can range from $686 to $1,515 | 923/894/1068/1141 | CareCredit: 'can be repeated every four to six weeks as needed' (no session count given). | [CareCredit - Microneedling Cost (2026 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/microneedling-cost/) | published-average |
| 5 | Metabolic Reset | 550 | month | Tirzepatide ... Regular: $550 Per Month |  |  | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 6 | Non-Surgical Male Pectoral Sculpting |  |  |  |  |  | **No source found** | published-average |
| 7 | Vaginal Rejuvenation | 1236 | procedure | Nonsurgical Vaginal Tightening $1,236 |  |  | [The Aesthetic Society - Average Plastic Surgery Costs (2022 Aesthetic Plastic Surgery National Databank)](https://www.theaestheticsociety.org/patient-resources/cost/average-plastic-surgery-costs) | published-average |
| 8 | Laser Treatments | 697 | session | Skin treatment (combination lasers) (e.g., laser hair removal, IPL treatment, laser tattoo removal, laser treatment of leg veins) $697 |  | 4 (min). On average, 4 to 6 sessions spaced several weeks apart are common. (AFL city pages say 3 to 7 sessions.) | [ASPS 2023 Procedural Statistics - Average Surgeon/Physician Fees (national; retrieved via Wayback snapshot 2026-04-14 because live URL now 404s)](https://web.archive.org/web/20260414093951/https://www.plasticsurgery.org/documents/News/Statistics/2023/cosmetic-procedures-average-cost-2023.pdf) | published-average |
| 9 | Testosterone Replacement Therapy | 169 | month | For just $169 per month, we offer a comprehensive TRT program that includes all necessary medications, doctor consultations, and home delivery |  |  | [South Florida Men's Health - Testosterone Replacement Therapy Cost](https://www.southfloridamenshealth.com/testosterone-replacement-therapy-cost/) | published-average |
| 10 | Hair Restoration | 495 | session | PRP Hair Growth Therapy $495 session / $950 package (All packages include 3 sessions.) |  | 3 (min). Miami Lakes Med Spa: 'All packages include 3 sessions.' (package make-up, not a clinical recommendation) | [Miami Lakes Med Spa - Pricing (published Miami-area clinic price list)](https://miamilakesmedspa.com/pricing/) | published-average |
| 11 | Skin Tightening | 2326 | procedure | Noninvasive skin tightening (e.g., Pelleve, Thermage, Ulthera) $2,326 |  |  | [ASPS 2023 Procedural Statistics - Average Surgeon/Physician Fees (national; retrieved via Wayback snapshot 2026-04-14 because live URL now 404s)](https://web.archive.org/web/20260414093951/https://www.plasticsurgery.org/documents/News/Statistics/2023/cosmetic-procedures-average-cost-2023.pdf) | published-average |
| 12 | Biostimulators | 901 | procedure | Non-hyaluronic acid fillers (e.g., Radiesse, Sculptra, Bellafill, Renuva) $901 |  |  | [ASPS 2023 Procedural Statistics - Average Surgeon/Physician Fees (national; retrieved via Wayback snapshot 2026-04-14 because live URL now 404s)](https://web.archive.org/web/20260414093951/https://www.plasticsurgery.org/documents/News/Statistics/2023/cosmetic-procedures-average-cost-2023.pdf) | published-average |
| 13 | Anti Aging and Longevity |  |  |  |  |  | **No source found** | published-average |
| 14 | Hydra Facial | 300 | session | Hydrafacial $300 per session |  |  | [Miami Skin & Vein - Pricing (published Miami clinic price list)](https://www.miamiskinandvein.com/pricing/) | published-average |
| 15 | Pectoral Sculpting |  |  |  |  |  | **No source found** | published-average |
| 16 | PDO Threadlifts | 1800 | procedure | PDO Threads Facelift ... Starting at Approximately $1800 |  |  | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 17 | Salmon DNA Facial | 389 | session | Salmon DNA (PDRN) $389 \| 60 minutes |  |  | [Asha Esthetics (Miami) - Salmon DNA (PDRN)](https://www.ashaesthetics.com/treatments/salmon-dna-pdrn) | published-average |
| 18 | Non-Invasive BBL | 900 | vial | Sculptra: $900 per vial for non-members and $850 for members. Radiesse BBL - 10 syringes $5,500; 20 syringes $7,500; 30 syringes $9,500 |  | 2 (min). Most patients need two to three sessions, spaced six weeks apart, for optimal results. (Miami Skin & Vein recommends three sessions at least four weeks apart.) | [Femme Aesthetics (Miami) - Butt Filler: Sculptra, Radiesse & Cost](https://femmeaesthetics.com/butt-filler/) | published-average |
| 19 | IV Therapy | 250 | session | Myer's Cocktail IV ... Regular: $250 |  |  | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 20 | Hand Rejuvenation | 850 | syringe | Hand Rejuvenation (Back of Hands) Regular: $850 Per Syringe |  |  | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 21 | CO2 Laser | 2509 | session | The average cost of ablative laser skin resurfacing is $2,509. |  |  | [CareCredit - Ablative vs Non-Ablative Laser Resurfacing](https://www.carecredit.com/well-u/health-wellness/compare-ablative-noablative-laser-resurfacing-treatments/) | published-average |
| 22 | Facial Balancing | 1750 | package | Facial Balancing $1750 includes 3 syringes. additional syringes at $450 each |  |  | [Miami Lakes Med Spa - Pricing (published Miami-area clinic price list)](https://miamilakesmedspa.com/pricing/) | published-average |
| 23 | Men's Procedure |  |  |  |  |  | **No source found** | published-average |
| 24 | Neurotoxins | 445 | session | The national average cost of BOTOX Cosmetic is $445 per treatment, but prices can range from $325 to $710 ... A single unit of BOTOX Cosmetic costs an average of $11 to $35 | 440/425/505/540 | Results from BOTOX Cosmetic typically last three to four months (repeat treatment, not a series). | [CareCredit - BOTOX Cost (Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/botox-cost-and-botox-financing/) | published-average |
| 25 | Chemical Peel | 230 | session | Light (superficial) chemical peel $230 ($170 to $370); Light to medium peel (VI Peel) $350 ($300 to $450); Medium chemical peel $660 ($485 to $1,073) | 225/220/260/280 | 3 (min). Mild peels and treatments for hyperpigmentation usually take around 3-6 sessions, while deeper peels might only need one. | [CareCredit - Chemical Peel Cost (2026 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/chemical-peel-cost-and-financing/) | published-average |
| 26 | Lip Fillers | 959 | session | The average cost of lip fillers in the U.S. is $959, but prices can range from $332 up to $2,354 for one treatment. | 1053/1085/897/914 | 1 (min). Most clients at AFL Beauty Bar in New York begin with one syringe (1 ml), especially if it's their first time. | [CareCredit - Lip Fillers Cost (2023 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/lip-fillers-cost/) | published-average |
| 27 | Pico Laser | 900 | session | Picoway $900 per session |  |  | [Miami Skin & Vein - Pricing (published Miami clinic price list)](https://www.miamiskinandvein.com/pricing/) | published-average |
| 28 | Skin Boosters | 723 | session | The national average cost* of Skinvive is $723, but pricing can range from $522 to $1,151 | 713/689/824/878 |  | [CareCredit - Skinvive Cost (2026 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/skinvive-cost/) | published-average |
| 29 | Tattoo Removal | 353 | session | The national average cost* of tattoo removal is $353 but can range between $272 and $659. | 349/313/389/437 | On average, one to 10 treatment sessions are needed to remove a tattoo. And a six-week interval between each removal treatment is needed | [CareCredit - Tattoo Removal Cost (2024 Synchrony/ASQ360 cost study)](https://www.carecredit.com/well-u/health-wellness/tattoo-removal-cost-and-tattoo-removal-financing/) | published-average |
| 30 | Non-surgical BBL | 900 | vial | Sculptra: $900 per vial for non-members and $850 for members. |  | 2 (min). Most patients need two to three sessions, spaced six weeks apart, for optimal results. | [Femme Aesthetics (Miami) - Butt Filler: Sculptra, Radiesse & Cost](https://femmeaesthetics.com/butt-filler/) | published-average |
| 31 | Slim Shots | 700 | package | Mesotherapy (Fat Dissolving Injections) ... Regular: $700 for 6 Syringes |  | 2 (min). Kybella (CareCredit): 'most people achieve results they're happy with after two to four treatments' (Kybella used as a proxy; AFL only says 'over a series of sessions'). | [Beyond Health Med Spa (Miami, FL 33183) - Pricing (published Miami clinic price list)](https://www.beyondhealthmedspa.com/pricing) | published-average |
| 32 | Hormone Replacement Therapy | 199 | month | $250 initial package ... $199/month ... Total 3-month program: $648 |  |  | [Florida Weight Loss MD - Hormone Replacement Therapy in Miami](https://floridaweightlossmd.com/wellness/same-day-hormone-therapy-hrt-miami/) | published-average |

Notes: `typicalSessions` stores the **lower bound** of the range the source states. The full wording is in `typicalSessionsText`. Confidence notes, alternate prices and AFL zone lists for each treatment are in the JSON.

## Zones / areas

AFL does not publish a price for any area. The variants below come from AFL's booking menu and membership page, with no prices. Priced areas from outside sources are marked with a $ amount.

- **Weight loss**: GLP-1 Weight Management Therapy (1 month); GLP-1 Weight Management Package
- **Microneedling**: Microneedling with PRP (one area); Exosome Microneedling Therapy; Topical PDGF Microneedling Treatment; PDRN Therapy with Microneedling
- **Metabolic Reset**: GIP/GLP-1 Metabolic Reset Program 1month; GIP/GLP-1 Metabolic Reset Package
- **Vaginal Rejuvenation**: Vaginal Rejuvenation with PRP
- **Laser Treatments**: Bikini; Brazilian; Chest; Full Arms; Full Body; Full Face; Full Legs; Hands & Feet; Happy Trail; Partial Arms; Partial Legs; Under Arm; Membership area tiers: Small (upper lip, chin, unibrow, sideburns, hands, or feet); Medium (lower face, underarms, bikini line, half arms, happy trail, inner thighs, or lower back); Large (full legs, brazilian, full back, full chest, or full arms); XL (full body)
- **Hair Restoration**: Scalp & Hairline Rejuvenation with PRP; Exosome Scalp Therapy
- **Skin Tightening**: Morpheus 8 Face (one area); Morpheus 8 Body (one area); Radio Frequency Therapy (one area); EndoLift Laser Therapy (face); EndoLift Laser Therapy (body)
- **Biostimulators**: Sculptra (Facial Rejuvenation); Hand Rejuvenation with Sculptra; PDRN Full Face Rejuvenation; PDRN Face & Neck Restoration Therapy; PDRN Neck Restoration; PDRN Smile Line Rejuvenation; Ariessence PDGF Under Eye Injections; Exosome Microneedling Therapy
- **Anti Aging and Longevity**: Fatema's Ageless Affair Package; Timeless Tox; GLOW-TOX Facial
- **Hydra Facial**: Standard Hydrafacial; Deluxe Hydrafacial; Premium Hydrafacial; Hydrafacial for Body (one area)
- **PDO Threadlifts**: Fox Eye PDO Thread Lift; Midface Lift with PDO Threads; Lower Face Lift with PDO Threads; Smooth PDO Thread Lift
- **Salmon DNA Facial**: PDRN Full Face Rejuvenation; PDRN Face & Neck Restoration Therapy; PDRN Neck Restoration; PDRN Smile Line Rejuvenation; PDRN Therapy with Microneedling
- **Non-Invasive BBL**: The 'Natural' Non-Surgical BBL (20 Vials); The 'Vixen' Non-Surgical BBL (30 Vials); The 'Classic' Non-Surgical BBL (40 Vials); The 'Fatema Love' Non-Surgical BBL (50 Vials); Non-Surgical BBL Touch Up; Non-Surgical BBL Package
- **IV Therapy**: Hydration Reboot; Immune System Boost; Energy Recovery with NAD+; Inner Beauty & Glow; Hangover Recovery; Exosome Therapy
- **Hand Rejuvenation**: Hand Rejuvenation with Sculptra; Hand Rejuvenation with PRP
- **Facial Balancing**: Mini Snatch Package (3mL); The 'Natural' Snatch Package (4mL); The 'Barbie' Snatch Package (5mL); The 'Vixen' Snatch Package (6mL); The 'Fatema Love' Snatch Package (7mL); Chin Contour; Jawline Contour; Cheek Contour; Smile Line Smoothing; Temple Rejuvenation; Under Eye Smoothing; Non-Surgical Rhinoplasty
- **Neurotoxins**: Frown lines: 12 to 25 units, $180 to $375; Crow's feet: 4 to 16 units, $60 to $240; Forehead wrinkles: 4 to 20+ units, $60 to $300; AFL menu: Botox, Dysport, Xeomin, Letybo, Brow Lift, Lip Flip, Masseter Botox, Nefertiti Lift with Botox, Hyperhidrosis Therapy- Hands, Hyperhidrosis Therapy- Underarms, Botox Package
- **Chemical Peel**: Light (superficial) $230; Light to medium (VI Peel) $350; Medium $660; AFL menu/pages: Bio-Repeel Facial, VI Peel, Silk Peel
- **Lip Fillers**: Natural Lips (1mL); Russian Lips (1mL); Bratz Doll Lips (1mL); Lip Flip (neurotoxin)
- **Non-surgical BBL**: The 'Natural' Non-Surgical BBL (20 Vials); The 'Vixen' Non-Surgical BBL (30 Vials); The 'Classic' Non-Surgical BBL (40 Vials); The 'Fatema Love' Non-Surgical BBL (50 Vials); Non-Surgical BBL Touch Up; Non-Surgical BBL Package
- **Slim Shots**: Body Slim Shots (one area); Body Slim Shots Package; Facial Slim Shots (one area); Facial Slim Shots Package; Membership areas: medium area (lower abdominal, love handles, upper arms (batwings)); small area (double chin or buccal area)
- **Hormone Replacement Therapy**: Hormone Replacement Therapy Blood Work (labs)

## Package discounts

**aflbeautybar.com has no package-discount policy** (no 'buy N sessions, save X%', no published package prices). The only discounts stated are membership perks on https://aflbeautybar.com/membership/ (verbatim):

- AFL Glow Membership, $119/Month, 6-month minimum: '10% off all services', '15% off all skin care & make up products'.
- Smooth Starter, $179/Month, 3-month minimum: '10% Off all other Laser Services', '10% Off all Skin Care'; 'Can upgrade a session to large area for just $79.00'.
- Signature Smooth, $249/Month: '15% off all other laser services'; 'Upgrade to XL area (fully body) for $99'.
- Ultra Smooth Elite, $449/Month: '20% off any additional laser, facial, or IV therapy services'.
- AFL Tox Club, $129/Month, 6-month minimum: 'Banked Tox units- up to 12 units per month', '$1 Off per unit used', '10% Off All Dermal Fillers', '10% Off IV Therapy services'.
- Body Goals Membership, $179/Month: '$100 monthly credit towards ANY GLP-1 Treatment OR $100 Credit towards vitamin injectables', '20% Off any other Slim Shot services and/or packages', '10% Off IV Therapy (signature IV drips only)'.
- AFL Radiance Membership, $179/Month: '10% Off all Skin Care Products', '10% Off all Dermal fillers and Neurotoxins'.
- AFL Mini Drip Club, $69/Month: '10% Off Full Signature Drips'. AFL Drip Club, $99/Month: '10% Off All Premium IV Drips'.
- Site banner (every page): 'Click here to earn $25 when you become a member!' (links to the RepeatMD sign-in).
- Footer (every page): 'All Sales are Final. All Deposits are Non-Refundable.'
- The booking menu has 'Package' services (Botox Package, Non-Surgical BBL Package, Body/Facial Slim Shots Package, Bikini Laser Hair Removal Package, Ariessence PDGF Under Eye Injections Package, GLP-1 / GIP-GLP-1 packages, Even Tone Body Brightening Package, Radiant Skin Package, Fatema's Ageless Affair Package). **None of them shows a price, session count or discount.**

Outside reference only (not AFL policy): Beyond Health Med Spa (Miami) sells sclerotherapy as '5 Treatments for $1,500' against a regular $500 per treatment (a 40% saving). Get Clear Beauty says Miami CO2 series packages 'typically lower the per-session price by ~10-20%' (quoted in search results, not verified on page). CareCredit's Kybella page: 'Some providers may offer discounts for multiple sessions'.

## Lymphatic massage add-on

- AFL: not offered or priced anywhere on aflbeautybar.com or in the AFL booking menu. The word only appears in the Slim Shots descriptions, which mention the body's lymphatic system.
- Published price used: My Massage Haven (Aventura, FL), https://mymassagehaven.com/services/lymphatic-massage/, page title: 'Lymphatic Massage Miami, Miami Gardens & Palmetto Bay FL | 60 Min $95 / 90 Min $125'. **Low confidence**: the price appears only in the page `<title>`, and this is a massage studio, not a med spa. Other search results (Blys mobile 'from $139'; a Lux MedSpa Brickell '50-minute ... $190' figure) could not be confirmed on a fetched page.
- `lymphaticMassageUSD` = 95 is set only on the body-contouring entries (Non-Invasive BBL, Non-surgical BBL, Slim Shots). Everywhere else it is null.

## No source found (perSessionUSD = null)

- **Non-Surgical Male Pectoral Sculpting**: No source found. No published average or Miami price list for non-surgical (injectable) pectoral sculpting was found. The only related numbers are per-vial product prices (e.g. Sculptra $1,000/vial at Miami Skin & Vein), which don't say how many vials a chest needs, so using them would be a guess. AFL does not publish a price for this treatment: aflbeautybar.com treatment pages (all 80 sitemap page URLs fetched 2026-09-25), the WooCommerce Store API (retail products only) and the AFL AestheticsPro booking menu (service names/descriptions only, prices hidden) contain no treatment price.
- **Anti Aging and Longevity**: No source found. This is a broad category with no single matching published average. Possible components that do have sourced prices elsewhere in this file: NAD+ IV (Beyond Health 'NAD+ IV (250mg) Regular: $350'), neurotoxins, biostimulators. AFL does not publish a price for this treatment: aflbeautybar.com treatment pages (all 80 sitemap page URLs fetched 2026-09-25), the WooCommerce Store API (retail products only) and the AFL AestheticsPro booking menu (service names/descriptions only, prices hidden) contain no treatment price.
- **Pectoral Sculpting**: No source found (see Non-Surgical Male Pectoral Sculpting). AFL does not publish a price for this treatment: aflbeautybar.com treatment pages (all 80 sitemap page URLs fetched 2026-09-25), the WooCommerce Store API (retail products only) and the AFL AestheticsPro booking menu (service names/descriptions only, prices hidden) contain no treatment price.
- **Men's Procedure**: No source found. 'Men's procedures' on aflbeautybar.com/mens-procedures/ is a category page (slimming shots, PRP hair restoration, etc.), not one priced treatment. Price each component treatment instead. AFL does not publish a price for this treatment: aflbeautybar.com treatment pages (all 80 sitemap page URLs fetched 2026-09-25), the WooCommerce Store API (retail products only) and the AFL AestheticsPro booking menu (service names/descriptions only, prices hidden) contain no treatment price.

## Source counts

- AFL-sourced prices: 0
- Published-average / published Miami-clinic prices: 28 (national averages from ASPS, The Aesthetic Society and CareCredit/ASQ360; published price lists from Miami-area clinics)
- No source: 4

Caveat: several 'published-average' entries are really one Miami-area clinic's published price, not an industry average. Each JSON `confidence` field says which kind it is. National averages (ASPS 2023, The Aesthetic Society 2022, CareCredit 2023-2026) are not Miami-specific. Where CareCredit gives state averages, FL/GA/NY/CA are included for AFL's four markets.
