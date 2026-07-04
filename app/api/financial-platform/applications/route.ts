import { NextResponse } from "next/server";
import {
  getApplicationByTrackingCode,
  submitAssistanceApplication,
} from "@/lib/financial-platform/repository/applications";
import { assistanceApplicationSchema } from "@/lib/financial-platform/schemas";
import { checkApplicationRateLimit } from "@/lib/financial-platform/security";
import { notifyAdmins, sendPlatformEmail } from "@/lib/financial-platform/email";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rate = checkApplicationRateLimit(request);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many applications. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = assistanceApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid application data." },
      { status: 400 },
    );
  }

  const recaptcha = await verifyRecaptchaV2Token(parsed.data.captchaToken);
  if (recaptcha.ok === false) {
    return recaptchaV2FailureResponse(recaptcha);
  }

  try {
    const application = await submitAssistanceApplication(parsed.data);

    await sendPlatformEmail({
      template: "application_received",
      to: parsed.data.applicantEmail,
      data: { trackingCode: application.trackingCode },
    });

    await notifyAdmins({
      event: "application_submitted",
      message: `New assistance application: ${application.trackingCode}`,
      metadata: { county: parsed.data.county, emergency: parsed.data.emergencyNeed },
    });

    return NextResponse.json({ ok: true, application });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to submit application. Please contact Eden ABA Therapy." },
      { status: 503 },
    );
  }
}

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code")?.trim();
  if (!code) {
    return NextResponse.json({ ok: false, message: "Tracking code required." }, { status: 400 });
  }

  try {
    const application = await getApplicationByTrackingCode(code);
    if (!application) {
      return NextResponse.json({ ok: false, message: "Application not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, application });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to look up application." }, { status: 503 });
  }
}
