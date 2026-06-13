import { logProviderError } from "@/lib/insurance/providers/logging";
import {
  buildPendingEligibilityResult,
  MANUAL_PENDING_NOTES,
} from "@/lib/insurance/providers/ManualVerificationProvider";
import { isLiveVerificationEnabled } from "@/lib/insurance/providers/clearinghouse/client";
import type {
  EligibilityResult,
  InsuranceVerificationProvider,
  VerificationMemberInput,
} from "@/lib/insurance/providers/types";

const NOT_CONFIGURED_MESSAGE = "Provider not configured";

function isMesConfigured() {
  return Boolean(
    process.env.MES_PROVIDER_API_URL?.trim() &&
      process.env.MES_PROVIDER_CLIENT_ID?.trim() &&
      process.env.MES_PROVIDER_CLIENT_SECRET?.trim(),
  );
}

export class MesProviderVerificationProvider implements InsuranceVerificationProvider {
  readonly name = "mes_provider_api";

  async verifyMember(input: VerificationMemberInput): Promise<EligibilityResult> {
    if (!isMesConfigured()) {
      return buildPendingEligibilityResult(
        input,
        MANUAL_PENDING_NOTES,
        false,
        NOT_CONFIGURED_MESSAGE,
      );
    }

    if (!isLiveVerificationEnabled()) {
      return buildPendingEligibilityResult(input);
    }

    await logProviderError(
      "mes_provider_api",
      "MES Provider API integration is not implemented — awaiting Virginia Medicaid API contract",
      { memberName: input.fullName },
    );

    return buildPendingEligibilityResult(
      input,
      "MES Provider API credentials are configured but the integration is not yet implemented. Eden ABA staff must complete verification manually.",
      true,
      "MES Provider API integration pending",
    );
  }
}
