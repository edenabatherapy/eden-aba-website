import { NextResponse } from "next/server";
import { fetchTransparencyDonations } from "@/lib/financial-platform/repository/dashboard";
import { transparencyFilterSchema } from "@/lib/financial-platform/schemas";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = transparencyFilterSchema.safeParse({
    campaignSlug: searchParams.get("campaignSlug") ?? undefined,
    donationType: searchParams.get("donationType") ?? undefined,
    allocationStatus: searchParams.get("allocationStatus") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    offset: searchParams.get("offset") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Invalid filter parameters." }, { status: 400 });
  }

  const rows = await fetchTransparencyDonations({
    campaignSlug: parsed.data.campaignSlug,
    donationType: parsed.data.donationType,
    allocationStatus: parsed.data.allocationStatus,
    limit: parsed.data.limit,
    offset: parsed.data.offset,
  });

  return NextResponse.json({ ok: true, donations: rows, total: rows.length });
}
