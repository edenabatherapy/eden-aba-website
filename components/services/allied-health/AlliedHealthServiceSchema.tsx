"use client";

import type { AlliedHealthSlug } from "@/lib/services/allied-health-slugs";
import { ALLIED_HEALTH_CONTENT_KEYS } from "@/lib/services/allied-health-slugs";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

type FaqItem = { question: string; answer: string };

type AlliedHealthServiceSchemaProps = {
  slug: AlliedHealthSlug;
  faq: readonly FaqItem[];
};

export default function AlliedHealthServiceSchema({ slug, faq }: AlliedHealthServiceSchemaProps) {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const bundle = t.alliedHealthServices as Record<string, { meta: { title: string; description: string }; hero: { title: string; subtitle: string; breadcrumbLabel: string } }>;
  const key = ALLIED_HEALTH_CONTENT_KEYS[slug];
  const page = bundle[key];
  if (!page) return null;

  const canonical = `https://edenabatherapy.com/services/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://edenabatherapy.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://edenabatherapy.com/" },
          { "@type": "ListItem", position: 3, name: page.hero.breadcrumbLabel, item: canonical },
        ],
      },
      {
        "@type": "MedicalWebPage",
        name: page.meta.title,
        description: page.meta.description,
        url: canonical,
        inLanguage: language === "vi" ? "vi" : "en",
        isPartOf: { "@type": "WebSite", name: "Eden ABA Therapy", url: "https://edenabatherapy.com/" },
      },
      {
        "@type": "Service",
        name: page.hero.title,
        description: page.hero.subtitle,
        provider: {
          "@type": "MedicalOrganization",
          name: "Eden ABA Therapy",
          areaServed: "Virginia",
        },
        serviceType: page.hero.title,
        url: canonical,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
