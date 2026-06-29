import { resolveLiveAvatarAgentId, type LiveAvatarLanguage } from "./language";

export type LiveAvatarServerConfig = {
  apiKey: string;
  avatarId: string;
  agentId: string;
  apiBaseUrl: string;
  language: LiveAvatarLanguage;
};

export function getLiveAvatarServerConfig(
  language: LiveAvatarLanguage = "en",
): LiveAvatarServerConfig | null {
  const apiKey = process.env.LIVEAVATAR_API_KEY?.trim();
  const avatarId = process.env.LIVEAVATAR_AVATAR_ID?.trim();
  const agentId = resolveLiveAvatarAgentId(language);

  if (!apiKey || !avatarId || !agentId) {
    return null;
  }

  return {
    apiKey,
    avatarId,
    agentId,
    apiBaseUrl: process.env.LIVEAVATAR_API_BASE_URL?.trim() || "https://api.liveavatar.com",
    language,
  };
}

export function getLiveAvatarConfigStatus() {
  return {
    hasApiKey: Boolean(process.env.LIVEAVATAR_API_KEY?.trim()),
    hasAvatarId: Boolean(process.env.LIVEAVATAR_AVATAR_ID?.trim()),
    hasAgentId: Boolean(process.env.LIVEAVATAR_AGENT_ID?.trim()),
    hasAgentIdVi: Boolean(process.env.LIVEAVATAR_AGENT_ID_VI?.trim()),
  };
}
