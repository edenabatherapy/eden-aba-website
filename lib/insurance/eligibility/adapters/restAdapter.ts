import type { EligibilityConfig, RestEligibilityApiConfig } from "@/lib/insurance/eligibility/config";
import { AvailityLiveEligibilityAdapter } from "@/lib/insurance/eligibility/adapters/availityAdapter";
import {
  liveStatusLabel,
  liveStatusMessage,
  parseVendorEligibilityResponse,
} from "@/lib/insurance/eligibility/mapResponse";
import type {
  LiveEligibilityAdapter,
  LiveEligibilityAttempt,
  LiveEligibilityRequest,
} from "@/lib/insurance/eligibility/types";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildRequestBody(
  config: RestEligibilityApiConfig,
  input: LiveEligibilityRequest,
): Record<string, unknown> {
  if (config.vendor === "clearinghouse_legacy") {
    return {
      member: {
        name: `${input.firstName} ${input.lastName}`.trim(),
        dateOfBirth: input.dob,
        medicaidId: input.medicaidId || input.memberId,
        ssn: input.ssn,
        zipCode: input.zipCode,
      },
      payer: input.payerName || input.payerId,
      providerNpi: config.providerNpi || input.providerNpi,
      dateOfService: input.dateOfService,
    };
  }

  return {
    payerId: input.payerId,
    payerName: input.payerName,
    memberId: input.memberId,
    firstName: input.firstName,
    lastName: input.lastName,
    dob: input.dob,
    dateOfService: input.dateOfService,
    zipCode: input.zipCode,
    medicaidId: input.medicaidId || input.memberId,
    providerNpi: config.providerNpi || input.providerNpi,
  };
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

export class RestLiveEligibilityAdapter implements LiveEligibilityAdapter {
  readonly vendor: string;

  constructor(private readonly config: RestEligibilityApiConfig) {
    this.vendor = config.vendor;
  }

  async check(input: LiveEligibilityRequest): Promise<LiveEligibilityAttempt> {
    const checkedAt = new Date().toISOString();
    let lastError = "Eligibility request failed";

    for (let attempt = 1; attempt <= this.config.maxRetries; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);

      try {
        const response = await fetch(this.config.apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.config.apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(buildRequestBody(this.config, input)),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
          lastError = `Eligibility HTTP ${response.status}`;
          if (response.status >= 500 && attempt < this.config.maxRetries) {
            await sleep(this.config.retryDelayMs * attempt);
            continue;
          }
          return failureAttempt(checkedAt, lastError);
        }

        let data: unknown;
        try {
          data = await response.json();
        } catch {
          return failureAttempt(checkedAt, "Invalid eligibility response JSON");
        }

        const parsed = parseVendorEligibilityResponse(data);
        if (!parsed) {
          return failureAttempt(checkedAt, "Unrecognized eligibility response shape");
        }

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
      } catch (error) {
        clearTimeout(timeout);
        lastError =
          error instanceof Error && error.name === "AbortError"
            ? "Eligibility request timed out"
            : error instanceof Error
              ? error.message
              : "Eligibility request failed";

        if (attempt < this.config.maxRetries) {
          await sleep(this.config.retryDelayMs * attempt);
          continue;
        }
      }
    }

    return failureAttempt(checkedAt, lastError);
  }
}

export function createLiveEligibilityAdapter(
  config: EligibilityConfig,
): LiveEligibilityAdapter {
  if (config.kind === "availity") {
    if (process.env.NODE_ENV === "development") {
      console.log("Eligibility adapter selected", { vendor: "availity" });
    }
    return new AvailityLiveEligibilityAdapter(config);
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Eligibility adapter selected", { vendor: config.vendor });
  }

  return new RestLiveEligibilityAdapter(config);
}
