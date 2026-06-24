import { NextResponse } from "next/server";
import {
  isResendConfigured,
  notifySupportTeamMessage,
} from "@/lib/intake/server/notify-support";
import { parseSupportMessageRequest } from "@/lib/intake/support-message-payload";
import {
  insertSupportMessage,
  isSupportMessageInsertFailure,
} from "@/lib/supabase/insert-support-message";

const FAILURE_MESSAGE = "Unable to send message at this time. Your draft has been preserved.";
const SUCCESS_WITH_EMAIL =
  "Your message has been sent successfully. A member of our support team will contact you shortly.";
const SUCCESS_SAVED_ONLY = "Message saved. Our support team will review it shortly.";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    let requestBody: Record<string, unknown>;

    try {
      requestBody = await request.json();
    } catch (parseError) {
      console.error("[support-message] invalid JSON body", {
        message: parseError instanceof Error ? parseError.message : String(parseError),
      });
      return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
    }

    console.log("support message payload", requestBody);

    const parsed = parseSupportMessageRequest(requestBody);

    if (parsed.ok === false) {
      if (parsed.error === "Message is required.") {
        console.warn("[support-message] missing message in request", {
          payloadKeys: Object.keys(requestBody),
          messageField: requestBody.message,
          portalMsgBody: requestBody.portalMsgBody,
        });
      }
      return NextResponse.json({ ok: false, message: parsed.error }, { status: 400 });
    }

    const payload = parsed.data;

    console.log("support message payload", {
      confirmation_id: payload.confirmationId || null,
      parent_name: payload.parentName || null,
      parent_email: payload.parentEmail || null,
      parent_phone: payload.parentPhone || null,
      subject: payload.subject,
      message: payload.message,
      status: "new",
      messageLength: payload.message.length,
    });

    const insertResult = await insertSupportMessage(payload, "new");

    if (isSupportMessageInsertFailure(insertResult)) {
      console.error("[support-message] submission failed — Supabase insert", {
        stage: "supabase-insert",
        reason: insertResult.reason,
        message: insertResult.message,
        code: insertResult.code,
        details: insertResult.details,
        hint: insertResult.hint,
        confirmationId: payload.confirmationId,
        payloadKeys: insertResult.payloadKeys,
        subject: payload.subject,
        messageLength: payload.message.length,
      });

      return NextResponse.json({ ok: false, message: FAILURE_MESSAGE }, { status: 500 });
    }

    const resendConfigured = isResendConfigured();
    let successMessage = SUCCESS_WITH_EMAIL;

    if (resendConfigured) {
      const emailResult = await notifySupportTeamMessage({
        parentName: payload.parentName,
        parentEmail: payload.parentEmail,
        parentPhone: payload.parentPhone,
        confirmationId: payload.confirmationId,
        subject: payload.subject,
        message: payload.message,
      });

      if (!emailResult.sent) {
        console.error("[support-message] email notification failed after save", {
          reason: emailResult.reason,
          confirmationId: payload.confirmationId,
          supportMessageId: insertResult.id,
        });
      }
    } else {
      console.warn("[support-message] RESEND_API_KEY missing — saved to Supabase without email", {
        confirmationId: payload.confirmationId,
        supportMessageId: insertResult.id,
      });
      successMessage = SUCCESS_SAVED_ONLY;
    }

    console.info("[support-message] submission accepted", {
      confirmationId: payload.confirmationId,
      supportMessageId: insertResult.id,
      resendConfigured,
      messageLength: payload.message.length,
    });

    return NextResponse.json({
      ok: true,
      id: insertResult.id,
      message: successMessage,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("[support-message] unexpected server error", {
      message: err.message,
      name: err.name,
      stack: err.stack,
    });

    return NextResponse.json({ ok: false, message: FAILURE_MESSAGE }, { status: 500 });
  }
}
