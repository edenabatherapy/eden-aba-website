"use client";

import { useCallback, useRef, useState } from "react";
import type { ReCaptchaVerificationHandle } from "@/components/security/ReCaptchaVerification";
import { getRecaptchaSiteKey, isRecaptchaSiteKeyConfigured } from "@/lib/recaptcha/client";
import {
  RECAPTCHA_INCOMPLETE_MESSAGE,
  RECAPTCHA_VERIFYING_MESSAGE,
} from "@/lib/recaptcha/messages";

export function useReCaptchaV2() {
  const enabled = isRecaptchaSiteKeyConfigured(getRecaptchaSiteKey());
  const recaptchaRef = useRef<ReCaptchaVerificationHandle | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [recaptchaError, setRecaptchaError] = useState("");
  const verifying = false;

  const resetRecaptcha = useCallback(() => {
    recaptchaRef.current?.reset();
    setToken(null);
    setRecaptchaError("");
  }, []);

  const handleTokenChange = useCallback((nextToken: string | null) => {
    setToken(nextToken);
    if (nextToken) {
      setRecaptchaError("");
    }
  }, []);

  const requireRecaptcha = useCallback(() => {
    if (!enabled) return true;
    if (!token) {
      setRecaptchaError(RECAPTCHA_INCOMPLETE_MESSAGE);
      return false;
    }
    return true;
  }, [enabled, token]);

  const verifyRecaptchaWithServer = useCallback(async () => {
    if (!enabled) {
      return { success: true as const, token: null as string | null };
    }

    if (!token) {
      setRecaptchaError(RECAPTCHA_INCOMPLETE_MESSAGE);
      return { success: false as const, token: null };
    }

    // reCAPTCHA v2 tokens are single-use. Do not call /api/verify-recaptcha here —
    // the form submission API verifies the token once on the server.
    return { success: true as const, token };
  }, [enabled, token]);

  const canSubmit = !enabled || Boolean(token);

  return {
    enabled,
    token,
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage: RECAPTCHA_VERIFYING_MESSAGE,
    canSubmit,
    handleTokenChange,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
    setRecaptchaError,
  };
}
