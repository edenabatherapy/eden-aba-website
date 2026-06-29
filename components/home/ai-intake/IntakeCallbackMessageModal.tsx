"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getAiIntakeSection } from "./ai-intake-i18n";

type IntakeCallbackMessageModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormState = {
  parentName: string;
  phone: string;
  email: string;
  childAge: string;
  preferredContactTime: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  parentName: "",
  phone: "",
  email: "",
  childAge: "",
  preferredContactTime: "",
  message: "",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildCallbackMessageBody(form: FormState): string {
  const lines = [
    form.childAge ? `Child's Age: ${form.childAge}` : "",
    form.preferredContactTime ? `Preferred Contact Time: ${form.preferredContactTime}` : "",
    "",
    form.message.trim(),
  ].filter((line, index) => line !== "" || index === 2);

  return lines.join("\n").trim();
}

export default function IntakeCallbackMessageModal({
  open,
  onClose,
}: IntakeCallbackMessageModalProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).callback, [language]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [isSubmitting, onClose, open]);

  useEffect(() => {
    if (!open) {
      setForm(EMPTY_FORM);
      setError("");
      setSuccess(false);
      setIsSubmitting(false);
    }
  }, [open]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || success) return;

    const parentName = form.parentName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!parentName) {
      setError(copy.validationName);
      return;
    }
    if (!phone) {
      setError(copy.validationPhone);
      return;
    }
    if (!email || !isValidEmail(email)) {
      setError(copy.validationEmail);
      return;
    }
    if (!message) {
      setError(copy.validationMessage);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/intake/support-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          parentPhone: phone,
          parentEmail: email,
          subject: copy.subject,
          message: buildCallbackMessageBody({ ...form, parentName, phone, email, message }),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !result.ok) {
        setError(result.message || copy.errorMessage);
        return;
      }

      setSuccess(true);
    } catch {
      setError(copy.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="eden-ai-modal" role="presentation">
      <button
        type="button"
        className="eden-ai-modal__backdrop"
        aria-label={copy.closeLabel}
        onClick={isSubmitting ? undefined : onClose}
        disabled={isSubmitting}
      />
      <div
        className="eden-ai-modal__panel eden-ai-modal__panel--form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eden-ai-callback-title"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="eden-ai-modal__close"
          onClick={onClose}
          aria-label={copy.closeLabel}
          disabled={isSubmitting}
        >
          <X size={18} aria-hidden="true" />
        </button>

        {success ? (
          <div className="eden-ai-modal__success">
            <h2 id="eden-ai-callback-title" className="eden-ai-modal__title">
              {copy.title}
            </h2>
            <p className="eden-ai-modal__text">{copy.successMessage}</p>
            <button type="button" className="eden-ai-modal__action" onClick={onClose}>
              {language === "vi" ? "Đóng" : "Close"}
            </button>
          </div>
        ) : (
          <form className="eden-ai-callback-form" onSubmit={(event) => void handleSubmit(event)}>
            <h2 id="eden-ai-callback-title" className="eden-ai-modal__title eden-ai-modal__title--left">
              {copy.title}
            </h2>
            <p className="eden-ai-modal__text eden-ai-modal__text--left">{copy.description}</p>

            <label className="eden-ai-callback-form__field">
              <span>{copy.parentName}</span>
              <input
                type="text"
                name="parentName"
                autoComplete="name"
                value={form.parentName}
                onChange={(event) => updateField("parentName", event.target.value)}
                required
              />
            </label>

            <div className="eden-ai-callback-form__row">
              <label className="eden-ai-callback-form__field">
                <span>{copy.phone}</span>
                <input
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                />
              </label>

              <label className="eden-ai-callback-form__field">
                <span>{copy.email}</span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  required
                />
              </label>
            </div>

            <div className="eden-ai-callback-form__row">
              <label className="eden-ai-callback-form__field">
                <span>{copy.childAge}</span>
                <input
                  type="text"
                  name="childAge"
                  value={form.childAge}
                  onChange={(event) => updateField("childAge", event.target.value)}
                />
              </label>

              <label className="eden-ai-callback-form__field">
                <span>{copy.preferredContactTime}</span>
                <input
                  type="text"
                  name="preferredContactTime"
                  placeholder={copy.preferredContactTimePlaceholder}
                  value={form.preferredContactTime}
                  onChange={(event) => updateField("preferredContactTime", event.target.value)}
                />
              </label>
            </div>

            <label className="eden-ai-callback-form__field">
              <span>{copy.message}</span>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
              />
            </label>

            {error ? (
              <p className="eden-ai-callback-form__error" role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className="eden-ai-callback-form__submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="eden-ai-video__spinner" aria-hidden="true" />
                  {copy.submitting}
                </>
              ) : (
                copy.submit
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
