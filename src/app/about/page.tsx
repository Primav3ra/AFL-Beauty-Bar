import type { Metadata } from "next";
import Link from "next/link";
import { BookingLink } from "@/components/BookingLink";
import { FigmaImage } from "@/components/FigmaImage";
import { Marquee } from "@/components/Marquee";
import { Band, Eyebrow, SECTION_GAP, btnWhite } from "@/components/blocks";
import { LeaderSection, type Highlight } from "@/components/about/LeaderSection";
import { LocationsCarousel, type LocationSlide } from "@/components/about/LocationsCarousel";
import {
  BadgeCheckIcon, BarsIcon, DocPersonIcon, IdBadgeIcon, LongArrow, TowerIcon, TubeSearchIcon,
} from "@/components/about/icons";
import { clinics } from "@/data/clinics";
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
  const hero = place("758:15", "455:1252");
  const miami = place("556:91", "455:1323");
  const miamiPhoto = { ...miami, place: { ...miami.place, box: { ...miami.place.box, x: miami.place.box.x - 552 } } };
  const cta = place("455:1377", "455:1251");
  const ctaImage = { ...cta, place: { ...cta.place, box: { ...cta.place.box, x: 0, y: 0 } } };

  // Only Miami is designed; the other slides reuse the card with the clinic data and the owner's office photos.
  const slides: LocationSlide[] = clinics.map((c) =>
    c.id === "miami"
      ? { id: c.id, title: "Miami, FL | Main Office", address: "51-53 NE 24th St Suite 107 Miami FL 33137", mapsAddress: c.address, phone: "786-750-2355", photo: miamiPhoto, photoAlt: "AFL Beauty Bar sign on the Miami clinic" }
      : { id: c.id, title: c.short, address: c.address, mapsAddress: c.address, phone: c.phone, photo: null, photoUrl: c.photo?.src, photoAlt: c.photo?.alt ?? "" },
  );

  return (
    <>
      {/* Hero 455:1252 (frame y 105–840) */}
      <Band backdrop={hero} frameH={735} priority className="h-[729px]" aria-labelledby="about-title">
        <div className="absolute inset-x-0 -top-[6px] h-[735px]">
          <div aria-hidden className="absolute bg-black opacity-90 blur-[86px]" style={{ left: -306, top: 380, width: 1973, height: 637 }} />
          <p className="absolute top-[309px] left-[139px] flex h-10 w-[270px] items-center justify-center bg-black/60 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
            Our Leadership &amp; Legacy
          </p>
          <div className="absolute top-[380px] left-[139px] flex w-[637px] flex-col items-start">
            <h1 id="about-title" className="text-[60px] leading-[76.6px] font-semibold tracking-[-4.2px] whitespace-nowrap text-white">
              The Masterminds Behind
              <br />
              <span className="font-serif text-[80px] font-medium italic">Your Transformation</span>
            </h1>
            <p className="mt-[36px] text-[17px] leading-[23px] text-white">Meet the team behind your transformation</p>
            <BookingLink className="mt-[27px] flex h-[49px] w-[248px] items-center justify-center bg-white text-[17px] leading-5 font-semibold tracking-[-0.5px] text-[#1a1a1a] transition-colors hover:bg-cream">
              <span>Book a Consultation</span>
              <LongArrow className="ml-[7px] h-3 w-5" />
            </BookingLink>
          </div>
        </div>
      </Band>

      {/* Founder 455:1268 */}
      <LeaderSection
        id="founder-title"
        role="Founder"
        name="Fatema Love"
        lead="The creative force behind AFL’s signature techniques, turning a passion for aesthetics into a luxury brand trusted by high-profile clientele nationwide."
        leadWidth={520}
        highlights={fatemaHighlights}
        aboutLabel="About Fatema"
        bio="From her humble beginnings in a New York City apartment in 2018, Fatema Love has transformed AFL Beauty Bar into one of the most sought-after med spas in the industry. Renowned for her meticulous attention to detail and innovative techniques, she has earned the trust of celebrities, socialites, and top influencers alike. With a steadfast commitment to delivering the latest beauty advancements, Love empowers every client to achieve their skincare and anti-aging aspirations, fostering confidence that radiates from within."
        photo={place("462:1799", "455:1307")}
        photoFilter="brightness-[1.06] contrast-[1.08] saturate-[1.2] sepia-[0.12]"
        bioWidth={510}
        photoAlt="Fatema Love holding an award in front of the AFL Beauty Bar sign"
        textSide="right"
      />

      {/* COO 464:1809 */}
      <LeaderSection
        id="coo-title"
        role="Chief Operations Officer (COO)"
        name="Tatiana Enis"
        lead="The strategic engine of AFL, fusing dual-degree medical science with executive operations to elevate patient safety and clinical excellence."
        leadWidth={525}
        highlights={tatianaHighlights}
        aboutLabel="About Tatiana Enis"
        bio="Since joining AFL Beauty Bar in June 2022, Tatiana has been instrumental in shaping our exceptional med spa experience. Originally from Laurel, Maryland, she relocated to Miami in 2018 to pursue her passion for beauty and wellness. With a dual major in biology and chemistry, specializing in pre-medicine, Tatiana is dedicated to advancing her career as an aesthetic injector and aspiring medical director. Her commitment to excellence and innovation ensures that every client receives unparalleled care and attention on their journey to beauty."
        photo={place("466:1843", "464:1835")}
        photoFilter="brightness-[1.04]"
        photoAlt="Tatiana Enis in front of the AFL Beauty Bar sign"
        textSide="left"
      />

      {/* Career Pathways 723:2785 — the cards are empty black/white placeholders in the design */}
      <section className={SECTION_GAP} aria-labelledby="careers-title">
        <div data-reveal className="flex flex-col items-center gap-[28px] text-center text-espresso">
          <Eyebrow>Career Pathways</Eyebrow>
          <h2 id="careers-title" className="text-[50px] leading-[60px] font-medium tracking-[-4px]">
            Doctor of Medicine
          </h2>
          <p className="text-[15px] leading-5">100% Practical &amp; Clinical Training</p>
        </div>
        {/* The design's cards are empty; they show the Academy's programmes instead, edge to edge. */}
        <div data-reveal className="mt-12">
          <Marquee label="Career pathways" itemWidth={340} seconds={40}>
            {pathways.map((p) => (
              <Link key={p.title} href="/academy" className="group block bg-white">
                <span className="relative block h-[280px] overflow-hidden bg-linen">
                  <FigmaImage src={refOf(p.img)} cover sizes="340px" className="transition-transform duration-700 ease-out group-hover:scale-105" />
                </span>
                <span className="flex items-center justify-between gap-3 px-5 py-5 text-[17px] leading-[22px] font-semibold tracking-[-0.5px] text-espresso">
                  {p.title}
                  <LongArrow className="h-3 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Locations 455:1317 */}
      <section className={SECTION_GAP} aria-labelledby="locations-title">
        <div data-reveal className="flex flex-col items-center gap-[28px] text-center text-espresso">
          <Eyebrow>Our Locations</Eyebrow>
          <h2 id="locations-title" className="w-[547px] text-[50px] leading-[60px] font-medium tracking-[-4px]">
            World-Class Care, Nationwide Presence.
          </h2>
          <p className="w-[619px] text-[15px] leading-5">
            Experience signature AFL aesthetic treatments and bespoke facial sculpting at our luxury clinic destinations across major metropolitan hubs.
          </p>
        </div>
        <div data-reveal className="mx-auto mt-10 w-[1203px]">
          <LocationsCarousel slides={slides} />
        </div>
      </section>

      {/* Membership CTA 455:1377 */}
      <Band backdrop={ctaImage} frameH={633} className={`${SECTION_GAP} h-[633px]`} aria-labelledby="family-title">
        <div data-reveal className="absolute top-[184px] left-[353px] flex w-[744px] flex-col items-center gap-[20px] text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="family-title" className="text-[50px] leading-[74px] font-medium tracking-[-4px] text-white">
            Be a part of the family.
          </h2>
          <p className="text-[15px] leading-[30px] text-white">
            Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!
          </p>
        </div>
        <Link href="/membership" className={`${btnWhite} absolute top-[443px] left-[568px] h-[48.9px] w-[305px] text-cocoa`}>
          See membership packages
          <LongArrow className="ml-[7px] h-3 w-5" />
        </Link>
      </Band>
    </>
  );
}
