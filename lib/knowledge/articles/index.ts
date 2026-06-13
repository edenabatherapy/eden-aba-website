import { abaTherapyArticles } from "@/lib/knowledge/articles/aba-therapy";
import { autismEducationArticles } from "@/lib/knowledge/articles/autism-education";
import { communicationDevelopmentArticles } from "@/lib/knowledge/articles/communication-development";
import { dailyLivingSkillsArticles } from "@/lib/knowledge/articles/daily-living-skills";
import { developmentalMilestonesArticles } from "@/lib/knowledge/articles/developmental-milestones";
import { earlyChildhoodArticles } from "@/lib/knowledge/articles/early-childhood-development";
import { edenContactArticles } from "@/lib/knowledge/articles/eden-contact";
import { edenServicesArticles } from "@/lib/knowledge/articles/eden-services";
import { insuranceFaqsArticles } from "@/lib/knowledge/articles/insurance-faqs";
import { intakeFaqsArticles } from "@/lib/knowledge/articles/intake-faqs";
import { parentTrainingArticles } from "@/lib/knowledge/articles/parent-training";
import { schoolSupportArticles } from "@/lib/knowledge/articles/school-support";
import { socialSkillsArticles } from "@/lib/knowledge/articles/social-skills";
import type { KnowledgeArticle, KnowledgeCategory } from "@/lib/knowledge/types";

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  ...abaTherapyArticles,
  ...autismEducationArticles,
  ...earlyChildhoodArticles,
  ...developmentalMilestonesArticles,
  ...parentTrainingArticles,
  ...schoolSupportArticles,
  ...socialSkillsArticles,
  ...communicationDevelopmentArticles,
  ...dailyLivingSkillsArticles,
  ...insuranceFaqsArticles,
  ...intakeFaqsArticles,
  ...edenServicesArticles,
  ...edenContactArticles,
];

const articlesById = new Map(KNOWLEDGE_ARTICLES.map((article) => [article.id, article]));

const articlesByCategory = KNOWLEDGE_ARTICLES.reduce<Map<KnowledgeCategory, KnowledgeArticle[]>>(
  (map, article) => {
    const list = map.get(article.category) ?? [];
    list.push(article);
    map.set(article.category, list);
    return map;
  },
  new Map(),
);

export function getKnowledgeArticleById(id: string) {
  return articlesById.get(id);
}

export function getKnowledgeArticlesByCategory(category: KnowledgeCategory) {
  return articlesByCategory.get(category) ?? [];
}

export function getAllKnowledgeArticles() {
  return KNOWLEDGE_ARTICLES;
}
