import { NextResponse } from "next/server";
import { generateConfirmationId } from "@/lib/intake/server/confirmation";
import { assertIntakeBackendReady } from "@/lib/intake/server/config";
import { deliverIntakeSubmission } from "@/lib/intake/server/delivery";
import { START_ABA_THERAPY_SUCCESS_MESSAGE } from "@/lib/intake/server/messages";
import {
  buildSummaryFromStartAbaTherapy,
} from "@/lib/intake/server/submission-summary";
import { storeIntakeSubmission } from "@/lib/intake/server/storage";
import {
  START_ABA_THERAPY_RECAPTCHA_V2_INCOMPLETE,
} from "@/lib/recaptcha/messages";
import { shouldBypassRecaptchaVerificationOnServer } from "@/lib/recaptcha/config";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

function isNonEmpty(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const recaptchaToken = typeof body.recaptchaToken === "string" ? body.recaptchaToken : null;

  if (!recaptchaToken && !shouldBypassRecaptchaVerificationOnServer() && process.env.RECAPTCHA_SECRET_KEY?.trim()) {
    return NextResponse.json(
      { ok: false, message: START_ABA_THERAPY_RECAPTCHA_V2_INCOMPLETE },
      { status: 400 },
    );
  }

  const recaptcha = await verifyRecaptchaV2Token(recaptchaToken);

  if (recaptcha.ok === false) {
    console.warn("[recaptcha-v2] start aba therapy submission blocked", {
      reason: recaptcha.reason,
    });
    return recaptchaV2FailureResponse(recaptcha);
  }

  const requiredFields = ["parentName", "email", "phone"];
  for (const field of requiredFields) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }
  }

  if (body.consentTerms !== true) {
    return NextResponse.json(
      { ok: false, message: "You must agree to the Privacy Policy and Terms of Service." },
      { status: 400 },
    );
  }

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

  const submittedAt = new Date().toISOString();
  const confirmationId = generateConfirmationId();

  const submission = {
    _source: "start-aba-therapy",
    parentName: String(body.parentName).trim(),
    childFirstName: body.childFirstName ? String(body.childFirstName).trim() : "",
    childLastName: body.childLastName ? String(body.childLastName).trim() : "",
    childBirthdate: body.childBirthdate ? String(body.childBirthdate).trim() : "",
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    preferredContact: body.preferredContact ? String(body.preferredContact).trim() : "",
    diagnosisStatus: body.diagnosisStatus ? String(body.diagnosisStatus).trim() : "",
    state: body.state ? String(body.state).trim() : "",
    city: body.city ? String(body.city).trim() : "",
    serviceType: body.serviceType ? String(body.serviceType).trim() : "",
    insuranceProvider: body.insuranceProvider ? String(body.insuranceProvider).trim() : "",
    message: body.message ? String(body.message).trim() : "",
    consentUpdates: body.consentUpdates === true,
    submittedAt,
  };

  try {
    const stored = await storeIntakeSubmission({
      confirmationId,
      intake: submission,
      documentMeta: { source: "start-aba-therapy" },
      files: [],
    });

    const summary = buildSummaryFromStartAbaTherapy(submission, stored.confirmationId, stored.submittedAt);
    await deliverIntakeSubmission(summary, 0);

    return NextResponse.json({
      ok: true,
      success: true,
      confirmationId: stored.confirmationId,
      submittedAt: stored.submittedAt,
      message: START_ABA_THERAPY_SUCCESS_MESSAGE,
    });
  } catch (error) {
    console.error("[start-aba-therapy] submission failed", {
      error: error instanceof Error ? error.message : "unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Unable to submit your request right now. Please try again or contact Eden ABA Therapy directly.",
      },
      { status: 500 },
    );
  }
}
