import { NextResponse } from "next/server";
import { isSimpleNewsletterSource } from "@/lib/newsletter/simple-sources";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

function isNonEmpty(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const source = body.source ? String(body.source).trim() : "website";
  const isSimpleSignup = isSimpleNewsletterSource(source);

  // Honeypot for simple newsletter signups — silently accept bot submissions.
  if (isSimpleSignup && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({
      ok: true,
      message: "Thank you for joining our newsletter.",
      submittedAt: new Date().toISOString(),
    });
  }

  if (!isSimpleSignup) {
    const recaptcha = await verifyRecaptchaV2Token(
      typeof body.recaptchaToken === "string" ? body.recaptchaToken : null,
    );

    if (recaptcha.ok === false) {
      return recaptchaV2FailureResponse(recaptcha);
    }
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const fullName =
    typeof body.fullName === "string"
      ? body.fullName.trim()
      : [body.firstName, body.lastName]
          .filter((value) => typeof value === "string" && value.trim())
          .join(" ")
          .trim();

  if (!isNonEmpty(email) || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!fullName) {
    return NextResponse.json(
      { ok: false, message: "Please enter your name." },
      { status: 400 },
    );
  }

  if (body.consent === false) {
    return NextResponse.json(
      { ok: false, message: "Consent is required to join the newsletter." },
      { status: 400 },
    );
  }

  const submission = {
    fullName,
    email,
    source,
    type: body.type ? String(body.type).trim() : "",
    submittedAt: new Date().toISOString(),
  };

  /*
    TODO: Persist newsletter signups to Eden ABA Therapy secure backend / ESP.
    Do not log PII in application logs.
  */

  return NextResponse.json({
    ok: true,
    message: "Thank you for joining our newsletter.",
    submittedAt: submission.submittedAt,
  });
}
