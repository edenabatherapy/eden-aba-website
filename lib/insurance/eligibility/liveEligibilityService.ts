import { buildLiveEligibilityRequestFromRecord } from "@/lib/insurance/eligibility/buildLiveEligibilityInput";
import { createLiveEligibilityAdapter } from "@/lib/insurance/eligibility/adapters/restAdapter";
import {
  getEligibilityConfig,
  isEligibilityApiConfigured,
  isLiveVerificationEnabled,
  isPortalLiveEligibilityEnabled,
} from "@/lib/insurance/eligibility/config";
import { liveStatusLabel, liveStatusMessage } from "@/lib/insurance/eligibility/mapResponse";
import {
  getInsuranceStatusLabel,
  getInsuranceStatusMessage,
  resolveInsuranceStatus,
  type InsuranceStatus,
} from "@/lib/insurance/portal/status";
import type { InsuranceVerificationRecord } from "@/lib/insurance/db/model";
import type {
  LiveEligibilityAttempt,
  LiveEligibilityRequest,
  LiveEligibilityStatus,
  PortalEligibilityResult,
} from "@/lib/insurance/eligibility/types";

function toPortalStatus(status: InsuranceStatus): LiveEligibilityStatus {
  if (status === "error") return "unknown";
  return status;
}

function storedPortalResult(
  record: InsuranceVerificationRecord,
  reason: string,
): PortalEligibilityResult {
  if (process.env.NODE_ENV === "development") {
    console.log("Portal eligibility fallback", {
      requestId: record.id,
      reason,
      source: "stored_record",
    });
  }

  const stored = resolveInsuranceStatus(record);
  const portalStatus = toPortalStatus(stored);

  return {
    status: portalStatus,
    statusLabel: getInsuranceStatusLabel(portalStatus),
    statusMessage: getInsuranceStatusMessage(stored),
    live: false,
    source: "stored_record",
    checkedAt: null,
    fallbackReason: reason,
  };
}

export async function runLiveEligibilityCheck(
  input: LiveEligibilityRequest,
  requestId?: string,
): Promise<LiveEligibilityAttempt> {
  const checkedAt = new Date().toISOString();
  const config = getEligibilityConfig();

  if (!config) {
    if (process.env.NODE_ENV === "development") {
      console.log("Starting live eligibility", {
        vendor: "none",
        requestId,
        configured: false,
      });
    }
    return {
      ok: false,
      status: "error",
      statusLabel: liveStatusLabel("error"),
      statusMessage: liveStatusMessage("error"),
      checkedAt,
      errorReason: "Eligibility API not configured",
    };
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Starting live eligibility", {
      vendor: config.vendor,
      requestId,
    });
  }

  const adapter = createLiveEligibilityAdapter(config);
  const attempt = await adapter.check(input);

  if (process.env.NODE_ENV === "development") {
    console.log("Live eligibility attempt finished", {
      vendor: config.vendor,
      requestId,
      ok: attempt.ok,
      status: attempt.status,
      errorReason: attempt.errorReason,
    });
  }

  return attempt;
}

export async function resolvePortalEligibility(
  record: InsuranceVerificationRecord,
): Promise<PortalEligibilityResult> {
  if (!isPortalLiveEligibilityEnabled()) {
    return storedPortalResult(record, "portal_live_disabled_or_not_configured");
  }

  const request = buildLiveEligibilityRequestFromRecord(record);
  if (!request) {
    return storedPortalResult(record, "missing_member_data_or_medicaid_id");
  }

  const attempt = await runLiveEligibilityCheck(request, record.id);
  if (!attempt.ok || attempt.status === "error") {
    return storedPortalResult(
      record,
      attempt.errorReason || "live_eligibility_attempt_failed",
    );
  }

  const result: PortalEligibilityResult = {
    status: attempt.status as LiveEligibilityStatus,
    statusLabel: attempt.statusLabel,
    statusMessage: attempt.statusMessage,
    live: true,
    source: "live_eligibility_api",
    checkedAt: attempt.checkedAt,
    rawReferenceId: attempt.rawReferenceId,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("Portal eligibility result", {
      live: result.live,
      source: result.source,
      status: result.status,
      requestId: record.id,
    });
  }

  return result;
}

export async function resolveFormLiveEligibility(
  input: LiveEligibilityRequest,
): Promise<LiveEligibilityAttempt | null> {
  if (!isLiveVerificationEnabled() || !isEligibilityApiConfigured()) {
    return null;
  }

  return runLiveEligibilityCheck(input);
}

export { isEligibilityApiConfigured, isLiveVerificationEnabled, isPortalLiveEligibilityEnabled };
