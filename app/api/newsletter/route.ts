import { NextResponse } from "next/server";
import { normalizeNewsletterSource } from "@/lib/newsletter/normalize-source";
import { isSimpleNewsletterSource } from "@/lib/newsletter/simple-sources";
import {
  insertNewsletterSubscriber,
  isNewsletterInsertFailure,
} from "@/lib/supabase/insert-newsletter-subscriber";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

const SUCCESS_MESSAGE = "Thank you for joining our family newsletter.";

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

  const source = normalizeNewsletterSource(body.source ? String(body.source).trim() : "website");
  const isSimpleSignup = isSimpleNewsletterSource(source) || isSimpleNewsletterSource(String(body.source ?? "").trim());

  // Honeypot for simple newsletter signups — silently accept bot submissions.
  if (isSimpleSignup && typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({
      ok: true,
      message: SUCCESS_MESSAGE,
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

  if (!fullName) {
    return NextResponse.json(
      { ok: false, message: "Please enter your full name." },
      { status: 400 },
    );
  }

  if (!isNonEmpty(email) || !isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (body.consent === false) {
    return NextResponse.json(
      { ok: false, message: "Consent is required to join the newsletter." },
      { status: 400 },
    );
  }

  const insertResult = await insertNewsletterSubscriber({
    fullName,
    email,
    source,
  });

  if (isNewsletterInsertFailure(insertResult)) {
    if (insertResult.reason === "duplicate-email") {
      return NextResponse.json(
        {
          ok: false,
          message: insertResult.message ?? "This email is already subscribed to our family newsletter.",
        },
        { status: 409 },
      );
    }

    const status = insertResult.reason === "missing-config" ? 503 : 500;
    return NextResponse.json(
      {
        ok: false,
        message:
          insertResult.reason === "missing-config"
            ? "Newsletter signup is temporarily unavailable. Please try again later."
            : "Unable to save your newsletter signup. Please try again.",
      },
      { status },
    );
  }

  return NextResponse.json({
    ok: true,
    message: SUCCESS_MESSAGE,
    submittedAt: new Date().toISOString(),
  });
}
