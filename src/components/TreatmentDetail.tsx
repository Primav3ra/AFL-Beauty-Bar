import Link from "next/link";
import { categoryMeta, categoryOfTreatment } from "@/data/categories";
import { pricingFor } from "@/data/pricing";
import { treatmentImage } from "@/data/treatment-images";
import type { Treatment } from "@/data/treatments";
import { BookingLink } from "./BookingLink";
import { FaqAccordion } from "./FaqAccordion";
import { FigmaImage } from "./FigmaImage";
import { PriceCalculator } from "./PriceCalculator";
import { Band, PageHero, SECTION_GAP, SectionIntro, btnOutline, btnWhite, label } from "./blocks";

// One template for all 32 detail frames. Sections flow on one vertical rhythm (SECTION_GAP); the hero
// and the membership banner run edge to edge.

/** Soft stand-in where the owner hasn't supplied a photo yet. */
function PhotoPending({ label: text }: { label: string }) {
  return (
    <span className="absolute inset-0 flex items-end bg-linen p-5">
      <span className="text-[13px] leading-4 text-espresso/45">{text}</span>
    </span>
  );
}

export function TreatmentDetail({ t }: { t: Treatment }) {
  const pricing = pricingFor(t.name);
  const { hero, process, outcomes, why, calc, family, faq } = t;
  const cat = categoryOfTreatment(t.name);
  const kicker = cat ? categoryMeta[cat].name : label(hero.kicker);
  // The design's hero photo, else this treatment's photo from its category card / landing tile.
  const fallback = treatmentImage(t.name);
  const heroImage = hero.image
    ? { src: hero.image.ref, place: hero.image.place }
    : fallback
      ? { src: fallback, place: { box: { x: 0, y: 0, w: 1440, h: 680 } } }
      : null;

  return (
    <>
      {/* Hero 239:1139 — 680px */}
      <PageHero
        image={heroImage}
        height={680}
        kicker={typeof kicker === "string" ? kicker : null}
        kickerTop={319}
        titleTop={390}
        title={hero.title}
        description={hero.subtitle}
        descriptionClass="text-[20px] leading-[23px]"
        descriptionWidth={null}
        gap={36}
      >
        <div className="mt-2.5 flex gap-[22px]">
          {hero.primaryCta && (
            <BookingLink treatment={t.slug} className={`${btnWhite} text-brown px-[26.5px]`}>
              {hero.primaryCta}
            </BookingLink>
          )}
          {hero.secondaryCta && (
            <BookingLink treatment={t.slug} type="virtual" className={`${btnOutline} px-[21px]`}>
              {hero.secondaryCta}
            </BookingLink>
          )}
        </div>
      </PageHero>

      {/* The Process 896:937 — the design has one step */}
      <section className={`${SECTION_GAP} px-[100px]`} aria-labelledby="process-title">
        <SectionIntro id="process-title" eyebrow={process.kicker} title={process.title} text={process.description} />
        {process.slides.slice(0, 1).map((s) => (
          <div key={s.number} data-reveal className="relative mx-auto mt-12 h-[400px] max-w-[1080px] overflow-hidden bg-black">
            {s.image && <FigmaImage src={s.image.ref} cover sizes="1240px" position="50% 35%" />}
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-10 left-11 text-white">
              <p className="text-[30px] leading-8 font-semibold tracking-[-2px]">{s.number}</p>
              <p className="mt-1 text-[20px] leading-6 font-medium tracking-[-1px]">{s.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Clinical Outcomes 896:957 — one white results panel: case facts + before/after frames */}
      <section className={`${SECTION_GAP} px-[100px]`} aria-labelledby="outcomes-title">
        <SectionIntro id="outcomes-title" eyebrow={outcomes.kicker} title={outcomes.title} text={outcomes.subtitle} />
        <div data-reveal className="mx-auto mt-12 flex gap-10 bg-white p-10">
          <div className="w-[280px] shrink-0">
            <p className="text-[19px] leading-6 font-semibold tracking-[-0.5px] text-espresso">{outcomes.caseTitle}</p>
            <dl className="mt-8 flex flex-col">
              {outcomes.facts.map((f) => (
                <div key={f.label} className="border-t border-espresso/10 py-5">
                  <dt className="text-[13px] leading-4 font-medium text-brown">{f.label}</dt>
                  <dd className="mt-2 text-[15px] leading-[23px] text-espresso">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-4">
            {[outcomes.before, outcomes.after].map((l, i) => {
              const img = outcomes.images[i] ?? null;
              return (
                <figure key={l} className="relative h-[380px] overflow-hidden bg-linen">
                  {img ? <FigmaImage src={img.ref} cover sizes="460px" /> : <PhotoPending label="Result photos coming soon" />}
                  <figcaption className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[14px] leading-5 font-medium text-espresso">{l}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why clients love… 896:1157 */}
      <section className={`${SECTION_GAP} px-[100px]`} aria-labelledby="why-title">
        <SectionIntro id="why-title" title={why.title} text={why.subtitle} />
        <ul data-reveal="stagger" className="mt-12 grid grid-cols-4 gap-4">
          {why.cards.map((c) => {
            const tone = c.image ? "text-white" : "text-espresso";
            return (
              <li key={c.title} className={`group relative h-[330px] overflow-hidden ${c.image ? "bg-black" : "bg-linen"}`}>
                {c.image && (
                  <>
                    <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <FigmaImage src={c.image.ref} cover sizes="300px" />
                    </span>
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </>
                )}
                <div className={`absolute inset-x-0 bottom-0 flex flex-col p-6 ${tone}`}>
                  <p className="text-[17px] leading-[22px] font-semibold tracking-[-0.6px]">{c.title}</p>
                  <p className={`mt-3 text-[14px] leading-5 tracking-[-0.2px] ${c.image ? "text-white/80" : "text-espresso/75"}`}>{c.description}</p>
                  {c.link && (
                    <BookingLink
                      treatment={t.slug}
                      className={`mt-5 flex items-center gap-3 border-t pt-4 text-[15px] leading-5 font-medium tracking-[-0.4px] hover:underline ${c.image ? "border-white/25" : "border-espresso/15"}`}
                    >
                      <span aria-hidden className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                      {c.link}
                    </BookingLink>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Price Calculation 239:1357 */}
      <section id="price" className={SECTION_GAP} aria-labelledby="price-title">
        <SectionIntro id="price-title" eyebrow={calc.kicker} title={calc.title} text={calc.subtitle} />
        <div data-reveal className="mt-12">
          <PriceCalculator labels={calc} pricing={pricing} />
        </div>
      </section>

      {/* Be a part of the family 239:1399 */}
      {family.image && (
        <Band backdrop={{ src: family.image.ref, place: family.image.place }} frameH={633} className={`${SECTION_GAP} h-[560px]`} aria-labelledby="family-title">
          <div data-reveal className="absolute top-1/2 left-1/2 flex w-[744px] -translate-1/2 flex-col items-center gap-6 text-center">
            <p className="text-cream text-[15px] leading-4 tracking-[-0.3px]">{label(family.kicker)}</p>
            <h2 id="family-title" className="text-[50px] leading-[60px] font-medium tracking-[-3px] text-white">
              {family.title}
            </h2>
            <p className="text-[16px] leading-[28px] text-white/90">{family.text}</p>
            {family.cta && (
              <Link
                href="/membership"
                className="text-cocoa hover:bg-cream mt-2 flex h-[48.9px] w-[305px] items-center justify-center bg-white text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] transition-colors"
              >
                {family.cta}
              </Link>
            )}
          </div>
        </Band>
      )}

      {/* FAQ 239:1097 — full-width white band (hidden until the page has real questions) */}
      {faq.items.length > 0 && (
      <section className="bleed bg-white" aria-labelledby="faq-title">
        <div className="frame flex items-start gap-20 px-[111px] py-24">
          <div data-reveal className="relative h-[540px] w-[440px] shrink-0 overflow-hidden bg-cream">
            {faq.image && <FigmaImage src={faq.image.ref} cover sizes="440px" position="50% 20%" />}
          </div>
          <div data-reveal className="flex-1">
            <h2 id="faq-title" className="text-[56px] leading-[64px] font-medium tracking-[-4px] whitespace-pre-line text-black">
              {faq.title}
            </h2>
            <div className="mt-10">
              <FaqAccordion items={faq.items} />
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
}
