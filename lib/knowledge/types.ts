export const KNOWLEDGE_CATEGORIES = [
  "aba-therapy",
  "autism-education",
  "early-childhood-development",
  "developmental-milestones",
  "parent-training",
  "school-support",
  "social-skills",
  "communication-development",
  "daily-living-skills",
  "insurance-faqs",
  "intake-faqs",
  "eden-aba-services",
  "eden-aba-contact",
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

export type KnowledgeSource = {
  name: string;
  url: string;
  accessed?: string;
};

export type KnowledgeArticle = {
  id: string;
  category: KnowledgeCategory;
  title: string;
  summary: string;
  content: string;
  keywords: string[];
  sources: KnowledgeSource[];
};

export type RetrievedKnowledgeArticle = KnowledgeArticle & {
  score: number;
};
