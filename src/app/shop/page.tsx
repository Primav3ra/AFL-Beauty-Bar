import type { Metadata } from "next";
import Link from "next/link";
import { FigmaImage } from "@/components/FigmaImage";
import { DoubleRule, Eyebrow } from "@/components/blocks";
import { ArrowRight } from "@/components/icons";
import { LocationsSlider } from "@/components/shop/LocationsSlider";
import { ProductGrid, type ProductView } from "@/components/shop/ProductGrid";
import { products } from "@/components/shop/products";
import { place } from "@/lib/figma";

export const metadata: Metadata = { title: "Shop" };

// Shopping 480:1955 (1440×6394). Page content starts at frame y 111 (below the shared navbar) and
// ends at the footer instance (y 5145). Comments give frame y values.

export default function ShopPage() {
  const views: ProductView[] = products.map((p) => ({
    ...p,
    photo: place(p.img, p.imgFrame),
    badgeImg: p.badge ? place(p.badge.node, p.card) : undefined,
  }));
  const hero = place("482:2211", "480:1956");
  // 480:2078 is itself the image node, so place it against the page frame and pin it to the section.
  const fam = place("480:2078", "480:1955");
  const family = { ...fam, place: { ...fam.place, box: { ...fam.place.box, x: 0, y: 0 } } };

  return (
    <>
      {/* Hero 480:1956 — frame y 105–666 (its top 6px sit under the navbar, so offsets are −6) */}
      <section className="relative h-[555px] overflow-hidden bg-black" aria-labelledby="shop-title">
        <div className="absolute -top-[6px] -left-px h-[561px] w-[1441px]">
          <FigmaImage {...hero} priority sizes="1441px" />
          <div aria-hidden className="absolute bg-brown blur-[86px]" style={{ left: -329, top: 373, width: 2054, height: 688 }} />
          <div aria-hidden className="absolute bg-brown blur-[86px]" style={{ left: 470, top: 117, width: 538, height: 238 }} />
          <p className="absolute top-[163px] left-[553.5px] flex h-10 w-[333px] items-center justify-center bg-black/60 text-[17px] leading-[19.8px] tracking-[-0.3px] text-white">
            /Shop / Curated Beauty Essentials
          </p>
          <h1
            id="shop-title"
            className="absolute top-[234px] left-[511px] flex w-[418px] flex-col items-center text-center text-[60px] leading-[76.6px] font-semibold tracking-[-4.2px] text-white"
          >
            <span className="whitespace-nowrap">
              Clinical <span className="font-serif text-[80px] font-medium italic">Elegance,</span>
            </span>
            <span className="whitespace-nowrap">Brought Home.</span>
          </h1>
          <p className="absolute top-[425px] left-[368px] w-[705px] text-center text-[17px] leading-[23px] text-white">
            Elevate your daily ritual with AFL’s signature cosmetic and tool collection—formulated for seamless wear, high-pigment payoff, and
            professional-grade perfection.
          </p>
        </div>
      </section>

      {/* Tabs 482:2201 (y 723) + grid 482:2164 (y 829–3426) */}
      <ProductGrid products={views} />

      {/* Lines 480:2076 / 480:2077 — y 3469 and 3508 */}
      <div className="mt-[43px]">
        <DoubleRule />
      </div>

      {/* Locations 480:2045 — y 3508, 950px */}
      <section className="h-[950px] pt-[112px]" aria-labelledby="locations-title">
        <div className="mx-auto flex w-[619px] flex-col items-center gap-7 text-center">
          <Eyebrow>/ Our Locations</Eyebrow>
          <h2 id="locations-title" className="w-[547px] text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso">
            World-Class Care, Nationwide Presence.
          </h2>
          <p className="text-[15px] leading-5 text-espresso">
            Experience signature AFL aesthetic treatments and bespoke facial sculpting at our luxury clinic destinations across major metropolitan hubs.
          </p>
        </div>
        <LocationsSlider photo={place("556:93", "480:2051")} />
      </section>

      {/* Be a part of the family 480:2078 — y 4458, 633px */}
      <section className="relative h-[633px] overflow-hidden bg-black" aria-labelledby="family-title">
        <FigmaImage {...family} sizes="1440px" />
        <div className="absolute top-[184px] left-[353px] flex w-[744px] flex-col gap-5 text-center">
          <p className="text-[15px] leading-4 tracking-[-0.3px] text-cream">Elevate Your Beauty</p>
          <h2 id="family-title" className="text-[50px] leading-[74px] font-medium tracking-[-4px] text-white">
            Be a part of the family.
          </h2>
          <p className="text-[15px] leading-[30px] text-white">
            Enjoy exclusive perks, priority booking, and monthly treatments tailored to your skin. Get discounts on premium services, skincare
            products, and complimentary assessments. Stay radiant year-round with VIP-only benefits!
          </p>
        </div>
        <Link
          href="/membership"
          className="absolute top-[443px] left-[568px] flex h-[48.9px] w-[305px] items-center justify-center gap-[6px] bg-white text-[17px] leading-[24.1px] font-medium tracking-[-0.5px] text-cocoa transition-colors hover:bg-cream"
        >
          See membership packages <ArrowRight className="h-[11px] w-[20px]" />
        </Link>
      </section>

      {/* Footer instance starts at y 5145: 54px after the banner; the Footer adds 39px itself. */}
      <div className="h-[15px]" />
    </>
  );
}
