export const REQUIRED_MESSAGE = "This field is required";
export const REQUIRED_LABEL = "Required";
export const OPTIONAL_LABEL = "Optional";
export const PHONE_OR_EMAIL_MESSAGE = "Enter a phone number or email address so we can reach you.";

function str(value: unknown) {
  return String(value ?? "").trim();
}

export function hasPhoneOrEmail(phone: unknown, email: unknown) {
  return Boolean(str(phone) || str(email));
}

export function isValidEmailValue(value: unknown) {
  const email = str(value);
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export type ContactFieldErrors = Partial<
  Record<"parentName" | "email" | "phone" | "consentTerms", string>
>;

export function validateContactForm(input: {
  parentName: string;
  email: string;
  phone: string;
  consentTerms: boolean;
}): { valid: true } | { valid: false; fieldErrors: ContactFieldErrors; missingFields: string[] } {
  const fieldErrors: ContactFieldErrors = {};
  const missingFields: string[] = [];

  if (!str(input.parentName)) {
    fieldErrors.parentName = REQUIRED_MESSAGE;
    missingFields.push("Parent / guardian name");
  }

  if (!hasPhoneOrEmail(input.phone, input.email)) {
    fieldErrors.phone = PHONE_OR_EMAIL_MESSAGE;
    fieldErrors.email = PHONE_OR_EMAIL_MESSAGE;
    missingFields.push("Phone or email");
  } else if (!isValidEmailValue(input.email)) {
    fieldErrors.email = "Enter a valid email address.";
    missingFields.push("Email address");
  }

  if (!input.consentTerms) {
    fieldErrors.consentTerms = "You must agree to the Privacy Policy and Terms of Service.";
    missingFields.push("Privacy Policy and Terms agreement");
  }

  if (missingFields.length > 0) {
    return { valid: false, fieldErrors, missingFields };
  }

  return { valid: true };
}
