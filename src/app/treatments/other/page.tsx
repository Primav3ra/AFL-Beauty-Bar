import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = { title: "Wellness & Longevity" };

export default function Page() {
  return <CategoryPage id="other" />;
}
