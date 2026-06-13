/** Portal + live API normalized status (error is internal — triggers stored fallback). */
export type LiveEligibilityStatus = "active" | "inactive" | "pending" | "unknown";

export type LiveEligibilityInternalStatus = LiveEligibilityStatus | "error";

export type EligibilityResultSource = "live_eligibility_api" | "stored_record";

export type LiveEligibilityRequest = {
  payerId: string;
  payerName?: string;
  memberId: string;
  firstName: string;
  lastName: string;
  /** YYYY-MM-DD */
  dob: string;
  /** YYYY-MM-DD */
  dateOfService: string;
  zipCode?: string;
  medicaidId?: string;
  ssn?: string;
  providerNpi?: string;
  /** US state code — required by Availity for many payers. */
  patientState?: string;
  /** ASC X12 service type code — default 30 (Health Benefit Plan Coverage). */
  serviceType?: string;
};

export type LiveEligibilityAttempt = {
  /** True when vendor returned a mappable eligibility status. */
  ok: boolean;
  status: LiveEligibilityInternalStatus;
  statusLabel: string;
  statusMessage: string;
  checkedAt: string;
  rawReferenceId?: string;
  planName?: string | null;
  effectiveDate?: string | null;
  programType?: string | null;
  subprogramType?: string | null;
  errorReason?: string;
};

export type PortalEligibilityResult = {
  status: LiveEligibilityStatus;
  statusLabel: string;
  statusMessage: string;
  live: boolean;
  source: EligibilityResultSource;
  checkedAt: string | null;
  rawReferenceId?: string;
  /** Set when live check was skipped or failed and stored status is shown instead. */
  fallbackReason?: string;
};

export type RestEligibilityVendor = "standard" | "clearinghouse_legacy";

export type RestEligibilityApiConfig = {
  kind: "rest";
  vendor: RestEligibilityVendor;
  apiUrl: string;
  apiKey: string;
  providerNpi: string | null;
  timeoutMs: number;
  maxRetries: number;
  retryDelayMs: number;
};

export type AvailityEligibilityConfig = {
  kind: "availity";
  vendor: "availity";
  clientId: string;
  clientSecret: string;
  tokenUrl: string;
  apiBaseUrl: string;
  providerNpi: string | null;
  scope: string | null;
  pollIntervalMs: number;
  pollMaxMs: number;
  requestTimeoutMs: number;
};

export type EligibilityConfig = RestEligibilityApiConfig | AvailityEligibilityConfig;

/** Vendor adapter contract for live eligibility HTTP integrations. */
export interface LiveEligibilityAdapter {
  readonly vendor: string;
  check(input: LiveEligibilityRequest): Promise<LiveEligibilityAttempt>;
}
