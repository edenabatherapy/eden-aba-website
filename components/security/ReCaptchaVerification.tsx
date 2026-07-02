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
      className="flex min-h-[78px] min-w-[304px] max-w-full items-center rounded-lg border border-slate-200 bg-slate-50 px-4"
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
      showNotice = false,
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

    if (misconfigured) {
      return (
        <p className={`text-xs text-red-600 ${className}`} role="alert">
          {RECAPTCHA_MISCONFIGURED_MESSAGE}
        </p>
      );
    }

    if (!widgetEnabled) {
      if (isDevelopment && !shouldBypassRecaptchaOnClient()) {
        return (
          <p className={`text-xs text-amber-800 ${className}`} role="status">
            reCAPTCHA disabled — set NEXT_PUBLIC_RECAPTCHA_SITE_KEY and RECAPTCHA_SECRET_KEY in
            .env.local, then restart npm run dev.
          </p>
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
          className={`overflow-visible ${disabled ? "pointer-events-none opacity-60" : ""}`}
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
