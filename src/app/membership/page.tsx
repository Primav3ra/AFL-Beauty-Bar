import type { Metadata } from "next";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { Parallax } from "@/components/Parallax";
import { Band, Eyebrow, SECTION_GAP, btnOutline, btnWhite } from "@/components/blocks";
import { SectionHead, TierRow } from "@/components/membership/TierRow";
import { dripTiers, glow, smoothTiers } from "@/components/membership/tiers";
import { place } from "@/lib/figma";

export const metadata: Metadata = { title: "Membership" };

// Membership 729:3357 (1440×11043). Content runs from y=111 (below the navbar) to the footer at y=9794.

export default function MembershipPage() {
  return (
    <>
      {/* Hero 729:3358 — solid black in the design (no photo yet) */}
      <Band className="h-[729px]" aria-labelledby="membership-title" underlay={
          // Two slow, out-of-phase pools of warm light drifting behind the copy.
          <div aria-hidden className="absolute inset-0">
            <div className="absolute top-[360px] left-[-10%] h-[560px] w-[70%] rounded-full bg-brown blur-[130px]" style={{ animation: "glow-drift 16s ease-in-out infinite alternate" }} />
            <div className="absolute top-[80px] right-[-5%] h-[420px] w-[45%] rounded-full bg-[#9a5a3c] blur-[140px]" style={{ animation: "glow-drift 21s ease-in-out -7s infinite alternate-reverse" }} />
          </div>
        }
      >
        <span className="absolute top-[339px] left-[139px] flex h-10 w-[171px] items-center justify-center bg-black/60 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
          Membership
        </span>
        <div className="hero-in absolute top-[410px] left-[139px] flex flex-col">
          <h1 id="membership-title" className="text-[60px] leading-[76.6px] font-semibold tracking-[-4.2px] whitespace-nowrap text-white">
            VIP Memberships- Curated Just for You!
          </h1>
          <p className="mt-9 w-[723px] text-[17px] leading-[23px] text-white">
            Unlock exclusive member pricing, priority booking, and continuous treatment plans designed to maintain your results year-round.
          </p>
          <div className="mt-[27px] flex gap-[22px]">
            <BookingLink className={`${btnWhite} w-[248px] leading-5 text-[#1a1a1a]`}>Book a Body Assessment</BookingLink>
            <BookingLink type="virtual" className={`${btnOutline} w-[270.3px] leading-5`}>
              Schedule Virtual Consultation
            </BookingLink>
          </div>
        </div>
      </Band>

      {/* Intro 739:3670 */}
      <section className={SECTION_GAP} aria-labelledby="tiers-title">
        <div data-reveal className="flex flex-col items-center gap-[18px] text-center">
          <Eyebrow>The Process</Eyebrow>
          <h2 id="tiers-title" className="w-[620px] text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso">
            Choose Your Membership Tier
            <br />
            Elevate Your Experience
          </h2>
          <p className="w-[856px] text-[15px] leading-[30px] text-espresso">
            Body contouring utilizes non-invasive technologies to target localized, stubborn fat deposits and improve skin laxity. This clinical procedure is engineered to refine your anatomical silhouette.
          </p>
        </div>

        {/* AFL Glow Membership 736:3607 */}
        <div className="mt-16 ml-[159px] w-[1122px]">
          <TierRow
            tier={glow}
            media={
              <>
                <Parallax>
                  <span className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-105">
                    <FigmaImage {...place("736:3665", "741:3692")} alt="Close-up of a woman's glowing skin in warm light" />
                  </span>
                </Parallax>
                <span className="absolute top-0 left-0 flex h-[45px] w-[280px] items-center justify-center overflow-hidden">
                  <FigmaImage {...place("741:3693", "741:3692")} />
                  <span className="relative text-[15px] leading-5 font-medium tracking-[-0.4px] text-white">Best Membership in Segment</span>
                </span>
              </>
            }
          />
        </div>
      </section>

      {/* All for Love, All for Smooth 778:491 */}
      <section className={`${SECTION_GAP} ml-[159px] w-[1174px]`} aria-labelledby="smooth-title">
        <SectionHead id="smooth-title" title="All for Love, All for Smooth">
          <p className="text-[15px] leading-[30px] text-espresso">Membership Type: Tiered options- 3 different memberships in one category </p>
        </SectionHead>
        <div className="mt-16 flex flex-col gap-24">
          {smoothTiers.map((t) => (
            <TierRow key={t.id} tier={t} />
          ))}
        </div>
      </section>

      {/* AFL Drip Club 778:618 */}
      <section className={`${SECTION_GAP} ml-[159px] w-[1174px]`} aria-labelledby="drip-title">
        <SectionHead id="drip-title" title="AFL Drip Club-IV Therapy Memberships">
          <p className="text-[15px] leading-[30px] text-espresso">Membership Type: Tiered options</p>
        </SectionHead>
        <div className="mt-16 flex flex-col gap-24">
          {dripTiers.map((t) => (
            <TierRow key={t.id} tier={t} />
          ))}
        </div>
      </section>

      {/* CTA 778:735 */}
      <Band backdrop={place("778:736", "778:735")} frameH={633} className={`${SECTION_GAP} h-[560px]`} aria-labelledby="membership-cta-title">
        <div data-reveal className="absolute top-1/2 left-1/2 flex w-[900px] -translate-1/2 flex-col items-center gap-6 text-center">
          <p className="w-full text-center text-[17px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="membership-cta-title" className="w-full text-[56px] leading-[66px] font-medium tracking-[-4px] text-white">
            Schedule your consultation or book your appointment online today
          </h2>
          <BookingLink className={`${btnWhite} mt-2 h-[49px] px-8 font-semibold whitespace-nowrap text-cocoa`}>Book a Body Assessment</BookingLink>
        </div>
      </Band>
    </>
  );
}
