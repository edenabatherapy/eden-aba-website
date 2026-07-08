import { VIRTUAL_ABA_FAQ, VIRTUAL_ABA_META } from "@/lib/services/virtual-aba-therapy-data";

export default function VirtualAbaPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: VIRTUAL_ABA_META.title,
    description: VIRTUAL_ABA_META.description,
    about: { "@type": "MedicalTherapy", name: "Virtual Applied Behavior Analysis" },
    mainEntity: VIRTUAL_ABA_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
