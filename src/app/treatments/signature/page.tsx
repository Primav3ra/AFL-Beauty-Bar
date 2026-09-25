import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = { title: "Fatema’s Signature Treatments" };

export default function Page() {
  return <CategoryPage id="signature" />;
}
