import type { ActivityLogEntry, InsuranceVerificationRecord } from "@/lib/insurance/db/model";

/** Backfill timeline entries for records created before activity logging. */
export function getRecordActivity(record: InsuranceVerificationRecord): ActivityLogEntry[] {
  if (record.activityLog?.length) {
    return [...record.activityLog].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }

  const legacy: ActivityLogEntry[] = [
    {
      id: "legacy-submitted",
      type: "submitted",
      timestamp: record.submittedAt,
      description: "Verification request submitted by family.",
    },
  ];

  if (record.verifiedAt && record.status !== "Pending Staff Review") {
    legacy.unshift({
      id: "legacy-reviewed",
      type: "reviewed",
      timestamp: record.verifiedAt,
      description: "Staff completed verification review.",
      staffName: record.verifiedBy || undefined,
    });
    legacy.unshift({
      id: "legacy-status",
      type: "status_changed",
      timestamp: record.verifiedAt,
      description: `Status updated to ${record.status}.`,
      staffName: record.verifiedBy || undefined,
      newStatus: record.status,
    });
  }

  if (record.notes) {
    legacy.unshift({
      id: "legacy-notes",
      type: "notes_added",
      timestamp: record.updatedAt || record.verifiedAt || record.submittedAt,
      description: "Staff notes on file.",
      staffName: record.verifiedBy || undefined,
    });
  }

  return legacy.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}
