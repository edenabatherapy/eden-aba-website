import { EDEN_ANNANDALE_ADDRESS, EDEN_ANNANDALE_PHONE } from "@/lib/eden-location";

const SITE_URL = "https://www.edenabatherapy.com";

export default function FooterSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Eden ABA Therapy",
        url: SITE_URL,
        telephone: EDEN_ANNANDALE_PHONE,
        address: {
          "@type": "PostalAddress",
          streetAddress: EDEN_ANNANDALE_ADDRESS,
          addressLocality: "Annandale",
          addressRegion: "VA",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Eden ABA Therapy",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
