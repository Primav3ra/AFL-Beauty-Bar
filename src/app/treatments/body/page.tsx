import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";

export const metadata: Metadata = { title: "Body" };

export default function Page() {
  return <CategoryPage id="body" />;
}
