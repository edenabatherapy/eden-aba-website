import { NextResponse } from "next/server";
import {
  constructStripeWebhookEvent,
  handleCheckoutSessionCompleted,
} from "@/lib/stripe/checkout";
import { handleStripeCheckoutCompleted as handleLegacyCheckoutCompleted } from "@/lib/autism-care-fund/payments/stripe";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = constructStripeWebhookEvent(payload, signature);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid Stripe webhook";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const enterpriseResult = await handleCheckoutSessionCompleted(session);
      if (!enterpriseResult.ok) {
        console.error("[stripe-webhook] enterprise checkout.session.completed failed", enterpriseResult);
      }

      if (session.metadata?.donation_id && session.client_reference_id) {
        const legacyResult = await handleLegacyCheckoutCompleted(session);
        if (!legacyResult.ok) {
          console.error("[stripe-webhook] legacy checkout.session.completed failed", legacyResult);
        }
      }

      if (!enterpriseResult.ok) {
        return NextResponse.json({ ok: false, received: true }, { status: 400 });
      }
    }

    return NextResponse.json({ ok: true, received: true });
  } catch (error) {
    console.error("[stripe-webhook] handler error", error);
    return NextResponse.json({ ok: false, message: "Webhook handler failed." }, { status: 500 });
  }
}
