"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import type { ReCaptchaVerificationHandle } from "@/components/security/ReCaptchaVerification";

type Props = {
  siteKey: string;
  theme?: "light" | "dark";
  disabled?: boolean;
  onChange: (token: string | null) => void;
  onExpired: () => void;
  onErrored: () => void;
};

const ReCaptchaWidget = forwardRef<ReCaptchaVerificationHandle, Props>(
  function ReCaptchaWidget({ siteKey, theme = "light", disabled = false, onChange, onExpired, onErrored }, ref) {
    const widgetRef = useRef<ReCAPTCHA | null>(null);

    useImperativeHandle(ref, () => ({
      reset: () => {
        widgetRef.current?.reset();
        onChange(null);
      },
      getToken: () => widgetRef.current?.getValue() ?? null,
    }));

    return (
      <div className="min-h-[78px] overflow-visible [&_.g-recaptcha]:inline-block">
        <ReCAPTCHA
          ref={widgetRef}
          sitekey={siteKey}
          theme={theme}
          onChange={(token) => onChange(token)}
          onExpired={onExpired}
          onErrored={onErrored}
        />
      </div>
    );
  },
);

export default ReCaptchaWidget;
