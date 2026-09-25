"use client";

import { useState, type ReactNode } from "react";
import type { Review } from "@/data/reviews";
import { useAutoAdvance } from "@/lib/use-auto-advance";
import { Star } from "./icons";

/**
 * Review quote(s) from src/data/reviews.ts. With several reviews it rotates every 7s (paused on hover /
 * focus) and shows one bar per review; with one it's a static quote.
 */
export function Reviews({ reviews, googleBadge, children }: { reviews: Review[]; /** Small Google "G" mark. */ googleBadge: ReactNode; /** Link under the quote. */ children?: ReactNode }) {
  const [i, setI] = useState(0);
  const auto = useAutoAdvance(reviews.length, setI, 7000);
  const r = reviews[i];
  if (!r) return null;
  const stars = Array.from({ length: 5 }, (_, n) => Math.max(0, Math.min(1, r.rating - n)));

  return (
    <div {...auto} className="max-w-[560px]" role={reviews.length > 1 ? "region" : undefined} aria-roledescription={reviews.length > 1 ? "carousel" : undefined} aria-label="Client reviews">
      <div key={i} className="animate-[fade-in_.6s_ease-out]" aria-live="polite">
        <blockquote className="mt-8 text-[22px] leading-[36px] font-medium tracking-[-0.5px] text-espresso">“{r.text}”</blockquote>
        <div className="mt-8 flex items-center gap-4">
          <span className="relative size-[52px] shrink-0 rounded-full bg-[#190e0d]" aria-hidden>
            {r.photo ? (
              // eslint-disable-next-line @next/next/no-img-element -- remote avatar from the reviews integration
              <img src={r.photo} alt="" className="size-full rounded-full object-cover" />
            ) : (
              <span className="flex size-full items-center justify-center text-lg font-semibold text-white">{r.author.charAt(0)}</span>
            )}
            <span className="absolute -right-1 -bottom-1 size-[26px] overflow-hidden rounded-full bg-white">{googleBadge}</span>
          </span>
          <div>
            <p className="text-lg leading-6 font-bold tracking-[-0.4px] text-black">{r.author}</p>
            <p className="flex items-center gap-2 text-[15px] leading-6 font-medium text-black/50">
              <span className="flex" aria-label={`${r.rating} out of 5 stars`}>
                {stars.map((f, n) => (
                  <Star key={n} fill={f} className="size-[18px]" />
                ))}
              </span>
              {r.rating} · {r.relativeTime}
            </p>
          </div>
        </div>
      </div>

      {reviews.length > 1 && (
        <div className="mt-8 flex gap-3">
          {reviews.map((x, n) => (
            <button key={n} type="button" aria-label={`Show review by ${x.author}`} aria-current={n === i || undefined} onClick={() => setI(n)} className="group flex h-4 w-10 cursor-pointer items-center">
              <span className={`block w-full transition-all ${n === i ? "h-1 bg-espresso" : "h-0.5 bg-espresso/25 group-hover:bg-espresso/50"}`} />
            </button>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
