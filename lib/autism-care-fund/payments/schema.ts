import { z } from "zod";
import { MAX_DONATION_CENTS, MIN_DONATION_CENTS } from "@/lib/financial-platform/constants";

export const donationPaymentSchema = z.object({
  amountCents: z.number().int().min(MIN_DONATION_CENTS).max(MAX_DONATION_CENTS),
  donationType: z
    .enum([
      "one_time",
      "monthly",
      "corporate_sponsorship",
      "foundation_sponsorship",
      "employer_matching",
      "memorial",
      "anonymous",
      "dedicated_child_sponsorship",
      "dedicated_therapy_sponsorship",
      "general_autism_fund",
    ])
    .default("one_time"),
  anonymous: z.boolean().default(true),
  email: z.string().email().max(254).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
  donorDisplayName: z.string().max(120).optional(),
});

export const paypalCaptureSchema = z.object({
  orderId: z.string().min(1).max(120),
  donationId: z.string().uuid(),
});

export type DonationPaymentInput = z.infer<typeof donationPaymentSchema>;
