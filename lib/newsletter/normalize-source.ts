const SOURCE_ALIASES: Record<string, string> = {
  "homepage-banner": "homepage_newsletter",
};

export function normalizeNewsletterSource(source: string): string {
  const trimmed = source.trim();
  return SOURCE_ALIASES[trimmed] ?? trimmed;
}
