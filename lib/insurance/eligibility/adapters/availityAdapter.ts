import type { AvailityEligibilityConfig } from "@/lib/insurance/eligibility/types";
import {
  liveStatusLabel,
  liveStatusMessage,
  mapAvailityRequestStatus,
  normalizeAvailityCoveragePayload,
  parseAvailityCoverageResponse,
} from "@/lib/insurance/eligibility/mapResponse";
import type {
  LiveEligibilityAdapter,
  LiveEligibilityAttempt,
  LiveEligibilityRequest,
} from "@/lib/insurance/eligibility/types";

type TokenCache = {
  accessToken: string;
  expiresAt: number;
};

let tokenCache: TokenCache | null = null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function failureAttempt(checkedAt: string, reason: string): LiveEligibilityAttempt {
  return {
    ok: false,
    status: "error",
    statusLabel: liveStatusLabel("error"),
    statusMessage: liveStatusMessage("error"),
    checkedAt,
    errorReason: reason,
  };
}

function successAttempt(
  checkedAt: string,
  parsed: NonNullable<ReturnType<typeof parseAvailityCoverageResponse>>,
): LiveEligibilityAttempt {
  return {
    ok: true,
    status: parsed.status,
    statusLabel: liveStatusLabel(parsed.status),
    statusMessage: liveStatusMessage(parsed.status),
    checkedAt,
    rawReferenceId: parsed.referenceId,
    planName: parsed.planName,
    effectiveDate: parsed.effectiveDate,
    programType: parsed.programType,
    subprogramType: parsed.subprogramType,
  };
}

function coveragesUrl(config: AvailityEligibilityConfig): string {
  const base = config.apiBaseUrl.replace(/\/$/, "");
  return `${base}/availity/v1/coverages/`;
}

function coverageByIdUrl(config: AvailityEligibilityConfig, id: string): string {
  const base = config.apiBaseUrl.replace(/\/$/, "");
  return `${base}/availity/v1/coverages/${encodeURIComponent(id)}`;
}

function buildAvailityFormBody(
  config: AvailityEligibilityConfig,
  input: LiveEligibilityRequest,
): URLSearchParams {
  const params = new URLSearchParams();
  params.set("payerId", input.payerId);
  params.set("memberId", input.memberId);
  params.set("patientBirthDate", input.dob);
  params.set("patientFirstName", input.firstName);
  params.set("patientLastName", input.lastName);
  params.set("asOfDate", input.dateOfService);
  params.append("serviceType[]", input.serviceType || "30");

  const providerNpi = config.providerNpi || input.providerNpi;
  if (providerNpi) params.set("providerNpi", providerNpi);
  if (input.patientState) params.set("patientState", input.patientState);

  params.set("requestedPatientSearchOption", "memberId,patientBirthDate,patientState");
  return params;
}

async function fetchAccessToken(config: AvailityEligibilityConfig): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.accessToken;
  }

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });

  if (config.scope) {
    body.set("scope", config.scope);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.requestTimeoutMs);

  try {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Availity auth HTTP ${response.status}`);
    }

    const data = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
    };

    if (!data.access_token) {
      throw new Error("Availity auth response missing access_token");
    }

    const expiresInMs = (data.expires_in || 300) * 1000;
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + expiresInMs,
    };

    return data.access_token;
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Availity auth timed out");
    }
    throw error;
  }
}

async function fetchAccessTokenWithLogging(
  config: AvailityEligibilityConfig,
): Promise<string> {
  const token = await fetchAccessToken(config);
  if (process.env.NODE_ENV === "development") {
    console.log("Availity OAuth success");
  }
  return token;
}

async function availityFetch(
  url: string,
  config: AvailityEligibilityConfig,
  token: string,
  init: RequestInit,
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.requestTimeoutMs);

  try {
    const response = await fetch(url, {
      ...init,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Eligibility request timed out");
    }
    throw error;
  }
}

async function submitCoverage(
  config: AvailityEligibilityConfig,
  token: string,
  input: LiveEligibilityRequest,
): Promise<Record<string, unknown>> {
  const response = await availityFetch(coveragesUrl(config), config, token, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: buildAvailityFormBody(config, input).toString(),
  });

  if (!response.ok) {
    if (response.status === 400) {
      throw new Error("Invalid payer or coverage request");
    }
    throw new Error(`Eligibility HTTP ${response.status}`);
  }

  const data = await response.json();
  const coverage = normalizeAvailityCoveragePayload(data);
  if (!coverage?.id) {
    throw new Error("Unrecognized eligibility response shape");
  }

  return coverage;
}

async function fetchCoverageById(
  config: AvailityEligibilityConfig,
  token: string,
  id: string,
): Promise<Record<string, unknown>> {
  const response = await availityFetch(coverageByIdUrl(config, id), config, token, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Eligibility HTTP ${response.status}`);
  }

  const data = await response.json();
  const coverage = normalizeAvailityCoveragePayload(data);
  if (!coverage) {
    throw new Error("Unrecognized eligibility response shape");
  }

  return coverage;
}

function resolveCompletedCoverage(
  coverage: Record<string, unknown>,
): LiveEligibilityAttempt | null {
  const parsed = parseAvailityCoverageResponse(coverage);
  if (!parsed) return null;
  return successAttempt(new Date().toISOString(), parsed);
}

export class AvailityLiveEligibilityAdapter implements LiveEligibilityAdapter {
  readonly vendor = "availity";

  constructor(private readonly config: AvailityEligibilityConfig) {}

  async check(input: LiveEligibilityRequest): Promise<LiveEligibilityAttempt> {
    const checkedAt = new Date().toISOString();

    try {
      const token = await fetchAccessTokenWithLogging(this.config);
      let coverage = await submitCoverage(this.config, token, input);
      const coverageId = String(coverage.id);

      if (process.env.NODE_ENV === "development") {
        console.log("Availity coverage request submitted", { coverageId });
      }

      const pollStarted = Date.now();

      while (true) {
        const phase = mapAvailityRequestStatus(coverage.statusCode, coverage.status);

        if (phase === "complete") {
          const result = resolveCompletedCoverage(coverage);
          if (process.env.NODE_ENV === "development") {
            console.log("Availity coverage complete", {
              coverageId,
              status: result?.status ?? "unmapped",
            });
          }
          if (result) return { ...result, checkedAt };
          return failureAttempt(checkedAt, "Unrecognized eligibility response shape");
        }

        if (phase === "error") {
          const payerFieldError = Array.isArray(coverage.validationMessages)
            ? coverage.validationMessages.some(
                (entry) =>
                  entry &&
                  typeof entry === "object" &&
                  String((entry as Record<string, unknown>).field || "")
                    .toLowerCase()
                    .includes("payer"),
              )
            : false;
          return failureAttempt(
            checkedAt,
            payerFieldError ? "Invalid payer" : "Availity coverage request failed",
          );
        }

        if (Date.now() - pollStarted >= this.config.pollMaxMs) {
          return failureAttempt(checkedAt, "Eligibility request timed out");
        }

        await sleep(this.config.pollIntervalMs);
        coverage = await fetchCoverageById(this.config, token, coverageId);
      }
    } catch (error) {
      const reason =
        error instanceof Error ? error.message : "Eligibility request failed";
      if (reason.toLowerCase().includes("auth")) {
        return failureAttempt(checkedAt, "Availity auth failed");
      }
      return failureAttempt(checkedAt, reason);
    }
  }
}
