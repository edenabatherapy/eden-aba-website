import { randomUUID } from "crypto";
import type { ActivityLogEntry, ActivityLogType } from "@/lib/insurance/db/model";

export function createActivityEntry(params: {
  type: ActivityLogType;
  description: string;
  staffName?: string;
  previousStatus?: string;
  newStatus?: string;
}): ActivityLogEntry {
  return {
    id: randomUUID(),
    type: params.type,
    timestamp: new Date().toISOString(),
    description: params.description,
    ...(params.staffName ? { staffName: params.staffName } : {}),
    ...(params.previousStatus ? { previousStatus: params.previousStatus } : {}),
    ...(params.newStatus ? { newStatus: params.newStatus } : {}),
  };
}

export function appendActivity(
  existing: ActivityLogEntry[] | undefined,
  entry: ActivityLogEntry,
): ActivityLogEntry[] {
  return [...(existing || []), entry];
}
