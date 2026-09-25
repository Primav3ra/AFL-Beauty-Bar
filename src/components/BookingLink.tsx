"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { bookingHref } from "@/config/links";
import { useSelectedClinic } from "@/lib/clinic-store";

type Props = {
  children: ReactNode;
  className?: string;
  /** Treatment slug to prefill (?treatment=). */
  treatment?: string;
  type?: "virtual";
  "aria-label"?: string;
};

/** Every booking CTA goes through links.booking / links.virtualConsult, prefilled with treatment + selected clinic. */
export function BookingLink({ children, className, treatment, type, ...rest }: Props) {
  const clinic = useSelectedClinic();
  const href = bookingHref({ treatment, clinic: clinic.id, type });
  const external = /^https?:/.test(href);
  return external ? (
    <a href={href} className={className} data-booking aria-label={rest["aria-label"]}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} data-booking aria-label={rest["aria-label"]}>
      {children}
    </Link>
  );
}
