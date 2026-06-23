import {
  getRecaptchaSecretKey,
  getRecaptchaSiteKey,
  isRecaptchaBypassFlagEnabled,
  isRecaptchaSecretKeyConfigured,
  isRecaptchaSiteKeyConfigured,
} from "@/lib/recaptcha/env";

/** Public site key is available to the browser bundle. */
export function isRecaptchaClientConfigured(siteKey = getRecaptchaSiteKey()) {
  return isRecaptchaSiteKeyConfigured(siteKey);
}

/** Server requires both keys before enforcing verification. */
export function isRecaptchaServerConfigured() {
  return (
    isRecaptchaSiteKeyConfigured() && isRecaptchaSecretKeyConfigured(getRecaptchaSecretKey())
  );
}

/** @deprecated Use isRecaptchaClientConfigured or isRecaptchaServerConfigured */
export function isRecaptchaFullyConfigured() {
  return isRecaptchaServerConfigured();
}

/** Client widget renders when the site key exists and bypass is off. */
export function isRecaptchaWidgetEnabled(siteKey = getRecaptchaSiteKey()) {
  if (shouldBypassRecaptchaOnClient()) {
    return false;
  }

  return isRecaptchaClientConfigured(siteKey);
}

/**
 * Skip the widget when the site key is missing or RECAPTCHA_BYPASS is enabled.
 * Unblocks production until NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set on Vercel.
 */
export function shouldBypassRecaptchaOnClient() {
  return isRecaptchaBypassFlagEnabled() || !isRecaptchaClientConfigured();
}

/** Server skips token verification when keys are incomplete or bypass is enabled. */
export function shouldBypassRecaptchaVerificationOnServer() {
  return isRecaptchaBypassFlagEnabled() || !isRecaptchaServerConfigured();
}

/**
 * Misconfigured when verification is expected on the client but the public site key is missing.
 */
export function isRecaptchaMisconfiguredOnClient() {
  if (shouldBypassRecaptchaOnClient()) {
    return false;
  }

  return !isRecaptchaClientConfigured();
}

/** Require a completed challenge only when the public site key is configured. */
export function isRecaptchaRequiredForSubmission() {
  if (shouldBypassRecaptchaOnClient()) {
    return false;
  }

  if (isRecaptchaMisconfiguredOnClient()) {
    return true;
  }

  return isRecaptchaWidgetEnabled();
}

/** @deprecated Always require a completed challenge when the widget is shown. */
export function canSubmitWithoutRecaptchaToken() {
  return false;
}
