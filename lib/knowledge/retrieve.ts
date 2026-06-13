import { KNOWLEDGE_CATEGORY_META } from "@/lib/knowledge/categories";
import { KNOWLEDGE_ARTICLES } from "@/lib/knowledge/articles";
import { countPhraseMatches, countTokenOverlap, tokenize } from "@/lib/knowledge/retrieve-utils";
import type { KnowledgeCategory, RetrievedKnowledgeArticle } from "@/lib/knowledge/types";

export type RetrieveKnowledgeOptions = {
  limit?: number;
  minScore?: number;
};

const DEFAULT_LIMIT = 5;
const DEFAULT_MIN_SCORE = 2;

function scoreCategoryHints(query: string) {
  const scores = new Map<KnowledgeCategory, number>();
  const normalizedQuery = query.toLowerCase();

  for (const meta of Object.values(KNOWLEDGE_CATEGORY_META)) {
    let categoryScore = 0;

    if (normalizedQuery.includes(meta.label.toLowerCase())) {
      categoryScore += 8;
    }

    categoryScore += countPhraseMatches(normalizedQuery, meta.aliases);

    if (categoryScore > 0) {
      scores.set(meta.id, categoryScore);
    }
  }

  return scores;
}

function scoreArticle(query: string, categoryBoost: number) {
  const tokens = tokenize(query);
  const normalizedQuery = query.toLowerCase();

  return KNOWLEDGE_ARTICLES.map((article) => {
    let score = categoryBoost;

    score += countPhraseMatches(normalizedQuery, [article.title, article.summary]);
    score += countPhraseMatches(normalizedQuery, article.keywords) * 2;
    score += countTokenOverlap(tokens, article.title) * 4;
    score += countTokenOverlap(tokens, article.summary) * 2;
    score += countTokenOverlap(tokens, article.content);
    score += countTokenOverlap(tokens, article.keywords.join(" ")) * 2;

    if (tokens.some((token) => article.id.includes(token))) {
      score += 2;
    }

    return { ...article, score };
  });
}

/**
 * Retrieve the most relevant knowledge articles for a user query.
 * Server-side only — articles are not embedded in the static OpenAI prompt.
 */
export function retrieveKnowledgeForQuery(
  query: string,
  options: RetrieveKnowledgeOptions = {},
): RetrievedKnowledgeArticle[] {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const minScore = options.minScore ?? DEFAULT_MIN_SCORE;
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const categoryHints = scoreCategoryHints(trimmedQuery);

  const scored = scoreArticle(trimmedQuery, 0).map((article) => {
    const boost = categoryHints.get(article.category) ?? 0;
    return { ...article, score: article.score + boost };
  });

  scored.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));

  const relevant = scored.filter((article) => article.score >= minScore).slice(0, limit);

  if (relevant.length > 0) {
    return relevant;
  }

  // Fallback: return one article per strongly hinted category, or general intro articles.
  const hintedCategories = [...categoryHints.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category]) => category);

  if (hintedCategories.length > 0) {
    const fallback: RetrievedKnowledgeArticle[] = [];

    for (const category of hintedCategories) {
      const first = KNOWLEDGE_ARTICLES.find((article) => article.category === category);
      if (first) {
        fallback.push({ ...first, score: categoryHints.get(category) ?? 1 });
      }
    }

    return fallback.slice(0, limit);
  }

  // Last resort: broad starter articles for new conversations.
  const starterIds = ["aba-what-is-aba", "eden-services-overview", "eden-contact-annandale"];
  return starterIds
    .map((id) => KNOWLEDGE_ARTICLES.find((article) => article.id === id))
    .filter((article): article is NonNullable<typeof article> => Boolean(article))
    .map((article) => ({ ...article, score: 1 }))
    .slice(0, Math.min(3, limit));
}

export function getKnowledgeRetrievalSummary(query: string, articles: RetrievedKnowledgeArticle[]) {
  return {
    query: query.trim(),
    matchCount: articles.length,
    articleIds: articles.map((article) => article.id),
    categories: [...new Set(articles.map((article) => article.category))],
    topScore: articles[0]?.score ?? 0,
  };
}
