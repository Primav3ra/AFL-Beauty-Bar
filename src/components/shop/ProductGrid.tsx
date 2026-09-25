"use client";

import { useState } from "react";
import { FigmaImage, type ImageRef, type Placement } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { links } from "@/config/links";
import { BookmarkOutline, CartPlus, Chevron, StarSolid } from "./icons";
import { tabs, type Category, type Product } from "./products";

export type Placed = { src: ImageRef; place: Placement };
export type ProductView = Product & { photo: Placed; badgeImg?: Placed };

// Grid 482:2164 (1440×2597 with 4 rows). Column x values and row tops come straight from Figma;
// the first column sits 5px lower than the other two in the design.
const colX = [137, 531, 930];
const rowTop = (r: number) => (r === 0 ? 111 : 712 + (r - 1) * 611);
const t15 = "text-[15px] leading-5 font-medium tracking-[-0.4px]";

function ProductCard({ p }: { p: ProductView }) {
  const name = p.name.trim();
  return (
    <article className="group relative h-[526px] w-[373px] bg-white" aria-label={name}>
      <div className="absolute top-0 left-0 h-[365px] w-[373px] overflow-hidden" style={{ background: p.imgBg }}>
        <FigmaImage {...p.photo} alt={name} className="transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      {p.badge && p.badgeImg && (
        <span className="absolute top-0 left-0 flex h-[34px] w-[129px] items-center justify-center overflow-hidden">
          <FigmaImage {...p.badgeImg} />
          <span className={`relative text-white ${t15}`}>{p.badge.label}</span>
        </span>
      )}
      <h3 className={`absolute whitespace-pre text-black ${t15}`} style={{ left: p.nx, top: p.ny }}>
        {p.name}
      </h3>
      <PlaceholderLink
        reason="wishlist not integrated (commerce platform pending)"
        aria-label={`Save ${name} to wishlist`}
        className="absolute top-[385px] left-[329px] flex size-6 items-center justify-center text-brown transition-transform hover:scale-110"
      >
        <BookmarkOutline className="h-[18px] w-[14px]" />
      </PlaceholderLink>
      <p className="absolute top-[416px] left-6 flex items-center" aria-label={`Rated ${p.rating} out of 5`}>
        <span className={`w-[23px] text-center text-black ${t15}`} aria-hidden>
          {p.rating}
        </span>
        <span className="ml-[6px] h-[9px] w-px bg-[#bbbbbb]" aria-hidden />
        <span className="ml-[5.3px] flex gap-[2.35px]" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <StarSolid key={i} className={`size-[16.9px] ${i < 4 ? "text-brown" : "text-mist"}`} />
          ))}
        </span>
      </p>
      <a
        href={links.shop}
        aria-label={`Buy ${name} for ${p.price.replace(" ", "")}`}
        className={`absolute top-[465px] left-6 flex h-[34px] w-[129px] items-center justify-center bg-brown text-white transition-colors hover:bg-espresso ${t15}`}
      >
        {p.price}
      </a>
      <s className={`absolute top-[472px] left-[162px] text-brown ${t15}`} aria-label={`was ${p.compareAt}`}>
        {p.compareAt}
      </s>
      <a
        href={links.shop}
        aria-label={`Add ${name} to cart`}
        className={`absolute top-[465px] left-[228px] flex h-[34px] w-[126.6px] items-center gap-[10px] border border-brown/80 pl-[6.8px] text-brown transition-colors hover:bg-brown hover:text-white ${t15}`}
      >
        <span className="flex size-6 items-center justify-center">
          <CartPlus className="h-[21px] w-[20.7px]" />
        </span>
        Add to Cart
      </a>
    </article>
  );
}

/** Category tabs (482:2201) + sale ribbon + product grid (482:2164). Filtering is local state only. */
export function ProductGrid({ products }: { products: ProductView[] }) {
  const [tab, setTab] = useState<"all" | Category>("all");
  const shown = tab === "all" ? products : products.filter((p) => p.category === tab);
  const rows = Math.max(1, Math.ceil(shown.length / 3));
  const showMoreTop = rowTop(rows - 1) + 601;

  return (
    <>
      {/* Tabs 482:2201 — frame y 723 */}
      <div className="mt-[57px] flex h-[49px] gap-10 pl-[243px]" role="group" aria-label="Filter products">
        {tabs.map((t, i) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={active}
              aria-controls="shop-grid"
              onClick={() => setTab(t.id)}
              className={`flex h-[49px] cursor-pointer items-center justify-center text-[17px] leading-5 tracking-[-0.5px] transition-colors ${
                active ? "bg-brown font-semibold text-white" : "bg-linen font-medium text-black/70 hover:bg-oat hover:text-black"
              }`}
              style={{ width: [162, 192, 162, 273][i] }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Grid 482:2164 — frame y 829 */}
      <section className="relative mt-[57px]" style={{ height: showMoreTop + 62 }} aria-label="Products">
        {/* Full-width ticker: two identical runs, shifted by one run's width (see .marquee-track). */}
        <div className="marquee absolute top-0 left-[calc(50%-50vw)] flex h-[46px] w-screen items-center bg-brown" role="img" aria-label="52% off, limited stock">
          <div className="marquee-track" style={{ animationDuration: "40s" }} aria-hidden>
            {[0, 1].map((run) => (
              <span key={run} className="flex items-center whitespace-nowrap">
                {Array.from({ length: 14 }, (_, i) => (
                  <span key={i} className="flex items-center gap-5 pr-5">
                    <span className="size-1 rounded-full bg-white" />
                    <span className="text-[15px] leading-5 font-semibold tracking-[-0.4px] text-white">52% OFF (Limited Stock)</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        <ul id="shop-grid" aria-live="polite">
          {shown.map((p, i) => {
            const col = i % 3;
            return (
              <li key={p.card} className="absolute" style={{ left: colX[col], top: rowTop(Math.floor(i / 3)) + (col === 0 ? 5 : 0) }}>
                <ProductCard p={p} />
              </li>
            );
          })}
        </ul>

        <div className="absolute left-[662px]" style={{ top: showMoreTop }}>
          <PlaceholderLink
            reason="no further products designed (catalogue lives on the old store until commerce is chosen)"
            className="group flex h-11 w-[145px] items-center whitespace-nowrap gap-[10px] p-[10px] text-[17px] leading-[23px] text-espresso transition-colors hover:text-brown"
          >
            Show More
            <span className="flex size-6 items-center justify-center transition-transform group-hover:translate-y-0.5">
              <Chevron className="h-[7.4px] w-3" />
            </span>
          </PlaceholderLink>
        </div>
      </section>
    </>
  );
}
