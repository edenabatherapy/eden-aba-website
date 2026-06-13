import { NextResponse } from "next/server";
import type { EdenChatIntakeFields } from "@/lib/openai/parse-chat-intake";
import { assertIntakeBackendReady } from "@/lib/intake/server/config";
import { submitEdenChatIntake } from "@/lib/intake/server/submit-chat-intake";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bodyToChatFields(body: Record<string, unknown>): EdenChatIntakeFields {
  const str = (value: unknown) => String(value ?? "").trim();

  return {
    parentGuardianName: str(body.parentGuardianName ?? body.parentName ?? body.guardianName),
    childName: str(body.childName ?? body.childFullName),
    childAge: str(body.childAge ?? body.age),
    diagnosisStatus: str(body.autismDiagnosisStatus ?? body.diagnosisStatus),
    state: str(body.state),
    city: str(body.city),
    serviceType: str(body.preferredServiceType ?? body.serviceType),
    goals: str(body.primaryConcernsOrGoals ?? body.goals ?? body.concerns),
    insuranceProvider: str(body.insuranceProvider ?? body.insurance),
    phoneNumber: str(body.phoneNumber ?? body.phone),
    emailAddress: str(body.emailAddress ?? body.email),
    preferredContactMethod: str(body.preferredContactMethod ?? body.contactMethod),
    conversationSummary: str(body.conversationSummary ?? body.summary),
  };
}

/**
 * POST /api/intake — Eden Chat JSON submissions (application/json, source: eden-chat)
 * Uses the same encrypted storage + Sheets/email delivery pipeline as multipart intake.
 */
export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      assertIntakeBackendReady();
    } catch (error) {
      return NextResponse.json(
        {
          ok: false,
          message:
            error instanceof Error
              ? error.message
              : "Intake backend is not configured. Set INTAKE_ENCRYPTION_KEY in .env.local.",
        },
        { status: 503 },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
    }

    if (body.source !== "eden-chat") {
      return NextResponse.json(
        {
          ok: false,
          message: 'JSON intake requests must include "source": "eden-chat".',
        },
        { status: 400 },
      );
    }

    const recaptchaToken =
      typeof body.recaptchaToken === "string" ? body.recaptchaToken : null;
    const recaptcha = await verifyRecaptchaV2Token(recaptchaToken);
    if (recaptcha.ok === false) {
      return recaptchaV2FailureResponse(recaptcha);
    }

    const fields = bodyToChatFields(body);
    const submitResult = await submitEdenChatIntake(fields, {
      conversationSummary: fields.conversationSummary,
    });

    if (submitResult.ok === false) {
      return NextResponse.json({ ok: false, message: submitResult.message }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      confirmationId: submitResult.confirmationId,
      submittedAt: submitResult.submittedAt,
      fileCount: 0,
      message: submitResult.message,
    });
  }

  return handleMultipartIntake(request);
}

async function handleMultipartIntake(request: Request) {
  const { default: multipartHandler } = await import("./multipart");
  return multipartHandler(request);
}
