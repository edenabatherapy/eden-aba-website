import {
  getEligibilityConfig,
  isEligibilityApiConfigured,
  isLiveVerificationEnabled,
} from "@/lib/insurance/eligibility/config";
import { createLiveEligibilityAdapter } from "@/lib/insurance/eligibility/adapters/restAdapter";
import {
  buildLiveEligibilityRequestFromMemberInput,
  resolvePatientState,
  splitClientName,
} from "@/lib/insurance/eligibility/buildLiveEligibilityInput";
import { resolvePayerId } from "@/lib/insurance/eligibility/payerIds";

export type ClearinghouseEligibilityPayload = {
  memberName: string;
  dateOfBirth: string;
  medicaidId?: string;
  ssn?: string;
  zipCode?: string;
  payerName?: string;
};

export type ClearinghouseConfig = {
  apiUrl: string;
  apiKey: string;
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
};

export type ClearinghouseClientResult =
  | { ok: true; data: unknown }
  | { ok: false; error: string; statusCode?: number };

export function getClearinghouseConfig(): ClearinghouseConfig | null {
  const config = getEligibilityConfig();
  if (!config) return null;

  if (config.kind === "availity") {
    const base = config.apiBaseUrl.replace(/\/$/, "");
    return {
      apiUrl: `${base}/availity/v1/coverages/`,
      apiKey: config.clientId,
      timeoutMs: config.requestTimeoutMs,
      maxRetries: Number(process.env.CLEARINGHOUSE_MAX_RETRIES || 3),
      retryDelayMs: Number(process.env.CLEARINGHOUSE_RETRY_DELAY_MS || 1_000),
    };
  }

  return {
    apiUrl: config.apiUrl,
    apiKey: config.apiKey,
    timeoutMs: config.timeoutMs,
    maxRetries: config.maxRetries,
    retryDelayMs: config.retryDelayMs,
  };
}

export function isClearinghouseConfigured(): boolean {
  return isEligibilityApiConfigured();
}

export { isLiveVerificationEnabled };

/** Delegates to unified REST eligibility adapter. */
export async function submitClearinghouseEligibilityInquiry(
  payload: ClearinghouseEligibilityPayload,
): Promise<ClearinghouseClientResult> {
  const config = getEligibilityConfig();
  if (!config) {
    return { ok: false, error: "Provider not configured" };
  }

  const request = buildLiveEligibilityRequestFromMemberInput({
    fullName: payload.memberName,
    dateOfBirth: payload.dateOfBirth,
    medicaidId: payload.medicaidId,
    ssn: payload.ssn,
    zipCode: payload.zipCode,
    insuranceProvider: payload.payerName,
    verificationType: "child",
  });

  const resolvedRequest =
    request ||
    (() => {
      const { firstName, lastName } = splitClientName(payload.memberName);
      const payerId = resolvePayerId(payload.payerName || "");
      if (!payerId || !firstName || !lastName) return null;
      return {
        payerId,
        payerName: payload.payerName,
        memberId: payload.medicaidId || payload.ssn || "",
        firstName,
        lastName,
        dob: payload.dateOfBirth,
        dateOfService: new Date().toISOString().slice(0, 10),
        zipCode: payload.zipCode,
        medicaidId: payload.medicaidId,
        ssn: payload.ssn,
        patientState: resolvePatientState(payload.zipCode),
        serviceType: "30",
      };
    })();

  if (!resolvedRequest) {
    return { ok: false, error: "Insufficient member data for eligibility inquiry" };
  }

  const adapter = createLiveEligibilityAdapter(config);
  const attempt = await adapter.check(resolvedRequest);

  if (!attempt.ok) {
    return { ok: false, error: attempt.errorReason || "Clearinghouse request failed" };
  }

  return {
    ok: true,
    data: {
      status: attempt.status,
      eligibilityStatus: attempt.statusLabel,
      planName: attempt.planName,
      effectiveDate: attempt.effectiveDate,
      programType: attempt.programType,
      subprogramType: attempt.subprogramType,
      referenceId: attempt.rawReferenceId,
    },
  };
}
