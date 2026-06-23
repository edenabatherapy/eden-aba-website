import {
  SCHOOL_ABA_FAQ,
  SCHOOL_BASED_ABA_META,
  SCHOOL_HERO,
} from "@/lib/services/school-based-aba-data";

export default function SchoolBasedAbaPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://edenabatherapy.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://edenabatherapy.com/services/school-based-aba-therapy" },
          { "@type": "ListItem", position: 3, name: "School-Based ABA Therapy" },
        ],
      },
      {
        "@type": "EducationalOrganization",
        name: "Eden ABA Therapy",
        description: SCHOOL_BASED_ABA_META.description,
      },
      {
        "@type": "Service",
        name: "School-Based ABA Therapy",
        description: SCHOOL_HERO.subtitle,
        provider: { "@type": "Organization", name: "Eden ABA Therapy" },
        serviceType: "Applied Behavior Analysis in Educational Settings",
        areaServed: "Virginia",
      },
      {
        "@type": "FAQPage",
        mainEntity: SCHOOL_ABA_FAQ.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
