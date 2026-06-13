export type IntakeSubmissionSummary = {
  parentName: string;
  childName: string;
  age: string;
  diagnosisStatus: string;
  state: string;
  city: string;
  serviceType: string;
  goals: string;
  insuranceProvider: string;
  phoneNumber: string;
  emailAddress: string;
  preferredContactMethod: string;
  submittedAt: string;
  confirmationId: string;
  source: "advanced-intake" | "start-aba-therapy" | "eden-chat";
};

function str(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item ?? "").trim()).filter(Boolean).join(", ");
  }
  return String(value ?? "").trim();
}

function childNameFromParts(first: unknown, last: unknown, full: unknown): string {
  const fullName = str(full);
  if (fullName) return fullName;
  return [str(first), str(last)].filter(Boolean).join(" ");
}

function ageFromBirthdate(birthdate: unknown): string {
  const raw = str(birthdate);
  if (!raw) return "";

  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";

  const today = new Date();
  let years = today.getFullYear() - parsed.getFullYear();
  const monthDiff = today.getMonth() - parsed.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < parsed.getDate())) {
    years -= 1;
  }

  return years >= 0 ? String(years) : "";
}

function formatSubmittedAt(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });
}

export function buildSummaryFromAdvancedIntake(
  intake: Record<string, unknown>,
  confirmationId: string,
  submittedAt: string,
): IntakeSubmissionSummary {
  const goals = [str(intake.goalPriorities), str(intake.intakeReason), str(intake.caregiverGoals)]
    .filter(Boolean)
    .join(" | ");

  const diagnosisStatus = [
    str(intake.primaryDiagnosis),
    str(intake.diagnosticReportAvailable),
    str(intake.otherDiagnoses),
  ]
    .filter(Boolean)
    .join(" | ");

  const serviceType = [str(intake.serviceRequested), str(intake.preferredServiceLocation)]
    .filter(Boolean)
    .join(" | ");

  return {
    parentName: str(intake.guardianName) || str(intake.legalGlobalName) || str(intake.secondaryGuardianName),
    childName: str(intake.childFullName) || str(intake.preferredName),
    age: str(intake.childAge) || ageFromBirthdate(intake.dob),
    diagnosisStatus,
    state: str(intake.state),
    city: str(intake.city),
    serviceType,
    goals,
    insuranceProvider: str(intake.insuranceProvider),
    phoneNumber: str(intake.phone),
    emailAddress: str(intake.email),
    preferredContactMethod: str(intake.contactMethod),
    submittedAt,
    confirmationId,
    source: "advanced-intake",
  };
}

export function buildSummaryFromEdenChat(
  fields: {
    parentGuardianName: string;
    childName: string;
    childAge: string;
    diagnosisStatus: string;
    state: string;
    city: string;
    serviceType: string;
    goals: string;
    insuranceProvider: string;
    phoneNumber: string;
    emailAddress: string;
    preferredContactMethod: string;
    conversationSummary: string;
  },
  confirmationId: string,
  submittedAt: string,
): IntakeSubmissionSummary {
  const goals = [fields.goals, fields.conversationSummary ? `Chat summary: ${fields.conversationSummary}` : ""]
    .filter(Boolean)
    .join(" | ");

  return {
    parentName: fields.parentGuardianName,
    childName: fields.childName,
    age: fields.childAge,
    diagnosisStatus: fields.diagnosisStatus,
    state: fields.state,
    city: fields.city,
    serviceType: fields.serviceType || "ABA Therapy (Eden Chat)",
    goals,
    insuranceProvider: fields.insuranceProvider,
    phoneNumber: fields.phoneNumber,
    emailAddress: fields.emailAddress,
    preferredContactMethod: fields.preferredContactMethod,
    submittedAt,
    confirmationId,
    source: "eden-chat",
  };
}

export function buildSummaryFromStartAbaTherapy(
  body: Record<string, unknown>,
  confirmationId: string,
  submittedAt: string,
): IntakeSubmissionSummary {
  return {
    parentName: str(body.parentName),
    childName: childNameFromParts(body.childFirstName, body.childLastName, body.childFullName),
    age: ageFromBirthdate(body.childBirthdate),
    diagnosisStatus: str(body.diagnosisStatus),
    state: str(body.state),
    city: str(body.city),
    serviceType: str(body.serviceType) || "ABA Therapy Interest",
    goals: str(body.message),
    insuranceProvider: str(body.insuranceProvider),
    phoneNumber: str(body.phone),
    emailAddress: str(body.email),
    preferredContactMethod: str(body.preferredContact),
    submittedAt,
    confirmationId,
    source: "start-aba-therapy",
  };
}

export function summaryToSheetRow(summary: IntakeSubmissionSummary): string[] {
  return [
    formatSubmittedAt(summary.submittedAt),
    summary.parentName,
    summary.childName,
    summary.age,
    summary.diagnosisStatus,
    summary.state,
    summary.city,
    summary.serviceType,
    summary.goals,
    summary.insuranceProvider,
    summary.phoneNumber,
    summary.emailAddress,
    summary.preferredContactMethod,
    summary.confirmationId,
    summary.source,
  ];
}

export function summaryToEmailText(summary: IntakeSubmissionSummary): string {
  return [
    "New Eden ABA Therapy intake submission",
    "",
    `Submission Date and Time: ${formatSubmittedAt(summary.submittedAt)}`,
    `Parent Name: ${summary.parentName || "—"}`,
    `Child Name: ${summary.childName || "—"}`,
    `Age: ${summary.age || "—"}`,
    `Diagnosis Status: ${summary.diagnosisStatus || "—"}`,
    `State: ${summary.state || "—"}`,
    `City: ${summary.city || "—"}`,
    `Service Type: ${summary.serviceType || "—"}`,
    `Goals: ${summary.goals || "—"}`,
    `Insurance Provider: ${summary.insuranceProvider || "—"}`,
    `Phone Number: ${summary.phoneNumber || "—"}`,
    `Email Address: ${summary.emailAddress || "—"}`,
    `Preferred Contact Method: ${summary.preferredContactMethod || "—"}`,
    "",
    `Confirmation ID: ${summary.confirmationId}`,
    `Source: ${summary.source}`,
  ].join("\n");
}
