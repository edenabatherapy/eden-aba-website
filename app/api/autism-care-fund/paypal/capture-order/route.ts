import { NextResponse } from "next/server";
import { capturePayPalDonation } from "@/lib/autism-care-fund/payments/paypal";
import { paypalCaptureSchema } from "@/lib/autism-care-fund/payments/schema";
import { checkDonationRateLimit } from "@/lib/financial-platform/security";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

  const parsed = paypalCaptureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid PayPal capture request." },
      { status: 400 },
    );
  }

  try {
    const result = await capturePayPalDonation(parsed.data);
    if (!result.ok) {
      return NextResponse.json(
        { ok: false, message: "Unable to confirm PayPal payment. Please contact Eden ABA Therapy." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      donationId: parsed.data.donationId,
      completed: true,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to confirm PayPal payment. Please try again." },
      { status: 503 },
    );
  }
}
