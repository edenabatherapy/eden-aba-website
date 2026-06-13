const STOP_WORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "from",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "can",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "he",
  "she",
  "they",
  "them",
  "their",
  "it",
  "this",
  "that",
  "what",
  "how",
  "when",
  "where",
  "why",
  "who",
  "about",
  "tell",
  "please",
  "help",
  "need",
  "want",
  "know",
  "like",
  "get",
]);

export function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

export function countPhraseMatches(text: string, phrases: string[]) {
  const normalized = text.toLowerCase();
  let score = 0;

  for (const phrase of phrases) {
    const trimmed = phrase.trim().toLowerCase();
    if (trimmed.length > 2 && normalized.includes(trimmed)) {
      score += trimmed.includes(" ") ? 6 : 3;
    }
  }

  return score;
}

export function countTokenOverlap(tokens: string[], haystack: string) {
  const normalizedHaystack = ` ${haystack.toLowerCase()} `;
  let score = 0;

  for (const token of tokens) {
    if (normalizedHaystack.includes(` ${token} `) || normalizedHaystack.includes(token)) {
      score += 1;
    }
  }

  return score;
}

export type RetrieveKnowledgeOptions = {
  limit?: number;
  minScore?: number;
};