import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { Marquee } from "@/components/Marquee";
import { CtaBanner, INTRO_GAP, PageHero, SectionIntro, btnWhite } from "@/components/blocks";
import { LeaderSection, type Highlight } from "@/components/about/LeaderSection";
import { LocationsCarousel } from "@/components/about/LocationsCarousel";
import {
  BadgeCheckIcon, BarsIcon, DocPersonIcon, IdBadgeIcon, LongArrow, TowerIcon, TubeSearchIcon,
} from "@/components/about/icons";
import { locationSlides } from "@/lib/location-slides";
import { place, refOf } from "@/lib/figma";

export const metadata: Metadata = { title: "About" };

// About 455:1251 — every section keeps the design's 1440px coordinates. Page content starts at frame y=111
// (layout header); the hero frame starts at y=105, so it is shifted up 6px under the navbar.

// Academy programmes (photos from the Academy frame 411:671).
const pathways = [
  { title: "Fatema Love Mentorship", img: "426:996" },
  { title: "Medical Assistant, CMA (NHA)", img: "447:1199" },
  { title: "Phlebotomy Specialist", img: "455:1464" },
  { title: "Professional Accreditation", img: "441:1088" },
  { title: "Injector Academy", img: "758:461" },
];

const fatemaHighlights: Highlight[] = [
  { icon: TowerIcon, title: "Brand Genesis", body: "Scaled AFL Beauty Bar from a 2018 NYC apartment startup into a industry-leading med spa brand." },
  { icon: BadgeCheckIcon, title: "Celebrity Trust", body: "Premier aesthetic injector trusted by top influencers, celebrities, and socialites" },
  { icon: IdBadgeIcon, title: "Clinical Specialty", body: "Advanced anti-aging innovations, meticulous facial mapping, and natural result execution." },
];

const tatianaHighlights: Highlight[] = [
  { icon: TubeSearchIcon, title: "Pre-Med Precision", body: "Holds a dual degree in Biology and Chemistry, bringing medical-grade rigor to every operational standard." },
  { icon: BarsIcon, title: "Operational Leadership", body: "Directs AFL’s growth, clinical workflows, and patient experience standards since joining in June 2022." },
  { icon: DocPersonIcon, title: "Clinical Advancement", body: "Merges executive operations with hands-on practice as an aesthetic injector and aspiring Medical Director." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero 455:1252 */}
      <PageHero
        id="about-title"
        size="feature"
        tint="black"
        image={place("758:15", "455:1252")}
        frameH={735}
        kicker="Our Leadership & Legacy"
        title={
          <>
            The Masterminds Behind <span className="font-serif font-medium italic">Your Transformation</span>
          </>
        }
        description="Meet the team behind your transformation"
      >
        <BookingLink className={`${btnWhite} text-[#1a1a1a]`}>
          Book a Consultation <LongArrow className="h-3 w-5" />
        </BookingLink>
      </PageHero>

      {/* Founder 455:1268 */}
      <LeaderSection
        id="founder-title"
        role="Founder"
        name="Fatema Love"
        lead="The creative force behind AFL’s signature techniques, turning a passion for aesthetics into a luxury brand trusted by high-profile clientele nationwide."
        highlights={fatemaHighlights}
        aboutLabel="About Fatema"
        bio="From her humble beginnings in a New York City apartment in 2018, Fatema Love has transformed AFL Beauty Bar into one of the most sought-after med spas in the industry. Renowned for her meticulous attention to detail and innovative techniques, she has earned the trust of celebrities, socialites, and top influencers alike. With a steadfast commitment to delivering the latest beauty advancements, Love empowers every client to achieve their skincare and anti-aging aspirations, fostering confidence that radiates from within."
        photo={place("462:1799", "455:1307")}
        photoFilter="brightness-[1.06] contrast-[1.08] saturate-[1.2] sepia-[0.12]"
        photoAlt="Fatema Love holding an award in front of the AFL Beauty Bar sign"
        textSide="right"
      />

      {/* COO 464:1809 */}
      <LeaderSection
        id="coo-title"
        role="Chief Operations Officer (COO)"
        name="Tatiana Enis"
        lead="The strategic engine of AFL, fusing dual-degree medical science with executive operations to elevate patient safety and clinical excellence."
        highlights={tatianaHighlights}
        aboutLabel="About Tatiana Enis"
        bio="Since joining AFL Beauty Bar in June 2022, Tatiana has been instrumental in shaping our exceptional med spa experience. Originally from Laurel, Maryland, she relocated to Miami in 2018 to pursue her passion for beauty and wellness. With a dual major in biology and chemistry, specializing in pre-medicine, Tatiana is dedicated to advancing her career as an aesthetic injector and aspiring medical director. Her commitment to excellence and innovation ensures that every client receives unparalleled care and attention on their journey to beauty."
        photo={place("466:1843", "464:1835")}
        photoFilter="brightness-[1.04]"
        photoAlt="Tatiana Enis in front of the AFL Beauty Bar sign"
        textSide="left"
      />

      {/* Career Pathways 723:2785 — the design's cards are empty; they show the Academy's programmes instead */}
      <section className="section" aria-labelledby="careers-title">
        <SectionIntro className="container-site" id="careers-title" eyebrow="Career Pathways" title="Doctor of Medicine" text="100% Practical & Clinical Training" />
        <div data-reveal className={INTRO_GAP}>
          <Marquee label="Career pathways" itemWidth={300} seconds={40}>
            {pathways.map((p) => (
              <Link key={p.title} href="/academy" className="group block bg-white">
                <span className="relative block h-[240px] overflow-hidden bg-linen">
                  <FigmaImage src={refOf(p.img)} cover sizes="300px" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                </span>
                <span className="flex items-center justify-between gap-3 px-5 py-4 text-h3 font-semibold text-espresso">
                  {p.title}
                  <LongArrow className="h-3 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Locations 455:1317 */}
      <section className="section container-site" aria-labelledby="locations-title">
        <SectionIntro
          id="locations-title"
          eyebrow="Our Locations"
          title="World-Class Care, Nationwide Presence."
          text="Experience signature AFL aesthetic treatments and bespoke facial sculpting at our luxury clinic destinations across major metropolitan hubs."
        />
        <div data-reveal className={INTRO_GAP}>
          <LocationsCarousel slides={locationSlides()} />
        </div>
      </section>

      {/* Membership CTA 455:1377 */}
      <CtaBanner
        id="family-title"
        image={place("455:1377", "455:1251")}
        frameH={633}
        kicker="Elevate Your Beauty"
        title="Be a part of the family."
        text="Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!"
      >
        <Link href="/membership" className={`${btnWhite} text-cocoa`}>
          See membership packages <LongArrow className="h-3 w-5" />
        </Link>
      </CtaBanner>
    </>
  );
}
