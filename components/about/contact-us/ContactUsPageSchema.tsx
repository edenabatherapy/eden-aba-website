import { EDEN_OPENING_HOURS_SPECIFICATION } from "@/lib/eden-business-hours";
import { CONTACT_US_META } from "@/lib/about/contact-us-data";

const SITE_URL = "https://www.edenabatherapy.com";
const PAGE_URL = `${SITE_URL}/about/contact-us`;

export default function ContactUsPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: CONTACT_US_META.title,
        description: CONTACT_US_META.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${PAGE_URL}#localbusiness`,
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
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
