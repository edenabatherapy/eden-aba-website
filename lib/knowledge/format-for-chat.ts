import { KNOWLEDGE_CATEGORY_META } from "@/lib/knowledge/categories";
import type { RetrievedKnowledgeArticle } from "@/lib/knowledge/types";

const CONTEXT_HEADER = `[EDEN KNOWLEDGE BASE — retrieved server-side for this message]
Use the articles below as your primary factual source when answering.
Rules:
- Do not diagnose autism or any medical condition.
- Do not provide medical advice or emergency guidance beyond directing emergencies to 911.
- Do not replace clinical evaluation or individualized treatment recommendations.
- If retrieved articles do not cover the question, say so honestly and suggest contacting Eden ABA Therapy.
- Keep existing intake flow and EDEN_INTAKE_SUBMIT behavior unchanged when collecting intake information.
- Use parent-friendly language.`;

/**
 * Formats retrieved articles into a message prefix for the OpenAI Responses API input.
 * This keeps the full knowledge base out of the static hosted prompt.
 */
export function formatKnowledgeContext(articles: RetrievedKnowledgeArticle[]) {
  if (articles.length === 0) {
    return "";
  }

  const blocks = articles.map((article, index) => {
    const categoryLabel = KNOWLEDGE_CATEGORY_META[article.category].label;
    const sourceLines = article.sources
      .map((source) => `  - ${source.name}: ${source.url}`)
      .join("\n");

    return [
      `Article ${index + 1}: ${article.title}`,
      `Category: ${categoryLabel}`,
      `Summary: ${article.summary}`,
      `Content:\n${article.content}`,
      `Internal sources (for maintenance — do not paste raw URLs unless helpful to the family):\n${sourceLines}`,
    ].join("\n");
  });

  return `${CONTEXT_HEADER}\n\n${blocks.join("\n\n---\n\n")}`;
}

export function buildAugmentedChatInput(userMessage: string, articles: RetrievedKnowledgeArticle[]) {
  const knowledgeContext = formatKnowledgeContext(articles);

  if (!knowledgeContext) {
    return userMessage;
  }

  return `${knowledgeContext}\n\n---\n\nUser message:\n${userMessage.trim()}`;
}
