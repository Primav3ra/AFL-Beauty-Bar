import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { Eyebrow, Runs, btnWhite } from "@/components/blocks";
import { Crown, Doc, Growth, MedicalCase, Mentor, Rocket, Rosette, Storefront } from "@/components/academy/icons";
import { ArrowLong, ArrowRight } from "@/components/icons";
import { place } from "@/lib/figma";

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

const h2 = "text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso";
const accent = "text-[60px] font-medium tracking-[-4px]";

/** Double hairline between sections (Lines 300/301, 39px apart). */
function Rule({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`h-[40px] border-y border-black/10 ${className}`} />;
}

export default function AcademyPage() {
  const h = place("758:461", "411:888");
  // The frame hero starts at y=105, the page content at 111.
  const hero = { ...h, place: { ...h.place, box: { ...h.place.box, y: h.place.box.y - 6 } } };

  return (
    <>
      {/* Hero 411:888 */}
      <section className="relative h-[729px] overflow-hidden bg-black" aria-labelledby="academy-title">
        <FigmaImage {...hero} priority sizes="1440px" alt="AFL Academy graduates holding their certificates" />
        <div aria-hidden className="absolute bg-black opacity-85 blur-[86px]" style={{ left: -306, top: 374, width: 1973, height: 637 }} />
        <p className="absolute top-[303px] left-[139px] flex h-10 w-[171px] items-center justify-center bg-black/60 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
          / Academy
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
      </section>

      {/* Fatema Love Academy 411:724 */}
      <section className="relative h-[1277px]" aria-labelledby="mentorship-title">
        <div className="absolute top-[95px] left-[117px] w-[520.5px]">
          <Eyebrow>/ Fatema Love Academy</Eyebrow>
          <h2 id="mentorship-title" className={`mt-7 w-[319px] ${h2}`}>
            Fatema Love <Runs runs={[{ text: "Academy", accent: true }]} accentClass={accent} />
          </h2>
          <p className="mt-[50px] w-[510px] text-[15px] leading-[30px] text-espresso">
            Led by industry expert Fatema Love, this hands-on mentorship program equips you with the tools, strategies, and industry connections needed to launch and scale a thriving spa business from scratch.
          </p>
          <ul className="mt-[50px] flex flex-col gap-[25px]">
            {features.map(({ Icon, title, text }) => (
              <li key={title} className="flex h-[91px] gap-2.5 text-espresso">
                <Icon className="size-[35.5px] shrink-0" />
                <p className="w-[475px] text-[15px] leading-[30px]">
                  <strong className="block text-[17px] font-bold">{title}</strong>
                  {text}
                </p>
              </li>
            ))}
          </ul>
          <PlaceholderLink
            reason="no mentorship application/checkout target"
            className="mt-[50px] flex h-[49px] w-[291px] items-center justify-center gap-[11.5px] bg-brown text-[17px] leading-5 font-medium tracking-[-0.5px] text-white transition-colors hover:bg-espresso"
          >
            <Crown className="size-6" />
            Claim Your Mentorship →
          </PlaceholderLink>
        </div>

        <div className="group absolute top-[95px] left-[726.5px] h-[645px] w-[576px] overflow-hidden bg-black">
          <FigmaImage {...place("426:996", "426:990")} className="transition-transform duration-700 ease-out group-hover:scale-105" alt="Fatema Love" />
        </div>

        <div className="absolute top-[560px] left-[674px] h-[211px] w-[314px] bg-linen text-espresso">
          <p className="absolute top-[22px] left-7 text-[50px] leading-[60px] font-semibold tracking-[-4px]">2.7M+</p>
          <p className="absolute top-[89px] left-7 text-base leading-3 font-medium tracking-[-0.5px] whitespace-nowrap">Happy Students Worldwide</p>
          {/* Four overlapping brown discs with a 4px linen outline; the leftmost sits on top. */}
          <div aria-hidden>
            {[87, 58, 29, 0].map((x) => (
              <span key={x} className="absolute size-[55px] rounded-full border-4 border-linen bg-brown" style={{ top: 145, left: 24 + x }} />
            ))}
          </div>
        </div>
      </section>

      {/* Professional Accreditation 411:756 */}
      <section className="relative h-[802px]" aria-labelledby="license-title">
        <div className="absolute top-[43px] left-[119px]">
          <Eyebrow>/ Professional Accreditation</Eyebrow>
          <h2 id="license-title" className={`mt-7 whitespace-nowrap ${h2}`}>Fast-Track Your Professional License</h2>
          <p className="mt-7 text-[15px] leading-5 text-espresso">98% First-Attempt Board Exam Pass Rate</p>
        </div>
        <div className="absolute top-[235px] left-[119px] h-[524px] w-[1203px] overflow-hidden bg-brown">
          <FigmaImage {...place("441:1088", "441:1085")} alt="Treatment room at the AFL NYC office" />
          <div className="absolute top-[97px] left-[54px] flex w-[451px] flex-col gap-[35px]">
            <Eyebrow className="text-white/40">/ Professional Accreditation</Eyebrow>
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

      <Rule className="mt-[40px]" />

      {/* Career Pathways 441:1090 */}
      <section className="relative mt-[65px] h-[741px]" aria-labelledby="cma-title">
        <div className="absolute top-[46px] left-1/2 flex w-[513px] -translate-x-1/2 flex-col items-center text-center">
          <Eyebrow>/ Career Pathways</Eyebrow>
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

      <Rule className="mt-[55px]" />

      {/* Injector Academy 701:2614 */}
      <section className="relative mt-[38px] h-[1862px]" aria-labelledby="injector-title">
        <div className="absolute top-[46px] left-1/2 flex w-[789px] -translate-x-1/2 flex-col items-center text-center">
          <Eyebrow className="leading-[15.4px] whitespace-pre"> / Advanced Aesthetic Training</Eyebrow>
          <h2 id="injector-title" className={`mt-7 ${h2}`}>
            Injector <Runs runs={[{ text: "Academy", accent: true }]} accentClass={accent} />
          </h2>
          <p className="mt-7 text-[15px] leading-5 text-espresso">100% Practical &amp; Clinical Training</p>
        </div>
        <ul className="absolute top-[248px] left-[133px] grid w-[1175px] grid-cols-[567.3px_567.3px] gap-x-[40.4px] gap-y-[49.8px]">
          {masterclasses.map((m) => (
            <li key={m.title} className={`group relative h-[351.3px] bg-black text-white ${m.wide ? "col-span-2" : ""}`}>
              <h3 className="absolute top-[209.5px] left-[22.8px] text-[15.97px] leading-[13.6px] font-semibold tracking-[-0.8px] whitespace-nowrap">{m.title}</h3>
              <p className="absolute top-[237.5px] left-[23px] text-[14.09px] leading-[19px] tracking-[-0.4px]" style={{ width: m.w }}>
                {m.text}
              </p>
              <span aria-hidden className="absolute top-[299.2px] left-[26.4px] h-px w-[248.3px] bg-white/20" />
              <PlaceholderLink
                reason={`no course detail/booking page for "${m.title}"`}
                aria-label={`${m.title}: results, details & booking`}
                className="absolute top-[318.1px] left-[26.4px] flex h-3 items-center gap-4 text-[15.97px] leading-[17.9px] tracking-[-0.5px] whitespace-nowrap hover:underline"
              >
                <ArrowRight className="h-[9px] w-[11px] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                Results, details &amp; booking.
              </PlaceholderLink>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA 758:471 */}
      <section className="relative mt-[127px] h-[617px] overflow-hidden bg-black" aria-labelledby="academy-cta-title">
        {/* Figma image filters: exposure -0.49, contrast +0.3, shadows -0.29 */}
        <FigmaImage {...place("778:734", "758:471")} sizes="1440px" className="brightness-[.68] contrast-[1.15]" />
        <div className="absolute top-[222px] left-[249px] flex w-[943px] flex-col items-center gap-[30px] text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] whitespace-pre text-cream"> / Elevate Your Beauty</p>
          <h2 id="academy-cta-title" className="text-[50px] leading-[50px] font-medium tracking-[-3px] text-white">
            Book your appointment online today
          </h2>
          <BookingLink type="virtual" className={`${btnWhite} h-[48.9px] w-[208.3px] px-0! whitespace-nowrap text-cocoa`}>
            Schedule Consultation
          </BookingLink>
        </div>
      </section>

      {/* Be a part of the family 455:1242 */}
      <section className="relative mt-[51px] h-[633px] overflow-hidden bg-black" aria-labelledby="family-title">
        <FigmaImage src="f6c095f9" crop={{ x: 0, y: 0, w: 1441, h: 633 }} sizes="1440px" />
        <div className="absolute top-[184px] left-[353px] flex w-[744px] flex-col gap-5 text-center">
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
      </section>
      <div className="h-3" />
    </>
  );
}
