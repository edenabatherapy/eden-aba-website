import type { InsuranceVerificationRecord, VerificationStatus } from "@/lib/insurance/db/model";

export type FamilyTimelineStepKey =
  | "request_submitted"
  | "pending_staff_review"
  | "under_review"
  | "verification_complete"
  | "intake_scheduling_ready";

export type FamilyTimelineStep = {
  key: FamilyTimelineStepKey;
  label: string;
  state: "complete" | "current" | "upcoming";
  timestamp: string | null;
};

function isTerminalStatus(status: VerificationStatus): boolean {
  return status === "Active" || status === "Inactive" || status === "Unable To Verify";
}

function staffReviewProgress(record: InsuranceVerificationRecord) {
  const internal = record.staffReview?.internalStatus;
  return {
    inReview: internal === "in_review" || internal === "missing_information",
    verified: internal === "verified" || record.status === "Active",
    unableToVerify: internal === "unable_to_verify" || record.status === "Unable To Verify",
    intakeReady: record.status === "Active",
  };
}

/** Build the family-facing progress timeline with timestamps. */
export function buildFamilyStatusTimeline(
  record: InsuranceVerificationRecord,
): FamilyTimelineStep[] {
  const submittedAt = record.submittedAt;
  const portalSubmittedAt = record.familyPortalSubmittedAt ?? null;
  const verifiedAt = record.verifiedAt;
  const intakeReadyAt =
    record.intakeReadyAt || (record.status === "Active" ? verifiedAt : null);

  const terminal = isTerminalStatus(record.status);
  const active = record.status === "Active";
  const progress = staffReviewProgress(record);

  if (!portalSubmittedAt) {
    const steps: FamilyTimelineStep[] = [
      {
        key: "request_submitted",
        label: "Request Submitted",
        state: "complete",
        timestamp: submittedAt,
      },
      {
        key: "under_review",
        label: "Under Review",
        state: terminal ? "complete" : "current",
        timestamp: terminal ? verifiedAt || record.updatedAt : null,
      },
      {
        key: "verification_complete",
        label: "Verification Complete",
        state: terminal ? "complete" : "upcoming",
        timestamp: terminal ? verifiedAt || record.updatedAt : null,
      },
      {
        key: "intake_scheduling_ready",
        label: "Intake Ready",
        state: active ? "complete" : "upcoming",
        timestamp: active ? intakeReadyAt : null,
      },
    ];

    if (active) {
      steps[1].state = "complete";
      steps[2].state = "complete";
      steps[3].state = "complete";
    } else if (terminal && !active) {
      steps[1].state = "complete";
      steps[2].state = "complete";
    }

    return steps;
  }

  const steps: FamilyTimelineStep[] = [
    {
      key: "request_submitted",
      label: "Request Submitted",
      state: "complete",
      timestamp: submittedAt,
    },
    {
      key: "pending_staff_review",
      label: "Pending Staff Review",
      state: "complete",
      timestamp: portalSubmittedAt,
    },
    {
      key: "under_review",
      label: "Under Review",
      state: "upcoming",
      timestamp: null,
    },
    {
      key: "verification_complete",
      label: "Verification Complete",
      state: "upcoming",
      timestamp: null,
    },
    {
      key: "intake_scheduling_ready",
      label: "Intake Ready",
      state: "upcoming",
      timestamp: null,
    },
  ];

  if (progress.inReview && !progress.verified && !progress.unableToVerify) {
    steps[2].state = "current";
    steps[2].timestamp = record.staffReview?.reviewedAt || portalSubmittedAt;
  } else if (!progress.verified && !progress.unableToVerify && !active) {
    steps[2].state = "current";
    steps[2].timestamp = portalSubmittedAt;
  }

  if (progress.verified || progress.unableToVerify || active) {
    steps[2].state = "complete";
    steps[2].timestamp =
      record.staffReview?.reviewedAt || verifiedAt || record.updatedAt;
  }

  if (progress.verified || progress.unableToVerify || active) {
    steps[3].state = "complete";
    steps[3].timestamp = verifiedAt || record.updatedAt;
  } else if (progress.inReview) {
    steps[3].state = "upcoming";
  }

  if (active) {
    steps[4].state = "complete";
    steps[4].timestamp = intakeReadyAt;
  } else if (progress.verified) {
    steps[4].state = "current";
  }

  return steps;
}
