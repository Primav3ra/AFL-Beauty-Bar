import Link from "next/link";
import { categoryMeta, categoryOfTreatment } from "@/data/categories";
import { pricingFor } from "@/data/pricing";
import { treatmentImage } from "@/data/treatment-images";
import type { Treatment } from "@/data/treatments";
import { BookingLink } from "./BookingLink";
import { FaqAccordion } from "./FaqAccordion";
import { FigmaImage } from "./FigmaImage";
import { PriceCalculator } from "./PriceCalculator";
import { CtaBanner, INTRO_GAP, PageHero, Runs, SectionIntro, btnOutline, btnWhite, label } from "./blocks";

// One template for all 32 detail frames: cream content sections on the `section` rhythm; the hero, the
// membership banner and the white FAQ band are full-width and sit flush against each other.

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
      {/* Hero 239:1139 */}
      <PageHero
        image={heroImage}
        frameH={680}
        kicker={typeof kicker === "string" ? kicker : null}
        title={<Runs runs={hero.title} />}
        description={hero.subtitle}
      >
        {hero.primaryCta && (
          <BookingLink treatment={t.slug} className={`${btnWhite} text-brown`}>
            {hero.primaryCta}
          </BookingLink>
        )}
        {hero.secondaryCta && (
          <BookingLink treatment={t.slug} type="virtual" className={btnOutline}>
            {hero.secondaryCta}
          </BookingLink>
        )}
      </PageHero>

      {/* The Process 896:937 — the design has one step */}
      <section className="section container-site" aria-labelledby="process-title">
        <SectionIntro id="process-title" eyebrow={process.kicker} title={process.title} text={process.description} />
        {process.slides.slice(0, 1).map((s) => (
          <div key={s.number} data-reveal className={`relative mx-auto ${INTRO_GAP} h-[240px] max-w-[1000px] overflow-hidden bg-black sm:h-[320px] md:h-[360px]`}>
            {s.image && <FigmaImage src={s.image.ref} cover sizes="(min-width: 1024px) 1000px, 100vw" position="50% 35%" />}
            <span aria-hidden className="absolute inset-x-0 bottom-0 h-[180px] bg-gradient-to-t from-black/75 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white md:bottom-8 md:left-9">
              <p className="text-[26px] leading-8 font-semibold tracking-[-1.5px]">{s.number}</p>
              <p className="mt-1 text-h3 font-medium">{s.title}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Clinical Outcomes 896:957 — one white results panel: case facts + before/after frames */}
      <section className="section container-site" aria-labelledby="outcomes-title">
        <SectionIntro id="outcomes-title" eyebrow={outcomes.kicker} title={outcomes.title} text={outcomes.subtitle} />
        <div data-reveal className={`${INTRO_GAP} flex flex-col gap-8 bg-white p-5 sm:p-8 md:flex-row md:gap-10`}>
          <div className="md:w-[260px] md:shrink-0">
            <p className="text-h3 font-semibold text-espresso">{outcomes.caseTitle}</p>
            <dl className="mt-5 flex flex-col">
              {outcomes.facts.map((f) => (
                <div key={f.label} className="border-t border-espresso/10 py-4">
                  <dt className="text-[13px] leading-4 font-medium text-brown">{f.label}</dt>
                  <dd className="mt-1.5 text-body text-espresso">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-3 sm:gap-4">
            {[outcomes.before, outcomes.after].map((l, i) => {
              const img = outcomes.images[i] ?? null;
              return (
                <figure key={l} className="relative h-[200px] overflow-hidden bg-linen sm:h-[300px] md:h-[340px]">
                  {img ? <FigmaImage src={img.ref} cover sizes="(min-width: 768px) 420px, 50vw" /> : <PhotoPending label="Result photos coming soon" />}
                  <figcaption className="absolute top-3 left-3 bg-white/90 px-2.5 py-1 text-small font-medium text-espresso">{l}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why clients love… 896:1157 */}
      <section className="section container-site" aria-labelledby="why-title">
        <SectionIntro id="why-title" title={why.title} text={why.subtitle} />
        <ul data-reveal="stagger" className={`${INTRO_GAP} grid gap-4 sm:grid-cols-2 lg:grid-cols-4`}>
          {why.cards.map((c) => {
            const tone = c.image ? "text-white" : "text-espresso";
            return (
              <li key={c.title} className={`group relative h-[280px] overflow-hidden md:h-[300px] ${c.image ? "bg-black" : "bg-linen"}`}>
                {c.image && (
                  <>
                    <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                      <FigmaImage src={c.image.ref} cover sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
                    </span>
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  </>
                )}
                <div className={`absolute inset-x-0 bottom-0 flex flex-col p-5 ${tone}`}>
                  <p className="text-h3 font-semibold">{c.title}</p>
                  <p className={`mt-2 text-small ${c.image ? "text-white/80" : "text-espresso/75"}`}>{c.description}</p>
                  {c.link && (
                    <BookingLink
                      treatment={t.slug}
                      className={`mt-4 flex items-center gap-3 border-t pt-3.5 text-small font-medium hover:underline ${c.image ? "border-white/25" : "border-espresso/15"}`}
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
      <section id="price" className="section container-site" aria-labelledby="price-title">
        <SectionIntro id="price-title" eyebrow={calc.kicker} title={calc.title} text={calc.subtitle} />
        <div data-reveal className={INTRO_GAP}>
          <PriceCalculator labels={calc} pricing={pricing} />
        </div>
      </section>

      {/* Be a part of the family 239:1399 */}
      {family.image && (
        <CtaBanner id="family-title" image={{ src: family.image.ref, place: family.image.place }} frameH={633} kicker={family.kicker} title={family.title} text={family.text}>
          {family.cta && (
            <Link href="/membership" className={`${btnWhite} text-cocoa`}>
              {family.cta}
            </Link>
          )}
        </CtaBanner>
      )}

      {/* FAQ 239:1097 — full-width white band, flush against the banner and footer */}
      {faq.items.length > 0 && (
        <section className="bg-white py-12 md:py-[72px]" aria-labelledby="faq-title">
          <div className="container-site flex flex-col gap-8 md:flex-row md:items-start md:gap-14 lg:gap-20">
            <div data-reveal className="relative hidden h-[460px] w-[360px] shrink-0 overflow-hidden bg-cream md:block">
              {faq.image && <FigmaImage src={faq.image.ref} cover sizes="360px" position="50% 20%" />}
            </div>
            <div data-reveal className="min-w-0 flex-1">
              <h2 id="faq-title" className="text-h2 font-medium whitespace-pre-line text-black">
                {faq.title}
              </h2>
              <div className={INTRO_GAP}>
                <FaqAccordion items={faq.items} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
