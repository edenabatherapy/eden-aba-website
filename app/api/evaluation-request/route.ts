import { NextResponse } from "next/server";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

function isNonEmpty(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const recaptcha = await verifyRecaptchaV2Token(
    typeof body.recaptchaToken === "string" ? body.recaptchaToken : null,
  );

  if (recaptcha.ok === false) {
    return recaptchaV2FailureResponse(recaptcha);
  }

  const requiredFields = [
    "parentFirstName",
    "parentLastName",
    "email",
    "phone",
    "postalCode",
  ];

  for (const field of requiredFields) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required evaluation request fields." },
        { status: 400 },
      );
    }
  }

  if (body.consent !== true) {
    return NextResponse.json(
      { ok: false, message: "Consent is required to submit this request." },
      { status: 400 },
    );
  }

  const submission = {
    parentFirstName: String(body.parentFirstName).trim(),
    parentLastName: String(body.parentLastName).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    childFirstName: body.childFirstName ? String(body.childFirstName).trim() : "",
    childDateOfBirth: body.childDateOfBirth ? String(body.childDateOfBirth).trim() : "",
    postalCode: String(body.postalCode).trim(),
    preferredLocation: body.preferredLocation ? String(body.preferredLocation).trim() : "",
    completedScreener: body.completedScreener ? String(body.completedScreener).trim() : "",
    hasDiagnosis: body.hasDiagnosis ? String(body.hasDiagnosis).trim() : "",
    message: body.message ? String(body.message).trim() : "",
    requestType: body.requestType ? String(body.requestType).trim() : "evaluation",
    submittedAt: new Date().toISOString(),
  };

  /*
    TODO: Persist evaluation requests to Eden ABA Therapy secure backend.
    Do not log PHI/PII in application logs.
  */

  return NextResponse.json({
    ok: true,
    message: "Your evaluation request has been submitted.",
    submittedAt: submission.submittedAt,
  });
}
