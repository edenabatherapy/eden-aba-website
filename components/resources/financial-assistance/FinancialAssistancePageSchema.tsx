import { FINANCIAL_ASSISTANCE_META } from "@/lib/financial-assistance/meta";
import { FINANCIAL_ASSISTANCE_RESOURCES } from "@/lib/financial-assistance/resources";

export default function FinancialAssistancePageSchema() {
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: FINANCIAL_ASSISTANCE_META.title,
    description: FINANCIAL_ASSISTANCE_META.description,
    url: "https://www.edenabatherapy.com/resources/financial-assistance",
    isPartOf: {
      "@type": "WebSite",
      name: "Eden ABA Therapy",
    },
    about: {
      "@type": "Thing",
      name: "Financial assistance for autism and ABA therapy",
    },
  };

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Financial assistance resources",
    itemListElement: FINANCIAL_ASSISTANCE_RESOURCES.slice(0, 12).map((resource, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: resource.title,
      url: resource.officialLinks[0]?.url,
    })),
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Eden ABA Therapy offer financial assistance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eden ABA Therapy helps families navigate insurance, Medicaid, and community resources. The Autism Care Fund may provide additional support for eligible families when funding is available. Contact Eden to discuss your situation.",
        },
      },
      {
        "@type": "Question",
        name: "Is Autism Care Fund donation tax-deductible?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eden ABA Therapy is a healthcare provider, not a registered charity. Donations are not represented as tax-deductible unless separately confirmed in writing by Eden.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
