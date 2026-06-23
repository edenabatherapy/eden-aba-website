import {
  getRecaptchaSecretKey,
  getRecaptchaSiteKey,
  isRecaptchaSecretKeyConfigured,
  isRecaptchaSiteKeyConfigured,
} from "@/lib/recaptcha/env";

const isProduction = process.env.NODE_ENV === "production";
const isDevelopment = process.env.NODE_ENV === "development";

/** Client widget should render when a site key is configured. */
export function isRecaptchaWidgetEnabled(siteKey = getRecaptchaSiteKey()) {
  return isRecaptchaSiteKeyConfigured(siteKey);
}

/** Production requires both keys; development can bypass when keys are absent. */
export function isRecaptchaFullyConfigured() {
  return (
    isRecaptchaSiteKeyConfigured() && isRecaptchaSecretKeyConfigured(getRecaptchaSecretKey())
  );
}

/** Fail closed in production when the public site key is missing. */
export function isRecaptchaMisconfiguredOnClient() {
  return isProduction && !isRecaptchaSiteKeyConfigured();
}

/** Server may skip verification only in local development without a secret key. */
export function shouldBypassRecaptchaVerificationOnServer() {
  return isDevelopment && !isRecaptchaSecretKeyConfigured();
}

/** Submissions always require a token when the widget is enabled. */
export function isRecaptchaRequiredForSubmission() {
  if (isRecaptchaMisconfiguredOnClient()) {
    return true;
  }

  return isRecaptchaWidgetEnabled();
}

/** @deprecated Always require a completed challenge when the widget is shown. */
export function canSubmitWithoutRecaptchaToken() {
  return false;
}
