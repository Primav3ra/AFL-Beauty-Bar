"use client";

import { useState } from "react";
import { FigmaImage, focalPoint, type ImageRef, type Placement } from "@/components/FigmaImage";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { links } from "@/config/links";
import { BookmarkOutline, CartPlus, Chevron, StarSolid } from "./icons";
import { tabs, type Category, type Product } from "./products";

export type Placed = { src: ImageRef; place: Placement };
export type ProductView = Product & { photo: Placed };

const t15 = "text-small font-medium";

/** Product card (Figma 482:2164 cards): photo framed as in the design, name, rating, price and cart. */
function ProductCard({ p }: { p: ProductView }) {
  const name = p.name.trim();
  return (
    <article className="group flex h-full flex-col bg-white" aria-label={name}>
      <div className="relative aspect-[373/340] overflow-hidden" style={{ background: p.imgBg }}>
        <FigmaImage src={p.photo.src} cover sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" position={focalPoint(p.photo.place, 373, 365)} alt={name} className="transition-transform duration-700 ease-out group-hover:scale-105" />
        {p.badge && <span className={`absolute top-0 left-0 bg-gradient-to-r from-brown to-[#a0705a] px-3 py-1.5 text-white ${t15}`}>{p.badge.label}</span>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-body font-medium text-black">{name}</h3>
          <PlaceholderLink
            reason="wishlist not integrated (commerce platform pending)"
            aria-label={`Save ${name} to wishlist`}
            className="flex size-6 shrink-0 items-center justify-center text-brown transition-transform hover:scale-110"
          >
            <BookmarkOutline className="h-[18px] w-[14px]" />
          </PlaceholderLink>
        </div>
        <p className="mt-2 flex items-center gap-1.5" aria-label={`Rated ${p.rating} out of 5`}>
          <span className={`text-black ${t15}`} aria-hidden>
            {p.rating}
          </span>
          <span className="h-[9px] w-px bg-[#bbbbbb]" aria-hidden />
          <span className="flex gap-0.5" aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <StarSolid key={i} className={`size-[15px] ${i < 4 ? "text-brown" : "text-mist"}`} />
            ))}
          </span>
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
          <a
            href={links.shop}
            aria-label={`Buy ${name} for ${p.price.replace(" ", "")}`}
            className={`flex h-9 items-center justify-center bg-brown px-5 text-white transition-colors hover:bg-espresso ${t15}`}
          >
            {p.price}
          </a>
          <s className={`text-brown ${t15}`} aria-label={`was ${p.compareAt}`}>
            {p.compareAt}
          </s>
          <a
            href={links.shop}
            aria-label={`Add ${name} to cart`}
            className={`ml-auto flex h-9 items-center gap-2 border border-brown/80 px-3 text-brown transition-colors hover:bg-brown hover:text-white ${t15}`}
          >
            <CartPlus className="h-[18px] w-[18px]" />
            Add to Cart
          </a>
        </div>
      </div>
    </article>
  );
}

/** Category tabs (482:2201) + sale ribbon + product grid (482:2164). Filtering is local state only. */
export function ProductGrid({ products }: { products: ProductView[] }) {
  const [tab, setTab] = useState<"all" | Category>("all");
  const shown = tab === "all" ? products : products.filter((p) => p.category === tab);

  return (
    <section className="section" aria-label="Products">
      {/* Tabs 482:2201 — scroll sideways on narrow screens */}
      <div className="container-site">
        <div className="-mx-6 flex gap-2 overflow-x-auto px-6 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0" role="group" aria-label="Filter products">
          {tabs.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={active}
                aria-controls="shop-grid"
                onClick={() => setTab(t.id)}
                className={`flex h-11 shrink-0 cursor-pointer items-center justify-center px-5 text-body whitespace-nowrap transition-colors ${
                  active ? "bg-brown font-semibold text-white" : "bg-linen font-medium text-black/70 hover:bg-oat hover:text-black"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-width sale ticker: two identical runs, shifted by one run's width (see .ticker-track). */}
      <div className="ticker mt-8 flex h-11 items-center bg-brown" role="img" aria-label="52% off, limited stock">
        <div className="ticker-track" style={{ animationDuration: "40s" }} aria-hidden>
          {[0, 1].map((run) => (
            <span key={run} className="flex items-center whitespace-nowrap">
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} className="flex items-center gap-5 pr-5">
                  <span className="size-1 rounded-full bg-white" />
                  <span className="text-small font-semibold text-white">52% OFF (Limited Stock)</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container-site">
        <ul id="shop-grid" aria-live="polite" data-reveal="stagger" className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <li key={p.card}>
              <ProductCard p={p} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <PlaceholderLink
            reason="no further products designed (catalogue lives on the old store until commerce is chosen)"
            className="group flex h-11 items-center gap-2.5 px-3 text-body text-espresso transition-colors hover:text-brown"
          >
            Show More
            <span className="flex size-6 items-center justify-center transition-transform group-hover:translate-y-0.5">
              <Chevron className="h-[7.4px] w-3" />
            </span>
          </PlaceholderLink>
        </div>
      </div>
    </section>
  );
}
