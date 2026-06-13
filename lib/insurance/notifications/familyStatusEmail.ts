import { notifyFamilyStatusChange } from "@/lib/insurance/notifications";
import {
  getVerificationRecord,
  markFamilyEmailSent,
} from "@/lib/insurance/db/repository";

function getPortalUrl(requestId: string, origin?: string): string {
  const base =
    origin ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.INSURANCE_PORTAL_BASE_URL?.trim() ||
    "http://localhost:3000";
  return `${base.replace(/\/$/, "")}/insurance/status?ref=${encodeURIComponent(requestId)}`;
}

function getMemberFirstName(clientName: string): string | undefined {
  const first = clientName.trim().split(/\s+/)[0];
  return first || undefined;
}

/** Send family email when staff moves Pending → Active or Unable To Verify. */
export async function sendFamilyStatusEmail(params: {
  requestId: string;
  previousStatus: string;
  newStatus: string;
  origin?: string;
}): Promise<void> {
  if (params.previousStatus !== "Pending Staff Review") return;
  if (params.newStatus !== "Active" && params.newStatus !== "Unable To Verify") return;

  const record = await getVerificationRecord(params.requestId);
  if (!record) return;

  const emailKind =
    params.newStatus === "Active" ? "coverageActive" : "unableToVerify";

  if (record.familyEmailsSent?.[emailKind]) return;

  void notifyFamilyStatusChange({
    requestId: params.requestId,
    recipientEmail: record.email,
    memberFirstName: getMemberFirstName(record.clientName),
    previousStatus: params.previousStatus,
    newStatus: params.newStatus,
    portalUrl: getPortalUrl(params.requestId, params.origin),
  }).then(async (result) => {
    const sent = result.results.some((entry) => entry.sent);
    if (sent) {
      await markFamilyEmailSent(params.requestId, emailKind);
    }
  });
}
