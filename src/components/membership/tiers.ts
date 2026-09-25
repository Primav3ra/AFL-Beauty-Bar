// Copy is verbatim from Figma frame 729:3357 except two misspellings (Glutothione, fully body).

export type Tier = {
  id: string;
  kicker: string;
  title: string;
  /** Figma text-box width of the title (layout hint from the design; unused by the tabs layout). */
  titleWidth: number;
  /** Monthly price, e.g. "119". */
  price: string;
  commitment: string;
  listHeading: string;
  /** Each bullet; inner arrays are the hard line breaks (U+2028) from Figma. */
  items: string[][];
  cta: string;
  /** Design x offsets of the text column and photo (from the original row layout). */
  textX: number;
  imageX: number;
  secondaryCta?: string;
};

export const glow: Tier = {
  id: "glow",
  kicker: "Best for: Skin Maintenance & Exclusive Savings",
  title: "AFL Glow Membership",
  titleWidth: 466,
  price: "119",
  commitment: "Minimum Commitment: 6 months",
  listHeading: "Includes the Following:",
  items: [
    ["1 custom facial per month (valued at $150) "],
    ["1 Laser Session per month in a small area (upper lip, chin, side burns, or unibrow)"],
    ["10% off all services "],
    ["15% off all skin care & make up products "],
    ["Sign Up Reward: Receive a complimentary AFL Mini Skin Care set and Travel Bag "],
  ],
  cta: "Start Membership →",
  secondaryCta: "Sign Up for Rewards",
  textX: 0,
  imageX: 545,
};

// "All for Love, All for Smooth" 778:491 and the other category tiers that follow it.
export const smoothTiers: Tier[] = [
  {
    id: "smooth-starter",
    kicker: "Best for: Skin Maintenance & Exclusive Savings",
    title: "Option #1: Smooth Starter",
    titleWidth: 527,
    price: "179",
    commitment: "Minimum Commitment: 3 months",
    listHeading: "Includes the Following:",
    items: [
      [
        "1 Small Area (upper lip, chin, unibrow, sideburns, hands, or feet) OR 1 Medium area (lower face, underarms, bikini line, half arms, happy trail, inner thighs, or lower back) per month.",
      ],
      ["Can upgrade a session to large area for just $79.00"],
      ["Unused sessions roll over for 60 days"],
      ["10% Off all other Laser Services"],
      ["10% Off all Skin Care"],
    ],
    cta: "Join Membership -->",
    textX: 647,
    imageX: 0,
  },
  {
    id: "signature-smooth",
    kicker: "Best For: Consistent Hair Removal on Large Areas",
    title: "Option #2: Signature Smooth",
    titleWidth: 452,
    price: "249",
    commitment: "Minimum Commitment: 6 months",
    listHeading: "Includes the Following:",
    items: [
      ["1 large area per month (full legs, brazilian, full back, full chest, or full arms)"],
      ["Upgrade to XL area (full body) for $99"],
      ["Unused sessions roll over for 90 days"],
      ["15% off all other laser services"],
      ["VIP priority booking"],
      ["Includes one complimentary under arm session every 3 months"],
    ],
    cta: "Start Membership →",
    textX: 26,
    imageX: 571,
  },
  {
    id: "ultra-smooth-elite",
    kicker: "Best For: Full Body Laser Removal",
    title: "Option #3: Ultra Smooth Elite",
    titleWidth: 484,
    price: "449",
    commitment: "Minimum Commitment: 6 months",
    listHeading: "Includes Following:",
    items: [
      [
        "2 Large Area sessions (full legs, brazilian, full back, full chest, or full arms) OR 1 Full Body Session per month  ",
      ],
      ["Covers multiple large areas or complete zones (legs + arms, or chest + back + underarms)"],
      ["1 Free Full Face Session every 6 months "],
      ["20% off any additional laser, facial, or IV therapy services "],
      ["Includes priority scheduling and exclusive event invites "],
      ["Unused sessions roll over for 120 days "],
    ],
    cta: "Start Membership →",
    textX: 647,
    imageX: 0,
  },
  {
    id: "tox-club",
    kicker: "Best for: Botox and Dysport Lovers",
    title: "AFL Tox Club",
    titleWidth: 452,
    price: "129",
    commitment: "Minimum Commitment: 6 months",
    listHeading: "Includes the Following:",
    items: [
      [
        "Banked Tox units- up to 12 units per month OR 1 Glow Tox Microneedling Facial (no banked units) ",
      ],
      ["$1 Off per unit used "],
      ["10% Off All Dermal Fillers "],
      ["Priority booking "],
      ["Can accumulate units until ready to use "],
      ["10% Off IV Therapy services "],
    ],
    cta: "Start Membership →",
    textX: 26,
    imageX: 571,
  },
  {
    id: "body-goals",
    kicker: "Best for: Weight Loss & Body Contouring",
    title: "Body Goals Membership",
    titleWidth: 503,
    price: "179",
    commitment: "Minimum Commitment: 6 months",
    listHeading: "Includes Following:",
    items: [
      [
        "$100 monthly credit towards ANY GLP-1 Treatment OR $100 Credit",
        "towards vitamin injectables (NAD+, B-12, Glutathione, Vita-Complex)",
      ],
      [
        "Includes 1 session of Slim Shots in one medium area (lower abdominal, love handles,",
        "upper arms (batwings) & 1 session of Slim Shots in one small area (double chin or buccal area) per month",
      ],
      ["20% Off any other Slim Shot services and/or packages"],
      ["10% Off IV Therapy (signature IV drips only)"],
    ],
    cta: "Start Membership →",
    textX: 647,
    imageX: 0,
  },
  {
    id: "radiance",
    kicker: "Best for: Anti-aging & Rejuvenation",
    title: "AFL Radiance Membership",
    titleWidth: 452,
    price: "179",
    commitment: "Minimum Commitment: 6 months",
    listHeading: "Includes the Following:",
    items: [
      [
        "1 microneedling session with PRP or Hyaluronic Acid Add on OR one chemical peel per",
        "month",
      ],
      ["1 custom facial OR dermaplane"],
      ["10% Off all Skin Care Products"],
      ["10% Off all Dermal fillers and Neurotoxins"],
    ],
    cta: "Start Membership →",
    textX: 26,
    imageX: 571,
  },
];

