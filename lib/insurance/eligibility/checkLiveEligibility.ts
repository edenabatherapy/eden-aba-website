import type { LiveEligibilityRequest } from "@/lib/insurance/eligibility/types";

export type {
  LiveEligibilityStatus,
  LiveEligibilityRequest,
  PortalEligibilityResult,
} from "@/lib/insurance/eligibility/types";

/** @deprecated Use LiveEligibilityRequest */
export type LiveEligibilityInput = LiveEligibilityRequest;

export { runLiveEligibilityCheck as checkLiveEligibility } from "@/lib/insurance/eligibility/liveEligibilityService";

export {
  resolvePortalEligibility,
  runLiveEligibilityCheck,
} from "@/lib/insurance/eligibility/liveEligibilityService";
