import type {
  AvailityEligibilityConfig,
  EligibilityConfig,
  RestEligibilityApiConfig,
  RestEligibilityVendor,
} from "@/lib/insurance/eligibility/types";

export type { AvailityEligibilityConfig, EligibilityConfig, RestEligibilityApiConfig };

/** @deprecated Use RestEligibilityApiConfig via getEligibilityApiConfig(). */
export type EligibilityApiConfig = RestEligibilityApiConfig;

const DEFAULT_TIMEOUT_MS = Number(process.env.CLEARINGHOUSE_TIMEOUT_MS || 30_000);
const DEFAULT_MAX_RETRIES = Number(process.env.CLEARINGHOUSE_MAX_RETRIES || 3);
const DEFAULT_RETRY_DELAY_MS = Number(process.env.CLEARINGHOUSE_RETRY_DELAY_MS || 1_000);

const DEFAULT_AVAILITY_TOKEN_URL = "https://api.availity.com/v1/token";
const DEFAULT_AVAILITY_API_BASE_URL = "https://api.availity.com";
const DEFAULT_AVAILITY_POLL_INTERVAL_MS = Number(
  process.env.ELIGIBILITY_AVAILITY_POLL_INTERVAL_MS || 1_500,
);
const DEFAULT_AVAILITY_POLL_MAX_MS = Number(
  process.env.ELIGIBILITY_AVAILITY_POLL_MAX_MS || 25_000,
);

function readVendor(): RestEligibilityVendor | "availity" {
  const raw = process.env.ELIGIBILITY_VENDOR?.trim().toLowerCase();
  if (raw === "availity") return "availity";
  if (raw === "clearinghouse_legacy") return "clearinghouse_legacy";
  return "standard";
}

function getAvailityConfig(): AvailityEligibilityConfig | null {
  const clientId =
    process.env.ELIGIBILITY_API_CLIENT_ID?.trim() ||
    process.env.ELIGIBILITY_API_KEY?.trim() ||
    "";
  const clientSecret =
    process.env.ELIGIBILITY_API_CLIENT_SECRET?.trim() ||
    process.env.ELIGIBILITY_API_SECRET?.trim() ||
    "";

  if (!clientId || !clientSecret) return null;

  return {
    kind: "availity",
    vendor: "availity",
    clientId,
    clientSecret,
    tokenUrl: process.env.ELIGIBILITY_TOKEN_URL?.trim() || DEFAULT_AVAILITY_TOKEN_URL,
    apiBaseUrl: process.env.ELIGIBILITY_API_BASE_URL?.trim() || DEFAULT_AVAILITY_API_BASE_URL,
    providerNpi: process.env.ELIGIBILITY_PROVIDER_NPI?.trim() || null,
    scope: process.env.ELIGIBILITY_AVAILITY_SCOPE?.trim() || null,
    pollIntervalMs: DEFAULT_AVAILITY_POLL_INTERVAL_MS,
    pollMaxMs: DEFAULT_AVAILITY_POLL_MAX_MS,
    requestTimeoutMs: DEFAULT_TIMEOUT_MS,
  };
}

function getRestConfig(vendor: RestEligibilityVendor): RestEligibilityApiConfig | null {
  const apiUrl =
    process.env.ELIGIBILITY_API_URL?.trim() ||
    process.env.CLEARINGHOUSE_API_URL?.trim() ||
    "";
  const apiKey =
    process.env.ELIGIBILITY_API_KEY?.trim() ||
    process.env.CLEARINGHOUSE_API_KEY?.trim() ||
    "";

  if (!apiUrl || !apiKey) return null;

  return {
    kind: "rest",
    vendor,
    apiUrl,
    apiKey,
    providerNpi: process.env.ELIGIBILITY_PROVIDER_NPI?.trim() || null,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    maxRetries: DEFAULT_MAX_RETRIES,
    retryDelayMs: DEFAULT_RETRY_DELAY_MS,
  };
}

export function getEligibilityConfig(): EligibilityConfig | null {
  const vendor = readVendor();
  if (vendor === "availity") {
    return getAvailityConfig();
  }
  return getRestConfig(vendor);
}

/** REST-only config — null when Availity mode is active. */
export function getEligibilityApiConfig(): RestEligibilityApiConfig | null {
  const config = getEligibilityConfig();
  if (!config || config.kind !== "rest") return null;
  return config;
}

export function isEligibilityApiConfigured(): boolean {
  return getEligibilityConfig() !== null;
}

/** Form submission path — gated by master live switch. */
export function isLiveVerificationEnabled(): boolean {
  return process.env.MEDICAID_LIVE_VERIFICATION_ENABLED === "true";
}

/** Portal may attempt live when API credentials exist unless explicitly disabled. */
export function isPortalLiveEligibilityEnabled(): boolean {
  if (process.env.ELIGIBILITY_PORTAL_LIVE_ENABLED === "false") return false;
  return isEligibilityApiConfigured();
}
