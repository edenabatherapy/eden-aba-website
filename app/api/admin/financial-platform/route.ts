import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { hasPermission, resolveStaffRole } from "@/lib/financial-platform/roles";
import {
  fetchPlatformDashboard,
  fetchTransparencyDonations,
  writeAuditLog,
} from "@/lib/financial-platform/repository/dashboard";
import { getSupabaseAdminClient } from "@/lib/supabase/server";
import { listPaymentProviders } from "@/lib/financial-platform/payments/registry";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) return auth.response;

  const role = resolveStaffRole(auth.context.staffName);
  if (!hasPermission(role, "campaigns.read") && !hasPermission(role, "audit.read")) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const dashboard = await fetchPlatformDashboard();
  const transparency = await fetchTransparencyDonations({ limit: 30 });

  let pendingDonations: Array<Record<string, unknown>> = [];
  let pendingApplications: Array<Record<string, unknown>> = [];

  try {
    const supabase = getSupabaseAdminClient();
    const [donationsRes, appsRes] = await Promise.all([
      supabase
        .from("donations")
        .select("id, amount_cents, donation_type, status, created_at, is_anonymous")
        .eq("status", "pending")
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(50),
      supabase
        .from("assistance_applications")
        .select("id, tracking_code, application_status, county, emergency_need, created_at")
        .in("application_status", ["received", "under_review", "documentation_requested"])
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    pendingDonations = donationsRes.data ?? [];
    pendingApplications = appsRes.data ?? [];
  } catch {
    /* tables may not exist */
  }

  return NextResponse.json({
    ok: true,
    staffName: auth.context.staffName,
    role,
    dashboard,
    transparency,
    pendingDonations,
    pendingApplications,
    paymentProviders: listPaymentProviders(),
  });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) return auth.response;

  const role = resolveStaffRole(auth.context.staffName);
  let body: { action?: string; entityId?: string; entityType?: string; payload?: Record<string, unknown> };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const { action, entityId, entityType, payload } = body;
  if (!action || !entityId) {
    return NextResponse.json({ error: "action and entityId required." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  if (action === "approve_donation" && hasPermission(role, "donations.approve")) {
    const { error } = await supabase
      .from("donations")
      .update({
        status: "completed",
        completed_at: new Date().toISOString(),
        approved_at: new Date().toISOString(),
        approved_by: auth.context.staffName,
      })
      .eq("id", entityId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor: auth.context.staffName,
      actorRole: role,
      action: "donation_approved",
      entityType: "donations",
      entityId,
    });

    return NextResponse.json({ ok: true });
  }

  if (action === "allocate_funds" && hasPermission(role, "funds.allocate")) {
    const amountCents = Number(payload?.amountCents ?? 0);
    const category = String(payload?.category ?? "therapy_subsidy");
    const campaignId = String(payload?.campaignId ?? "");

    if (!campaignId || amountCents <= 0) {
      return NextResponse.json({ error: "campaignId and amountCents required." }, { status: 400 });
    }

    const { error } = await supabase.from("fund_allocations").insert({
      campaign_id: campaignId,
      application_id: payload?.applicationId ?? null,
      category,
      amount_cents: amountCents,
      allocation_status: payload?.allocationStatus ?? "reserved",
      period_label: new Date().toISOString().slice(0, 7),
      description: payload?.description ?? null,
      approved_by: auth.context.staffName,
      approved_at: new Date().toISOString(),
      created_by: auth.context.staffName,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor: auth.context.staffName,
      actorRole: role,
      action: "funds_allocated",
      entityType: "fund_allocations",
      metadata: { amountCents, category, campaignId },
    });

    return NextResponse.json({ ok: true });
  }

  if (action === "update_application" && hasPermission(role, "applications.review")) {
    const newStatus = String(payload?.applicationStatus ?? "");
    if (!newStatus) {
      return NextResponse.json({ error: "applicationStatus required." }, { status: 400 });
    }

    const { error } = await supabase
      .from("assistance_applications")
      .update({
        application_status: newStatus,
        reviewed_by: auth.context.staffName,
        reviewed_at: new Date().toISOString(),
        review_notes: payload?.reviewNotes ?? null,
      })
      .eq("id", entityId);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    await writeAuditLog({
      actor: auth.context.staffName,
      actorRole: role,
      action: "application_status_updated",
      entityType: entityType ?? "assistance_applications",
      entityId,
      metadata: { newStatus },
    });

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Forbidden or unknown action." }, { status: 403 });
}
