import { ALLOCATION_TARGETS, HOURS_PER_THOUSAND_DOLLARS } from "./constants";
import type { PublicFundStats } from "./types";

export function computeProgressPercent(raisedCents: number, goalCents: number): number {
  if (goalCents <= 0) return 0;
  return Math.min(100, Math.round((raisedCents / goalCents) * 1000) / 10);
}

export function computeRemainingCents(raisedCents: number, goalCents: number): number {
  return Math.max(0, goalCents - raisedCents);
}

export function computeEstimatedHoursSupported(amountCents: number): number {
  const dollars = amountCents / 100;
  return Math.round((dollars / 1000) * HOURS_PER_THOUSAND_DOLLARS * 10) / 10;
}

export function computeAllocationBreakdown(totalCents: number): Record<keyof typeof ALLOCATION_TARGETS, number> {
  return {
    therapy: Math.round(totalCents * (ALLOCATION_TARGETS.therapy / 100)),
    assessment: Math.round(totalCents * (ALLOCATION_TARGETS.assessment / 100)),
    emergency: Math.round(totalCents * (ALLOCATION_TARGETS.emergency / 100)),
    operating: Math.round(totalCents * (ALLOCATION_TARGETS.operating / 100)),
  };
}

export function formatCurrency(cents: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function buildPublicStatsFromAggregates(input: {
  campaignName: string;
  goalAmountCents: number;
  raisedAmountCents: number;
  familiesHelped: number;
  donorCount: number;
  source?: PublicFundStats["source"];
}): PublicFundStats {
  const averageGiftCents =
    input.donorCount > 0 ? Math.round(input.raisedAmountCents / input.donorCount) : 0;

  return {
    campaignName: input.campaignName,
    goalAmountCents: input.goalAmountCents,
    raisedAmountCents: input.raisedAmountCents,
    familiesHelped: input.familiesHelped,
    donorCount: input.donorCount,
    averageGiftCents,
    allocationPercent: { ...ALLOCATION_TARGETS },
    lastUpdated: new Date().toISOString(),
    source: input.source ?? "seed",
  };
}
