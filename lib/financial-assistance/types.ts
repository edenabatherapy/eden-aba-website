export type AssistanceCategoryGroup =
  | "Government"
  | "Insurance"
  | "Foundation"
  | "Grant"
  | "Community"
  | "Education"
  | "Military"
  | "Emergency";

export type AssistanceProgramType =
  | "Medicaid"
  | "Private Insurance"
  | "TRICARE"
  | "SSI"
  | "State Waivers"
  | "Grants"
  | "Foundations"
  | "Employer"
  | "Military"
  | "Scholarships"
  | "County"
  | "Religious"
  | "Non-profits";

export type ResourceStatus = "Active" | "Seasonal" | "Verify" | "Limited";

export type OfficialLink = {
  label: string;
  url: string;
};

export type FinancialAssistanceResource = {
  id: string;
  title: string;
  group: AssistanceCategoryGroup;
  programType: AssistanceProgramType;
  description: string;
  eligibilitySummary: string;
  coverageNotes: string;
  officialLinks: OfficialLink[];
  documents?: string[];
  tips?: string[];
  status: ResourceStatus;
  tags: string[];
  featured?: boolean;
};

export type VirginiaProgram = {
  id: string;
  name: string;
  region: string;
  description: string;
  eligibility: string;
  officialLinks: OfficialLink[];
  tags: string[];
};

export type NationalGrant = {
  id: string;
  title: string;
  organization: string;
  summary: string;
  eligibility: string;
  url: string;
  deadlineNote: string;
  status: ResourceStatus;
};
