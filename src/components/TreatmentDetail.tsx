import Link from "next/link";
import type { ReactNode } from "react";
import { pricingFor } from "@/data/pricing";
import type { Img, Treatment } from "@/data/treatments";
import { BookingLink } from "./BookingLink";
import { FaqAccordion } from "./FaqAccordion";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { PriceCalculator } from "./PriceCalculator";
import { Eyebrow, PageHero, btnOutline, btnWhite } from "./blocks";

// One template for all 32 detail frames (1440×7749). Offsets are frame-relative y values from Figma
// (reference frame 239:1096); every section shares the #f2e9e0 page background unless noted.

const figma = (img: Img, priority?: boolean) =>
  img ? <FigmaImage src={img.ref} place={img.place} priority={priority} /> : null;

const h2 = "text-[50px] font-medium tracking-[-4px] text-espresso";

function SectionHead({
  eyebrow,
  title,
  titleLeading,
  children,
}: {
  eyebrow: string | null;
  title: string | null;
  titleLeading: number;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1290px] flex-col items-center gap-[18px] text-center">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={h2} style={{ lineHeight: `${titleLeading}px` }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

/** Carousel bars under the process slide (Figma 896:951). The design has one step; bars 2–4 have no content yet. */
function StepBars({ count }: { count: number }) {
  return (
    <div className="flex justify-center gap-[17px]">
      {Array.from({ length: 4 }, (_, i) =>
        i < count ? (
          <span key={i} aria-current="step" className="flex h-4 w-[43px] items-center">
            <span className="block h-1 w-full bg-black" />
          </span>
        ) : (
          <PlaceholderLink
            key={i}
            reason="process step not designed yet"
            aria-label={`Step ${i + 1}`}
            className="group flex h-4 w-[43px] items-center"
          >
            <span className="block h-0.5 w-full bg-[#9e9e9e] transition-colors group-hover:bg-black/60" />
          </PlaceholderLink>
        ),
      )}
    </div>
  );
}

export function TreatmentDetail({ t }: { t: Treatment }) {
  const pricing = pricingFor(t.name);
  const { hero, process, outcomes, why, calc, family, faq } = t;

  return (
    <>
      {/* Hero 239:1139 — 680px */}
      <PageHero
        image={hero.image ? { src: hero.image.ref, place: hero.image.place } : null}
        height={680}
        kicker={hero.kicker}
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

      {/* The Process 896:937 — 999px */}
      <section className="h-[999px] pt-[95px]">
        <SectionHead eyebrow={process.kicker} title={process.title} titleLeading={60}>
          {process.description && (
            <p className="text-espresso w-[856px] text-[15px] leading-[30px]">
              {process.description}
            </p>
          )}
        </SectionHead>
        {process.slides.slice(0, 1).map((s) => (
          <div
            key={s.number}
            className="relative mx-auto mt-[50px] h-[524px] w-[1240px] overflow-hidden bg-black"
          >
            {figma(s.image)}
            <span
              aria-hidden
              className="from-brown to-brown/0 absolute inset-x-0 bottom-0 h-[207px] bg-gradient-to-t"
            />
            <p className="absolute top-[426px] left-[45px] text-[30px] leading-[22px] font-semibold tracking-[-2.1px] text-white">
              {s.number}
            </p>
            <p className="absolute top-[458px] left-[45px] text-[20px] leading-5 font-medium tracking-[-1.4px] text-white">
              {s.title}
            </p>
          </div>
        ))}
        <div className="mt-[55px]">
          <StepBars count={Math.min(1, process.slides.length)} />
        </div>
      </section>

      {/* Clinical Outcomes 896:957 — photos stay black placeholders until the owner sends real results */}
      <section className="h-[990px] pt-[59px]">
        <SectionHead eyebrow={outcomes.kicker} title={outcomes.title} titleLeading={74}>
          {outcomes.subtitle && (
            <p className="text-espresso -mt-[1px] text-[15px] leading-[23px]">
              {outcomes.subtitle}
            </p>
          )}
        </SectionHead>
        <div className="mx-auto mt-[50px] flex h-[524px] w-[1304px]">
          <div className="bg-brown w-[293px] shrink-0 px-8 pt-8 text-white">
            <p className="text-[17px] leading-[23px] font-bold">{outcomes.caseTitle}</p>
            <dl className="mt-[79px] flex w-[228px] flex-col gap-[34px]">
              {outcomes.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[17px] leading-[25px] font-bold">{f.label}</dt>
                  <dd className="text-[15px] leading-[25px]" style={{ width: f.width }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {[outcomes.before, outcomes.after].map((label, i) => (
            <div
              key={label}
              className={`relative h-full overflow-hidden bg-black ${i ? "w-[506px]" : "w-[505px]"}`}
            >
              {figma(outcomes.images[i] ?? null)}
              <span className="absolute top-[29px] left-[37px] flex h-[26px] items-center bg-black/60 px-4 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Why clients love… 896:1157 — card photos are black placeholders on most frames */}
      <section className="h-[1222px] pt-[46px]">
        <div className="mx-auto flex max-w-[1290px] flex-col items-center gap-[28px] text-center">
          <h2 className={`${h2} leading-[50px]`}>{why.title}</h2>
          {why.subtitle && <p className="text-espresso text-[15px] leading-5">{why.subtitle}</p>}
        </div>
        <ul className="mx-auto mt-[67px] grid w-[1251px] grid-cols-2 gap-x-[43px] gap-y-[53px]">
          {why.cards.map((c) => (
            <li
              key={c.title}
              className="group relative h-[374px] overflow-hidden bg-black text-white"
            >
              {c.image && (
                <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                  {figma(c.image)}
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 flex flex-col px-[24.5px] pb-[23px]">
                <p className="text-[17px] leading-[14.4px] font-semibold tracking-[-0.8px]">
                  {c.title}
                </p>
                <p
                  className="mt-[21px] text-[15px] leading-[16.8px] tracking-[-0.4px]"
                  style={{ width: c.descriptionWidth + 1 }}
                >
                  {c.description}
                </p>
                <span
                  aria-hidden
                  className="mt-[15px] ml-[3.6px] block h-px w-[264.4px] bg-white/30"
                />
                {c.link && (
                  <BookingLink
                    treatment={t.slug}
                    className="mt-5 ml-[3.6px] flex items-center gap-[14px] text-[17px] leading-[19px] tracking-[-0.5px] hover:underline"
                  >
                    <span
                      aria-hidden
                      className="text-[15.5px] leading-[17.3px] transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                    {c.link}
                  </BookingLink>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Price Calculation 239:1357 — 912px + 85px gap to the family banner */}
      <section id="price" className="h-[997px] pt-[44px]">
        <SectionHead eyebrow={calc.kicker} title={calc.title} titleLeading={74}>
          {calc.subtitle && (
            <p className="text-espresso -mt-[1px] text-[15px] leading-[23px]">{calc.subtitle}</p>
          )}
        </SectionHead>
        <div className="mt-[50px]">
          <PriceCalculator labels={calc} pricing={pricing} />
        </div>
      </section>

      {/* Be a part of the family 239:1399 — 633px */}
      <section className="relative h-[633px] overflow-hidden bg-black">
        {figma(family.image)}
        <div className="absolute top-[153px] left-[353px] flex w-[744px] flex-col gap-[28px]">
          <p className="text-cream text-center text-[17px] leading-4 tracking-[-0.3px]">
            {family.kicker}
          </p>
          <h2 className="text-center text-[50px] leading-[74px] font-medium tracking-[-4px] text-white">
            {family.title}
          </h2>
          <p className="text-[17px] leading-[30px] text-white">{family.text}</p>
        </div>
        {family.cta && (
          <Link
            href="/membership"
            className="text-cocoa hover:bg-cream absolute top-[433px] left-[568px] flex h-[48.9px] w-[305px] items-center justify-center bg-white text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] transition-colors"
          >
            {family.cta}
          </Link>
        )}
      </section>

      {/* FAQ 239:1097 — white, 830px; the footer starts 38px below it (Footer adds 39px) */}
      <section className="relative -mb-px h-[830px] overflow-hidden bg-white">
        {figma(faq.image)}
        <div className="absolute top-[56px] left-[724px]">
          <h2 className="text-[65px] leading-[76px] font-medium tracking-[-5.2px] whitespace-pre-line text-black">
            {faq.title}
          </h2>
          <div className="mt-[50px] ml-1">
            <FaqAccordion items={faq.items} />
          </div>
        </div>
      </section>
    </>
  );
}
