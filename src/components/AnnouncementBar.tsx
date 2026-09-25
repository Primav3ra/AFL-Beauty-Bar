import Link from "next/link";
import { links } from "@/config/links";
import { PlaceholderLink } from "./PlaceholderLink";
import { ArrowRight } from "./icons";

const item = "text-[13px] leading-5 font-medium tracking-[-0.3px] text-slate hover:text-ink transition-colors whitespace-nowrap";
const Divider = () => <span className="hidden h-5 w-px bg-slate/60 md:block" aria-hidden />;

/** Figma 354:70 — shared across every page. Phones show the lead offer only. */
export function AnnouncementBar() {
  return (
    <div className="flex min-h-10 items-center justify-center gap-4 bg-blush px-4 py-2">
      <span className="flex h-6 items-center bg-white px-3 text-[12px] leading-none font-medium text-slate">New</span>
      <Link href={links.virtualConsult} className={item}>
        Complimentary virtual consultations
      </Link>
      <Divider />
      <Link href="/membership" className={`${item} hidden md:inline`}>
        Earn $25 when you become a member
      </Link>
      <Divider />
      <a href="tel:+17867502355" className={`${item} hidden lg:inline`}>
        Call us @ (786) 750-2355
      </a>
      <Divider />
      <PlaceholderLink reason="announcement 'Learn More' has no target" className={`${item} hidden items-center gap-1 lg:flex`}>
        Learn More <ArrowRight className="h-[10px] w-[14px]" />
      </PlaceholderLink>
    </div>
  );
}
