import { NextResponse } from "next/server";
import { readIntakeAuditEntries } from "@/lib/intake/server/audit-log";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** GET /api/admin/intake-submissions — PHI-free list from _audit.jsonl */
export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  try {
    const entries = await readIntakeAuditEntries();

    return NextResponse.json({
      ok: true,
      count: entries.length,
      submissions: entries,
    });
  } catch (error) {
    console.error("[admin/intake-submissions] list failed", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json({ error: "Unable to load intake submissions." }, { status: 500 });
  }
}
