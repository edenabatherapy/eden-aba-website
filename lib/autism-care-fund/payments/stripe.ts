import Stripe from "stripe";
import { getAppBaseUrl, isStripeConfigured } from "./config";
import {
  completeAutismCareDonation,
  createPendingAutismCareDonation,
  getDonationById,
  updateDonationPaymentIntent,
} from "./donations";
import type { DonationPaymentInput } from "./schema";

function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(secretKey);
}

export async function createStripeCheckoutForDonation(input: DonationPaymentInput) {
  if (!isStripeConfigured()) {
    return {
      ok: false as const,
      status: 503,
      message: "Card payments are not configured yet. Please contact Eden ABA Therapy.",
    };
  }

  const pending = await createPendingAutismCareDonation(input, "stripe");
  if (pending.ok === false) {
    return pending;
  }

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
    client_reference_id: pending.donationId,
    metadata: {
      donation_id: pending.donationId,
      donation_type: input.donationType,
    },
    success_url: `${baseUrl}/resources/financial-assistance/thank-you?donation_id=${pending.donationId}&provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/resources/financial-assistance#autism-care-fund`,
  });

  if (!session.url) {
    return {
      ok: false as const,
      status: 503,
      message: "Unable to start card checkout. Please try again.",
    };
  }

  await updateDonationPaymentIntent(pending.donationId, session.id);

  return {
    ok: true as const,
    donationId: pending.donationId,
    checkoutUrl: session.url,
  };
}

export async function handleStripeCheckoutCompleted(session: Stripe.Checkout.Session) {
  const donationId = session.metadata?.donation_id || session.client_reference_id;
  if (!donationId) {
    return { ok: false as const, reason: "missing-donation-id" };
  }

  const amountCents = session.amount_total;
  if (!amountCents || amountCents < 500) {
    return { ok: false as const, reason: "invalid-amount" };
  }

  const donation = await getDonationById(donationId);
  if (!donation) {
    return { ok: false as const, reason: "donation-not-found" };
  }

  if (donation.amount_cents !== amountCents) {
    return { ok: false as const, reason: "amount-mismatch" };
  }

  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : session.id;

  return completeAutismCareDonation({
    donationId,
    paymentProvider: "stripe",
    paymentIntentId,
    amountCents,
    rawPayload: session as unknown as Record<string, unknown>,
  });
}

export function constructStripeEvent(payload: string, signature: string | null) {
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
