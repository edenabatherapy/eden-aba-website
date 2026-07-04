import { NextResponse } from "next/server";
import { createDonationIntent } from "@/lib/financial-platform/repository/donations";
import { donationIntentSchema } from "@/lib/financial-platform/schemas";
import { checkDonationRateLimit, verifyCaptchaToken } from "@/lib/financial-platform/security";
import { notifyAdmins, sendPlatformEmail } from "@/lib/financial-platform/email";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const rate = checkDonationRateLimit(request);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, message: "Too many donation attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds || 3600) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body." }, { status: 400 });
  }

  const parsed = donationIntentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid donation data." },
      { status: 400 },
    );
  }

  if (!verifyCaptchaToken(parsed.data.captchaToken)) {
    return NextResponse.json({ ok: false, message: "CAPTCHA verification required." }, { status: 400 });
  }

  try {
    const result = await createDonationIntent(parsed.data);
    if (!result.ok) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    if (parsed.data.email) {
      await sendPlatformEmail({
        template: "donation_receipt",
        to: parsed.data.email,
        data: { intentId: result.intentId, amountCents: parsed.data.amountCents },
      });
    }

    if (parsed.data.amountCents >= 500_000) {
      await notifyAdmins({
        event: "large_donation",
        message: `Large donation intent: $${parsed.data.amountCents / 100}`,
        metadata: { intentId: result.intentId },
      });
    }

    return NextResponse.json({
      ok: true,
      intentId: result.intentId,
      message: result.message,
      paymentReady: result.paymentReady,
      provider: result.provider,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to record donation. Database may not be configured. Please contact Eden ABA Therapy.",
      },
      { status: 503 },
    );
  }
}
