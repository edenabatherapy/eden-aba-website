export function getRecaptchaSiteKey() {
  return process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "";
}

export function getRecaptchaSecretKey() {
  return process.env.RECAPTCHA_SECRET_KEY?.trim() || "";
}

export function isRecaptchaSiteKeyConfigured(siteKey = getRecaptchaSiteKey()) {
  return Boolean(siteKey);
}

export function isRecaptchaSecretKeyConfigured(secretKey = getRecaptchaSecretKey()) {
  return Boolean(secretKey);
}

let loggedSiteKey = false;

export function logRecaptchaEnvInDevelopment() {
  if (process.env.NODE_ENV !== "development" || loggedSiteKey) {
    return;
  }

  loggedSiteKey = true;
  console.log("reCAPTCHA site key loaded:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  console.log("reCAPTCHA secret key loaded:", Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim()));
}
