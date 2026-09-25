"use client";

import { useId, useState, type ReactNode } from "react";

type Item = { q: string; a: string | null };

/** Answer text → paragraphs, with consecutive "* " lines rendered as a bullet list. */
function Answer({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={blocks.length} className="list-disc space-y-1 pl-5 marker:text-brown">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };
  for (const line of text.split("\n")) {
    const bullet = line.match(/^\s*[*•-]\s+(.*)$/);
    if (bullet) bullets.push(bullet[1]);
    else {
      flush();
      if (line.trim()) blocks.push(<p key={blocks.length}>{line}</p>);
    }
  }
  flush();
  return <div className="space-y-3">{blocks}</div>;
}

/** Frequently asked questions: hairline-separated rows, first one open. */
export function FaqAccordion({ items }: { items: Item[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="border-t border-espresso/15">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q} className="border-b border-espresso/15">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[18px] leading-[26px] font-semibold tracking-[-0.4px] text-espresso transition-colors hover:text-brown"
              >
                {it.q}
                <span aria-hidden className={`relative flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors ${isOpen ? "border-brown bg-brown text-white" : "border-espresso/20 text-espresso group-hover:border-brown"}`}>
                  <span className="absolute h-[1.5px] w-3 bg-current" />
                  <span className={`absolute h-3 w-[1.5px] bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className={`max-w-[640px] pb-6 text-[15px] leading-[26px] ${it.a ? "text-espresso/80" : "text-espresso/45"}`}>
                  {it.a ? <Answer text={it.a} /> : "Answer coming soon."}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
