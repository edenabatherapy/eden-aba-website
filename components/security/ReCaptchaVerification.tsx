"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { RECAPTCHA_INCOMPLETE_MESSAGE } from "@/lib/recaptcha/messages";

export type ReCaptchaVerificationHandle = {
  reset: () => void;
  getToken: () => string | null;
};

type Props = {
  onTokenChange: (token: string | null) => void;
  error?: string;
  disabled?: boolean;
  theme?: "light" | "dark";
  className?: string;
};

const ReCaptchaVerification = forwardRef<ReCaptchaVerificationHandle, Props>(
  function ReCaptchaVerification(
    { onTokenChange, error, disabled = false, theme = "light", className = "" },
    ref,
  ) {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() || "";
    const widgetRef = useRef<ReCAPTCHA | null>(null);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
      if (process.env.NODE_ENV === "development") {
        console.log("reCAPTCHA site key loaded:", process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      reset: () => {
        widgetRef.current?.reset();
        onTokenChange(null);
        setLoadError("");
      },
      getToken: () => widgetRef.current?.getValue() ?? null,
    }));

    const displayError = error || loadError;

    if (!siteKey) {
      if (process.env.NODE_ENV === "development") {
        return (
          <p className={`rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900 ${className}`}>
            reCAPTCHA disabled — set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local (project root), then
            restart npm run dev.
          </p>
        );
      }
      return null;
    }

    return (
      <div className={className}>
        <div
          className={`overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm ${
            disabled ? "pointer-events-none opacity-60" : ""
          }`}
          aria-disabled={disabled}
        >
          <ReCAPTCHA
            ref={widgetRef}
            sitekey={siteKey}
            theme={theme}
            onChange={(token) => {
              setLoadError("");
              onTokenChange(token);
            }}
            onExpired={() => onTokenChange(null)}
            onErrored={() => {
              onTokenChange(null);
              setLoadError(
                "reCAPTCHA could not load. Refresh the page, or confirm localhost is allowed in your Google reCAPTCHA admin settings.",
              );
            }}
          />
        </div>
        {displayError ? (
          <p className="mt-2 text-sm font-bold text-red-600" role="alert">
            {displayError || RECAPTCHA_INCOMPLETE_MESSAGE}
          </p>
        ) : null}
      </div>
    );
  },
);

export default ReCaptchaVerification;
