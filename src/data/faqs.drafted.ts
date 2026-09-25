// FAQs for the two treatments without written FAQs in Figma, drafted with AI at the owner's request
// ("the ones that don't have it commented already have the questions on Figma, so you can generate answers").
// Sclerotherapy keeps its three Figma questions (+2); Men's Procedure's Figma questions were lorem ipsum, so
// its questions are drafted too, from the page's own copy. Written to match Sanskriti's FAQs: general,
// conservative, consultation-led. NEEDS OWNER / CLINICAL REVIEW before launch.
// Used only where src/data/faqs.generated.json (Figma comments) has nothing for the page.

export const draftedFaqs: Record<string, { q: string; a: string }[]> = {
  sclerotherapy: [
    {
      q: "What is sclerotherapy?",
      a: "Sclerotherapy is a minimally invasive treatment for spider veins and small varicose veins. A solution is injected directly into the unwanted vein with a very fine needle, irritating the vein wall so it gradually closes. Over the following weeks the body naturally absorbs the treated vein, and blood reroutes through healthier veins, so the vein fades from view.",
    },
    {
      q: "What types of veins can be treated with sclerotherapy?",
      a: "Sclerotherapy works best on spider veins (the thin red, blue or purple veins close to the skin's surface) and small to medium varicose veins, most commonly on the legs. Larger, bulging varicose veins may need a different approach or a combination of treatments, which is why every plan starts with an assessment of the veins you'd like to treat and your overall health.",
    },
    {
      q: "Does sclerotherapy hurt?",
      a: "Most clients describe only mild discomfort. Because the needle is very fine, you may feel a small pinch with each injection and a brief stinging or cramping sensation as the solution enters the vein. The session is usually quick, no anesthesia is needed, and most people return to their normal routine the same day.",
    },
    {
      q: "How many sessions will I need, and when will I see results?",
      a: "Many clients need more than one session, often spaced a few weeks apart, depending on how many veins are treated and their size. Spider veins typically begin to fade within a few weeks, while larger veins can take a few months to fully clear. Your provider will recommend a plan based on your veins and your goals during your consultation.",
    },
    {
      q: "What is recovery like after sclerotherapy?",
      a: "There's little to no downtime. Some redness, mild bruising or small raised areas at the injection sites are common and usually settle within days to a couple of weeks. You may be advised to wear compression stockings for a short period, stay active with light walking, and avoid strenuous exercise, hot baths and direct sun on the treated area for a few days, following your provider's aftercare instructions.",
    },
  ],
  "mens-procedure": [
    {
      q: "What are men's procedures?",
      a: "Men's procedures are aesthetic treatments planned specifically around male facial and body anatomy. Rather than applying a single treatment, we build a tailored combination, such as neurotoxins, dermal fillers, skin treatments or body contouring, designed around your proportions and goals, so results look refined, balanced and natural.",
    },
    {
      q: "Which treatments are most popular with men?",
      a: "Popular options include neurotoxins to soften forehead lines and crow's feet, filler to define the jawline and chin, skin treatments to improve texture and tone, and non-surgical body contouring for stubborn areas such as the abdomen and flanks. Hair restoration is also a common concern. During your consultation, your provider will recommend the combination that best fits your goals.",
    },
    {
      q: "Will my results look natural and masculine?",
      a: "Yes, that's the goal of every plan. Male faces have different proportions than female faces, such as a stronger jawline and flatter brows, so treatments are placed and dosed to preserve and enhance those features rather than soften them. The aim is to look refreshed and well rested, not like you've had work done.",
    },
    {
      q: "Is there any downtime?",
      a: "Most men's treatments involve little to no downtime, and many clients return to work the same day. Depending on the treatment, you may notice mild redness, swelling or minor bruising for a few days. Your provider will walk you through what to expect and any aftercare before your appointment.",
    },
    {
      q: "How do I get started?",
      a: "Everything begins with a consultation, in person or virtually. Your provider will discuss your goals, assess your features and health history, and put together one personalized plan, so you know exactly which treatments are recommended, in what order, and what results to expect.",
    },
  ],
};
