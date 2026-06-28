import { NextResponse } from "next/server";
import { createLiveAvatarSessionToken, LiveAvatarSessionError } from "@/lib/liveavatar/create-session-token";
import {
  getLiveAvatarConfigStatus,
  getLiveAvatarServerConfig,
} from "@/lib/liveavatar/server-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const config = getLiveAvatarServerConfig();

  if (!config) {
    const status = getLiveAvatarConfigStatus();

    return NextResponse.json(
      {
        ok: false,
        error: "liveavatar_not_configured",
        message:
          "LiveAvatar is not configured. Set LIVEAVATAR_API_KEY, LIVEAVATAR_AVATAR_ID, and LIVEAVATAR_AGENT_ID on the server.",
        config: process.env.NODE_ENV === "development" ? status : undefined,
      },
      { status: 503 },
    );
  }

  try {
    const session = await createLiveAvatarSessionToken(config);

    return NextResponse.json({
      ok: true,
      sessionToken: session.session_token,
      sessionId: session.session_id,
    });
  } catch (error) {
    const message =
      error instanceof LiveAvatarSessionError
        ? error.message
        : "Unable to create LiveAvatar session";

    const status = error instanceof LiveAvatarSessionError ? error.status : 502;

    console.error("[liveavatar/session]", message);

    return NextResponse.json(
      {
        ok: false,
        error: "liveavatar_session_failed",
        message,
      },
      { status: status >= 400 && status < 600 ? status : 502 },
    );
  }
}
