import Image from "next/image";
import Link from "next/link";
import { BeforeAfter, type BaCase } from "@/components/BeforeAfter";
import { BookingLink } from "@/components/BookingLink";
import { ClinicSelector } from "@/components/ClinicSelector";
import { FigmaImage } from "@/components/FigmaImage";
import { Marquee } from "@/components/Marquee";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { Reviews } from "@/components/Reviews";
import { SplitGrid, StickySplit } from "@/components/StickySplit";
import { CtaBanner, Eyebrow, INTRO_GAP, PageHero, SectionIntro, btnOutline, btnWhite } from "@/components/blocks";
import { ArrowRight } from "@/components/icons";
import { links } from "@/config/links";
import { reviews } from "@/data/reviews";
import { treatmentHref } from "@/data/treatments";
import { place, refOf } from "@/lib/figma";

// Landing_Page 12:1078. Cream content sections use the `section` rhythm inside the site container; the hero,
// logo strip, review block and CTA are full-width bands that sit flush against each other.

const logos = ["85:847", "85:849", "85:851", "85:853", "85:855", "85:857"];
const logoNames = ["Dr. Phil", "New York Post", "TLC", "Daily News", "Hollywood Unlocked", "E! News"];

// "Find your starting point" tiles (33:1655) with the On Hover copy from 675:1011.
const goals = [
  { img: "951:4390", title: "Soften lines", link: "Botox and Neurotoxins", href: treatmentHref("Neurotoxins") },
  { img: "951:4379", title: "Balance my features", link: "Facial Balancing", href: treatmentHref("Facial Balancing") },
  { img: "951:4387", title: "Improve my skin", link: "Microneedling", href: treatmentHref("Microneedling") },
  { img: "955:4408", title: "Shape my body", link: "Non-Surgical BBL", href: treatmentHref("Non-surgical BBL") },
  { img: "955:4401", title: "Reduce unwanted hair", link: "Laser Hair Removal", href: null },
  { img: "951:4394", title: "Support my wellness", link: "IV Therapy", href: treatmentHref("IV Therapy") },
];

const goalId = (img: string) => `goal-${img.replace(":", "-")}`;

// Cases from the Before/After section; photos split by scripts/crop-before-after.mjs.
const beforeAfter: BaCase[] = [
  { id: "lip-filler-1", title: "Lip Filler", href: treatmentHref("Lip Fillers") },
  { id: "facial-balancing", title: "Facial Balancing", href: treatmentHref("Facial Balancing") },
  { id: "chin-filler", title: "Chin Filler", href: null },
  { id: "lip-filler-2", title: "Lip Filler, fuller", href: treatmentHref("Lip Fillers") },
];

// Featured cards from the updated Figma carousel (VrMoek… frame 1131:35); photos in public/img/featured.
// The frame has Facial Balancing twice, so the two are ordered to never sit side by side in the loop.
const featured = [
  { img: "facial-balancing-1", name: "Facial Balancing", tag: "Injectables", text: "Strategic filler placement across multiple areas to bring the face into natural harmony." },
  { img: "salmon-dna-facial", name: "Salmon DNA Facial", tag: "Skin", text: "Polynucleotides that repair, hydrate and brighten tired, stressed skin from within." },
  { img: "facial-balancing-2", name: "Facial Balancing", tag: "Injectables", text: "Cheeks, chin and jawline planned together, so every feature suits the next." },
  { img: "non-surgical-bbl", name: "Non-surgical BBL", tag: "Body", text: "Lift and shape the hips and glutes with fillers and biostimulators instead of surgery." },
];

const cardTitle = "text-h3 font-semibold text-white";

