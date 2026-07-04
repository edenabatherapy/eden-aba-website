import { z } from "zod";

export const donationIntentSchema = z.object({
  amountCents: z.number().int().min(500).max(5_000_000),
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
  donorDisplayName: z.string().max(120).optional(),
  anonymous: z.boolean().default(true),
  email: z.string().email().max(254).optional().or(z.literal("")),
  message: z.string().max(2000).optional(),
  campaignSlug: z.string().max(80).optional(),
  memorialHonoree: z.string().max(200).optional(),
  sponsoredChildRef: z.string().max(80).optional(),
  captchaToken: z.string().optional(),
});

export const assistanceApplicationSchema = z.object({
  householdSize: z.number().int().min(1).max(20),
  annualIncomeCents: z.number().int().min(0).optional(),
  insuranceStatus: z.string().max(120).optional(),
  county: z.string().min(1).max(80),
  diagnosis: z.string().max(500).optional(),
  childAge: z.number().int().min(0).max(25).optional(),
  requestedServices: z.array(z.string().max(120)).min(1).max(10),
  requestedHours: z.number().min(0).max(200).optional(),
  emergencyNeed: z.boolean().default(false),
  applicantName: z.string().min(1).max(120),
  applicantEmail: z.string().email().max(254),
  applicantPhone: z.string().max(30).optional(),
  consentSigned: z.literal(true),
  signatureData: z.string().max(5000).optional(),
  captchaToken: z.string().optional(),
});

export const transparencyFilterSchema = z.object({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  campaignSlug: z.string().optional(),
  minAmountCents: z.coerce.number().int().optional(),
  maxAmountCents: z.coerce.number().int().optional(),
  donationType: z.string().optional(),
  allocationStatus: z.enum(["pending", "reserved", "distributed"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export type DonationIntentInput = z.infer<typeof donationIntentSchema>;
export type AssistanceApplicationInput = z.infer<typeof assistanceApplicationSchema>;
