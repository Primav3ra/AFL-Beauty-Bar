import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { links } from "@/config/links";
import { categories, categoryLinkFor, displayLabel, type Card, type CategoryKey } from "@/data/categories";
import { cardImage } from "@/data/treatment-images";
import { place } from "@/lib/figma";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { CtaBanner, PageHero, Runs } from "./blocks";
import { SplitGrid, StickySplit } from "./StickySplit";
import { ArrowLong } from "./icons";

/** Arrow that slides in on hover (design shows it on the hovered list item, Figma 686:2011 "On Hover"). */
function HoverArrow() {
  return (
    <span className="inline-flex w-0 shrink-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/item:mr-2.5 group-hover/item:w-[19px] group-hover/item:opacity-100 group-focus-visible/item:mr-2.5 group-focus-visible/item:w-[19px] group-focus-visible/item:opacity-100">
      <ArrowLong className="h-2 w-[19px] shrink-0" />
    </span>
  );
}

function Target({ label, className, children }: { label: string; className: string; children: ReactNode }) {
  const href = categoryLinkFor(label);
  return href ? (
    <Link href={href} className={className}>
      {children}
    </Link>
  ) : (
    <PlaceholderLink reason={`no detail page for "${label}"`} className={className}>
      {children}
    </PlaceholderLink>
  );
}

const itemCls = "group/item flex min-h-7 items-center py-0.5 text-small font-medium text-white/85 transition-colors hover:text-white";

/** Portrait treatment card: photo (or linen tile when the design has none) with the label at the foot. */
/** Card heights: 190px on phones (two per row), `height` from 640px. */
function TreatmentCard({ card, height }: { card: Card; height: number }) {
  const h = { "--h": `${height}px` } as CSSProperties;
  const hCls = "h-[190px] sm:h-(--h)";
  const title = card.title ?? "";
  const img = cardImage(card);
  const hasItems = card.items.length > 0;
  const tone = img ? "text-white" : "text-espresso";
  const media = img ? (
    <>
      <FigmaImage src={img} cover sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="transition-transform duration-700 ease-out group-hover:scale-105" />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
    </>
  ) : (
    <span aria-hidden className="absolute inset-0 bg-linen transition-colors duration-300 group-hover:bg-oat" />
  );

  if (hasItems) {
    // A card with sub-treatments: the card itself has no page, each item links to its own.
    return (
      <div className={`group relative overflow-hidden ${hCls} min-h-[220px] sm:min-h-0`} style={h}>
        {media}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className={`text-h3 font-semibold ${tone}`}>{displayLabel(title)}</p>
          <ul className="mt-2">
            {card.items.map((it) => (
              <li key={it}>
                <Target label={it} className={itemCls}>
                  <HoverArrow />
                  {displayLabel(it)}
                </Target>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Target label={title} className="group group/item relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown">
      <span className={`block ${hCls}`} style={h}>
        {media}
        <span className={`absolute inset-x-0 bottom-0 flex items-center p-3.5 text-[15px] leading-5 font-semibold sm:p-5 sm:text-h3 ${tone}`}>
          <HoverArrow />
          {displayLabel(title)}
        </span>
      </span>
    </Target>
  );
}

const cardId = (card: Card) => `card-${card.nodeId.replace(":", "-")}`;

/** Centred intro, then the pinned index beside the card grid. */
function CardSection({ eyebrow, title, text, cards, cardHeight, className = "", titleId }: {
  eyebrow?: string | null; title: string | null; text: string | null; cards: Card[]; cardHeight: number; className?: string; titleId: string;
}) {
  return (
    <StickySplit
      id={titleId}
      className={className}
      eyebrow={eyebrow}
      title={title}
      text={text}
      index={cards.map((card) => ({ id: cardId(card), label: displayLabel(card.title ?? "") }))}
      indexLabel={`${title ?? "Treatments"}: jump to a treatment`}
    >
      <SplitGrid wide={cards.map((card) => card.items.length > 0)}>
        {cards.map((card) => (
          <div key={card.nodeId} id={cardId(card)} className="scroll-mt-[140px]">
            <TreatmentCard card={card} height={cardHeight} />
          </div>
        ))}
      </SplitGrid>
    </StickySplit>
  );
}

export function CategoryPage({ id }: { id: CategoryKey }) {
  const c = categories[id];
  const cta = c.cta;

  return (
    <>
      <PageHero
        image={c.hero.image ? place(c.hero.image, c.hero.nodeId) : null}
        frameH={c.hero.height}
        kicker={c.hero.kicker}
        title={<Runs runs={c.hero.title} />}
        description={c.hero.description}
      />

      <CardSection
        titleId="category-title"
        eyebrow={c.column.eyebrow}
        title={c.column.title}
        text={c.column.text}
        cards={c.cards}
        cardHeight={260}
      />

      <CtaBanner
        image={place(cta.image!, cta.nodeId)}
        frameH={cta.height}
        kicker={cta.kicker}
        title={cta.title ?? ""}
        button={cta.button ?? ""}
        href={links.booking}
      />
    </>
  );
}
