import { fetchPlatformDashboard, fetchTransparencyDonations } from "@/lib/financial-platform/repository/dashboard";
import { DEFAULT_CAMPAIGN_SLUG } from "@/lib/financial-platform/constants";
import { ALLOCATION_TARGETS } from "@/lib/autism-care-fund/constants";
import type { DonorWallEntry, MonthlyReport, PublicFundStats, TransparencyRow } from "@/lib/autism-care-fund/types";
import { getPublicSupabaseClient } from "@/lib/financial-platform/repository/client";

export type PublicFundDashboard = {
  stats: PublicFundStats;
  transparency: TransparencyRow[];
  donorWall: DonorWallEntry[];
  monthlyReports: MonthlyReport[];
  configured: boolean;
};

function emptyStats(): PublicFundStats {
  return {
    campaignName: "Autism Care Fund",
    goalAmountCents: 0,
    raisedAmountCents: 0,
    familiesHelped: 0,
    donorCount: 0,
    averageGiftCents: 0,
    allocationPercent: { ...ALLOCATION_TARGETS },
    lastUpdated: new Date().toISOString(),
    source: "supabase",
  };
}

export async function fetchPublicFundDashboard(): Promise<PublicFundDashboard> {
  const dashboard = await fetchPlatformDashboard(DEFAULT_CAMPAIGN_SLUG);
  const transparencyDonations = await fetchTransparencyDonations({ limit: 20 });

  const stats: PublicFundStats = dashboard.configured
    ? {
        campaignName: dashboard.campaignName || "Autism Care Fund",
        goalAmountCents: dashboard.goalAmountCents,
        raisedAmountCents: dashboard.raisedAmountCents,
        familiesHelped: dashboard.familiesSupported,
        donorCount: dashboard.donorCount,
        averageGiftCents: dashboard.averageDonationCents,
        allocationPercent: { ...ALLOCATION_TARGETS },
        lastUpdated: dashboard.lastUpdated,
        source: "supabase",
      }
    : emptyStats();

  const transparency: TransparencyRow[] = transparencyDonations.map((row) => ({
    id: row.id,
    period: new Date(row.donatedAt).toLocaleDateString(),
    category: row.impactCategory ?? row.donationType,
    amountCents: row.amountCents,
    description: `${row.allocationStatus} · ${row.isAnonymous ? "Anonymous" : "Public"}`,
  }));

  let donorWall: DonorWallEntry[] = [];
  let monthlyReports: MonthlyReport[] = [];

  const client = getPublicSupabaseClient();
  if (client && dashboard.configured) {
    const { data: campaign } = await client
      .from("donation_campaigns")
      .select("id")
      .eq("slug", DEFAULT_CAMPAIGN_SLUG)
      .maybeSingle();

    if (campaign?.id) {
      const [donorsRes, monthlyRes] = await Promise.all([
        client
          .from("donations")
          .select("id, amount_cents, is_anonymous, completed_at")
          .eq("campaign_id", campaign.id)
          .eq("status", "completed")
          .is("deleted_at", null)
          .order("completed_at", { ascending: false })
          .limit(12),
        client
          .from("monthly_reports")
          .select("id, month, raised_cents, disbursed_cents, families_served, published_at")
          .eq("campaign_id", campaign.id)
          .eq("status", "published")
          .is("deleted_at", null)
          .order("month", { ascending: false })
          .limit(6),
      ]);

      donorWall =
        donorsRes.data?.map((row) => ({
          id: row.id as string,
          displayName: row.is_anonymous ? "Anonymous" : "Community Supporter",
          amountCents: row.is_anonymous ? null : Number(row.amount_cents ?? 0),
          donatedAt: (row.completed_at as string) ?? new Date().toISOString(),
        })) ?? [];

      monthlyReports =
        monthlyRes.data?.map((row) => ({
          id: row.id as string,
          month: String(row.month).slice(0, 7),
          raisedCents: Number(row.raised_cents ?? 0),
          disbursedCents: Number(row.disbursed_cents ?? 0),
          familiesServed: Number(row.families_served ?? 0),
          publishedAt: (row.published_at as string) ?? new Date().toISOString(),
        })) ?? [];
    }
  }

  return {
    stats,
    transparency,
    donorWall,
    monthlyReports,
    configured: dashboard.configured,
  };
}
