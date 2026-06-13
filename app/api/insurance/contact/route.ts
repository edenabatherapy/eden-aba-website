import { NextResponse } from "next/server";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";
import { RECAPTCHA_SUCCESS_MESSAGE } from "@/lib/recaptcha/messages";

export const dynamic = "force-dynamic";

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

  const requiredFields = ["parentName", "email", "phone", "childName", "zipCode", "insuranceType"];
  for (const field of requiredFields) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required fields." },
        { status: 400 },
      );
    }
  }

  const submission = {
    parentName: String(body.parentName).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    childName: String(body.childName).trim(),
    zipCode: String(body.zipCode).trim(),
    insuranceType: String(body.insuranceType).trim(),
    message: body.message ? String(body.message).trim() : "",
    submittedAt: new Date().toISOString(),
  };

  /*
    TODO: Persist insurance contact submissions to Eden ABA Therapy secure backend.
    Do not log PHI/PII in application logs.
  */

  return NextResponse.json({
    ok: true,
    message: RECAPTCHA_SUCCESS_MESSAGE,
    submittedAt: submission.submittedAt,
  });
}
