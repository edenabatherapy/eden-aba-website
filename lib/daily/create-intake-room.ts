/** Server-only Daily.co room provisioning. Never import from client components. */

const DAILY_API_BASE = "https://api.daily.co/v1";
const ROOM_TTL_SECONDS = 3600;

export class DailyApiError extends Error {
  readonly status: number;
  readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "DailyApiError";
    this.status = status;
    this.code = code;
  }
}

export type DailyIntakeRoomResult = {
  roomName: string;
  roomUrl: string;
  joinUrl: string;
  expiresAt: number;
};

type DailyRoomResponse = {
  name: string;
  url: string;
};

type DailyMeetingTokenResponse = {
  token: string;
};

type DailyErrorBody = {
  error?: string;
  info?: string;
};

async function dailyFetch<T>(apiKey: string, path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${DAILY_API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const body = (await response.json().catch(() => ({}))) as DailyErrorBody & T;

  if (!response.ok) {
    const message =
      typeof body.error === "string"
        ? body.error
        : typeof body.info === "string"
          ? body.info
          : `Daily API request failed (${response.status})`;

    throw new DailyApiError(message, response.status, typeof body.error === "string" ? body.error : undefined);
  }

  return body;
}

function createRoomName(): string {
  const suffix = crypto.randomUUID().replace(/-/g, "").slice(0, 10);
  return `eden-intake-${Date.now()}-${suffix}`.toLowerCase();
}

function buildPrebuiltJoinUrl(roomUrl: string, token: string): string {
  const url = new URL(roomUrl);
  url.searchParams.set("t", token);
  url.searchParams.set("mic", "on");
  url.searchParams.set("cam", "on");
  return url.toString();
}

export async function createDailyIntakeRoom(apiKey: string): Promise<DailyIntakeRoomResult> {
  const expiresAt = Math.floor(Date.now() / 1000) + ROOM_TTL_SECONDS;
  const roomName = createRoomName();

  const room = await dailyFetch<DailyRoomResponse>(apiKey, "/rooms", {
    method: "POST",
    body: JSON.stringify({
      name: roomName,
      privacy: "private",
      properties: {
        exp: expiresAt,
        enable_prejoin_ui: false,
        start_video_off: false,
        start_audio_off: false,
        enable_chat: true,
        enable_knocking: false,
        max_participants: 10,
      },
    }),
  });

  const tokenResponse = await dailyFetch<DailyMeetingTokenResponse>(apiKey, "/meeting-tokens", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        room_name: roomName,
        exp: expiresAt,
        is_owner: false,
        start_video_off: false,
        start_audio_off: false,
        user_name: "Family Visitor",
      },
    }),
  });

  return {
    roomName: room.name,
    roomUrl: room.url,
    joinUrl: buildPrebuiltJoinUrl(room.url, tokenResponse.token),
    expiresAt,
  };
}
