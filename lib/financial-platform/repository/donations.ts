import { createHash, randomBytes } from "crypto";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { DEFAULT_CAMPAIGN_SLUG } from "../constants";
import { getDefaultPaymentProvider } from "../payments/registry";
import type { DonationIntentInput } from "../schemas";
import { writeAuditLog } from "./dashboard";

function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

export async function createDonationIntent(input: DonationIntentInput) {
  const supabase = getSupabaseAdminClient();
  const slug = input.campaignSlug?.trim() || DEFAULT_CAMPAIGN_SLUG;

  const { data: campaign, error: campaignError } = await supabase
    .from("donation_campaigns")
    .select("id, status")
    .eq("slug", slug)
    .eq("status", "active")
    .is("deleted_at", null)
    .maybeSingle();

  if (campaignError || !campaign?.id) {
    return {
      ok: false as const,
      status: 503,
      message: "Campaign is not available. Please contact Eden ABA Therapy.",
    };
  }

  const anonymous = input.anonymous !== false;
  const email = input.email?.trim() ?? "";
  let donorId: string | null = null;

  if (email) {
    const { data: donor, error: donorError } = await supabase
      .from("donors")
      .insert({
        display_name: anonymous ? null : input.donorDisplayName?.trim() || "Community Supporter",
        email_hash: hashEmail(email),
        is_anonymous: anonymous,
      })
      .select("id")
      .single();

    if (donorError) throw donorError;
    donorId = donor?.id ?? null;
  }

  const donationType = input.donationType === "anonymous" ? "anonymous" : input.donationType;
  const provider = getDefaultPaymentProvider();

  const { data: donation, error: donationError } = await supabase
    .from("donations")
    .insert({
      campaign_id: campaign.id,
      donor_id: donorId,
      amount_cents: input.amountCents,
      donation_type: donationType,
      recurrence_interval: donationType === "monthly" ? "monthly" : null,
      status: "pending",
      allocation_status: "pending",
      message: input.message?.trim() || null,
      is_anonymous: anonymous,
      memorial_honoree: input.memorialHonoree?.trim() || null,
      sponsored_child_ref: input.sponsoredChildRef?.trim() || null,
      payment_provider: provider.isConfigured() ? provider.id : null,
    })
    .select("id")
    .single();

  if (donationError) throw donationError;

  const intentId = donation?.id as string;
  const payment = await provider.createIntent({
    donationId: intentId,
    amountCents: input.amountCents,
    currency: "usd",
    donorEmail: email || undefined,
    metadata: { campaignSlug: slug, donationType },
  });

  await writeAuditLog({
    actor: "public-api",
    action: "donation_intent_created",
    entityType: "donations",
    entityId: intentId,
    metadata: { amountCents: input.amountCents, anonymous, donationType, provider: provider.id },
  });

  return {
    ok: true as const,
    status: 200,
    intentId,
    paymentReady: payment.ready,
    message: payment.message,
    provider: provider.id,
  };
}

export function generateTrackingCode(): string {
  return `EDEN-${randomBytes(4).toString("hex").toUpperCase()}`;
}
