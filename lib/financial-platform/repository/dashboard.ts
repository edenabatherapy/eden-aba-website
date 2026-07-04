import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { computeAvailableBalance } from "../allocation";
import { DEFAULT_CAMPAIGN_SLUG } from "../constants";
import { getPublicSupabaseClient, isPlatformConfigured } from "./client";
import type { PlatformDashboard, TransparencyDonationRow } from "../types";

type CampaignRow = {
  id: string;
  slug: string;
  name: string;
  goal_amount_cents: number;
  monthly_goal_cents: number;
  annual_goal_cents: number;
};

function emptyDashboard(): PlatformDashboard {
  return {
    configured: false,
    campaignName: "",
    campaignSlug: DEFAULT_CAMPAIGN_SLUG,
    goalAmountCents: 0,
    monthlyGoalCents: 0,
    annualGoalCents: 0,
    raisedAmountCents: 0,
    totalDonationsCents: 0,
    reservedFundsCents: 0,
    distributedFundsCents: 0,
    availableBalanceCents: 0,
    familiesSupported: 0,
    childrenSponsored: 0,
    therapyHoursFunded: 0,
    assessmentsSponsored: 0,
    parentTrainings: 0,
    transportationAssistance: 0,
    equipmentPurchased: 0,
    donorCount: 0,
    returningDonors: 0,
    averageDonationCents: 0,
    largestDonationCents: 0,
    applicationsPending: 0,
    familiesWaiting: 0,
    lastUpdated: new Date().toISOString(),
  };
}

async function fetchCampaign(
  client: ReturnType<typeof getPublicSupabaseClient>,
  slug: string,
): Promise<CampaignRow | null> {
  if (!client) return null;

  const { data, error } = await client
    .from("donation_campaigns")
    .select("id, slug, name, goal_amount_cents, monthly_goal_cents, annual_goal_cents")
    .eq("slug", slug)
    .eq("status", "active")
    .is("deleted_at", null)
    .maybeSingle();

  if (error || !data) return null;
  return data as CampaignRow;
}

export async function fetchPlatformDashboard(
  campaignSlug = DEFAULT_CAMPAIGN_SLUG,
): Promise<PlatformDashboard> {
  if (!isPlatformConfigured()) return emptyDashboard();

  const client = getPublicSupabaseClient();
  const campaign = await fetchCampaign(client, campaignSlug);
  if (!campaign || !client) return { ...emptyDashboard(), configured: true };

  const campaignId = campaign.id;

  const [
    donationsRes,
    allocationsRes,
    familiesRes,
    sponsorshipsRes,
    applicationsRes,
    waitlistRes,
  ] = await Promise.all([
    client
      .from("donations")
      .select("amount_cents, donor_id, status")
      .eq("campaign_id", campaignId)
      .eq("status", "completed")
      .is("deleted_at", null),
    client
      .from("fund_allocations")
      .select("amount_cents, allocation_status, category")
      .eq("campaign_id", campaignId)
      .is("deleted_at", null),
    client
      .from("families_supported")
      .select("id, hours_funded, status")
      .eq("campaign_id", campaignId)
      .is("deleted_at", null)
      .in("status", ["active", "completed"]),
    client
      .from("therapy_sponsorships")
      .select("id, hours_sponsored, status")
      .is("deleted_at", null)
      .in("status", ["approved", "active", "completed"]),
    client
      .from("assistance_applications")
      .select("id")
      .is("deleted_at", null)
      .in("application_status", ["received", "under_review", "documentation_requested"]),
    client
      .from("assistance_applications")
      .select("id")
      .is("deleted_at", null)
      .eq("application_status", "waitlist"),
  ]);

  const completedDonations = donationsRes.data ?? [];
  const totalDonationsCents = completedDonations.reduce(
    (sum, row) => sum + Number(row.amount_cents ?? 0),
    0,
  );

  const donorIds = new Set(
    completedDonations.map((row) => row.donor_id).filter(Boolean) as string[],
  );

  const allocations = allocationsRes.data ?? [];
  let reservedFundsCents = 0;
  let distributedFundsCents = 0;
  let assessmentsSponsored = 0;
  let parentTrainings = 0;
  let transportationAssistance = 0;
  let equipmentPurchased = 0;

  for (const row of allocations) {
    const amount = Number(row.amount_cents ?? 0);
    const status = row.allocation_status as string;
    if (status === "reserved") reservedFundsCents += amount;
    if (status === "distributed") distributedFundsCents += amount;

    const category = row.category as string;
    if (category === "assessment_support" && status === "distributed") assessmentsSponsored += 1;
    if (category === "parent_training" && status === "distributed") parentTrainings += 1;
    if (category === "transportation" && status === "distributed") transportationAssistance += 1;
    if (category === "equipment" && status === "distributed") equipmentPurchased += 1;
  }

  const balance = computeAvailableBalance({
    totalDonationsCents,
    reservedFundsCents,
    distributedFundsCents,
  });

  const families = familiesRes.data ?? [];
  const therapyHoursFunded = families.reduce(
    (sum, row) => sum + Number(row.hours_funded ?? 0),
    0,
  );

  const sponsorships = sponsorshipsRes.data ?? [];
  const amounts = completedDonations.map((d) => Number(d.amount_cents ?? 0));
  const averageDonationCents =
    amounts.length > 0
      ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length)
      : 0;
  const largestDonationCents = amounts.length > 0 ? Math.max(...amounts) : 0;

  return {
    configured: true,
    campaignName: campaign.name,
    campaignSlug: campaign.slug,
    goalAmountCents: Number(campaign.goal_amount_cents ?? 0),
    monthlyGoalCents: Number(campaign.monthly_goal_cents ?? 0),
    annualGoalCents: Number(campaign.annual_goal_cents ?? 0),
    raisedAmountCents: totalDonationsCents,
    totalDonationsCents: balance.totalDonationsCents,
    reservedFundsCents: balance.reservedFundsCents,
    distributedFundsCents: balance.distributedFundsCents,
    availableBalanceCents: balance.availableBalanceCents,
    familiesSupported: families.length,
    childrenSponsored: sponsorships.length,
    therapyHoursFunded,
    assessmentsSponsored,
    parentTrainings,
    transportationAssistance,
    equipmentPurchased,
    donorCount: donorIds.size,
    returningDonors: 0,
    averageDonationCents,
    largestDonationCents,
    applicationsPending: applicationsRes.data?.length ?? 0,
    familiesWaiting: waitlistRes.data?.length ?? 0,
    lastUpdated: new Date().toISOString(),
  };
}

