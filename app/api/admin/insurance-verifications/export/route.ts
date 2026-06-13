import { NextResponse } from "next/server";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { formatDOBForDisplay } from "@/lib/insurance/dates";
import { listVerificationRecords } from "@/lib/insurance/db/repository";

function escapeCsv(value: string | null | undefined): string {
  const text = value ?? "";
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  if (process.env.INSURANCE_EXPORT_ENABLED !== "true") {
    return NextResponse.json(
      { error: "Export is disabled. Set INSURANCE_EXPORT_ENABLED=true to enable." },
      { status: 403 },
    );
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search")?.trim().toLowerCase();

  let records = await listVerificationRecords();

  if (status && status !== "all") {
    records = records.filter((record) => record.status === status);
  }

  if (search) {
    records = records.filter((record) => {
      const nameMatch = record.clientName.toLowerCase().includes(search);
      const dateMatch = record.submittedAt.slice(0, 10).includes(search);
      return nameMatch || dateMatch;
    });
  }

  const header = [
    "id",
    "clientName",
    "dateOfBirth",
    "status",
    "planName",
    "effectiveDate",
    "insuranceProvider",
    "verificationType",
    "submittedAt",
    "verifiedAt",
  ];

  const rows = records.map((record) =>
    [
      record.id,
      record.clientName,
      formatDOBForDisplay(record.dateOfBirth),
      record.status,
      record.planName,
      record.effectiveDate,
      record.insuranceProvider,
      record.verificationType,
      record.submittedAt,
      record.verifiedAt,
    ]
      .map((value) => escapeCsv(value))
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  await logAdminAudit({
    action: "verification_export",
    timestamp: new Date().toISOString(),
    staffName: auth.context.staffName,
    clientIp: auth.context.clientIp,
    exportRecordCount: records.length,
  });

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="insurance-verifications-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
