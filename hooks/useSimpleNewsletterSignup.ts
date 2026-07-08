"use client";

import { useCallback, useState } from "react";

type SimpleNewsletterPayload = {
  fullName: string;
  email: string;
  source: string;
  consent?: boolean;
};

export function useSimpleNewsletterSignup() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const submit = useCallback(async (payload: SimpleNewsletterPayload) => {
    setError("");
    setSuccessMessage("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          consent: payload.consent ?? true,
          website: honeypot,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        setError(result.message || "Unable to join the newsletter. Please try again.");
        return false;
      }

      setSuccess(true);
      setSuccessMessage(
        typeof result.message === "string" && result.message.trim()
          ? result.message
          : "Thank you for joining our family newsletter.",
      );
      return true;
    } catch {
      setError("Unable to join the newsletter. Please try again.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }, [honeypot]);

  return {
    submitting,
    error,
    success,
    successMessage,
    submit,
    setError,
    honeypot,
    setHoneypot,
    formDisabled: submitting,
  };
}
