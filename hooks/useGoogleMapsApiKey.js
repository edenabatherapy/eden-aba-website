"use client";

import { useEffect, useState } from "react";
import { getGoogleMapsApiKey } from "@/lib/google-maps-config";

/**
 * Resolves the Maps JavaScript API key from the build-time bundle first,
 * then fetches /api/public/maps-config for runtime server env fallback.
 *
 * @param {string} [providedKey]
 */
export function useGoogleMapsApiKey(providedKey = "") {
  const bundledKey = providedKey?.trim() || getGoogleMapsApiKey();
  const [apiKey, setApiKey] = useState(bundledKey);
  const [loading, setLoading] = useState(!bundledKey);

  useEffect(() => {
    if (bundledKey) {
      setApiKey(bundledKey);
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    fetch("/api/public/maps-config", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const resolved = typeof data?.apiKey === "string" ? data.apiKey.trim() : "";
        setApiKey(resolved);
      })
      .catch(() => {
        if (!cancelled) setApiKey("");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [bundledKey]);

  return {
    apiKey,
    loading,
    configured: Boolean(apiKey),
  };
}
