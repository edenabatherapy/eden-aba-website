import { NextResponse } from "next/server";
import { createDailyIntakeRoom, DailyApiError } from "@/lib/daily/create-intake-room";
import { getDailyApiKey, isDailyConfigured } from "@/lib/daily/server-config";
import {
  notifyLiveVideoIntakeRequest,
  type LiveVideoIntakeVisitor,
} from "@/lib/intake/server/notify-live-video-intake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNAVAILABLE_MESSAGE = "Our intake coordinator is currently unavailable.";

type CreateRoomRequestBody = {
  language?: unknown;
  pageUrl?: unknown;
  visitor?: unknown;
};

function parseLanguage(value: unknown): string | undefined {
  if (value === "en" || value === "vi") return value;
  return undefined;
}

function parsePageUrl(value: unknown, referer: string | null): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return referer?.trim() || "—";
}

function parseVisitor(value: unknown): LiveVideoIntakeVisitor | undefined {
  if (!value || typeof value !== "object") return undefined;

  const record = value as Record<string, unknown>;
  const parentName = typeof record.parentName === "string" ? record.parentName.trim() : "";
  const parentEmail = typeof record.parentEmail === "string" ? record.parentEmail.trim() : "";
  const parentPhone = typeof record.parentPhone === "string" ? record.parentPhone.trim() : "";

  if (!parentName && !parentEmail && !parentPhone) {
    return undefined;
  }

  return {
    parentName: parentName || undefined,
    parentEmail: parentEmail || undefined,
    parentPhone: parentPhone || undefined,
  };
}

export async function POST(request: Request) {
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

  let language: string | undefined;
  let pageUrl = parsePageUrl(undefined, request.headers.get("referer"));
  let visitor: LiveVideoIntakeVisitor | undefined;

  try {
    const body = (await request.json()) as CreateRoomRequestBody;
    language = parseLanguage(body.language);
    pageUrl = parsePageUrl(body.pageUrl, request.headers.get("referer"));
    visitor = parseVisitor(body.visitor);
  } catch {
    // Empty body is allowed — metadata falls back to headers.
  }

  try {
    const room = await createDailyIntakeRoom(apiKey);

    console.info("[daily/create-room] private intake room created", {
      roomName: room.roomName,
      expiresAt: room.expiresAt,
      pageUrl,
      language: language ?? null,
    });

    const emailResult = await notifyLiveVideoIntakeRequest({
      joinUrl: room.joinUrl,
      roomName: room.roomName,
      pageUrl,
      language,
      visitor,
      requestedAt: new Date(),
    });

    if (!emailResult.sent) {
      console.error("[daily/create-room] live video intake email failed", {
        roomName: room.roomName,
        reason: emailResult.reason,
        skipped: emailResult.skipped ?? false,
      });
    }

    return NextResponse.json({
      ok: true,
      joinUrl: room.joinUrl,
      roomName: room.roomName,
      expiresAt: room.expiresAt,
      emailNotificationSent: emailResult.sent,
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
