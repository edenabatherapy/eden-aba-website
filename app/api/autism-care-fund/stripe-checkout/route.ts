import { NextResponse } from "next/server";
import { createStripeCheckoutForDonation } from "@/lib/autism-care-fund/payments/stripe";
import { donationPaymentSchema } from "@/lib/autism-care-fund/payments/schema";
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

  const parsed = donationPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid contribution amount." },
      { status: 400 },
    );
  }

  try {
    const result = await createStripeCheckoutForDonation(parsed.data);
    if (result.ok === false) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    return NextResponse.json({
      ok: true,
      donationId: result.donationId,
      checkoutUrl: result.checkoutUrl,
    });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Unable to start card checkout. Please try again or contact Eden ABA Therapy." },
      { status: 503 },
    );
  }
}
