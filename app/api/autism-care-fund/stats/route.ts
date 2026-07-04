import { NextResponse } from "next/server";
import { fetchPublicFundDashboard } from "@/lib/autism-care-fund/public-stats";

export const dynamic = "force-dynamic";

export async function GET() {
  const dashboard = await fetchPublicFundDashboard();

  return NextResponse.json({
    ok: true,
    configured: dashboard.configured,
    ...dashboard,
  });
}