// "AFL Drip Club-IV Therapy Memberships" 778:618.
export const dripTiers: Tier[] = [
  {
    id: "mini-drip",
    kicker: "Best for: Vitamin Injectables and Mini IV Drips",
    title: "Option #1: AFL Mini Drip Club",
    titleWidth: 586,
    price: "69",
    commitment: "Minimum Commitment: 3 months",
    listHeading: "Includes the Following:",
    items: [
      [
        "1 Small Signature IV Drip (250 mL) (hydration, energy, immunity) OR one Injectable",
        "(B-12, Vita-Complex, NAD+, Glutathione, Etc)",
      ],
      ["10% Off Full Signature Drips"],
      ["Priority Booking"],
    ],
    cta: "Join Membership -->",
    textX: 617.5,
    imageX: -29.5,
  },
  {
    id: "drip-club",
    kicker: "Best for: Hydration & Recovery",
    title: "Option #2: AFL Drip Club",
    titleWidth: 504,
    price: "99",
    commitment: "Minimum Commitment: 3 months",
    listHeading: "Includes the Following:",
    items: [
      [
        "1 signature IV Drip (hydration, energy & recovery, or immunity) OR $100 credit towards",
        "a premium IV Drip (Inner Beauty, NAD+, Weight Loss, Glowing or Hangover",
        "Recovery)",
      ],
      [
        "1 Free Add on (B-12, MICC, Biotin, Glutamine, Glutathione, Mineral Blend, Amino",
        "Blend, Vitamin C) every 3 months",
      ],
      ["10% Off All Premium IV Drips"],
      ["Exclusive Members only Cocktail Per Month"],
    ],
    cta: "Start Membership →",
    textX: 11.5,
    imageX: 585.5,
  },
];
