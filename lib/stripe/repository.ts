import { getSupabaseAdminClient } from "@/lib/supabase/server";

export type StripeDonationRow = {
  id: string;
  stripe_session_id: string | null;
  payment_intent_id: string | null;
  amount: number;
  currency: string;
  donor_name: string | null;
  donor_email: string | null;
  anonymous: boolean;
  message: string | null;
  status: string;
  created_at: string;
};

export type CreatePendingStripeDonationInput = {
  amountCents: number;
  currency?: string;
  donorName?: string;
  donorEmail?: string;
  anonymous: boolean;
  message?: string;
  stripeSessionId?: string;
};

export async function createPendingStripeDonation(input: CreatePendingStripeDonationInput) {
  const supabase = getSupabaseAdminClient();

  const { data, error } = await supabase
    .from("stripe_donations")
    .insert({
      amount: input.amountCents,
      currency: input.currency ?? "usd",
      donor_name: input.anonymous ? null : input.donorName?.trim() || null,
      donor_email: input.donorEmail?.trim() || null,
      anonymous: input.anonymous,
      message: input.message?.trim() || null,
      stripe_session_id: input.stripeSessionId ?? null,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return data.id as string;
}

export async function attachStripeSessionToDonation(donationId: string, stripeSessionId: string) {
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase
    .from("stripe_donations")
    .update({ stripe_session_id: stripeSessionId })
    .eq("id", donationId)
    .eq("status", "pending");

  if (error) {
    throw error;
  }
}

export async function completeStripeDonation(input: {
  stripeSessionId: string;
  paymentIntentId: string | null;
  amountCents: number;
  currency: string;
  donorName?: string | null;
  donorEmail?: string | null;
  anonymous: boolean;
  message?: string | null;
}) {
  const supabase = getSupabaseAdminClient();

  const { data: existing, error: existingError } = await supabase
    .from("stripe_donations")
    .select("id, status, amount")
    .eq("stripe_session_id", input.stripeSessionId)
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existing?.status === "completed") {
    return { ok: true as const, donationId: existing.id as string, alreadyCompleted: true };
  }

  if (existing && existing.amount !== input.amountCents) {
    return { ok: false as const, reason: "amount-mismatch" };
  }

  const updatePayload = {
    payment_intent_id: input.paymentIntentId,
    amount: input.amountCents,
    currency: input.currency,
    donor_name: input.anonymous ? null : input.donorName ?? null,
    donor_email: input.donorEmail ?? null,
    anonymous: input.anonymous,
    message: input.message ?? null,
    status: "completed",
  };

  if (existing?.id) {
    const { error } = await supabase
      .from("stripe_donations")
      .update(updatePayload)
      .eq("id", existing.id)
      .eq("status", "pending");

    if (error) {
      throw error;
    }

    return { ok: true as const, donationId: existing.id as string, alreadyCompleted: false };
  }

  const { data, error } = await supabase
    .from("stripe_donations")
    .insert({
      stripe_session_id: input.stripeSessionId,
      ...updatePayload,
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  return { ok: true as const, donationId: data.id as string, alreadyCompleted: false };
}

export async function getStripeDonationBySessionId(sessionId: string) {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("stripe_donations")
    .select(
      "id, stripe_session_id, payment_intent_id, amount, currency, donor_name, donor_email, anonymous, message, status, created_at",
    )
    .eq("stripe_session_id", sessionId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as StripeDonationRow | null;
}

export async function getStripeDonationPublicSummary(sessionId: string) {
  const donation = await getStripeDonationBySessionId(sessionId);
  if (!donation) {
    return null;
  }

  return {
    id: donation.id,
    amountCents: donation.amount,
    currency: donation.currency,
    status: donation.status,
    donorName: donation.anonymous ? null : donation.donor_name,
    donorEmail: donation.donor_email,
    anonymous: donation.anonymous,
    message: donation.message,
    paymentIntentId: donation.payment_intent_id,
    createdAt: donation.created_at,
  };
}
