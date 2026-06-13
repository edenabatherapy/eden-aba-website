import type { LiveEligibilityInternalStatus } from "@/lib/insurance/eligibility/types";

export type ParsedVendorEligibility = {
  status: LiveEligibilityInternalStatus;
  planName?: string | null;
  effectiveDate?: string | null;
  programType?: string | null;
  subprogramType?: string | null;
  referenceId?: string;
};

export type AvailityRequestPhase = "polling" | "complete" | "error";

function readStatusString(value: unknown): string {
  if (typeof value === "string") return value.trim().toLowerCase();
  if (typeof value === "boolean") return value ? "active" : "inactive";
  return "";
}

function collectStatusCandidates(data: Record<string, unknown>): string[] {
  const candidates: string[] = [];

  const direct = readStatusString(data.status ?? data.eligibilityStatus);
  if (direct) candidates.push(direct);

  const coverage = data.coverage;
  if (coverage && typeof coverage === "object") {
    const cov = coverage as Record<string, unknown>;
    const covStatus = readStatusString(cov.status ?? cov.eligibilityStatus);
    if (covStatus) candidates.push(covStatus);
  }

  const member = data.member;
  if (member && typeof member === "object") {
    const mem = member as Record<string, unknown>;
    const memStatus = readStatusString(mem.status ?? mem.eligibilityStatus);
    if (memStatus) candidates.push(memStatus);
  }

  const benefits = data.benefits;
  if (Array.isArray(benefits) && benefits[0] && typeof benefits[0] === "object") {
    const benefit = benefits[0] as Record<string, unknown>;
    const benefitStatus = readStatusString(benefit.status ?? benefit.eligibilityStatus);
    if (benefitStatus) candidates.push(benefitStatus);
  }

  return candidates;
}

export function mapVendorStatus(raw: string): LiveEligibilityInternalStatus {
  const status = raw.toLowerCase();

  if (
    status.includes("active") ||
    status === "eligible" ||
    status === "verified" ||
    status === "1"
  ) {
    if (status.includes("inactive")) return "inactive";
    return "active";
  }

  if (
    status.includes("inactive") ||
    status.includes("ineligible") ||
    status.includes("not eligible") ||
    status === "0" ||
    status === "6"
  ) {
    return "inactive";
  }

  if (status.includes("pending") || status.includes("staff review") || status.includes("progress")) {
    return "pending";
  }

  if (
    status.includes("not found") ||
    status.includes("not_found") ||
    status.includes("unknown")
  ) {
    return "unknown";
  }

  return "unknown";
}

function mapAvailityPlanStatusCode(code: string): LiveEligibilityInternalStatus | null {
  const normalized = code.trim().toUpperCase();
  if (normalized === "1" || normalized === "I") return "active";
  if (normalized === "6") return "inactive";
  if (normalized === "V") return "unknown";
  return null;
}

function hasMemberNotFoundMessage(coverage: Record<string, unknown>): boolean {
  const messages = coverage.validationMessages;
  if (!Array.isArray(messages)) return false;

  return messages.some((entry) => {
    if (!entry || typeof entry !== "object") return false;
    const record = entry as Record<string, unknown>;
    const field = String(record.field || "").toLowerCase();
    const message = String(record.errorMessage || record.message || "").toLowerCase();
    return (
      field.includes("member") ||
      field.includes("patient") ||
      message.includes("not found") ||
      message.includes("no match") ||
      message.includes("invalid member")
    );
  });
}

function parsePlanEligibility(
  plan: Record<string, unknown>,
  asOfDate?: string,
): LiveEligibilityInternalStatus {
  const statusCode = plan.statusCode ? String(plan.statusCode) : "";
  if (statusCode) {
    const mapped = mapAvailityPlanStatusCode(statusCode);
    if (mapped) return mapped;
  }

  const statusRaw = plan.status ? String(plan.status) : "";
  if (statusRaw) return mapVendorStatus(statusRaw);

  const endDate = plan.eligibilityEndDate ? String(plan.eligibilityEndDate) : "";
  if (endDate && asOfDate) {
    const endMs = Date.parse(endDate);
    const asOfMs = Date.parse(asOfDate);
    if (!Number.isNaN(endMs) && !Number.isNaN(asOfMs) && endMs < asOfMs) {
      return "inactive";
    }
  }

  return "unknown";
}

