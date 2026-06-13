export { KNOWLEDGE_CATEGORIES } from "@/lib/knowledge/types";
export type {
  KnowledgeArticle,
  KnowledgeCategory,
  KnowledgeSource,
  RetrievedKnowledgeArticle,
} from "@/lib/knowledge/types";

export { KNOWLEDGE_CATEGORY_META, getCategoryMeta } from "@/lib/knowledge/categories";
export {
  KNOWLEDGE_ARTICLES,
  getAllKnowledgeArticles,
  getKnowledgeArticleById,
  getKnowledgeArticlesByCategory,
} from "@/lib/knowledge/articles";

export {
  retrieveKnowledgeForQuery,
  getKnowledgeRetrievalSummary,
  type RetrieveKnowledgeOptions,
} from "@/lib/knowledge/retrieve";

export { formatKnowledgeContext, buildAugmentedChatInput } from "@/lib/knowledge/format-for-chat";
