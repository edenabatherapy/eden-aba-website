import { z } from "zod";

export const MIN_STRIPE_DONATION_CENTS = 500;
export const MAX_STRIPE_DONATION_CENTS = 5_000_000;

export const stripeCheckoutRequestSchema = z.object({
  amountCents: z
    .number()
    .int()
    .min(MIN_STRIPE_DONATION_CENTS, "Minimum donation amount is $5.")
    .max(MAX_STRIPE_DONATION_CENTS, "Maximum donation amount is $50,000."),
  donorName: z.string().max(120).optional(),
  email: z.string().email("A valid email address is required.").max(254).optional().or(z.literal("")),
  anonymous: z.boolean().default(true),
  message: z.string().max(2000).optional(),
});

export type StripeCheckoutRequest = z.infer<typeof stripeCheckoutRequestSchema>;

export const STRIPE_DONATION_PRESETS_CENTS = [2500, 5000, 10000, 25000] as const;
