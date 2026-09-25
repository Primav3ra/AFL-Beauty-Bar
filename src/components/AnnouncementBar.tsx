import Link from "next/link";
import { links } from "@/config/links";
import { PlaceholderLink } from "./PlaceholderLink";
import { ArrowRight } from "./icons";

const item = "text-[13px] leading-[24.1px] font-medium tracking-[-0.4px] text-slate hover:text-ink transition-colors";
const Divider = () => <span className="h-[26px] w-px bg-slate" aria-hidden />;

/** Figma 354:70 — shared across every page. */
export function AnnouncementBar() {
  return (
    <div className="flex h-[42px] items-center justify-center gap-5 bg-blush">
      <span className="flex h-[26px] w-[65px] items-center justify-center bg-white text-[13px] leading-[11px] font-medium tracking-[-0.4px] text-slate">
        New
      </span>
      <Link href={links.virtualConsult} className={item}>
        Complimentary virtual consultations
      </Link>
      <Divider />
      <Link href="/membership" className={item}>
        Earn $25 when you become a member
      </Link>
      <Divider />
      <a href="tel:+17867502355" className={item}>
        Call us @ (786) 750-2355
      </a>
      <Divider />
      <PlaceholderLink reason="announcement 'Learn More' has no target" className={`${item} flex items-center gap-1`}>
        Learn More <ArrowRight className="h-[10px] w-[14px]" />
      </PlaceholderLink>
    </div>
  );
}
