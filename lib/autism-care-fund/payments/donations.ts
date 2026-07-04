import { createHash } from "crypto";
import { DEFAULT_CAMPAIGN_SLUG } from "@/lib/financial-platform/constants";
import { writeAuditLog } from "@/lib/financial-platform/repository/dashboard";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import type { DonationPaymentInput } from "./schema";

function hashEmail(email: string): string {
  return createHash("sha256").update(email.toLowerCase().trim()).digest("hex");
}

export type DonationRow = {
  id: string;
  amount_cents: number;
  status: string;
  payment_provider: string | null;
  payment_intent_id: string | null;
  completed_at: string | null;
  created_at: string;
};

export type PendingDonationResult =
  | { ok: true; donationId: string }
  | { ok: false; status: number; message: string };

export async function createPendingAutismCareDonation(
  input: DonationPaymentInput,
  paymentProvider: "stripe" | "paypal",
): Promise<PendingDonationResult> {
  const supabase = getSupabaseAdminClient();

  const { data: campaign, error: campaignError } = await supabase
    .from("donation_campaigns")
    .select("id, status")
    .eq("slug", DEFAULT_CAMPAIGN_SLUG)
    .eq("status", "active")
    .is("deleted_at", null)
    .maybeSingle();

  if (campaignError || !campaign?.id) {
    return {
      ok: false,
      status: 503,
      message: "The Autism Care Fund is not available right now. Please contact Eden ABA Therapy.",
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
      payment_provider: paymentProvider,
    })
    .select("id")
    .single();

  if (donationError) throw donationError;

  const donationId = donation.id as string;

  await writeAuditLog({
    actor: "public-api",
    action: "donation_payment_started",
    entityType: "donations",
    entityId: donationId,
    metadata: {
      amountCents: input.amountCents,
      anonymous,
      donationType,
      paymentProvider,
    },
  });

  return { ok: true, donationId };
}

export async function updateDonationPaymentIntent(donationId: string, paymentIntentId: string) {
  const supabase = getSupabaseAdminClient();
  await supabase
    .from("donations")
    .update({ payment_intent_id: paymentIntentId })
    .eq("id", donationId)
    .eq("status", "pending");
}

export async function getDonationById(donationId: string): Promise<DonationRow | null> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("donations")
    .select("id, amount_cents, status, payment_provider, payment_intent_id, completed_at, created_at")
    .eq("id", donationId)
    .is("deleted_at", null)
    .maybeSingle();

  if (error) throw error;
  return data as DonationRow | null;
}

export async function getDonationPublicSummary(donationId: string) {
  const donation = await getDonationById(donationId);
  if (!donation) return null;

  return {
    id: donation.id,
    amountCents: donation.amount_cents,
    status: donation.status,
    paymentProvider: donation.payment_provider,
    completedAt: donation.completed_at,
    createdAt: donation.created_at,
  };
}

export async function completeAutismCareDonation(input: {
  donationId: string;
  paymentProvider: "stripe" | "paypal";
  paymentIntentId: string;
  amountCents: number;
  rawPayload?: Record<string, unknown>;
}) {
  const supabase = getSupabaseAdminClient();
  const existing = await getDonationById(input.donationId);

  if (!existing) {
    return { ok: false as const, reason: "donation-not-found" };
  }

  if (existing.status === "completed") {
    return { ok: true as const, alreadyCompleted: true };
  }

  if (existing.amount_cents !== input.amountCents) {
    return { ok: false as const, reason: "amount-mismatch" };
  }

  const completedAt = new Date().toISOString();

  const { error: donationError } = await supabase
    .from("donations")
    .update({
      status: "completed",
      allocation_status: "pending",
      payment_provider: input.paymentProvider,
      payment_intent_id: input.paymentIntentId,
      completed_at: completedAt,
    })
    .eq("id", input.donationId)
    .eq("status", "pending");

  if (donationError) throw donationError;

  const { error: transactionError } = await supabase.from("transactions").insert({
    donation_id: input.donationId,
    provider: input.paymentProvider,
    provider_transaction_id: input.paymentIntentId,
    amount_cents: input.amountCents,
    currency: "usd",
    transaction_type: "charge",
    status: "completed",
    raw_payload: input.rawPayload ?? {},
    created_by: "payment-webhook",
  });

  if (transactionError) throw transactionError;

  await writeAuditLog({
    actor: input.paymentProvider,
    action: "donation_payment_completed",
    entityType: "donations",
    entityId: input.donationId,
    metadata: {
      amountCents: input.amountCents,
      paymentIntentId: input.paymentIntentId,
    },
  });

  return { ok: true as const, alreadyCompleted: false };
}
