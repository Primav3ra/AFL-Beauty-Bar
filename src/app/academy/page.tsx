import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { Band, Eyebrow, Runs, SECTION_GAP, btnWhite } from "@/components/blocks";
import { Crown, Doc, Growth, MedicalCase, Mentor, Rocket, Rosette, Storefront } from "@/components/academy/icons";
import { ArrowLong, ArrowRight } from "@/components/icons";
import { place, refOf } from "@/lib/figma";

export const metadata: Metadata = { title: "Academy" };

// Academy 411:671 (1440×8528). Page content starts at frame y=111 (below the navbar) and ends at
// y=7240; the footer's own 39px margin brings it to the frame's 7279. Offsets are section-relative.

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

const h2 = "text-[44px] leading-[52px] font-medium tracking-[-3px] text-espresso";
const accent = "text-[52px] font-medium tracking-[-3px]";

export default function AcademyPage() {
  const h = place("758:461", "411:888");
  // The frame hero starts at y=105, the page content at 111.
  const hero = { ...h, place: { ...h.place, box: { ...h.place.box, y: h.place.box.y - 6 } } };

  return (
    <>
      {/* Hero 411:888 */}
      <Band
        backdrop={hero}
        frameH={729}
        priority
        className="h-[729px]"
        aria-labelledby="academy-title"
        underlay={<div aria-hidden className="absolute -inset-x-[20%] top-[374px] h-[637px] bg-black opacity-85 blur-[86px]" />}
      >
        <p className="absolute top-[303px] left-[139px] flex h-10 w-[171px] items-center justify-center bg-black/60 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
          Academy
        </p>
        <div className="absolute top-[374px] left-[139px] w-[810px]">
          <h1 id="academy-title" className="text-[60px] leading-[76.6px] font-semibold tracking-[-4.2px] whitespace-nowrap text-white">
            Welcome To The
            <br />
            <Runs runs={[{ text: "AFL Masterclass Academy", accent: true }]} accentClass="text-[80px] font-medium tracking-[-5.6px]" />
          </h1>
          <p className="mt-9 text-[17px] leading-[23px] whitespace-nowrap text-white">
            Learn more about how you can learn the AFL Beauty way to success with our Med Spa Master Class.
          </p>
          <BookingLink type="virtual" className={`${btnWhite} mt-[27px] w-[248px] leading-5 text-[#1a1a1a]`}>
            Schedule Consultation
          </BookingLink>
        </div>
      </Band>

      {/* Fatema Love Academy 411:724 — compact; the photo stays pinned while the copy scrolls past */}
      <section className="mt-24 flex items-start justify-center gap-20 px-[111px]" aria-labelledby="mentorship-title">
        <div data-reveal className="w-[440px] shrink-0 text-espresso">
          <Eyebrow>Fatema Love Academy</Eyebrow>
          <h2 id="mentorship-title" className="mt-4 text-[44px] leading-[52px] font-medium tracking-[-3px]">
            Fatema Love <Runs runs={[{ text: "Academy", accent: true }]} accentClass="text-[52px] font-medium tracking-[-3px]" />
          </h2>
          <p className="mt-5 text-[15px] leading-[26px] text-espresso/80">
            Led by industry expert Fatema Love, this hands-on mentorship program equips you with the tools, strategies, and industry connections needed to launch and scale a thriving spa business from scratch.
          </p>
          <ul className="mt-9 flex flex-col gap-6">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex gap-3">
                <Icon className="size-7 shrink-0" />
                <p className="text-[14px] leading-6 text-espresso/80">
                  <strong className="block text-[15px] leading-6 font-bold text-espresso">{title}</strong>
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <PlaceholderLink
            reason="no mentorship application/checkout target"
            className="mt-8 inline-flex h-[46px] items-center justify-center gap-[10px] bg-brown px-6 text-[15px] leading-5 font-medium tracking-[-0.3px] text-white transition-colors hover:bg-espresso"
          >
            <Crown className="size-5" />
            Claim Your Mentorship →
          </PlaceholderLink>
        </div>

        <div data-reveal="from-right" className="sticky top-[117px] h-[560px] w-[500px] shrink-0">
          <div className="group absolute inset-y-0 right-0 w-[440px] overflow-hidden bg-black">
            <FigmaImage src={refOf("426:996")} cover sizes="440px" position="50% 20%" className="transition-transform duration-700 ease-out group-hover:scale-105" alt="Fatema Love" />
          </div>
          <div className="absolute bottom-10 left-0 w-[250px] bg-linen p-6 text-espresso">
            <p className="text-[40px] leading-[46px] font-semibold tracking-[-3px]">2.7M+</p>
            <p className="mt-1 text-[14px] leading-5 font-medium">Happy Students Worldwide</p>
            {/* Four overlapping brown discs with a linen outline; the leftmost sits on top. */}
            <div aria-hidden className="mt-4 flex">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="-ml-3 size-11 rounded-full border-4 border-linen bg-brown first:ml-0" style={{ zIndex: 4 - i }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Professional Accreditation 411:756 */}
      <section data-reveal className="relative h-[760px]" aria-labelledby="license-title">
        <div className="absolute top-[43px] left-[119px]">
          <Eyebrow>Professional Accreditation</Eyebrow>
          <h2 id="license-title" className={`mt-7 whitespace-nowrap ${h2}`}>Fast-Track Your Professional License</h2>
          <p className="mt-7 text-[15px] leading-5 text-espresso">98% First-Attempt Board Exam Pass Rate</p>
        </div>
        <div className="absolute top-[235px] left-[119px] h-[524px] w-[1203px] overflow-hidden bg-brown">
          <FigmaImage {...place("441:1088", "441:1085")} alt="Treatment room at the AFL NYC office" />
          <div className="absolute top-[97px] left-[54px] flex w-[451px] flex-col gap-[35px]">
            <Eyebrow className="text-white/40">Professional Accreditation</Eyebrow>
            <h3 className="w-[388px] text-[40px] leading-[50px] font-medium tracking-[-3.2px] text-white">
              Elevate Your Mastery. Get Nationally Certified
            </h3>
            <p className="w-[345px] text-[15px] leading-5 text-white">
              Step into high-tier industry practice with state-approved clinical training, elite exam prep, and streamlined state licensing support.
            </p>
            <PlaceholderLink
              reason="no accreditation application form"
              className="flex h-[49px] w-[291px] items-center justify-center gap-[11.5px] bg-white text-[17px] leading-5 font-semibold tracking-[-0.5px] text-black transition-colors hover:bg-cream"
            >
              <Doc className="size-6" />
              Start Your Application →
            </PlaceholderLink>
          </div>
        </div>
      </section>

      {/* Career Pathways 441:1090 */}
      <section data-reveal className="relative mt-12 h-[700px]" aria-labelledby="cma-title">
        <div className="absolute top-[46px] left-1/2 flex w-[513px] -translate-x-1/2 flex-col items-center text-center">
          <Eyebrow>Career Pathways</Eyebrow>
          <h2 id="cma-title" className={`mt-7 ${h2}`}>
            Certified Clinical Medical Assistant <Runs runs={[{ text: "Academy", accent: true }]} accentClass={accent} />
          </h2>
          <p className="mt-7 text-[15px] leading-5 text-espresso">100% Practical &amp; Clinical Training</p>
        </div>
        {pathways.map((p) => (
          <article key={p.card} className="group absolute top-[309px] h-[375px] overflow-hidden bg-black" style={{ left: p.left, width: p.width }}>
            <FigmaImage {...place(p.img, p.card)} className="transition-transform duration-700 ease-out group-hover:scale-105" />
            <span aria-hidden className={`absolute left-px w-[580px] bg-gradient-to-t ${p.grad} to-transparent`} style={{ top: p.gradTop, height: p.gradH }} />
            <h3 className="absolute top-[241px] left-[40.5px] text-[17px] leading-[14.4px] font-semibold tracking-[-0.8px] whitespace-nowrap text-white">{p.title}</h3>
            <p className="absolute top-[278.5px] left-[40.8px] w-[279.8px] text-[15px] leading-[21px] tracking-[-0.3px] text-white/70">{p.text}</p>
          </article>
        ))}
      </section>

      {/* Injector Academy 701:2614 — the design's cards have no photos, so they're compact text cards */}
      <section className="mt-24 px-[111px]" aria-labelledby="injector-title">
        <div data-reveal className="flex flex-col items-center text-center">
          <Eyebrow>Advanced Aesthetic Training</Eyebrow>
          <h2 id="injector-title" className={`mt-5 ${h2}`}>
            Injector <Runs runs={[{ text: "Academy", accent: true }]} accentClass={accent} />
          </h2>
          <p className="mt-5 text-[15px] leading-5 text-espresso/80">100% Practical &amp; Clinical Training</p>
        </div>
        <ul data-reveal="stagger" className="mt-12 grid grid-cols-3 gap-5">
          {masterclasses.map((m) => (
            <li key={m.title} className={`group flex flex-col bg-white p-7 text-espresso transition-shadow duration-300 hover:shadow-[0_24px_48px_-24px_rgba(48,35,28,0.35)] ${m.wide ? "col-span-3" : ""}`}>
              <h3 className="text-[17px] leading-6 font-semibold tracking-[-0.5px]">{m.title}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[22px] text-espresso/75">{m.text}</p>
              <PlaceholderLink
                reason={`no course detail/booking page for "${m.title}"`}
                aria-label={`${m.title}: results, details & booking`}
                className="mt-6 flex items-center gap-3 border-t border-espresso/15 pt-4 text-[15px] leading-5 font-medium tracking-[-0.3px] hover:underline"
              >
                <ArrowRight className="h-[9px] w-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                Results, details &amp; booking
              </PlaceholderLink>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA 758:471 */}
      {/* Figma image filters: exposure -0.49, contrast +0.3, shadows -0.29 */}
      <Band backdrop={place("778:734", "758:471")} frameH={617} imageClass="brightness-[.68] contrast-[1.15]" className={`${SECTION_GAP} h-[617px]`} aria-labelledby="academy-cta-title">
        <div data-reveal className="absolute top-[222px] left-[249px] flex w-[943px] flex-col items-center gap-[30px] text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] whitespace-pre text-cream">Elevate Your Beauty</p>
          <h2 id="academy-cta-title" className="text-[50px] leading-[50px] font-medium tracking-[-3px] text-white">
            Book your appointment online today
          </h2>
          <BookingLink type="virtual" className={`${btnWhite} h-[49px] px-8 whitespace-nowrap text-cocoa`}>
            Schedule Consultation
          </BookingLink>
        </div>
      </Band>

      {/* Be a part of the family 455:1242 */}
      <Band backdrop={{ src: "f6c095f9", place: { box: { x: 0, y: 0, w: 1441, h: 633 } } }} frameH={633} className="h-[633px]" aria-labelledby="family-title">
        <div data-reveal className="absolute top-[184px] left-[353px] flex w-[744px] flex-col gap-5 text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="family-title" className="text-[50px] leading-[74px] font-medium tracking-[-4px] text-white">
            Be a part of the family.
          </h2>
          <p className="text-[15px] leading-[30px] text-white">
            Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!
          </p>
        </div>
        <Link href="/membership" className={`${btnWhite} group absolute top-[443px] left-[568px] h-[48.9px] w-[305px] gap-1.5 text-cocoa`}>
          {/* Figma text is "See membership packages -->"; Inter draws "-->" as a long arrow there, the web subset lacks the ligature. */}
          See membership packages
          <ArrowLong className="h-[10px] w-[21px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </Band>
    </>
  );
}
