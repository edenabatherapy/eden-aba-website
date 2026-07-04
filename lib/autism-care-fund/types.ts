export type DonationStatus = "pending" | "completed" | "failed" | "refunded";

export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export type FundAllocationCategory =
  | "therapy_subsidy"
  | "assessment_support"
  | "family_emergency"
  | "operating"
  | "other";

export type PublicFundStats = {
  campaignName: string;
  goalAmountCents: number;
  raisedAmountCents: number;
  familiesHelped: number;
  donorCount: number;
  averageGiftCents: number;
  allocationPercent: {
    therapy: number;
    assessment: number;
    emergency: number;
    operating: number;
  };
  lastUpdated: string;
  source: "supabase" | "seed";
};

export type TransparencyRow = {
  id: string;
  period: string;
  category: string;
  amountCents: number;
  description: string;
};

export type DonorWallEntry = {
  id: string;
  displayName: string;
  amountCents: number | null;
  donatedAt: string;
};

export type DonationIntentPayload = {
  amountCents: number;
  donorDisplayName?: string;
  anonymous?: boolean;
  email?: string;
  message?: string;
  campaignSlug?: string;
};

export type DonationIntentResponse = {
  ok: boolean;
  intentId?: string;
  message: string;
  paymentReady?: boolean;
};

export type MonthlyReport = {
  id: string;
  month: string;
  raisedCents: number;
  disbursedCents: number;
  familiesServed: number;
  publishedAt: string;
};
