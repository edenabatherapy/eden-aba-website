import type { Metadata } from "next";
import alliedHealthEn from "@/locales/partials/allied-health-services-en.json";
import {
  ALLIED_HEALTH_CONTENT_KEYS,
  type AlliedHealthSlug,
} from "@/lib/services/allied-health-slugs";

type ServiceMeta = {
  title: string;
  description: string;
  keywords: string[];
};

export function getAlliedHealthMetadata(slug: AlliedHealthSlug): Metadata {
  const key = ALLIED_HEALTH_CONTENT_KEYS[slug] as keyof typeof alliedHealthEn;
  const page = alliedHealthEn[key] as { meta: ServiceMeta };
  const { title, description, keywords } = page.meta;

  return {
    title,
    description,
    keywords: [...keywords],
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}
