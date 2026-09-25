"use client";

import { useEffect, useState } from "react";
import { TOAST_EVENT } from "./PlaceholderLink";

export function Toaster() {
  const [toast, setToast] = useState<{ id: number; text: string } | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      setToast({ id: Date.now(), text: (e as CustomEvent<string>).detail });
      clearTimeout(timer);
      timer = setTimeout(() => setToast(null), 2200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-8 z-[100] flex justify-center">
      {toast && (
        <div
          key={toast.id}
          className="animate-[toast-in_.2s_ease-out] bg-espresso px-5 py-3 text-[15px] font-medium tracking-[-0.3px] text-sand shadow-lg"
        >
          {toast.text}
        </div>
      )}
    </div>
  );
}
