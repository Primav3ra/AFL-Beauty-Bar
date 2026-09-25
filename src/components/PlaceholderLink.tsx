"use client";

import type { ReactNode } from "react";

export const TOAST_EVENT = "afl:toast";

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Why it's a placeholder — recorded in data-placeholder and docs/INTERACTIONS.md. */
  reason?: string;
  message?: string;
  "aria-label"?: string;
};

/** Looks exactly like the designed link; shows a "Coming soon" toast instead of navigating. */
export function PlaceholderLink({ children, className, reason = "no target yet", message = "Coming soon", ...rest }: Props) {
  return (
    <a
      href="#"
      role="button"
      data-placeholder={reason}
      className={className}
      aria-label={rest["aria-label"]}
      onClick={(e) => {
        e.preventDefault();
        showToast(message);
      }}
    >
      {children}
    </a>
  );
}
