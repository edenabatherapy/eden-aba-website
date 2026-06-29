import { NextResponse } from "next/server";
import { createDailyIntakeRoom, DailyApiError } from "@/lib/daily/create-intake-room";
import {
  buildLiveVideoLeadMessage,
  getLiveVideoReasonLabel,
  parseLiveVideoPreCallIntake,
  type LiveVideoPreCallIntake,
} from "@/lib/daily/live-video-intake-payload";
import { getDailyApiKey, isDailyConfigured } from "@/lib/daily/server-config";
import { notifyLiveVideoIntakeRequest } from "@/lib/intake/server/notify-live-video-intake";
import { getLiveVideoIntakeNotificationEmail, type SmtpSendResult } from "@/lib/intake/server/smtp";
import { insertLeadSubmission, isLeadInsertFailure } from "@/lib/supabase/insert-lead";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UNAVAILABLE_MESSAGE = "Our intake coordinator is currently unavailable.";

type CreateRoomRequestBody = {
  pageUrl?: unknown;
  intake?: unknown;
};

function parsePageUrl(value: unknown, referer: string | null): string {
  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }
  return referer?.trim() || "—";
}

async function sendLiveVideoNotification(payload: {
  joinUrl: string;
  roomName: string;
  pageUrl: string;
  intake: LiveVideoPreCallIntake;
}): Promise<SmtpSendResult> {
  try {
    return await notifyLiveVideoIntakeRequest({
      ...payload,
      requestedAt: new Date(),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown live video email error";
    console.error("[daily/create-room] live video intake email exception", {
      roomName: payload.roomName,
      message,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { sent: false, reason: message };
  }
}

async function saveLiveVideoLead(payload: {
  intake: LiveVideoPreCallIntake;
  pageUrl: string;
  roomName: string;
  joinUrl: string;
}): Promise<void> {
  const leadResult = await insertLeadSubmission({
    parentName: payload.intake.parentName,
    email: payload.intake.email,
    phone: payload.intake.phone,
    childBirthdate: payload.intake.childAge ?? "",
    diagnosisStatus: getLiveVideoReasonLabel(payload.intake.reasonForCall),
    message: buildLiveVideoLeadMessage(payload),
  });

  if (isLeadInsertFailure(leadResult)) {
    console.error("[daily/create-room] Supabase leads insert failed", {
      reason: leadResult.reason,
      message: leadResult.message,
      code: leadResult.code,
      details: leadResult.details,
      hint: leadResult.hint,
      payloadKeys: leadResult.payloadKeys,
      roomName: payload.roomName,
    });
    return;
  }

  console.info("[daily/create-room] live video intake lead saved", {
    roomName: payload.roomName,
    parentName: payload.intake.parentName,
  });
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

  let pageUrl = parsePageUrl(undefined, request.headers.get("referer"));
  let intake: LiveVideoPreCallIntake | undefined;

  try {
    const body = (await request.json()) as CreateRoomRequestBody;
    pageUrl = parsePageUrl(body.pageUrl, request.headers.get("referer"));

    const parsedIntake = parseLiveVideoPreCallIntake(body.intake);
    if (parsedIntake.ok === false) {
      return NextResponse.json({ ok: false, message: parsedIntake.error }, { status: 400 });
    }
    intake = parsedIntake.data;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Intake details are required before starting a live video call." },
      { status: 400 },
    );
  }

  try {
    const room = await createDailyIntakeRoom(apiKey);

    console.info("[daily/create-room] private intake room created", {
      roomName: room.roomName,
      expiresAt: room.expiresAt,
      pageUrl,
      preferredLanguage: intake.preferredLanguage,
      reasonForCall: intake.reasonForCall,
      joinUrl: room.joinUrl,
    });

    await saveLiveVideoLead({
      intake,
      pageUrl,
      roomName: room.roomName,
      joinUrl: room.joinUrl,
    });

    const emailResult = await sendLiveVideoNotification({
      joinUrl: room.joinUrl,
      roomName: room.roomName,
      pageUrl,
      intake,
    });

    if (emailResult.sent) {
      console.info("[daily/create-room] live video intake email sent", {
        roomName: room.roomName,
        recipient: getLiveVideoIntakeNotificationEmail(),
        messageId: emailResult.messageId,
      });
    } else {
      console.error("[daily/create-room] live video intake email failed", {
        roomName: room.roomName,
        recipient: getLiveVideoIntakeNotificationEmail(),
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
