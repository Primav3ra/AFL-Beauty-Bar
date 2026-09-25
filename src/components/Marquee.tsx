import { Children, type ReactNode } from "react";
import { AutoScroll } from "./AutoScroll";

/**
 * Edge-to-edge row that scrolls on its own in a seamless loop and can also be swiped / scrolled by hand
 * (AutoScroll). The item set is repeated until half the track covers a wide (2560px) screen, then the
 * track is doubled; the repeats are hidden from assistive tech. Styles: .marquee in globals.css.
 */
export function Marquee({ children, label, itemWidth, seconds = 45, gap = 16 }: {
  children: ReactNode;
  label: string;
  /** Rendered width of one item, used to work out how many repeats fill the screen. */
  itemWidth: number;
  /** Time for one set of items to pass by. */
  seconds?: number;
  gap?: number;
}) {
  const items = Children.toArray(children);
  const perHalf = Math.max(1, Math.ceil(2560 / (items.length * (itemWidth + gap))));
  return (
    <AutoScroll label={label} seconds={seconds * perHalf}>
      <div className="flex w-max">
        {Array.from({ length: perHalf * 2 }, (_, copy) => (
          <ul key={copy} className="flex shrink-0" aria-hidden={copy > 0 || undefined}>
            {items.map((child, i) => (
              <li key={i} className="shrink-0" style={{ width: `min(${itemWidth}px, 80vw)`, marginRight: gap }}>
                {child}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </AutoScroll>
  );
}
