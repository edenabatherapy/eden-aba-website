import { NextResponse } from "next/server";
import { serializeAdminRecord } from "@/lib/insurance/admin/serializeRecord";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { sendFamilyStatusEmail } from "@/lib/insurance/notifications/familyStatusEmail";
import {
  STAFF_REVIEW_INTERNAL_STATUSES,
  VERIFICATION_STATUSES,
} from "@/lib/insurance/db/model";
import { INSURANCE_STATUSES } from "@/lib/insurance/portal/status";
import {
  getVerificationRecord,
  updateVerificationRecord,
} from "@/lib/insurance/db/repository";

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

  return NextResponse.json(
    { record: serializeAdminRecord(record) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const { id } = await context.params;
  const existing = await getVerificationRecord(id);

  if (!existing) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.status !== undefined && !VERIFICATION_STATUSES.includes(body.status as never)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  if (
    body.insuranceStatus !== undefined &&
    !INSURANCE_STATUSES.includes(body.insuranceStatus as never)
  ) {
    return NextResponse.json({ error: "Invalid insurance status." }, { status: 400 });
  }

  if (
    body.internalStatus !== undefined &&
    !STAFF_REVIEW_INTERNAL_STATUSES.includes(body.internalStatus as never)
  ) {
    return NextResponse.json({ error: "Invalid internal status." }, { status: 400 });
  }

  const notesValue =
    body.notes === null || body.notes === undefined
      ? body.notes === null
        ? null
        : undefined
      : String(body.notes);

  const updated = await updateVerificationRecord(id, {
    status: body.status as (typeof VERIFICATION_STATUSES)[number] | undefined,
    insuranceStatus: body.insuranceStatus as (typeof INSURANCE_STATUSES)[number] | undefined,
    planName:
      body.planName === null || body.planName === undefined
        ? body.planName === null
          ? null
          : undefined
        : String(body.planName),
    effectiveDate:
      body.effectiveDate === null || body.effectiveDate === undefined
        ? body.effectiveDate === null
          ? null
          : undefined
        : String(body.effectiveDate),
    programType:
      body.programType === null || body.programType === undefined
        ? body.programType === null
          ? null
          : undefined
        : String(body.programType),
    subprogramType:
      body.subprogramType === null || body.subprogramType === undefined
        ? body.subprogramType === null
          ? null
          : undefined
        : String(body.subprogramType),
    notes: notesValue,
    verifiedBy: body.verifiedBy
      ? String(body.verifiedBy)
      : auth.context.staffName,
    internalStatus: body.internalStatus as (typeof STAFF_REVIEW_INTERNAL_STATUSES)[number] | undefined,
    assignedTo:
      body.assignedTo === null || body.assignedTo === undefined
        ? body.assignedTo === null
          ? null
          : undefined
        : String(body.assignedTo),
    reviewNotes:
      body.reviewNotes === undefined ? undefined : String(body.reviewNotes),
  });

  if (!updated) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  if (body.status !== undefined && body.status !== existing.status) {
    await logAdminAudit({
      action: "verification_status_changed",
      timestamp: new Date().toISOString(),
      staffName: auth.context.staffName,
      clientIp: auth.context.clientIp,
      requestId: id,
      previousStatus: existing.status,
      newStatus: String(body.status),
    });

    void sendFamilyStatusEmail({
      requestId: id,
      previousStatus: existing.status,
      newStatus: String(body.status),
      origin: new URL(request.url).origin,
    });
  }

  if (notesValue !== undefined && notesValue !== existing.notes) {
    await logAdminAudit({
      action: "verification_notes_updated",
      timestamp: new Date().toISOString(),
      staffName: auth.context.staffName,
      clientIp: auth.context.clientIp,
      requestId: id,
      notesChanged: true,
    });
  }

  if (
    body.planName !== undefined ||
    body.effectiveDate !== undefined ||
    body.programType !== undefined ||
    body.subprogramType !== undefined
  ) {
    await logAdminAudit({
      action: "verification_record_updated",
      timestamp: new Date().toISOString(),
      staffName: auth.context.staffName,
      clientIp: auth.context.clientIp,
      requestId: id,
    });
  }

  return NextResponse.json(
    { record: serializeAdminRecord(updated) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
