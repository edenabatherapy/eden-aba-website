import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import { createLogoutResponse, requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";

export async function POST(request: Request) {
  const auth = await requireAdminAuth(request, { skipRateLimit: true });
  const staffName = auth.ok ? auth.context.staffName : undefined;

  if (auth.ok) {
    await logAdminAudit({
      action: "admin_logout",
      timestamp: new Date().toISOString(),
      staffName: auth.context.staffName,
      clientIp: auth.context.clientIp,
    });
  }

  return createLogoutResponse(staffName);
}

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request, { skipRateLimit: true });
  if (auth.ok === false) {
    return auth.response;
  }

  return NextResponse.json({
    authenticated: true,
    staffName: auth.context.staffName,
  });
}
