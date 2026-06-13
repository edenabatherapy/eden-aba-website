"use client";

import { isRecaptchaEnabled } from "@/lib/recaptcha/client";

const linkClass = "underline underline-offset-2";

export default function RecaptchaNotice({ t = {}, label, variant = "compact" }) {
  if (!isRecaptchaEnabled()) {
    return null;
  }

  const privacyLabel = t?.recaptchaPrivacy || "Privacy";
  const termsLabel = t?.recaptchaTerms || "Terms";
  const googleLegal =
    t?.recaptchaGoogleLegal ||
    "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.";

  if (variant === "googleLegal") {
    return (
      <p className="text-center text-xs font-semibold text-slate-500">
        {googleLegal.includes("Privacy Policy") ? (
          <>
            {googleLegal.split("Privacy Policy")[0]}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              Privacy Policy
            </a>
            {googleLegal.includes("Terms of Service") ? (
              <>
                {" "}
                {googleLegal.split("Privacy Policy")[1]?.split("Terms of Service")[0]}
                <a
                  href="https://policies.google.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Terms of Service
                </a>
                {googleLegal.split("Terms of Service")[1]}
              </>
            ) : null}
          </>
        ) : (
          googleLegal
        )}
      </p>
    );
  }

  return (
    <p className="text-center text-xs font-semibold text-slate-500">
      {label || t?.recaptcha || "protected by reCAPTCHA"}{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {privacyLabel}
      </a>
      {" · "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {termsLabel}
      </a>
    </p>
  );
}