export function mapAvailityRequestStatus(
  statusCode: unknown,
  status: unknown,
): AvailityRequestPhase {
  const code = String(statusCode ?? "").trim();
  const label = String(status ?? "").trim().toLowerCase();

  if (code === "0" || label.includes("in progress") || code === "R1") {
    return "polling";
  }

  if (code === "4" || code === "3" || label.includes("complete")) {
    return "complete";
  }

  if (
    code === "19" ||
    code === "7" ||
    code === "13" ||
    code === "14" ||
    code === "15" ||
    label.includes("communication error") ||
    label.includes("request error")
  ) {
    return "error";
  }

  if (label.includes("progress")) return "polling";

  return "error";
}

export function normalizeAvailityCoveragePayload(data: unknown): Record<string, unknown> | null {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;
  if (record.id && (record.statusCode !== undefined || record.status !== undefined)) {
    return record;
  }

  const coverages = record.coverages;
  if (Array.isArray(coverages) && coverages[0] && typeof coverages[0] === "object") {
    return coverages[0] as Record<string, unknown>;
  }

  return null;
}

export function parseAvailityCoverageResponse(
  coverage: Record<string, unknown>,
): ParsedVendorEligibility | null {
  if (hasMemberNotFoundMessage(coverage)) {
    return {
      status: "unknown",
      referenceId: coverage.id ? String(coverage.id) : undefined,
    };
  }

  const asOfDate = coverage.asOfDate ? String(coverage.asOfDate) : undefined;
  const plans = coverage.plans;

  if (!Array.isArray(plans) || plans.length === 0) {
    const requestPhase = mapAvailityRequestStatus(coverage.statusCode, coverage.status);
    if (requestPhase === "complete") {
      return {
        status: "unknown",
        referenceId: coverage.id ? String(coverage.id) : undefined,
      };
    }
    return null;
  }

  const primaryPlan =
    plans.find(
      (plan) =>
        plan &&
        typeof plan === "object" &&
        (plan as Record<string, unknown>).primary === true,
    ) || plans[0];

  if (!primaryPlan || typeof primaryPlan !== "object") return null;

  const planRecord = primaryPlan as Record<string, unknown>;
  const status = parsePlanEligibility(planRecord, asOfDate);

  return {
    status,
    planName: planRecord.groupName
      ? String(planRecord.groupName)
      : planRecord.description
        ? String(planRecord.description)
        : null,
    effectiveDate: planRecord.eligibilityStartDate
      ? String(planRecord.eligibilityStartDate)
      : planRecord.coverageStartDate
        ? String(planRecord.coverageStartDate)
        : null,
    programType: planRecord.insuranceType ? String(planRecord.insuranceType) : null,
    subprogramType: planRecord.insuranceTypeCode ? String(planRecord.insuranceTypeCode) : null,
    referenceId: coverage.id ? String(coverage.id) : undefined,
  };
}

export function parseVendorEligibilityResponse(data: unknown): ParsedVendorEligibility | null {
  if (!data || typeof data !== "object") return null;

  const availityCoverage = normalizeAvailityCoveragePayload(data);
  if (availityCoverage) {
    const requestPhase = mapAvailityRequestStatus(
      availityCoverage.statusCode,
      availityCoverage.status,
    );
    if (requestPhase === "complete") {
      return parseAvailityCoverageResponse(availityCoverage);
    }
  }

  const record = data as Record<string, unknown>;
  const candidates = collectStatusCandidates(record);
  if (candidates.length === 0) return null;

  const status = mapVendorStatus(candidates[0]);

  return {
    status,
    planName: record.planName ? String(record.planName) : null,
    effectiveDate: record.effectiveDate ? String(record.effectiveDate) : null,
    programType: record.programType ? String(record.programType) : null,
    subprogramType: record.subprogramType ? String(record.subprogramType) : null,
    referenceId: record.referenceId
      ? String(record.referenceId)
      : record.transactionId
        ? String(record.transactionId)
        : undefined,
  };
}

export function liveStatusLabel(status: LiveEligibilityInternalStatus): string {
  switch (status) {
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "pending":
      return "Pending";
    case "error":
      return "Unable to Verify";
    case "unknown":
    default:
      return "Unknown";
  }
}

export function liveStatusMessage(status: LiveEligibilityInternalStatus): string {
  switch (status) {
    case "active":
      return "Live eligibility check shows this insurance is active.";
    case "inactive":
      return "Live eligibility check shows this insurance is inactive or not eligible.";
    case "pending":
      return "Live eligibility check returned a pending status.";
    case "error":
      return "We could not complete the live insurance check. Please contact Eden.";
    case "unknown":
    default:
      return "Live eligibility check completed, but the status could not be clearly determined.";
  }
}
