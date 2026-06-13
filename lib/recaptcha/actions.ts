export const RECAPTCHA_ACTIONS = {
  CONTACT: "contact_submit",
  START_ABA_THERAPY: "start_aba_therapy_form",
  INTAKE: "intake_submit",
  APPOINTMENT: "appointment_submit",
  INSURANCE: "insurance_verification_submit",
  PORTAL_VERIFY: "insurance_portal_verify",
} as const;

export type RecaptchaAction = (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS];
