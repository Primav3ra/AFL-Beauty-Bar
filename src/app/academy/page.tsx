import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { CtaBanner, Eyebrow, INTRO_GAP, PageHero, Runs, SectionIntro, btnBrown, btnWhite } from "@/components/blocks";
import { Crown, Doc, Growth, MedicalCase, Mentor, Rocket, Rosette, Storefront } from "@/components/academy/icons";
import { ArrowLong, ArrowRight } from "@/components/icons";
import { place, refOf } from "@/lib/figma";

export const metadata: Metadata = { title: "Academy" };

// Academy 411:671: hero, mentorship (pinned photo), accreditation, career pathways, injector courses, banners.

const features = [
  { Icon: Mentor, title: "1-on-1 Mentorship & Planning", text: "Tailored, step-by-step guidance through practice setup, growth, and long-term expansion." },
  { Icon: Storefront, title: "Supplier & Vendor Access", text: "Bypass costly trial-and-error with direct access to vetted suppliers, equipment lines, and industry plugs." },
  { Icon: Rosette, title: "Turnkey Legal Assets", text: "Instantly protect your business with ready-to-use client consent forms and medical provider contracts." },
  { Icon: Growth, title: "Growth & Marketing Playbook", text: "Master modern client acquisition, high-converting social media strategies, and premium brand positioning." },
  { Icon: Rocket, title: "Full-Scale Launch Roadmap", text: "Structured operational frameworks designed for seamless day-one setup and long-term expansion." },
  { Icon: MedicalCase, title: "Medical Compliance", text: "Structured operational frameworks designed for seamless day-one setup and long-term expansion." },
];

const pathways = [
  {
    card: "441:1104", img: "447:1199", left: 126.9, width: 581, gradTop: 162, gradH: 213, grad: "from-black",
    title: "Medical Assistant, CMA (NHA)",
    text: "Master clinical diagnostics, patient intake, and administrative workflows for national NHA certification.",
  },
  {
    card: "447:1210", img: "455:1464", left: 732.1, width: 582, gradTop: 172, gradH: 203, grad: "from-black/80",
    title: "Phlebotomy Specialist",
    text: "Develop precise venipuncture techniques, specimen collection standards, and lab safety protocols.",
  },
];

const masterclasses = [
  { title: "Injectable Technique Core", w: 368, text: "Master precise depth control, cannula safety, and product selection for consistent, natural outcomes." },
  // Descriptions were swapped in Figma (BBL ↔ shadowing); corrected here.
  { title: "Non-Surgical BBL Masterclass", w: 419, text: "Learn non-invasive hip and gluteal enhancement techniques using biostimulators and high-volume body fillers." },
  { title: "Shadow Master Injections", w: 503, text: "Gain hands-on clinical exposure by observing expert injectors with live patients. Study advanced mapping and consultation workflows." },
  { title: "Toxins Masterclass", w: 495, text: "Refine your application of neuromodulators for wrinkle reduction and facial slimming. Focuses on dynamic muscle analysis and injection zone mapping." },
  { title: "Lip Filler Masterclass", w: 495, text: "Specialize in popular lip techniques, volume restoration, and border definition. Emphasizes vascular safety and minimizing tissue trauma." },
  { title: "Facial Balancing Masterclass", w: 495, text: "Understand full-face harmonization using strategic dermal filler placement. Focuses on golden-ratio aesthetics, jawline sculpting and chin projection." },
  { title: "Package for all Masterclasses", w: 907, text: "Get complete access to the full training suite covering advanced facial and body injectable techniques. Includes full curriculum materials, clinical resources, and bundled certification.", wide: true },
];

const academy = (lead: string) => (
  <>
    {lead} <Runs runs={[{ text: "Academy", accent: true }]} />
  </>
);

