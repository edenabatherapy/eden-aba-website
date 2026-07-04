import Stripe from "stripe";
import { isStripeSecretConfigured } from "./config";

let stripeClient: Stripe | null = null;

export function getStripeClient(): Stripe {
  if (!isStripeSecretConfigured()) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!.trim(), {
      typescript: true,
    });
  }

  return stripeClient;
}
