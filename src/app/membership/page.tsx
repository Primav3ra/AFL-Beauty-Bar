import type { Metadata } from "next";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { Parallax } from "@/components/Parallax";
import { CtaBanner, INTRO_GAP, PageHero, SectionIntro, btnOutline, btnWhite } from "@/components/blocks";
import { MembershipTabs, type MembershipGroup } from "@/components/membership/MembershipTabs";
import { dripTiers, glow, smoothTiers } from "@/components/membership/tiers";
import { place, refOf } from "@/lib/figma";

export const metadata: Metadata = { title: "Membership" };

// Membership 729:3357: the design stacks nine full-width tier rows (~12 screens). Here the categories are
// tabs and each tab compares its tiers side by side.

export default function MembershipPage() {
  const groups: MembershipGroup[] = [
    {
      id: "glow",
      label: "AFL Glow",
      title: "AFL Glow Membership",
      note: "Best Membership in Segment",
      tiers: [glow],
      media: (
        <Parallax>
          <FigmaImage src={refOf("736:3665")} cover sizes="(min-width: 768px) 500px, 100vw" alt="Close-up of a woman's glowing skin in warm light" />
        </Parallax>
      ),
    },
    { id: "smooth", label: "All for Smooth", title: "All for Love, All for Smooth", note: "Laser hair removal memberships, three tiers", tiers: smoothTiers.slice(0, 3) },
    { id: "wellness", label: "Tox, Body & Radiance", title: "Injectables, body & anti-aging", note: "Monthly plans for your go-to treatments", tiers: smoothTiers.slice(3) },
    { id: "drip", label: "Drip Club", title: "AFL Drip Club: IV Therapy Memberships", note: "Tiered options", tiers: dripTiers },
  ];

  return (
    <>
      {/* Hero 729:3358 — solid black in the design (no photo yet) */}
      <PageHero
        id="membership-title"
        size="feature"
        tint="black"
        kicker="Membership"
        title="VIP Memberships, Curated Just for You"
        description="Unlock exclusive member pricing, priority booking, and continuous treatment plans designed to maintain your results year-round."
        underlay={
          // Two slow, out-of-phase pools of warm light drifting behind the copy.
          <div aria-hidden className="absolute inset-0">
            <div className="absolute top-[45%] left-[-10%] h-[520px] w-[70%] rounded-full bg-brown blur-[130px]" style={{ animation: "glow-drift 16s ease-in-out infinite alternate" }} />
            <div className="absolute top-[10%] right-[-5%] h-[380px] w-[45%] rounded-full bg-[#9a5a3c] blur-[140px]" style={{ animation: "glow-drift 21s ease-in-out -7s infinite alternate-reverse" }} />
          </div>
        }
      >
        <BookingLink className={`${btnWhite} text-[#1a1a1a]`}>Book a Body Assessment</BookingLink>
        <BookingLink type="virtual" className={btnOutline}>
          Schedule Virtual Consultation
        </BookingLink>
      </PageHero>

      {/* Tiers 739:3670 / 736:3607 / 778:491 / 778:618 */}
      <section className="section container-site" aria-labelledby="tiers-title">
        <SectionIntro
          id="tiers-title"
          eyebrow="Memberships"
          title={"Choose Your Membership Tier,\nElevate Your Experience"}
          text="Pick a category, then compare its tiers side by side: monthly price, minimum commitment and everything that's included."
        />
        <div data-reveal className={INTRO_GAP}>
          <MembershipTabs groups={groups} />
        </div>
      </section>

      {/* CTA 778:735 */}
      <CtaBanner id="membership-cta-title" image={place("778:736", "778:735")} frameH={633} kicker="Elevate Your Beauty" title="Schedule your consultation or book your appointment online today">
        <BookingLink className={`${btnWhite} font-semibold text-cocoa`}>Book a Body Assessment</BookingLink>
      </CtaBanner>
    </>
  );
}
