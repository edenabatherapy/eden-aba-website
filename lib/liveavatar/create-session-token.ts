import type { LiveAvatarServerConfig } from "./server-config";

type LiveAvatarApiEnvelope<T> = {
  code?: number;
  data?: T | null;
  message?: string | null;
};

type LiveAvatarSessionTokenData = {
  session_id: string;
  session_token: string;
};

export class LiveAvatarSessionError extends Error {
  status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "LiveAvatarSessionError";
    this.status = status;
  }
}

function isLiveAvatarSuccessCode(code: number | undefined): boolean {
  return code === 100 || code === 1000;
}

export async function createLiveAvatarSessionToken(
  config: LiveAvatarServerConfig,
): Promise<LiveAvatarSessionTokenData> {
  const response = await fetch(`${config.apiBaseUrl}/v1/sessions/token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-KEY": config.apiKey,
    },
    body: JSON.stringify({
      mode: "FULL",
      avatar_id: config.avatarId,
      voice_agent: {
        id: config.agentId,
      },
      interactivity_type: "CONVERSATIONAL",
      video_settings: {
        quality: "high",
        encoding: "VP8",
      },
    }),
    cache: "no-store",
  });

  let payload: LiveAvatarApiEnvelope<LiveAvatarSessionTokenData> | null = null;

  try {
    payload = (await response.json()) as LiveAvatarApiEnvelope<LiveAvatarSessionTokenData>;
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new LiveAvatarSessionError(
      payload?.message || `LiveAvatar token request failed with status ${response.status}`,
      response.status,
    );
  }

  if (!isLiveAvatarSuccessCode(payload?.code) || !payload?.data?.session_token) {
    throw new LiveAvatarSessionError(
      payload?.message || "LiveAvatar did not return a session token",
      502,
    );
  }

  return payload.data;
}
