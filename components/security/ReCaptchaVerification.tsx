"use client";

import dynamic from "next/dynamic";
import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  isRecaptchaMisconfiguredOnClient,
  isRecaptchaWidgetEnabled,
  shouldBypassRecaptchaOnClient,
} from "@/lib/recaptcha/config";
import { logRecaptchaDev } from "@/lib/recaptcha/dev-log";
import { getRecaptchaSiteKey } from "@/lib/recaptcha/client";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import {
  RECAPTCHA_EXPIRED_MESSAGE,
  RECAPTCHA_INCOMPLETE_MESSAGE,
  RECAPTCHA_LOAD_ERROR_MESSAGE,
  RECAPTCHA_MISCONFIGURED_MESSAGE,
} from "@/lib/recaptcha/messages";

const isDevelopment = process.env.NODE_ENV === "development";

function RecaptchaLoadingPlaceholder() {
  return (
    <div
      className="flex min-h-[78px] min-w-[304px] max-w-full items-center rounded-[3px] border border-[#d3d3d3] bg-[#f9f9f9] px-4 shadow-[0_0_4px_rgba(0,0,0,0.08)]"
      role="status"
      aria-live="polite"
    >
      <span className="text-xs font-semibold text-slate-500">Loading security verification…</span>
    </div>
  );
}

const ReCaptchaWidget = dynamic(() => import("@/components/security/ReCaptchaWidget"), {
  ssr: false,
  loading: RecaptchaLoadingPlaceholder,
});

export type ReCaptchaVerificationHandle = {
  reset: () => void;
  getToken: () => string | null;
};

type Props = {
  onTokenChange: (token: string | null) => void;
  onExpired?: () => void;
  error?: string;
  disabled?: boolean;
  theme?: "light" | "dark";
  className?: string;
  noticeAlign?: "left" | "center" | "right";
  showNotice?: boolean;
  noticeTone?: "light" | "dark";
};

const ReCaptchaVerification = forwardRef<ReCaptchaVerificationHandle, Props>(
  function ReCaptchaVerification(
    {
      onTokenChange,
      onExpired,
      error,
      disabled = false,
      theme = "light",
      className = "",
      noticeAlign = "left",
      showNotice = true,
      noticeTone = "light",
    },
    ref,
  ) {
    const siteKey = getRecaptchaSiteKey();
    const widgetEnabled = isRecaptchaWidgetEnabled(siteKey);
    const misconfigured = isRecaptchaMisconfiguredOnClient();
    const widgetRef = useRef<ReCaptchaVerificationHandle | null>(null);
    const [loadError, setLoadError] = useState("");
    const fieldsetId = useId();
    const errorId = `${fieldsetId}-error`;

    useImperativeHandle(ref, () => ({
      reset: () => {
        widgetRef.current?.reset();
        onTokenChange(null);
        setLoadError("");
      },
      getToken: () => widgetRef.current?.getToken() ?? null,
    }));

    const handleTokenChange = useCallback(
      (token: string | null) => {
        setLoadError("");
        onTokenChange(token);
        if (token) {
          logRecaptchaDev("token received", { length: token.length });
        }
      },
      [onTokenChange],
    );

    const handleExpired = useCallback(() => {
      setLoadError(RECAPTCHA_EXPIRED_MESSAGE);
      onTokenChange(null);
      onExpired?.();
      logRecaptchaDev("token expired");
    }, [onExpired, onTokenChange]);

    const handleErrored = useCallback(() => {
      setLoadError(RECAPTCHA_LOAD_ERROR_MESSAGE);
      onTokenChange(null);
      logRecaptchaDev("widget error");
    }, [onTokenChange]);

    const displayError = error || loadError;

    if (shouldBypassRecaptchaOnClient()) {
      return null;
    }

    if (misconfigured) {
      return (
        <div className={`min-w-0 ${className}`} role="alert">
          <div className="inline-flex min-h-[78px] min-w-[304px] max-w-full flex-col justify-center rounded-[3px] border border-red-200 bg-red-50 px-4 py-3 shadow-[0_0_4px_rgba(0,0,0,0.08)]">
            <p className="text-xs font-semibold text-red-700">{RECAPTCHA_MISCONFIGURED_MESSAGE}</p>
          </div>
          {showNotice ? (
            <RecaptchaNotice align={noticeAlign} tone={noticeTone} className="mt-2" />
          ) : null}
        </div>
      );
    }

    if (!widgetEnabled) {
      if (isDevelopment) {
        return (
          <div className={`min-w-0 ${className}`} role="status">
            <div className="inline-flex min-h-[78px] min-w-[304px] max-w-full items-center rounded-[3px] border border-amber-200 bg-amber-50 px-4 shadow-[0_0_4px_rgba(0,0,0,0.08)]">
              <p className="text-xs font-semibold text-amber-900">
                reCAPTCHA disabled — set NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY in
                .env.local, then restart npm run dev.
              </p>
            </div>
          </div>
        );
      }

      return null;
    }

    return (
      <div
        className={`min-w-0 ${className}`}
        role="group"
        aria-labelledby={`${fieldsetId}-legend`}
        aria-describedby={displayError ? errorId : undefined}
      >
        <span id={`${fieldsetId}-legend`} className="sr-only">
          Security verification
        </span>

        <div
          className={`inline-block max-w-full overflow-visible rounded-[3px] border border-[#d3d3d3] bg-[#f9f9f9] p-1 shadow-[0_0_4px_rgba(0,0,0,0.08)] ${disabled ? "pointer-events-none opacity-60" : ""}`}
          aria-disabled={disabled}
        >
          <ReCaptchaWidget
            ref={widgetRef}
            siteKey={siteKey}
            theme={theme}
            disabled={disabled}
            onChange={handleTokenChange}
            onExpired={handleExpired}
            onErrored={handleErrored}
          />
        </div>

        {displayError ? (
          <p id={errorId} className="mt-2 text-xs text-red-600" role="alert">
            {displayError || RECAPTCHA_INCOMPLETE_MESSAGE}
          </p>
        ) : null}

        {showNotice ? (
          <RecaptchaNotice align={noticeAlign} tone={noticeTone} className="mt-2" />
        ) : null}
      </div>
    );
  },
);

export default ReCaptchaVerification;
