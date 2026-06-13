import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { computeInsuranceMetrics } from "@/lib/insurance/metrics/computeMetrics";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const metrics = await computeInsuranceMetrics();

  return NextResponse.json(metrics, {
    headers: { "Cache-Control": "no-store" },
  });
}
