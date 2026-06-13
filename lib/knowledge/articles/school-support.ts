import type { KnowledgeArticle } from "@/lib/knowledge/types";

export const schoolSupportArticles: KnowledgeArticle[] = [
  {
    id: "school-iep-basics",
    category: "school-support",
    title: "School Support and IEP Basics (General Overview)",
    summary: "Public schools in the U.S. may provide special education services through evaluations and Individualized Education Programs (IEPs) when eligible.",
    content:
      "When a child's disability affects educational progress, families may request a school evaluation. If the child qualifies under IDEA (Individuals with Disabilities Education Act), the school team develops an Individualized Education Program (IEP) with goals, services, and accommodations.\n\nIEP teams typically include parents, teachers, and related service providers. Services may include special education instruction, speech therapy, occupational therapy, or behavior support — depending on documented needs.\n\nABA therapy provided through private insurance or a clinic is separate from school services, though teams can collaborate with family permission. Consistent communication between school and outside providers helps align strategies.\n\nSchool law and eligibility rules vary. This overview is general information, not legal advice. Contact your school district's special education office for local procedures.",
    keywords: [
      "iep",
      "school",
      "special education",
      "idea",
      "school services",
      "504",
    ],
    sources: [
      {
        name: "U.S. Department of Education — IDEA",
        url: "https://www.ed.gov/laws-and-policy/individuals-disabilities",
        accessed: "2026-06-02",
      },
      {
        name: "CDC — Autism and School",
        url: "https://www.cdc.gov/autism/treatment/",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "school-collaboration-aba",
    category: "school-support",
    title: "Collaborating Between ABA Providers and Schools",
    summary: "With family consent, schools and ABA teams can share strategies that support learning and behavior across settings.",
    content:
      "Many children receive ABA through a clinic or home program while also attending school. Collaboration works best when:\n\n• Families sign releases allowing appropriate information sharing.\n• Teams focus on functional goals (communication, independence, safety).\n• Strategies are realistic for classroom settings.\n• Progress is reviewed periodically.\n\nSchool-based behavior support must follow educational laws and district policies. Private ABA providers cannot require schools to implement specific plans, but partnership often benefits the child when aligned with the IEP.\n\nEden ABA Therapy offers school support services in some cases — see Eden ABA Services articles for program-specific details.",
    keywords: [
      "school collaboration",
      "bcba school",
      "behavior support school",
      "teacher",
      "classroom",
    ],
    sources: [
      {
        name: "Autism Speaks — School Community Tool Kit",
        url: "https://www.autismspeaks.org/tool-kit/autism-speaks-school-community-tool-kit",
        accessed: "2026-06-02",
      },
    ],
  },
];
