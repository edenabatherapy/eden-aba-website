"use client";

import { useEffect, useState } from "react";
import { getGoogleMapsApiKey } from "@/lib/google-maps-config";

const LOG_PREFIX = "[useGoogleMapsApiKey]";

/**
 * Resolves the Maps JavaScript API key from the build-time bundle first,
 * then fetches /api/public/maps-config for runtime server env fallback.
 *
 * Reads process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY (inlined at build via next.config.mjs).
 *
 * @param {string} [providedKey]
 */
export function useGoogleMapsApiKey(providedKey = "") {
  const bundledKey = providedKey?.trim() || getGoogleMapsApiKey();
  const [apiKey, setApiKey] = useState(bundledKey);
  const [loading, setLoading] = useState(!bundledKey);

  useEffect(() => {
    const envKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() || "";

    if (bundledKey) {
      setApiKey(bundledKey);
      setLoading(false);
      console.log(`${LOG_PREFIX} Using bundled Maps API key`, {
        fromEnv: Boolean(envKey),
        keyLength: bundledKey.length,
      });
      return undefined;
    }

    console.log(`${LOG_PREFIX} No bundled key — fetching /api/public/maps-config`, {
      envKeyPresent: Boolean(envKey),
    });

    let cancelled = false;

    fetch("/api/public/maps-config", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => {
        if (cancelled) return;
        const resolved = typeof data?.apiKey === "string" ? data.apiKey.trim() : "";
        setApiKey(resolved);
        console.log(`${LOG_PREFIX} Runtime maps config resolved`, {
          configured: Boolean(resolved),
          keyLength: resolved.length,
        });
      })
      .catch((error) => {
        if (!cancelled) {
          setApiKey("");
          console.warn(`${LOG_PREFIX} Failed to fetch maps config`, error);
        }
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
