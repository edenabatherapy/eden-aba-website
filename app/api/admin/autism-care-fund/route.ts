import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { fetchPublicFundDashboard } from "@/lib/autism-care-fund/public-stats";
import { getSupabaseAdminClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const dashboard = await fetchPublicFundDashboard();

  let pendingIntents: Array<{
    id: string;
    amountCents: number;
    status: string;
    createdAt: string;
    isAnonymous: boolean;
  }> = [];

  try {
    const supabase = getSupabaseAdminClient();
    const { data } = await supabase
      .from("donations")
      .select("id, amount_cents, status, created_at, is_anonymous")
      .eq("status", "pending")
      .is("deleted_at", null)
      .order("created_at", { ascending: false })
      .limit(50);

    pendingIntents =
      data?.map((row) => ({
        id: row.id as string,
        amountCents: Number(row.amount_cents ?? 0),
        status: row.status as string,
        createdAt: row.created_at as string,
        isAnonymous: Boolean(row.is_anonymous),
      })) ?? [];
  } catch {
    /* tables may not exist yet */
  }

  return NextResponse.json({
    ok: true,
    staffName: auth.context.staffName,
    dashboard,
    pendingIntents,
    redirectNote: "Use /admin/financial-platform for full Stage 2 admin features.",
  });
}
