"use client";

import { useCallback, useRef, useState } from "react";
import type { ReCaptchaVerificationHandle } from "@/components/security/ReCaptchaVerification";
import {
  isRecaptchaMisconfiguredOnClient,
  isRecaptchaRequiredForSubmission,
  isRecaptchaWidgetEnabled,
} from "@/lib/recaptcha/config";
import { logRecaptchaDev } from "@/lib/recaptcha/dev-log";
import { getRecaptchaSiteKey } from "@/lib/recaptcha/client";
import {
  RECAPTCHA_EXPIRED_MESSAGE,
  RECAPTCHA_INCOMPLETE_MESSAGE,
  RECAPTCHA_MISCONFIGURED_MESSAGE,
  RECAPTCHA_VALIDATION_IN_PROGRESS_MESSAGE,
  RECAPTCHA_VERIFYING_MESSAGE,
} from "@/lib/recaptcha/messages";

export function useReCaptchaV2() {
  const enabled = isRecaptchaWidgetEnabled(getRecaptchaSiteKey());
  const misconfigured = isRecaptchaMisconfiguredOnClient();
  const required = isRecaptchaRequiredForSubmission();
  const recaptchaRef = useRef<ReCaptchaVerificationHandle | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [validating, setValidating] = useState(false);
  const submitLockRef = useRef(false);

  const resetRecaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
    setToken(null);
    setRecaptchaError("");
    setVerifying(false);
    setValidating(false);
    submitLockRef.current = false;
  }, []);

  const handleTokenChange = useCallback((nextToken: string | null) => {
    setToken(nextToken);
    if (nextToken) {
      setRecaptchaError("");
      logRecaptchaDev("client token updated");
    }
  }, []);

  const handleExpired = useCallback(() => {
    setToken(null);
    setRecaptchaError(RECAPTCHA_EXPIRED_MESSAGE);
  }, []);

  const requireRecaptcha = useCallback(() => {
    if (misconfigured) {
      setRecaptchaError(RECAPTCHA_MISCONFIGURED_MESSAGE);
      return false;
    }

    if (!required) {
      return true;
    }

    if (!token) {
      setRecaptchaError(RECAPTCHA_INCOMPLETE_MESSAGE);
      return false;
    }

    return true;
  }, [misconfigured, required, token]);

  const verifyRecaptchaWithServer = useCallback(async () => {
    if (submitLockRef.current) {
      return { success: false as const, token: null };
    }

    if (misconfigured) {
      setRecaptchaError(RECAPTCHA_MISCONFIGURED_MESSAGE);
      return { success: false as const, token: null };
    }

    if (!required) {
      logRecaptchaDev("submission allowed (reCAPTCHA not configured)");
      return { success: true as const, token: null as string | null };
    }

    if (!token) {
      setRecaptchaError(RECAPTCHA_INCOMPLETE_MESSAGE);
      return { success: false as const, token: null };
    }

    setVerifying(true);
    setValidating(true);

    try {
      // reCAPTCHA v2 tokens are single-use. Form APIs verify once on the server.
      logRecaptchaDev("client validation passed", { hasToken: true });
      submitLockRef.current = true;
      return { success: true as const, token };
    } finally {
      setVerifying(false);
      setValidating(false);
    }
  }, [misconfigured, required, token]);

  const canSubmit = !misconfigured && (!required || Boolean(token));

  return {
    enabled,
    required,
    misconfigured,
    token,
    verified: Boolean(token),
    recaptchaRef,
    recaptchaError,
    verifying,
    validating,
    verifyingMessage: verifying
      ? RECAPTCHA_VERIFYING_MESSAGE
      : validating
        ? RECAPTCHA_VALIDATION_IN_PROGRESS_MESSAGE
        : RECAPTCHA_VERIFYING_MESSAGE,
    canSubmit,
    handleTokenChange,
    handleExpired,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
    setRecaptchaError,
    releaseSubmitLock: () => {
      submitLockRef.current = false;
    },
  };
}
