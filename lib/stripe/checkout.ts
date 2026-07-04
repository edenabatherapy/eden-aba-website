import type Stripe from "stripe";
import { getStripeClient } from "./client";
import { getAppBaseUrl, isStripeSecretConfigured } from "./config";
import {
  attachStripeSessionToDonation,
  createPendingStripeDonation,
  completeStripeDonation,
} from "./repository";
import type { StripeCheckoutRequest } from "./schema";

export type CreateCheckoutSessionResult =
  | { ok: true; donationId: string; checkoutUrl: string }
  | { ok: false; status: number; message: string };

export async function createStripeCheckoutSession(
  input: StripeCheckoutRequest,
): Promise<CreateCheckoutSessionResult> {
  if (!isStripeSecretConfigured()) {
    return {
      ok: false,
      status: 503,
      message: "Stripe payments are not configured. Please contact Eden ABA Therapy.",
    };
  }

  const donationId = await createPendingStripeDonation({
    amountCents: input.amountCents,
    donorName: input.donorName,
    donorEmail: input.email,
    anonymous: input.anonymous,
    message: input.message,
  });

  const stripe = getStripeClient();
  const baseUrl = getAppBaseUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: input.amountCents,
          product_data: {
            name: "Eden Autism Care Fund contribution",
            description: "Community support payment for the Eden Autism Care Fund.",
          },
        },
        quantity: 1,
      },
    ],
    customer_email: input.email?.trim() || undefined,
    client_reference_id: donationId,
    metadata: {
      donation_id: donationId,
      donor_name: input.anonymous ? "" : input.donorName?.trim() || "",
      donor_email: input.email?.trim() || "",
      anonymous: input.anonymous ? "true" : "false",
      message: input.message?.trim() || "",
    },
    success_url: `${baseUrl}/donation/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/donation/cancel`,
  });

  if (!session.url) {
    return {
      ok: false,
      status: 503,
      message: "Unable to create Stripe Checkout session. Please try again.",
    };
  }

  await attachStripeSessionToDonation(donationId, session.id);

  return {
    ok: true,
    donationId,
    checkoutUrl: session.url,
  };
}

export async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  const stripeSessionId = session.id;
  const amountCents = session.amount_total;

  if (!stripeSessionId || !amountCents || amountCents < 500) {
    return { ok: false as const, reason: "invalid-session" };
  }

  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;

  const anonymous = session.metadata?.anonymous !== "false";
  const donorName = session.metadata?.donor_name?.trim() || null;
  const donorEmail =
    session.customer_details?.email?.trim() || session.metadata?.donor_email?.trim() || null;
  const message = session.metadata?.message?.trim() || null;

  return completeStripeDonation({
    stripeSessionId,
    paymentIntentId,
    amountCents,
    currency: session.currency ?? "usd",
    donorName: anonymous ? null : donorName,
    donorEmail,
    anonymous,
    message,
  });
}

export function constructStripeWebhookEvent(payload: string, signature: string | null) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }

  if (!signature) {
    throw new Error("Missing Stripe signature");
  }

  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
