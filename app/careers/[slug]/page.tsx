import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareerContentPage from "@/components/careers/hub/CareerContentPage";
import { CAREER_PAGE_SLUGS, getCareerPage, type CareerPageSlug } from "@/lib/careers/career-pages-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.values(CAREER_PAGE_SLUGS)
    .filter(
      (slug) =>
        slug !== "rbt" &&
        slug !== "bcba" &&
        slug !== "bt" &&
        slug !== "clinical-leadership" &&
        slug !== "why-eden" &&
        slug !== "benefits" &&
        slug !== "career-paths" &&
        slug !== "life-at-eden",
    )
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getCareerPage(slug);
  if (!page) return { title: "Careers | Eden ABA Therapy" };
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: `/careers/${slug}` },
  };
}

export default async function CareerSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getCareerPage(slug);
  if (!page) notFound();
  return <CareerContentPage slug={slug as CareerPageSlug} />;
}
