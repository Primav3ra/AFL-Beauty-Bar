"use client";

import { useSyncExternalStore } from "react";
import { DEFAULT_CLINIC, clinicById, type Clinic } from "@/data/clinics";

// Selected clinic lives in localStorage so every "Selected Clinic" selector and booking link agree.
const KEY = "afl:clinic";
const EVENT = "afl:clinic-change";

function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const read = () => localStorage.getItem(KEY) ?? DEFAULT_CLINIC.id;

export function useSelectedClinic(): Clinic {
  const id = useSyncExternalStore(subscribe, read, () => DEFAULT_CLINIC.id);
  return clinicById(id) ?? DEFAULT_CLINIC;
}

export function setSelectedClinic(id: Clinic["id"]) {
  localStorage.setItem(KEY, id);
  window.dispatchEvent(new Event(EVENT));
}
