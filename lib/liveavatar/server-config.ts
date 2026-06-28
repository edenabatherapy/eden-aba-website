export type LiveAvatarServerConfig = {
  apiKey: string;
  avatarId: string;
  agentId: string;
  apiBaseUrl: string;
};

export function getLiveAvatarServerConfig(): LiveAvatarServerConfig | null {
  const apiKey = process.env.LIVEAVATAR_API_KEY?.trim();
  const avatarId = process.env.LIVEAVATAR_AVATAR_ID?.trim();
  const agentId = process.env.LIVEAVATAR_AGENT_ID?.trim();

  if (!apiKey || !avatarId || !agentId) {
    return null;
  }

  return {
    apiKey,
    avatarId,
    agentId,
    apiBaseUrl: process.env.LIVEAVATAR_API_BASE_URL?.trim() || "https://api.liveavatar.com",
  };
}

export function getLiveAvatarConfigStatus() {
  return {
    hasApiKey: Boolean(process.env.LIVEAVATAR_API_KEY?.trim()),
    hasAvatarId: Boolean(process.env.LIVEAVATAR_AVATAR_ID?.trim()),
    hasAgentId: Boolean(process.env.LIVEAVATAR_AGENT_ID?.trim()),
  };
}