export default function AcademyPage() {
  return (
    <>
      {/* Hero 411:888 */}
      <PageHero
        id="academy-title"
        size="feature"
        tint="black"
        image={place("758:461", "411:888")}
        frameH={729}
        kicker="Academy"
        title={
          <>
            Welcome To The <Runs runs={[{ text: "AFL Masterclass Academy", accent: true }]} />
          </>
        }
        description="Learn more about how you can learn the AFL Beauty way to success with our Med Spa Master Class."
      >
        <BookingLink type="virtual" className={`${btnWhite} text-[#1a1a1a]`}>
          Schedule Consultation
        </BookingLink>
      </PageHero>

      {/* Fatema Love Academy 411:724 — from 768px the photo stays pinned while the copy scrolls past */}
      <section className="section container-site flex flex-col-reverse gap-8 md:flex-row md:items-start md:justify-center md:gap-14 lg:gap-20" aria-labelledby="mentorship-title">
        <div data-reveal className="text-espresso md:w-[400px] md:shrink-0">
          <Eyebrow>Fatema Love Academy</Eyebrow>
          <h2 id="mentorship-title" className="mt-3 text-h2 font-medium">
            {academy("Fatema Love")}
          </h2>
          <p className="mt-5 text-body text-espresso/80">
            Led by industry expert Fatema Love, this hands-on mentorship program equips you with the tools, strategies, and industry connections needed to launch and scale a thriving spa business from scratch.
          </p>
          <ul className="mt-8 flex flex-col gap-5">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="size-6 shrink-0" />
                <p className="text-small text-espresso/80">
                  <strong className="block text-body font-bold text-espresso">{title}</strong>
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <PlaceholderLink reason="no mentorship application/checkout target" className={`${btnBrown} mt-8`}>
            <Crown className="size-5" />
            Claim Your Mentorship →
          </PlaceholderLink>
        </div>

        <div data-reveal="from-right" className="relative h-[420px] w-full shrink-0 sm:h-[500px] md:sticky md:top-[88px] md:w-[440px]">
          <div className="group absolute inset-y-0 right-0 w-full overflow-hidden bg-black md:w-[400px]">
            <FigmaImage src={refOf("426:996")} cover sizes="(min-width: 768px) 400px, 100vw" position="50% 20%" className="transition-transform duration-700 ease-out group-hover:scale-105" alt="Fatema Love" />
          </div>
          <div className="absolute bottom-6 left-4 w-[220px] bg-linen p-5 text-espresso md:bottom-10 md:left-0">
            <p className="text-[34px] leading-[40px] font-semibold tracking-[-2px]">2.7M+</p>
            <p className="mt-1 text-small font-medium">Happy Students Worldwide</p>
            {/* Four overlapping brown discs with a linen outline; the leftmost sits on top. */}
            <div aria-hidden className="mt-3 flex">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="-ml-3 size-10 rounded-full border-4 border-linen bg-brown first:ml-0" style={{ zIndex: 4 - i }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Accreditation 411:756 */}
      <section className="section container-site" aria-labelledby="license-title">
        <SectionIntro align="left" id="license-title" eyebrow="Professional Accreditation" title="Fast-Track Your Professional License" text="98% First-Attempt Board Exam Pass Rate" />
        <div data-reveal className={`${INTRO_GAP} grid overflow-hidden bg-brown md:grid-cols-2`}>
          <div className="flex flex-col items-start gap-5 p-6 sm:p-10 lg:p-12">
            <p className="text-small text-white/50">Professional Accreditation</p>
            <h3 className="max-w-[360px] text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] leading-tight font-medium tracking-[-0.05em] text-white">
              Elevate Your Mastery. Get Nationally Certified
            </h3>
            <p className="max-w-[340px] text-body text-white/90">
              Step into high-tier industry practice with state-approved clinical training, elite exam prep, and streamlined state licensing support.
            </p>
            <PlaceholderLink reason="no accreditation application form" className={`${btnWhite} mt-2 font-semibold text-black`}>
              <Doc className="size-5" />
              Start Your Application →
            </PlaceholderLink>
          </div>
          <div className="relative h-[260px] md:h-auto md:min-h-[420px]">
            <FigmaImage src={refOf("441:1088")} cover sizes="(min-width: 768px) 600px, 100vw" alt="Treatment room at the AFL NYC office" />
          </div>
        </div>
      </section>

      {/* Career Pathways 441:1090 */}
      <section className="section container-site" aria-labelledby="cma-title">
        <SectionIntro id="cma-title" eyebrow="Career Pathways" title={academy("Certified Clinical Medical Assistant")} text="100% Practical & Clinical Training" />
        <div data-reveal="stagger" className={`${INTRO_GAP} grid gap-4 md:grid-cols-2`}>
          {pathways.map((p) => (
            <article key={p.card} className="group relative h-[300px] overflow-hidden bg-black md:h-[340px]">
              <FigmaImage src={refOf(p.img)} cover sizes="(min-width: 768px) 600px, 100vw" className="transition-transform duration-700 ease-out group-hover:scale-105" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <h3 className="text-h3 font-semibold text-white">{p.title}</h3>
                <p className="mt-2 max-w-[320px] text-small text-white/75">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Injector Academy 701:2614 — the design's cards have no photos, so they're compact text cards */}
      <section className="section container-site" aria-labelledby="injector-title">
        <SectionIntro id="injector-title" eyebrow="Advanced Aesthetic Training" title={academy("Injector")} text="100% Practical & Clinical Training" />
        <ul data-reveal="stagger" className={`${INTRO_GAP} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
          {masterclasses.map((m) => (
            <li key={m.title} className={`group flex flex-col bg-white p-6 text-espresso transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(48,35,28,0.35)] ${m.wide ? "sm:col-span-2 lg:col-span-3" : ""}`}>
              <h3 className="text-h3 font-semibold">{m.title}</h3>
              <p className="mt-2 flex-1 text-small text-espresso/75">{m.text}</p>
              <PlaceholderLink
                reason={`no course detail/booking page for "${m.title}"`}
                aria-label={`${m.title}: results, details & booking`}
                className="mt-5 flex items-center gap-3 border-t border-espresso/15 pt-3.5 text-small font-medium hover:underline"
              >
                <ArrowRight className="h-[9px] w-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                Results, details &amp; booking
              </PlaceholderLink>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA 758:471 — Figma image filters: exposure -0.49, contrast +0.3, shadows -0.29 */}
      <CtaBanner id="academy-cta-title" image={place("778:734", "758:471")} imageClass="brightness-[.68] contrast-[1.15]" kicker="Elevate Your Beauty" title="Book your appointment online today">
        <BookingLink type="virtual" className={`${btnWhite} text-cocoa`}>
          Schedule Consultation
        </BookingLink>
      </CtaBanner>

      {/* Be a part of the family 455:1242 */}
      <CtaBanner
        id="family-title"
        image={{ src: "f6c095f9", place: { box: { x: 0, y: 0, w: 1441, h: 633 } } }}
        frameH={633}
        kicker="Elevate Your Beauty"
        title="Be a part of the family."
        text="Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!"
      >
        <Link href="/membership" className={`${btnWhite} group text-cocoa`}>
          See membership packages
          <ArrowLong className="h-[10px] w-[21px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CtaBanner>
    </>
  );
}
