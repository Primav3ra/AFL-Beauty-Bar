import { Fragment, type ReactNode } from "react";
import { PlaceholderLink } from "@/components/PlaceholderLink";
import { Eyebrow } from "@/components/blocks";
import { ArrowLong } from "@/components/icons";
import { Crown } from "./icons";

export type Tier = {
  id: string;
  kicker: string;
  title: string;
  /** Figma text-box width of the title (forces the designed wrap). */
  titleWidth: number;
  /** Number shown large, e.g. "119". */
  price: string;
  commitment: string;
  listHeading: string;
  /** Each bullet; inner arrays are the hard line breaks (U+2028) from Figma. */
  items: string[][];
  cta: string;
  /** Left offsets of the text column and the 577×675 photo, relative to the 159px content inset. */
  textX: number;
  imageX: number;
  secondaryCta?: string;
};

export const btnBrown =
  "flex h-[49px] w-[250px] items-center justify-center gap-[11.5px] bg-brown text-[17px] leading-5 font-medium tracking-[-0.5px] text-white transition-colors hover:bg-espresso";

/** One membership row: text column + photo (black placeholder unless `media` is given). */
export function TierRow({ tier, media }: { tier: Tier; media?: ReactNode }) {
  const t = tier;
  const titleId = `tier-${t.id}`;
  return (
    <article className="relative h-[675px]" aria-labelledby={titleId}>
      <div className="absolute top-0 h-[675px] w-[577px] overflow-hidden bg-black" style={{ left: t.imageX }}>
        {media}
      </div>
      <div className="absolute top-0 flex flex-col gap-9" style={{ left: t.textX }}>
        <div className="flex flex-col gap-7">
          <Eyebrow>{t.kicker}</Eyebrow>
          <h3 id={titleId} className="text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso" style={{ width: t.titleWidth }}>
            {t.title}
          </h3>
        </div>
        <div className="flex w-[475px] flex-col gap-[50px] text-espresso">
          <div className="flex flex-col gap-5">
            <p className="h-9 text-[50px] leading-9 font-bold tracking-[-3px]">
              <span className="text-[30px]">$</span>
              {t.price}/<span className="text-[30px]">Month</span>
            </p>
            <p className="h-3 text-base leading-3 font-medium tracking-[-0.3px]">{t.commitment}</p>
          </div>
          <div className="text-[15px] leading-[30px]">
            <p className="text-[17px] font-bold">{t.listHeading}</p>
            <ul className="list-disc pl-[22.5px] marker:text-[13px]">
              {t.items.map((lines, i) => (
                <li key={i}>
                  {lines.map((l, j) => (
                    <Fragment key={j}>
                      {j > 0 && <br />}
                      {l}
                    </Fragment>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <PlaceholderLink reason={`membership sign-up (${t.title}) has no integration yet`} className={`group ${btnBrown}`}>
          <Crown className="h-[18px] w-5 shrink-0" />
          {/* Figma renders "-->" as Inter's long-arrow ligature; draw it since the web subset lacks it. */}
          {t.cta.endsWith(" -->") ? (
            <span className="flex items-center gap-1.5">
              {t.cta.slice(0, -4)}
              <ArrowLong className="h-[9px] w-[19px] transition-transform group-hover:translate-x-0.5" />
            </span>
          ) : (
            <span>{t.cta}</span>
          )}
        </PlaceholderLink>
        {t.secondaryCta && (
          <PlaceholderLink
            reason="rewards sign-up has no integration yet"
            className="flex h-[49px] w-[250px] items-center justify-center border border-brown text-[17px] leading-5 font-medium tracking-[-0.5px] text-brown transition-colors hover:bg-brown hover:text-white"
          >
            {t.secondaryCta}
          </PlaceholderLink>
        )}
      </div>
    </article>
  );
}

/** Centered "/ The Process" + title + subtitle block that opens each membership category. */
export function SectionHead({ id, title, children, titleClass = "" }: { id: string; title: ReactNode; children: ReactNode; titleClass?: string }) {
  return (
    <div className="flex flex-col items-center gap-[18px] text-center">
      <Eyebrow>/ The Process</Eyebrow>
      <h2 id={id} className={`text-[50px] leading-[60px] font-medium tracking-[-4px] text-espresso ${titleClass}`}>
        {title}
      </h2>
      {children}
    </div>
  );
}
