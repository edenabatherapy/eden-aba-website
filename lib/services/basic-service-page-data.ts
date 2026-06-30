import type { Metadata } from "next";
import en from "@/locales/en.json";
import { SITE_IMAGES } from "@/lib/site-images";

export const BASIC_SERVICE_PAGE_INDICES = {
  "early-intervention-aba-therapy": 3,
  "behavior-assessment": 4,
  "individualized-aba-programs": 5,
  "social-skills-training": 6,
} as const;

export type BasicServicePageSlug = keyof typeof BASIC_SERVICE_PAGE_INDICES;

export function getBasicServicePageContent(slug: BasicServicePageSlug) {
  const index = BASIC_SERVICE_PAGE_INDICES[slug];
  const [title, description] = en.common.services[index];
  const imageAlt = en.common.serviceImageAlts[index] ?? title;

  return {
    index,
    title,
    description,
    imageAlt,
    heroImage: SITE_IMAGES.home.services[index],
    canonical: `/services/${slug}`,
  };
}

export function getBasicServicePageMetadata(slug: BasicServicePageSlug): Metadata {
  const { title, description, canonical } = getBasicServicePageContent(slug);
  const pageTitle = `${title} | Eden ABA Therapy`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    alternates: {
      canonical,
    },
  };
}
