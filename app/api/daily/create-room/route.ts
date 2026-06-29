import { NextResponse } from "next/server";
import { createDailyIntakeRoom, DailyApiError } from "@/lib/daily/create-intake-room";
import { getDailyApiKey, isDailyConfigured } from "@/lib/daily/server-config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNAVAILABLE_MESSAGE = "Our intake coordinator is currently unavailable.";

export async function POST() {
  const apiKey = getDailyApiKey();

  if (!apiKey) {
    console.error("[daily/create-room] DAILY_API_KEY is not configured");

    return NextResponse.json(
      {
        ok: false,
        error: "daily_not_configured",
        message: UNAVAILABLE_MESSAGE,
        configured: isDailyConfigured(),
      },
      { status: 503 },
    );
  }

  try {
    const room = await createDailyIntakeRoom(apiKey);

    console.info("[daily/create-room] private intake room created", {
      roomName: room.roomName,
      expiresAt: room.expiresAt,
    });

    return NextResponse.json({
      ok: true,
      joinUrl: room.joinUrl,
      roomName: room.roomName,
      expiresAt: room.expiresAt,
    });
  } catch (error) {
    const message =
      error instanceof DailyApiError ? error.message : "Unable to create Daily video room";

    console.error("[daily/create-room] room creation failed", {
      message,
      status: error instanceof DailyApiError ? error.status : undefined,
    });

    return NextResponse.json(
      {
        ok: false,
        error: "daily_room_creation_failed",
        message: UNAVAILABLE_MESSAGE,
      },
      { status: error instanceof DailyApiError && error.status >= 400 && error.status < 600 ? error.status : 502 },
    );
  }
}
