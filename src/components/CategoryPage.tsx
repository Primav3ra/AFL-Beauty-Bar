import Link from "next/link";
import { links } from "@/config/links";
import { categories, categoryLinkFor, displayLabel, type CategoryKey } from "@/data/categories";
import { place } from "@/lib/figma";
import { FigmaImage } from "./FigmaImage";
import { PlaceholderLink } from "./PlaceholderLink";
import { CtaBanner, DoubleRule, Eyebrow, PageHero } from "./blocks";
import { ArrowLong } from "./icons";

const itemCls = "group/item flex h-[34px] items-center text-[15px] leading-[33.9px] font-medium tracking-[-0.4px] text-white";

/** Arrow that slides in on hover (design shows it on the hovered list item, Figma 686:2011 "On Hover"). */
function HoverArrow() {
  return (
    <span className="inline-flex w-0 overflow-hidden opacity-0 transition-all duration-300 group-hover/item:mr-2.5 group-hover/item:w-[19px] group-hover/item:opacity-100 group-focus-visible/item:mr-2.5 group-focus-visible/item:w-[19px] group-focus-visible/item:opacity-100">
      <ArrowLong className="h-2 w-[19px] shrink-0" />
    </span>
  );
}

function ItemLink({ label }: { label: string }) {
  const href = categoryLinkFor(label);
  const inner = (
    <>
      <HoverArrow />
      {displayLabel(label)}
    </>
  );
  return href ? (
    <Link href={href} className={itemCls}>
      {inner}
    </Link>
  ) : (
    <PlaceholderLink reason={`no detail page for "${label}"`} className={itemCls}>
      {inner}
    </PlaceholderLink>
  );
}

// Gap between the CTA banner and the Footer instance in each frame (the Footer itself adds 39px).
const FOOTER_GAP: Record<CategoryKey, number> = { body: 39, "face-care": 39, other: 36, signature: 36 };

export function CategoryPage({ id }: { id: CategoryKey }) {
  const c = categories[id];
  const heroBottom = c.hero.top + c.hero.height;
  const gridBottom = c.grid.y + c.grid.h;
  const colW = c.grid.x - (c.column.x ?? 0);
  const cta = c.cta;
  const col = { eyebrowTop: c.column.eyebrowTop ?? c.grid.y, titleTop: c.column.titleTop ?? c.grid.y + 44, textTop: c.column.textTop ?? c.grid.y + 202 };

  return (
    <>
      <PageHero
        image={c.hero.image ? place(c.hero.image, c.hero.nodeId) : null}
        height={c.hero.height}
        kicker={c.hero.kicker}
        kickerTop={c.hero.kickerTop}
        titleTop={c.hero.titleTop}
        title={c.hero.title}
        titleTracking={c.hero.titleTracking}
        description={c.hero.description}
        descriptionClass="text-[17px] leading-[23px]"
        descriptionWidth={c.hero.descriptionWidth}
        gap={c.hero.descriptionGap ?? 36}
        overlap={Math.max(0, 111 - c.hero.top)}
      />

      {/* "Find your starting point" — the empty left column is sticky-scroll runway (note 130:1474). */}
      <section className="flex" style={{ marginTop: c.grid.y - heroBottom, paddingLeft: c.column.x ?? 0 }}>
        <div className="shrink-0" style={{ width: colW }}>
          <div className="sticky top-[120px]" style={{ paddingTop: col.eyebrowTop - c.grid.y }}>
            <div className="relative" style={{ height: col.textTop - col.eyebrowTop + 100 }}>
              <Eyebrow className="absolute top-0">{c.column.eyebrow}</Eyebrow>
              <h2
                className="absolute text-[50px] leading-[65px] font-medium tracking-[-4px] whitespace-pre-line text-espresso"
                style={{ top: col.titleTop - col.eyebrowTop, width: (c.column.titleWidth ?? 300) + 40 }}
              >
                {c.column.title}
              </h2>
              <p
                className="absolute text-[15px] text-espresso"
                style={{ top: col.textTop - col.eyebrowTop, width: c.column.textWidth ?? 380, lineHeight: `${c.column.textLineHeight}px` }}
              >
                {c.column.text}
              </p>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-[406px_405px] gap-x-5 gap-y-2.5" style={{ width: c.grid.w }}>
          {c.cards.map((card) => {
            const title = card.title ?? "";
            const hasItems = card.items.length > 0;
            const href = hasItems ? null : categoryLinkFor(title);
            const body = (
              <>
                {card.image && <FigmaImage {...place(card.image, card.nodeId)} className="transition-transform duration-700 ease-out group-hover:scale-105" />}
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/90 to-transparent"
                  style={{ height: card.gradientHeight ?? 106 }}
                />
              </>
            );
            const cls = "group group/item relative block h-[280px] overflow-hidden bg-black";
            if (hasItems) {
              return (
                <li key={card.nodeId} className="group relative h-[280px] overflow-hidden bg-black">
                  {body}
                  <div className="absolute top-[30.4px] left-[24.6px] flex flex-col">
                    <PlaceholderLink reason={`no detail page for "${title}"`} className="group/item flex h-[34px] items-center text-[17px] leading-[33.9px] font-medium tracking-[-0.5px] text-white">
                      {displayLabel(title)}
                    </PlaceholderLink>
                    <ul className="mt-[3px]">
                      {card.items.map((it) => (
                        <li key={it}>
                          <ItemLink label={it} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            }
            const label = (
              <span className="absolute top-[30.4px] left-[24.6px] flex h-[34px] items-center text-[17px] leading-[33.9px] font-medium tracking-[-0.5px] text-white">
                <HoverArrow />
                {displayLabel(title)}
              </span>
            );
            return (
              <li key={card.nodeId}>
                {href ? (
                  <Link href={href} className={cls}>
                    {body}
                    {label}
                  </Link>
                ) : (
                  <PlaceholderLink reason={`no detail page for "${title}"`} className={cls}>
                    {body}
                    {label}
                  </PlaceholderLink>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <div style={{ marginTop: c.rules[0] - gridBottom }}>
        <DoubleRule />
      </div>

      <div style={{ marginTop: cta.top - (c.rules[1] ?? cta.top), marginBottom: FOOTER_GAP[id] - 39 }}>
        <CtaBanner
          image={place(cta.image!, cta.nodeId)}
          height={cta.height}
          contentTop={cta.contentTop}
          kicker={cta.kicker ?? ""}
          title={cta.title ?? ""}
          titleClass="text-[60px] leading-[74px] tracking-[-4.8px]"
          titleAlign="left"
          button={cta.button ?? ""}
          href={links.booking}
        />
      </div>
    </>
  );
}
