import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import {
  authenticateAdminCredentials,
  createSessionResponse,
  validateLoginAttempt,
} from "@/lib/insurance/admin/requireAdmin";
import { resetRateLimit } from "@/lib/insurance/admin/rateLimit";

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds, clientIp } = validateLoginAttempt(request);

  if (!allowed) {
    await logAdminAudit({
      action: "admin_login_rate_limited",
      timestamp: new Date().toISOString(),
      clientIp,
    });
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds || 900) } },
    );
  }

  let body: { token?: string; staffName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const token = body.token?.trim() || "";
  const staffName = body.staffName?.trim() || "Staff";

  if (!token) {
    return NextResponse.json({ error: "Access token is required." }, { status: 400 });
  }

  if (!authenticateAdminCredentials(token)) {
    await logAdminAudit({
      action: "admin_login_failed",
      timestamp: new Date().toISOString(),
      clientIp,
      staffName,
    });
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  resetRateLimit(`admin-login:${clientIp}`);

  await logAdminAudit({
    action: "admin_login_success",
    timestamp: new Date().toISOString(),
    clientIp,
    staffName,
  });

  return createSessionResponse(staffName);
}
