import { Children, type ReactNode } from "react";

/**
 * Edge-to-edge row that scrolls on its own in a seamless loop. The item set is repeated until half the
 * track covers a wide (2560px) screen, then the track is doubled and shifted by half; only the first set
 * is interactive, the repeats are inert and hidden from assistive tech. Pauses on hover and keyboard
 * focus; with reduced motion it becomes a plain horizontally scrollable row. Styles: .marquee in globals.css.
 */
export function Marquee({ children, label, itemWidth, seconds = 45, gap = 16 }: {
  children: ReactNode;
  label: string;
  /** Rendered width of one item, used to work out how many repeats fill the screen. */
  itemWidth: number;
  seconds?: number;
  gap?: number;
}) {
  const items = Children.toArray(children);
  const perHalf = Math.max(1, Math.ceil(2560 / (items.length * (itemWidth + gap))));
  return (
    <div className="marquee bleed" role="region" aria-label={label}>
      <div className="marquee-track" style={{ animationDuration: `${seconds * perHalf}s` }}>
        {Array.from({ length: perHalf * 2 }, (_, copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy > 0 || undefined} inert={copy > 0 || undefined}>
            {items.map((child, i) => (
              <li key={i} className="shrink-0" style={{ width: itemWidth, marginRight: gap }}>
                {child}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