export async function fetchTransparencyDonations(options?: {
  campaignSlug?: string;
  limit?: number;
  offset?: number;
  allocationStatus?: string;
  donationType?: string;
}): Promise<TransparencyDonationRow[]> {
  const client = getPublicSupabaseClient();
  if (!client) return [];

  const slug = options?.campaignSlug ?? DEFAULT_CAMPAIGN_SLUG;
  const campaign = await fetchCampaign(client, slug);
  if (!campaign) return [];

  let query = client
    .from("donations")
    .select(
      "id, completed_at, created_at, donation_type, amount_cents, allocation_status, is_anonymous, impact_category, campaign_id",
    )
    .eq("campaign_id", campaign.id)
    .eq("status", "completed")
    .is("deleted_at", null)
    .order("completed_at", { ascending: false });

  if (options?.allocationStatus) {
    query = query.eq("allocation_status", options.allocationStatus);
  }
  if (options?.donationType) {
    query = query.eq("donation_type", options.donationType);
  }

  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;
  query = query.range(offset, offset + limit - 1);

  const { data } = await query;
  if (!data?.length) return [];

  return data.map((row) => ({
    id: row.id as string,
    donatedAt: (row.completed_at as string) ?? (row.created_at as string),
    donationType: row.donation_type as TransparencyDonationRow["donationType"],
    campaignName: campaign.name,
    amountCents: Number(row.amount_cents ?? 0),
    allocationStatus: row.allocation_status as TransparencyDonationRow["allocationStatus"],
    isAnonymous: Boolean(row.is_anonymous),
    donorDisplayName: row.is_anonymous ? null : "Community Supporter",
    impactCategory: (row.impact_category as string) ?? null,
  }));
}

export async function fetchFinancialResourcesFromDb(): Promise<
  import("../types").FinancialResourceRow[]
> {
  const client = getPublicSupabaseClient();
  if (!client) return [];

  const { data } = await client
    .from("financial_resources")
    .select(
      "id, slug, title, group_name, program_type, description, eligibility_summary, coverage_notes, official_links, documents, tips, county",
    )
    .eq("status", "active")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });

  if (!data?.length) return [];

  return data.map((row) => ({
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    group: row.group_name as string,
    programType: row.program_type as string,
    description: row.description as string,
    eligibilitySummary: (row.eligibility_summary as string) ?? null,
    coverageNotes: (row.coverage_notes as string) ?? null,
    officialLinks: (row.official_links as Array<{ label: string; url: string }>) ?? [],
    documents: (row.documents as string[]) ?? [],
    tips: (row.tips as string[]) ?? [],
    county: (row.county as string) ?? null,
  }));
}

export async function writeAuditLog(input: {
  actor: string;
  actorRole?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string;
}) {
  try {
    const supabase = getSupabaseAdminClient();
    await supabase.from("audit_logs").insert({
      actor: input.actor,
      actor_role: input.actorRole ?? null,
      action: input.action,
      entity_type: input.entityType ?? null,
      entity_id: input.entityId ?? null,
      metadata: input.metadata ?? {},
      ip_address: input.ipAddress ?? null,
    });
  } catch {
    /* audit failure should not block primary flow */
  }
}
