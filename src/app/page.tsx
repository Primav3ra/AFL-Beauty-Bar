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
import { Band, SECTION_GAP, SectionIntro, btnOutline, btnWhite } from "@/components/blocks";
import { ArrowRight } from "@/components/icons";
import { links } from "@/config/links";
import { reviews } from "@/data/reviews";
import { treatmentHref } from "@/data/treatments";
import { place, refOf } from "@/lib/figma";

// Landing_Page 12:1078. Sections flow with one vertical rhythm (SECTION_GAP); the hero and CTA run
// edge to edge, everything else sits on the 1440px column with 111px side margins.

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


export default function Home() {
  const hero = place("531:29", "85:684");
  return (
    <>
      {/* Hero 85:684 */}
      <Band
        backdrop={hero}
        frameH={616}
        priority
        className="h-[616px]"
        aria-labelledby="hero-title"
        underlay={<div aria-hidden className="absolute -inset-x-[20%] bg-[#462416] opacity-90 blur-[150px]" style={{ top: 313, height: 628 }} />}
      >
        <div className="hero-in absolute top-[257px] left-[111px] w-[559px]">
          <h1 id="hero-title" className="text-[60px] leading-[70px] font-semibold tracking-[-2.4px] text-white">
            Still <span className="font-serif text-[70px] font-normal tracking-[-2.8px] italic">thinking</span> about getting it done?
          </h1>
          <p className="mt-[30px] text-xl leading-[28.5px] text-white">Maybe stop thinking about it.</p>
          <div className="mt-[41px] flex gap-[22px]">
            <BookingLink className={`${btnWhite} w-[208.3px] text-black`}>Book Appointment</BookingLink>
            <BookingLink type="virtual" className={`${btnOutline} w-[289px]`}>
              Schedule Virtual Consultation
            </BookingLink>
          </div>
        </div>
        <div className="absolute top-[476px] right-[111px]">
          <ClinicSelector />
        </div>
      </Band>

      {/* Featured in 557:98 — edge-to-edge white ticker; each logo keeps its design position in a 240px cell */}
      <section className="mt-12" aria-label="Featured in">
        <p className="text-center font-lora text-[15px] leading-4 font-medium text-espresso/70">As featured in</p>
        <div className="bleed mt-4 bg-white">
          <Marquee label="Press logos" itemWidth={240} gap={0} seconds={30}>
            {logos.map((id, i) => {
              const p = place(id, "557:98");
              const box = { ...p.place.box, x: p.place.box.x - i * 240, y: p.place.box.y - 32 };
              return (
                <span key={id} className="relative block h-[76px] w-[240px]">
                  <FigmaImage src={p.src} place={{ ...p.place, box }} alt={logoNames[i]} />
                </span>
              );
            })}
          </Marquee>
        </div>
      </section>

      {/* Beauty Taking section 33:1649 — sticky left column while the tiles scroll (Figma note 130:1474) */}
      <StickySplit
        id="goals-title"
        className={SECTION_GAP}
        eyebrow="Find your starting point"
        title="Where is your beauty taking you?"
        text="Pick what you want to change. We’ll point you to the treatment that does it."
        index={goals.map((g) => ({ id: goalId(g.img), label: g.title }))}
        indexLabel="Goals: jump to a goal"
      >
        <SplitGrid>
          {goals.map((g) => {
            const inner = (
              <span className="block h-[290px]">
                <FigmaImage src={refOf(g.img)} cover sizes="380px" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block text-[19px] leading-6 font-semibold tracking-[-0.6px] text-white">{g.title}</span>
                  <span className="mt-1.5 flex items-center gap-2 text-[15px] leading-5 font-medium tracking-[-0.4px] text-white/75 transition-colors group-hover:text-white">
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
      <section className={`${SECTION_GAP} px-[111px]`} aria-labelledby="ba-title">
        <SectionIntro
          id="ba-title"
          eyebrow="Real results"
          title="A little before. A lot of after."
          text="Real clients, real results. Drag the line to compare, with every detail in its place."
        />
        <div data-reveal className="mt-14">
          <BeforeAfter cases={beforeAfter} />
        </div>
      </section>

      {/* Treatments 90:910 */}
      <section className={`${SECTION_GAP} px-[111px]`} aria-labelledby="featured-title">
        <SectionIntro
          id="featured-title"
          title={"Treatments people drive\nacross town for."}
          text="Our most requested treatments, because apparently a little drive isn’t going to stop anyone."
        />
        <div data-reveal className="mt-12">
        <Marquee label="Featured treatments" itemWidth={300} seconds={50}>
          {featured.map((c) => {
            const href = treatmentHref(c.name);
            return (
              <article key={c.img} className="group relative h-[410px] overflow-hidden bg-espresso">
                <Image src={`/img/featured/${c.img}.webp`} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="text-[13px] leading-4 tracking-[-0.2px] text-white/70">{c.tag}</p>
                  <h3 className="mt-2 text-[21px] leading-7 font-semibold tracking-[-0.8px]">
                    <Link href={href} className="after:absolute after:inset-0 after:content-[''] hover:underline">
                      {c.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[14px] leading-5 tracking-[-0.2px] text-white/75">{c.text}</p>
                  <BookingLink
                    treatment={href.split("/").pop()}
                    className="relative z-10 mt-5 flex items-center gap-3 border-t border-white/25 pt-4 text-[15px] leading-5 font-medium tracking-[-0.4px] text-white transition-[gap] hover:gap-4"
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

      {/* Reviews 130:2333 — full-width white band */}
      <section className={`${SECTION_GAP} bleed bg-white`} aria-labelledby="reviews-title">
        <div data-reveal className="frame flex items-center gap-24 px-[111px] py-20">
          <div className="relative h-[460px] w-[440px] shrink-0 overflow-hidden bg-black">
            <FigmaImage src={refOf("130:2356")} cover sizes="440px" position="50% 30%" alt="AFL client with her results" />
          </div>
          <div>
            <p id="reviews-title" className="text-[15px] leading-4 font-medium tracking-[-0.2px] text-brown">
              Google Reviews
            </p>
            {/* Reviews come from src/data/reviews.ts (Google Reviews integration swap point). */}
            <Reviews reviews={reviews} googleBadge={<FigmaImage {...place("354:85", "354:87")} alt="" />}>
              <a
                href={links.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 text-[17px] leading-6 font-medium tracking-[-0.5px] text-espresso underline underline-offset-4 transition-colors hover:text-brown"
              >
                Read more reviews on Google <ArrowRight className="h-[10px] w-[16px]" />
              </a>
            </Reviews>
          </div>
        </div>
      </section>

      {/* CTA 90:1249 */}
      <Band backdrop={place("130:1505", "90:1249")} frameH={617} className={`${SECTION_GAP} h-[520px]`} aria-labelledby="cta-title">
        <div data-reveal className="absolute top-1/2 left-1/2 flex w-[900px] -translate-1/2 flex-col items-center gap-[26px] text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="cta-title" className="text-[50px] leading-[60px] font-medium tracking-[-3px] text-white">
            Schedule your consultation or book your appointment online today
          </h2>
          <BookingLink className={`${btnWhite} w-[208.3px] text-cocoa`}>Book Appointment</BookingLink>
        </div>
      </Band>
    </>
  );
}
