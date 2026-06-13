export type InsuranceStatus =
  | "pending"
  | "active"
  | "inactive"
  | "unknown"
  | "error";

export const INSURANCE_STATUSES: InsuranceStatus[] = [
  "pending",
  "active",
  "inactive",
  "unknown",
  "error",
];

type StaffVerificationStatus =
  | "Pending Staff Review"
  | "Active"
  | "Inactive"
  | "Unable To Verify";

export function getInsuranceStatusLabel(status: InsuranceStatus): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "active":
      return "Active";
    case "inactive":
      return "Inactive";
    case "error":
      return "Unable to Verify";
    case "unknown":
    default:
      return "Unknown";
  }
}

export function getInsuranceStatusMessage(status: InsuranceStatus): string {
  switch (status) {
    case "pending":
      return "Your insurance verification is still being reviewed by Eden.";
    case "active":
      return "Your insurance is currently marked as active in Eden's records.";
    case "inactive":
      return "Your insurance is currently marked as inactive or not eligible in Eden's records.";
    case "error":
      return "Eden could not complete the insurance verification. Please contact the office.";
    case "unknown":
    default:
      return "No insurance status has been recorded yet.";
  }
}

export function mapVerificationStatusToInsuranceStatus(
  status: StaffVerificationStatus,
): InsuranceStatus {
  switch (status) {
    case "Active":
      return "active";
    case "Inactive":
      return "inactive";
    case "Unable To Verify":
      return "error";
    case "Pending Staff Review":
    default:
      return "pending";
  }
}

export function resolveInsuranceStatus(record: {
  insuranceStatus?: InsuranceStatus | null;
  status?: StaffVerificationStatus;
}): InsuranceStatus {
  if (record.insuranceStatus && INSURANCE_STATUSES.includes(record.insuranceStatus)) {
    return record.insuranceStatus;
  }

  if (record.status) {
    return mapVerificationStatusToInsuranceStatus(record.status);
  }

  return "pending";
}
