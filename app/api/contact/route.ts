import { NextResponse } from "next/server";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";
import { insertLeadSubmission, isLeadInsertFailure } from "@/lib/supabase/insert-lead";

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

  const requiredFields = ["parentName", "email", "phone"];
  for (const field of requiredFields) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required contact fields." },
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

  const submission = {
    parentName: String(body.parentName).trim(),
    childFirstName: body.childFirstName ? String(body.childFirstName).trim() : "",
    childLastName: body.childLastName ? String(body.childLastName).trim() : "",
    childBirthdate: body.childBirthdate ? String(body.childBirthdate).trim() : "",
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    preferredContact: body.preferredContact ? String(body.preferredContact).trim() : "",
    diagnosisStatus: body.diagnosisStatus ? String(body.diagnosisStatus).trim() : "",
    state: body.state ? String(body.state).trim() : "",
    message: body.message ? String(body.message).trim() : "",
    consentUpdates: body.consentUpdates === true,
    submittedAt: new Date().toISOString(),
  };

  const leadResult = await insertLeadSubmission({
    parentName: submission.parentName,
    email: submission.email,
    phone: submission.phone,
    state: submission.state,
    childBirthdate: submission.childBirthdate,
    diagnosisStatus: submission.diagnosisStatus,
    message: submission.message,
  });

  if (isLeadInsertFailure(leadResult)) {
    console.error("[contact] Supabase leads insert failed", {
      reason: leadResult.reason,
      message: leadResult.message,
      code: leadResult.code,
      details: leadResult.details,
      hint: leadResult.hint,
      payloadKeys: leadResult.payloadKeys,
    });

    return NextResponse.json(
      { ok: false, message: "Unable to submit your request right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your information has been securely submitted.",
    submittedAt: submission.submittedAt,
  });
}
