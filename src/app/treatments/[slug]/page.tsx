import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TreatmentDetail } from "@/components/TreatmentDetail";
import { treatmentBySlug, treatments } from "@/data/treatments";

// All 32 detail pages are generated at build time; unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const t = treatmentBySlug((await params).slug);
  return t ? { title: t.heroTitle, description: t.process.description ?? undefined } : {};
}

export default async function Page({ params }: PageProps<"/treatments/[slug]">) {
  const t = treatmentBySlug((await params).slug);
  if (!t) notFound();
  return <TreatmentDetail t={t} />;
}
