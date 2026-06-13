"use client";

import { useCallback, useEffect, useState } from "react";
import { executeRecaptcha, getRecaptchaSiteKey, loadRecaptchaScript } from "@/lib/recaptcha/client";

export function useRecaptcha() {
  const siteKey = getRecaptchaSiteKey();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!siteKey) return;

    loadRecaptchaScript(siteKey)
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [siteKey]);

  const getToken = useCallback(
    async (action) => {
      if (!siteKey) {
        return null;
      }

      return executeRecaptcha(action, siteKey);
    },
    [siteKey],
  );

  return {
    enabled: Boolean(siteKey),
    ready,
    getToken,
  };
}
