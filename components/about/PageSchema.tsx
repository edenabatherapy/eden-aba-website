import { OUR_STORY_META, OUR_STORY_PAGE } from "@/lib/our-story-content";

export default function AboutPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.edenabatherapy.com/about/our-story#webpage",
        url: "https://www.edenabatherapy.com/about/our-story",
        name: OUR_STORY_META.title,
        description: OUR_STORY_META.description,
        isPartOf: { "@id": "https://www.edenabatherapy.com/#website" },
        about: {
          "@type": "MedicalOrganization",
          name: "Eden ABA Therapy",
          medicalSpecialty: "Applied Behavior Analysis",
        },
      },
      {
        "@type": "MedicalOrganization",
        "@id": "https://www.edenabatherapy.com/#organization",
        name: "Eden ABA Therapy",
        description: OUR_STORY_PAGE.mission.statement,
        url: "https://www.edenabatherapy.com",
        knowsAbout: OUR_STORY_META.keywords,
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
