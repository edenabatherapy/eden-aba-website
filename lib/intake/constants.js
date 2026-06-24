/** Eden ABA Therapy advanced intake — shared constants. */

export const STORAGE_DATA_KEY = "edenIntakeData";
export const STORAGE_STEP_KEY = "edenIntakeCurrentStep";
export const STORAGE_TAB_KEY = "edenIntakeActiveTab";
export const STORAGE_META_KEY = "edenAdvancedIntakeMeta";
export const LEGACY_STORAGE_KEY = "eden-intake-preview";
/** PHI-free receipt persisted in sessionStorage after successful submit (survives refresh). */
export const STORAGE_SUBMISSION_RECEIPT_KEY = "edenIntakeSubmissionReceipt";

export const INTAKE_DRAFT_STORAGE_KEYS = [
  STORAGE_DATA_KEY,
  STORAGE_STEP_KEY,
  STORAGE_TAB_KEY,
  STORAGE_META_KEY,
  LEGACY_STORAGE_KEY,
];

export const INTAKE_PHONE = "+1 (703) 587-5238";
export const INTAKE_EMAIL = "info@edenabatherapy.com";

export const ACCEPTED_FILE_TYPES =
  ".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const INTAKE_STEPS = [
  {
    title: "Basic Information",
    subtitle:
      "Let's start with basic information about the child, parent/guardian, referral source, and requested services.",
  },
  {
    title: "Medical Insurance",
    subtitle: "Please provide your child's medical and insurance information.",
  },
  {
    title: "Legal Consent",
    subtitle: "Please review and complete the legal information and consents required to move forward.",
  },
  {
    title: "Financial & Communication",
    subtitle: "Please provide your financial and communication preferences.",
  },
  {
    title: "Family & Clinical",
    subtitle:
      "Tell us more about your family and your child's needs so we can provide the best care.",
  },
  {
    title: "Uploads & Signature",
    subtitle: "Almost done. Please upload the required documents and sign to complete your intake.",
  },
];

export const STEP_TIPS = [
  "<b>Basic Information:</b> Use the child's legal name exactly as it appears on insurance or medical records. Add emergency contact details to prevent delays.",
  "<b>Medical & Insurance:</b> Diagnosis, physician, medication, allergy, seizure, and insurance details help verify ABA medical necessity and benefits.",
  "<b>Legal & Consent:</b> Open each consent item, review the full policy, acknowledge it, and make sure legal guardian details are accurate.",
  "<b>Financial & Communication:</b> Billing, availability, language, reminders, and scheduling preferences help our team coordinate services smoothly.",
  "<b>Family & Clinical:</b> Detailed VB-MAPP, EESA, AFLS, and ABLLS-R readiness details help the clinical team prepare meaningful assessment and treatment goals.",
  "<b>Uploads & Signature:</b> Upload all available documents and sign the final verification. Missing documents may delay authorization or start date.",
];

export const UPLOAD_LABELS = [
  "Insurance Card Front & Back *",
  "Parent / Guardian Photo ID *",
  "Child Birth Certificate",
  "Diagnostic Evaluation Report",
  "Referral / Prescription for ABA",
  "IEP / IFSP / 504 Plan",
  "School Evaluation / Psychoeducational Report",
  "Speech / OT / PT Evaluation",
  "Previous ABA Records / Treatment Plan",
  "Behavior Plan / BIP / FBA",
  "Medication List / Medical Plan",
  "Seizure / Allergy / Emergency Plan",
  "Court Orders / Custody Documents",
  "Prior Authorization Letter",
  "Insurance Denial / Approval Letter",
  "Other Supporting Documents",
];

export const REQUIRED_DOC_LABELS = [
  "Insurance Card Front & Back",
  "Parent / Guardian Photo ID",
  "Diagnostic Evaluation Report",
  "Referral / Prescription / Letter of Medical Necessity",
  "IEP / IFSP / 504 if available",
  "School or psychological evaluation if available",
  "Speech / OT / PT evaluations if available",
  "Medication / allergy / seizure / safety plan if applicable",
  "Court / custody documents if applicable",
  "Prior authorization / approval / denial letter if available",
  "Previous ABA treatment plan or discharge summary if applicable",
  "Other supporting clinical documents",
];
