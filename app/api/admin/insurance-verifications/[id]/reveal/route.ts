import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { serializeRevealedPhi } from "@/lib/insurance/admin/serializeRecord";
import { getVerificationRecord } from "@/lib/insurance/db/repository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const { id } = await context.params;
  const record = await getVerificationRecord(id);

  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  await logAdminAudit({
    action: "PHI_REVEALED",
    timestamp: new Date().toISOString(),
    staffName: auth.context.staffName,
    clientIp: auth.context.clientIp,
    requestId: id,
  });

  return NextResponse.json(
    { revealed: serializeRevealedPhi(record) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
