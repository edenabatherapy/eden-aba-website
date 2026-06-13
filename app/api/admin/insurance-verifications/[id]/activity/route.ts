import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { getRecordActivity } from "@/lib/insurance/db/activityTimeline";
import { getVerificationRecord } from "@/lib/insurance/db/repository";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const { id } = await context.params;
  const record = await getVerificationRecord(id);

  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  const activity = getRecordActivity(record);

  return NextResponse.json(
    { activity },
    { headers: { "Cache-Control": "no-store" } },
  );
}
