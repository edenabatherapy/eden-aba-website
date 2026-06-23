import { EDEN_OPENING_HOURS_SPECIFICATION } from "@/lib/eden-business-hours";
import { OUR_APPROACH_META, OUR_APPROACH_PAGE } from "@/lib/our-approach-content";

const SITE_URL = "https://www.edenabatherapy.com";
const PAGE_URL = `${SITE_URL}/about/our-approach`;

export default function ApproachPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: OUR_APPROACH_META.title,
        description: OUR_APPROACH_META.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Eden ABA Therapy",
        url: SITE_URL,
        description: OUR_APPROACH_PAGE.philosophy.paragraphs[0],
        areaServed: { "@type": "State", name: "Virginia" },
        audience: {
          "@type": "PeopleAudience",
          audienceType: "Children with autism and their families",
        },
        knowsAbout: OUR_APPROACH_META.keywords,
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${SITE_URL}/#medicalbusiness`,
        name: "Eden ABA Therapy",
        url: SITE_URL,
        medicalSpecialty: [
          "Autism therapy",
          "Early intervention",
          "Behavioral therapy",
          "Family support",
        ],
        areaServed: { "@type": "State", name: "Virginia" },
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: "Eden ABA Therapy",
        url: SITE_URL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "7700 Little River Turnpike, Suite 304",
          addressLocality: "Annandale",
          addressRegion: "VA",
          postalCode: "22003",
          addressCountry: "US",
        },
        telephone: "+1-703-587-5238",
        email: "info@edenabatherapy.com",
        openingHoursSpecification: [...EDEN_OPENING_HOURS_SPECIFICATION],
        areaServed: { "@type": "State", name: "Virginia" },
      },
      {
        "@type": "Service",
        "@id": `${PAGE_URL}#service`,
        name: "Applied Behavior Analysis Therapy",
        serviceType: "Applied Behavior Analysis Therapy",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "State", name: "Virginia" },
        audience: {
          "@type": "PeopleAudience",
          audienceType: "Children with autism and their families",
        },
        description: OUR_APPROACH_PAGE.hero.subheadline,
      },
      {
        "@type": "FAQPage",
        "@id": `${PAGE_URL}#faq`,
        mainEntity: OUR_APPROACH_PAGE.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
