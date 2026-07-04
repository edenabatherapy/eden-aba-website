import { NextResponse } from "next/server";
import { createStripeCheckoutSession } from "@/lib/stripe/checkout";
import { stripeCheckoutRequestSchema } from "@/lib/stripe/schema";
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

  const parsed = stripeCheckoutRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid donation request." },
      { status: 400 },
    );
  }

  try {
    const result = await createStripeCheckoutSession(parsed.data);
    if (result.ok === false) {
      return NextResponse.json({ ok: false, message: result.message }, { status: result.status });
    }

    return NextResponse.json({
      ok: true,
      donationId: result.donationId,
      checkoutUrl: result.checkoutUrl,
    });
  } catch (error) {
    console.error("[stripe/create-checkout-session]", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Unable to start Stripe Checkout. Please try again or contact Eden ABA Therapy.",
      },
      { status: 503 },
    );
  }
}
