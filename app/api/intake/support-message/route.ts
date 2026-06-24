import { NextResponse } from "next/server";
import { notifySupportTeamMessage } from "@/lib/intake/server/notify-support";
import {
  insertSupportMessage,
  isSupportMessageInsertFailure,
} from "@/lib/supabase/insert-support-message";

function str(value: unknown): string {
  return String(value ?? "").trim();
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const subject = str(body.subject);
  const message = str(body.message);

  if (!subject) {
    return NextResponse.json({ ok: false, message: "Subject is required." }, { status: 400 });
  }

  if (!message) {
    return NextResponse.json({ ok: false, message: "Message is required." }, { status: 400 });
  }

  const payload = {
    parentName: str(body.parentName),
    parentEmail: str(body.parentEmail),
    parentPhone: str(body.parentPhone),
    confirmationId: str(body.confirmationId),
    subject,
    message,
  };

  const createdAt = new Date().toISOString();

  const insertResult = await insertSupportMessage({
    ...payload,
    createdAt,
    status: "new",
  });

  if (isSupportMessageInsertFailure(insertResult)) {
    console.error("[support-message] submission failed", {
      reason: insertResult.reason,
      message: insertResult.message,
      code: insertResult.code,
      details: insertResult.details,
      hint: insertResult.hint,
      confirmationId: payload.confirmationId,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Unable to send message at this time. Your draft has been preserved.",
      },
      { status: 500 },
    );
  }

  const emailResult = await notifySupportTeamMessage(payload);
  if (!emailResult.sent) {
    console.error("[support-message] email notification failed", {
      reason: emailResult.reason,
      confirmationId: payload.confirmationId,
      supportMessageId: insertResult.id,
    });
  }

  return NextResponse.json({
    ok: true,
    id: insertResult.id,
    message:
      "Your message has been sent successfully. A member of our support team will contact you shortly.",
  });
}
