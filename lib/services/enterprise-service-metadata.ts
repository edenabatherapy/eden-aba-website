import type { Metadata } from "next";
import enterpriseServicesEn from "@/locales/partials/enterprise-services-en.json";
import {
  ENTERPRISE_SERVICE_CONTENT_KEYS,
  type EnterpriseServiceSlug,
} from "@/lib/services/enterprise-service-slugs";

type ServiceMeta = {
  title: string;
  description: string;
  keywords: string[];
};

export function getEnterpriseServiceMetadata(slug: EnterpriseServiceSlug): Metadata {
  const key = ENTERPRISE_SERVICE_CONTENT_KEYS[slug] as keyof typeof enterpriseServicesEn;
  const page = enterpriseServicesEn[key] as { meta: ServiceMeta };
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