export default function Home() {
  const hero = place("531:29", "85:684");
  return (
    <>
      {/* Hero 85:684 */}
      <PageHero
        id="hero-title"
        size="feature"
        image={hero}
        frameH={616}
        title={
          <>
            Still <span className="font-serif font-normal italic">thinking</span> about getting it done?
          </>
        }
        description="Maybe stop thinking about it."
        aside={<ClinicSelector />}
      >
        <BookingLink className={`${btnWhite} text-black`}>Book Appointment</BookingLink>
        <BookingLink type="virtual" className={btnOutline}>
          Schedule Virtual Consultation
        </BookingLink>
      </PageHero>

      {/* Featured in 557:98 — edge-to-edge white ticker, flush under the hero */}
      <section className="bg-white pt-5" aria-label="Featured in">
        <p className="text-center font-lora text-small font-medium text-espresso/70">As featured in</p>
        <Marquee label="Press logos" itemWidth={216} gap={0} seconds={30}>
          {logos.map((id, i) => {
            const p = place(id, "557:98");
            const b = p.place.box;
            // Each logo keeps its design position and crop inside its 240px cell, at 90%. Several logo files
            // are square with the mark in a band across the middle, so the crop rect (img) must be kept.
            const k = 0.9;
            const box = { x: (b.x - i * 240) * k, y: (b.y - 32) * k, w: b.w * k, h: b.h * k };
            const img = p.place.img && { x: p.place.img.x * k, y: p.place.img.y * k, w: p.place.img.w * k, h: p.place.img.h * k };
            return (
              <span key={id} className="relative block h-[68px] w-[216px]">
                <FigmaImage src={p.src} place={{ ...p.place, box, img }} alt={logoNames[i]} />
              </span>
            );
          })}
        </Marquee>
      </section>

      {/* Beauty Taking section 33:1649 — sticky left column while the tiles scroll (Figma note 130:1474) */}
      <StickySplit
        id="goals-title"
        eyebrow="Find your starting point"
        title="Where is your beauty taking you?"
        text="Pick what you want to change. We’ll point you to the treatment that does it."
        index={goals.map((g) => ({ id: goalId(g.img), label: g.title }))}
        indexLabel="Goals: jump to a goal"
      >
        <SplitGrid>
          {goals.map((g) => {
            const inner = (
              <span className="block h-[190px] sm:h-[240px] md:h-[260px]">
                <FigmaImage src={refOf(g.img)} cover sizes="(min-width: 768px) 300px, 50vw" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5">
                  <span className="block text-[15px] leading-5 font-semibold text-white sm:text-h3">{g.title}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-[12px] leading-4 font-medium text-white/75 transition-colors group-hover:text-white sm:gap-2 sm:text-small">
                    {g.link}
                    <ArrowRight className="h-[9px] w-[13px] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </span>
            );
            const cls = "group relative block overflow-hidden bg-black";
            return (
              <div key={g.img} id={goalId(g.img)} className="scroll-mt-[140px]">
                {g.href ? (
                  <Link href={g.href} className={cls} aria-label={`${g.title}: ${g.link}`}>
                    {inner}
                  </Link>
                ) : (
                  <PlaceholderLink reason="no Laser Hair Removal detail page" className={cls} aria-label={`${g.title}: ${g.link}`}>
                    {inner}
                  </PlaceholderLink>
                )}
              </div>
            );
          })}
        </SplitGrid>
      </StickySplit>

      {/* Before/After Section 39:2102 — one comparison slider instead of stacked cards */}
      <section className="section container-site" aria-labelledby="ba-title">
        <SectionIntro
          id="ba-title"
          eyebrow="Real results"
          title="A little before. A lot of after."
          text="Real clients, real results. Drag the line to compare, with every detail in its place."
        />
        <div data-reveal className={INTRO_GAP}>
          <BeforeAfter cases={beforeAfter} />
        </div>
      </section>

      {/* Treatments 90:910 */}
      <section className="section" aria-labelledby="featured-title">
        <SectionIntro
          className="container-site"
          id="featured-title"
          title={"Treatments people drive\nacross town for."}
          text="Our most requested treatments, because apparently a little drive isn’t going to stop anyone."
        />
        <div data-reveal className={INTRO_GAP}>
          <Marquee label="Featured treatments" itemWidth={280} seconds={50}>
            {featured.map((c) => {
              const href = treatmentHref(c.name);
              return (
                <article key={c.img} className="group relative h-[380px] overflow-hidden bg-espresso">
                  <Image src={`/img/featured/${c.img}.webp`} alt="" fill sizes="280px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <p className="text-[12px] leading-4 text-white/70">{c.tag}</p>
                    <h3 className={`mt-1.5 ${cardTitle}`}>
                      <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:underline">
                        {c.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-small text-white/75">{c.text}</p>
                    <BookingLink
                      treatment={href.split("/").pop()}
                      className="relative z-10 mt-4 flex items-center gap-3 border-t border-white/25 pt-3.5 text-small font-medium text-white transition-[gap] hover:gap-4"
                    >
                      Book now <ArrowRight className="h-[10px] w-[14px]" />
                    </BookingLink>
                  </div>
                </article>
              );
            })}
          </Marquee>
        </div>
      </section>

      {/* Reviews 130:2333 — full-width white band, flush against the CTA banner */}
      <section className="bg-white py-12 md:py-[72px]" aria-labelledby="reviews-title">
        <div data-reveal className="container-site flex flex-col items-center gap-8 md:flex-row md:gap-16 lg:gap-20">
          <div className="relative h-[320px] w-full shrink-0 overflow-hidden bg-black sm:h-[400px] md:w-[360px]">
            <FigmaImage src={refOf("130:2356")} cover sizes="(min-width: 768px) 360px, 100vw" position="50% 30%" alt="AFL client with her results" />
          </div>
          <div>
            <Eyebrow>
              <span id="reviews-title">Google Reviews</span>
            </Eyebrow>
            {/* Reviews come from src/data/reviews.ts (Google Reviews integration swap point). */}
            <Reviews reviews={reviews} googleBadge={<FigmaImage {...place("354:85", "354:87")} alt="" />}>
              <a
                href={links.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-body font-medium text-espresso underline underline-offset-4 transition-colors hover:text-brown"
              >
                Read more reviews on Google <ArrowRight className="h-[10px] w-[16px]" />
              </a>
            </Reviews>
          </div>
        </div>
      </section>

      {/* CTA 90:1249 */}
      <CtaBanner
        id="cta-title"
        image={place("130:1505", "90:1249")}
        kicker="Elevate Your Beauty"
        title="Schedule your consultation or book your appointment online today"
      >
        <BookingLink className={`${btnWhite} text-cocoa`}>Book Appointment</BookingLink>
      </CtaBanner>
    </>
  );
}
