export type LiveAvatarLanguage = "en" | "vi";

export function parseLiveAvatarLanguage(value: unknown): LiveAvatarLanguage {
  return value === "vi" ? "vi" : "en";
}

export function resolveLiveAvatarAgentId(language: LiveAvatarLanguage): string | null {
  const englishAgentId = process.env.LIVEAVATAR_AGENT_ID?.trim();
  if (!englishAgentId) {
    return null;
  }

  if (language === "vi") {
    return process.env.LIVEAVATAR_AGENT_ID_VI?.trim() || englishAgentId;
  }

  return englishAgentId;
}
