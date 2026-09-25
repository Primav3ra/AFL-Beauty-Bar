import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = { title: "Facial Treatments" };

export default function Page() {
  return <CategoryPage id="face-care" />;
}
