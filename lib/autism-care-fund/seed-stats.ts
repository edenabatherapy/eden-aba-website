import { DEFAULT_CAMPAIGN } from "./constants";
import { buildPublicStatsFromAggregates } from "./formulas";
import type { DonorWallEntry, MonthlyReport, PublicFundStats, TransparencyRow } from "./types";

export const SEED_FUND_STATS: PublicFundStats = buildPublicStatsFromAggregates({
  campaignName: DEFAULT_CAMPAIGN.name,
  goalAmountCents: DEFAULT_CAMPAIGN.goalAmountCents,
  raisedAmountCents: 42_750_00,
  familiesHelped: 6,
  donorCount: 38,
  source: "seed",
});

export const SEED_TRANSPARENCY_ROWS: TransparencyRow[] = [
  {
    id: "t1",
    period: "Q1 2026",
    category: "Therapy subsidies",
    amountCents: 18_500_00,
    description: "Partial session subsidies for eligible families after insurance/Medicaid review.",
  },
  {
    id: "t2",
    period: "Q1 2026",
    category: "Assessment support",
    amountCents: 4_200_00,
    description: "Diagnostic evaluation co-pay assistance for intake families.",
  },
  {
    id: "t3",
    period: "Q1 2026",
    category: "Family emergency",
    amountCents: 2_800_00,
    description: "Short-term support during coverage transitions.",
  },
  {
    id: "t4",
    period: "Q1 2026",
    category: "Fund operations",
    amountCents: 1_250_00,
    description: "Administrative processing and reporting (capped per published policy).",
  },
];

export const SEED_DONOR_WALL: DonorWallEntry[] = [
  { id: "d1", displayName: "Anonymous", amountCents: null, donatedAt: "2026-03-12T14:00:00Z" },
  { id: "d2", displayName: "Anonymous", amountCents: null, donatedAt: "2026-03-08T10:30:00Z" },
  { id: "d3", displayName: "Community Friend", amountCents: 5000, donatedAt: "2026-02-28T16:45:00Z" },
  { id: "d4", displayName: "Anonymous", amountCents: null, donatedAt: "2026-02-15T09:00:00Z" },
  { id: "d5", displayName: "Northern VA Neighbor", amountCents: 10000, donatedAt: "2026-01-20T18:20:00Z" },
  { id: "d6", displayName: "Anonymous", amountCents: null, donatedAt: "2026-01-05T11:10:00Z" },
];

export const SEED_MONTHLY_REPORTS: MonthlyReport[] = [
  {
    id: "m1",
    month: "2026-03",
    raisedCents: 8_400_00,
    disbursedCents: 6_100_00,
    familiesServed: 2,
    publishedAt: "2026-04-01T12:00:00Z",
  },
  {
    id: "m2",
    month: "2026-02",
    raisedCents: 12_350_00,
    disbursedCents: 9_800_00,
    familiesServed: 2,
    publishedAt: "2026-03-01T12:00:00Z",
  },
  {
    id: "m3",
    month: "2026-01",
    raisedCents: 22_000_00,
    disbursedCents: 10_850_00,
    familiesServed: 2,
    publishedAt: "2026-02-01T12:00:00Z",
  },
];
