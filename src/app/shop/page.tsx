import type { Metadata } from "next";
import Link from "next/link";
import { LocationsCarousel } from "@/components/about/LocationsCarousel";
import { CtaBanner, INTRO_GAP, PageHero, SectionIntro, btnWhite } from "@/components/blocks";
import { ArrowRight } from "@/components/icons";
import { ProductGrid, type ProductView } from "@/components/shop/ProductGrid";
import { products } from "@/components/shop/products";
import { place } from "@/lib/figma";
import { locationSlides } from "@/lib/location-slides";

export const metadata: Metadata = { title: "Shop" };

// Shopping 480:1955: hero, product grid, locations and the membership banner.

export default function ShopPage() {
  const views: ProductView[] = products.map((p) => ({ ...p, photo: place(p.img, p.imgFrame) }));
  // 480:2078 is itself the image node, so place it against the page frame.
  const family = place("480:2078", "480:1955");

  return (
    <>
      {/* Hero 480:1956 */}
      <PageHero
        id="shop-title"
        size="feature"
        align="center"
        image={place("482:2211", "480:1956")}
        frameH={561}
        kicker="Shop · Curated Beauty Essentials"
        title={
          <>
            Clinical <span className="font-serif font-medium italic">Elegance,</span> Brought Home.
          </>
        }
        description="Elevate your daily ritual with AFL’s signature cosmetic and tool collection—formulated for seamless wear, high-pigment payoff, and professional-grade perfection."
      />

      {/* Tabs 482:2201 + grid 482:2164 */}
      <ProductGrid products={views} />

      {/* Locations 480:2045 */}
      <section className="section container-site" aria-labelledby="locations-title">
        <SectionIntro
          id="locations-title"
          eyebrow="Our Locations"
          title="World-Class Care, Nationwide Presence."
          text="Experience signature AFL aesthetic treatments and bespoke facial sculpting at our luxury clinic destinations across major metropolitan hubs."
        />
        <div data-reveal className={INTRO_GAP}>
          <LocationsCarousel slides={locationSlides()} label="Our clinic locations" />
        </div>
      </section>

      {/* Be a part of the family 480:2078 */}
      <CtaBanner
        id="family-title"
        image={{ ...family, place: { ...family.place, box: { ...family.place.box, x: 0, y: 0 } } }}
        frameH={633}
        kicker="Elevate Your Beauty"
        title="Be a part of the family."
        text="Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!"
      >
        <Link href="/membership" className={`${btnWhite} text-cocoa`}>
          See membership packages <ArrowRight className="h-[11px] w-[20px]" />
        </Link>
      </CtaBanner>
    </>
  );
}
