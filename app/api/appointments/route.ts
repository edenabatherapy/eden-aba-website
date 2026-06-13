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
    "parentName",
    "childName",
    "phone",
    "email",
    "dob",
    "zip",
    "service",
    "date",
    "time",
    "insurance",
  ];

  for (const field of requiredFields) {
    if (!isNonEmpty(body[field])) {
      return NextResponse.json(
        { ok: false, message: "Please complete all required appointment fields." },
        { status: 400 },
      );
    }
  }

  const referenceNumber = Math.floor(1000000 + Math.random() * 9000000);
  const submittedAt = new Date().toISOString();

  const appointment = {
    referenceNumber,
    communication: body.communication ? String(body.communication) : "",
    behavior: body.behavior ? String(body.behavior) : "",
    social: body.social ? String(body.social) : "",
    urgency: body.urgency ? String(body.urgency) : "",
    notes: body.notes ? String(body.notes) : "",
    service: String(body.service),
    locationType: body.locationType ? String(body.locationType) : "",
    visitType: body.visitType ? String(body.visitType) : "",
    parentName: String(body.parentName).trim(),
    childName: String(body.childName).trim(),
    phone: String(body.phone).trim(),
    email: String(body.email).trim(),
    dob: String(body.dob).trim(),
    ageGroup: body.ageGroup ? String(body.ageGroup) : "",
    zip: String(body.zip).trim(),
    date: String(body.date).trim(),
    time: String(body.time).trim(),
    insurance: String(body.insurance).trim(),
    memberId: body.memberId ? String(body.memberId).trim() : "",
    referral: body.referral ? String(body.referral) : "",
    parentConcerns: body.parentConcerns ? String(body.parentConcerns) : "",
    submittedAt,
  };

  /*
    TODO: Save appointment to secure backend, create Zoom meeting, and trigger notifications.
    Do not log PHI/PII in application logs.
  */

  return NextResponse.json({
    ok: true,
    referenceNumber,
    submittedAt,
    message: "Appointment request submitted successfully.",
  });
}
