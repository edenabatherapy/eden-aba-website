"use client";

import { notFound } from "next/navigation";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerContentRenderer from "@/components/careers/hub/CareerContentRenderer";
import CareerPageHero from "@/components/careers/hub/CareerPageHero";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import { getCareerPage, type CareerPageSlug } from "@/lib/careers/career-pages-data";

type CareerContentPageProps = {
  slug: CareerPageSlug;
};

export default function CareerContentPage({ slug }: CareerContentPageProps) {
  const page = getCareerPage(slug);
  if (!page) notFound();

  return (
    <CareerPageShell>
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: page.hero.title },
        ]}
      />
      <CareerPageHero eyebrow={page.hero.eyebrow} title={page.hero.title} subtitle={page.hero.subtitle} />
      <CareerContentRenderer page={page} />
    </CareerPageShell>
  );
}
