import { isRecaptchaWidgetEnabled } from "@/lib/recaptcha/config";
import {
  getRecaptchaSiteKey,
  isRecaptchaSiteKeyConfigured,
  logRecaptchaEnvInDevelopment,
} from "@/lib/recaptcha/env";

export { getRecaptchaSiteKey, isRecaptchaSiteKeyConfigured };

export function isRecaptchaEnabled() {
  return isRecaptchaWidgetEnabled(getRecaptchaSiteKey());
}

let scriptPromise = null;

if (typeof window !== "undefined") {
  logRecaptchaEnvInDevelopment();
}

export function loadRecaptchaScript(siteKey = getRecaptchaSiteKey()) {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (!isRecaptchaSiteKeyConfigured(siteKey)) {
    return Promise.resolve(false);
  }

  if (window.grecaptcha?.execute) {
    return Promise.resolve(true);
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-eden-recaptcha="true"]');
      if (existing) {
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => reject(new Error("Failed to load reCAPTCHA")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      script.dataset.edenRecaptcha = "true";
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load reCAPTCHA"));
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

export async function executeRecaptcha(action, siteKey = getRecaptchaSiteKey()) {
  if (!isRecaptchaSiteKeyConfigured(siteKey)) {
    return null;
  }

  await loadRecaptchaScript(siteKey);

  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
}
