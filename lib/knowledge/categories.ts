import type { KnowledgeCategory } from "@/lib/knowledge/types";

export type KnowledgeCategoryMeta = {
  id: KnowledgeCategory;
  label: string;
  description: string;
  aliases: string[];
};

export const KNOWLEDGE_CATEGORY_META: Record<KnowledgeCategory, KnowledgeCategoryMeta> = {
  "aba-therapy": {
    id: "aba-therapy",
    label: "ABA Therapy",
    description: "Applied Behavior Analysis basics, how therapy works, and what families can expect.",
    aliases: ["aba", "applied behavior analysis", "behavior therapy", "bcba", "rbt"],
  },
  "autism-education": {
    id: "autism-education",
    label: "Autism Education",
    description: "General autism spectrum information for families — not diagnosis or medical advice.",
    aliases: ["autism", "asd", "autism spectrum", "autistic", "neurodiversity"],
  },
  "early-childhood-development": {
    id: "early-childhood-development",
    label: "Early Childhood Development",
    description: "How young children learn, play, and grow in the early years.",
    aliases: ["early childhood", "toddler development", "preschool", "early intervention"],
  },
  "developmental-milestones": {
    id: "developmental-milestones",
    label: "Developmental Milestones",
    description: "Typical skill ranges by age — for general education, not individual diagnosis.",
    aliases: ["milestones", "developmental delay", "development checklist", "ages and stages"],
  },
  "parent-training": {
    id: "parent-training",
    label: "Parent Training",
    description: "Caregiver coaching and strategies families can use at home.",
    aliases: ["parent coaching", "caregiver training", "parent guidance", "family training"],
  },
  "school-support": {
    id: "school-support",
    label: "School Support",
    description: "Collaboration between therapy, school teams, and families.",
    aliases: ["school", "iep", "504", "classroom", "teacher collaboration"],
  },
  "social-skills": {
    id: "social-skills",
    label: "Social Skills",
    description: "Friendship, play, and social participation skills for children.",
    aliases: ["social", "friends", "play skills", "peer interaction", "socialization"],
  },
  "communication-development": {
    id: "communication-development",
    label: "Communication Development",
    description: "Speech, language, and alternative communication support.",
    aliases: ["speech", "language", "communication", "aac", "talking", "expressive language"],
  },
  "daily-living-skills": {
    id: "daily-living-skills",
    label: "Daily Living Skills",
    description: "Routines, self-care, and independence in everyday life.",
    aliases: ["adl", "daily routines", "self care", "toileting", "dressing", "independence"],
  },
  "insurance-faqs": {
    id: "insurance-faqs",
    label: "Insurance FAQs",
    description: "General insurance and benefits questions for ABA services.",
    aliases: ["insurance", "coverage", "benefits", "copay", "deductible", "authorization", "medicaid"],
  },
  "intake-faqs": {
    id: "intake-faqs",
    label: "Intake FAQs",
    description: "How to start services and what happens during onboarding.",
    aliases: ["intake", "admissions", "enrollment", "getting started", "start aba"],
  },
  "eden-aba-services": {
    id: "eden-aba-services",
    label: "Eden ABA Services",
    description: "Service settings and programs offered by Eden ABA Therapy.",
    aliases: ["eden services", "center based", "in home", "home based", "early intervention eden"],
  },
  "eden-allied-health-services": {
    id: "eden-allied-health-services",
    label: "Eden Allied Health Services",
    description:
      "Occupational therapy, speech-language therapy, and feeding & swallowing therapy at Eden.",
    aliases: [
      "occupational therapy",
      "occupational therapist",
      "ot",
      "speech therapy",
      "speech language",
      "speech-language",
      "slp",
      "feeding therapy",
      "swallowing",
      "feeding and swallowing",
      "allied health",
      "fine motor",
      "sensory processing",
    ],
  },
  "eden-aba-contact": {
    id: "eden-aba-contact",
    label: "Eden ABA Contact Information",
    description: "Location, phone, hours, and how to reach Eden ABA Therapy.",
    aliases: ["contact", "phone", "address", "location", "hours", "annandale", "directions"],
  },
};

export function getCategoryMeta(category: KnowledgeCategory) {
  return KNOWLEDGE_CATEGORY_META[category];
}
