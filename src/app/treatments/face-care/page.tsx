import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = { title: "Face Care" };

export default function Page() {
  return <CategoryPage id="face-care" />;
}
