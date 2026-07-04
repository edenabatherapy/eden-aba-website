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
  if (shouldBypassRecaptchaOnClient(siteKey)) {
    return false;
  }

  return isRecaptchaClientConfigured(siteKey);
}

function isDevelopmentEnvironment() {
  return process.env.NODE_ENV === "development";
}

/** Skip the widget when bypass is enabled, or in development when the site key is absent. */
export function shouldBypassRecaptchaOnClient(siteKey = getRecaptchaSiteKey()) {
  if (isRecaptchaBypassFlagEnabled()) {
    return true;
  }

  if (!isRecaptchaSiteKeyConfigured(siteKey)) {
    return isDevelopmentEnvironment();
  }

  return false;
}

/** Server skips token verification when bypass is enabled, or in development when keys are incomplete. */
export function shouldBypassRecaptchaVerificationOnServer() {
  if (isRecaptchaBypassFlagEnabled()) {
    return true;
  }

  if (!isRecaptchaServerConfigured()) {
    return isDevelopmentEnvironment();
  }

  return false;
}

/**
 * Misconfigured only when bypass is off, a site key is present, but the widget cannot load.
 * An absent site key is treated as bypass (forms stay usable without showing an error).
 */
export function isRecaptchaMisconfiguredOnClient(siteKey = getRecaptchaSiteKey()) {
  if (shouldBypassRecaptchaOnClient(siteKey)) {
    return false;
  }

  return false;
}

/** Require a completed challenge when the widget is enabled. */
export function isRecaptchaRequiredForSubmission(siteKey = getRecaptchaSiteKey()) {
  if (shouldBypassRecaptchaOnClient(siteKey)) {
    return false;
  }

  return isRecaptchaWidgetEnabled(siteKey);
}

/** @deprecated Always require a completed challenge when the widget is shown. */
export function canSubmitWithoutRecaptchaToken() {
  return false;
}
