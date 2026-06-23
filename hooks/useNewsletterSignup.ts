"use client";

import { useCallback, useState } from "react";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import { logRecaptchaDev } from "@/lib/recaptcha/dev-log";
import {
  RECAPTCHA_FAILURE_MESSAGE,
  RECAPTCHA_SUBMITTING_MESSAGE,
} from "@/lib/recaptcha/messages";

type NewsletterPayload = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  source: string;
  type?: string;
  consent?: boolean;
};

export function useNewsletterSignup() {
  const recaptcha = useReCaptchaV2();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (payload: NewsletterPayload) => {
      setError("");

      if (!recaptcha.requireRecaptcha()) {
        return false;
      }

      setSubmitting(true);

      try {
        const verification = await recaptcha.verifyRecaptchaWithServer();
        if (!verification.success) {
          setError(recaptcha.recaptchaError || RECAPTCHA_FAILURE_MESSAGE);
          recaptcha.releaseSubmitLock();
          return false;
        }

        const response = await fetch("/api/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            recaptchaToken: verification.token,
          }),
        });

        const result = await response.json().catch(() => ({}));
        logRecaptchaDev("newsletter submission", {
          status: response.status,
          ok: response.ok,
        });

        if (!response.ok || !result.ok) {
          setError(result.message || RECAPTCHA_FAILURE_MESSAGE);
          recaptcha.resetRecaptcha();
          return false;
        }

        recaptcha.resetRecaptcha();
        setSuccess(true);
        return true;
      } catch {
        setError(RECAPTCHA_FAILURE_MESSAGE);
        recaptcha.resetRecaptcha();
        return false;
      } finally {
        setSubmitting(false);
        recaptcha.releaseSubmitLock();
      }
    },
    [recaptcha],
  );

  const formDisabled = submitting || recaptcha.verifying || recaptcha.validating;

  return {
    ...recaptcha,
    submitting,
    submittingMessage: RECAPTCHA_SUBMITTING_MESSAGE,
    error,
    success,
    formDisabled,
    submit,
    setError,
  };
}
