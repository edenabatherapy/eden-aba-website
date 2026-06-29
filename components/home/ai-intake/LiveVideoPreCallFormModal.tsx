"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import {
  LIVE_VIDEO_REASON_IDS,
  type LiveVideoPreCallIntake,
  type LiveVideoPreferredLanguage,
} from "@/lib/daily/live-video-intake-payload";
import { getAiIntakeSection } from "./ai-intake-i18n";

type LiveVideoPreCallFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (intake: LiveVideoPreCallIntake) => void | Promise<void>;
};

type FormState = {
  parentName: string;
  phone: string;
  email: string;
  childAge: string;
  preferredLanguage: LiveVideoPreferredLanguage | "";
  reasonForCall: LiveVideoPreCallIntake["reasonForCall"] | "";
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LiveVideoPreCallFormModal({
  open,
  onClose,
  onSubmit,
}: LiveVideoPreCallFormModalProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).precall, [language]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [form, setForm] = useState<FormState>({
    parentName: "",
    phone: "",
    email: "",
    childAge: "",
    preferredLanguage: language,
    reasonForCall: "",
  });
  const [error, setError] = useState("");
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
      setError("");
      setIsSubmitting(false);
      setForm({
        parentName: "",
        phone: "",
        email: "",
        childAge: "",
        preferredLanguage: language,
        reasonForCall: "",
      });
    }
  }, [language, open]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const parentName = form.parentName.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

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
    if (form.preferredLanguage !== "en" && form.preferredLanguage !== "vi") {
      setError(copy.validationLanguage);
      return;
    }
    if (!form.reasonForCall) {
      setError(copy.validationReason);
      return;
    }

    const intake: LiveVideoPreCallIntake = {
      parentName,
      phone,
      email,
      childAge: form.childAge.trim() || undefined,
      preferredLanguage: form.preferredLanguage,
      reasonForCall: form.reasonForCall,
    };

    setIsSubmitting(true);
    setError("");

    try {
      await onSubmit(intake);
    } catch {
      setError(copy.submitError);
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
        aria-labelledby="eden-ai-precall-title"
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

        <form className="eden-ai-callback-form" onSubmit={(event) => void handleSubmit(event)}>
          <h2 id="eden-ai-precall-title" className="eden-ai-modal__title eden-ai-modal__title--left">
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

          <label className="eden-ai-callback-form__field">
            <span>{copy.childAge}</span>
            <input
              type="text"
              name="childAge"
              value={form.childAge}
              onChange={(event) => updateField("childAge", event.target.value)}
            />
          </label>

          <fieldset className="eden-ai-callback-form__fieldset">
            <legend>{copy.preferredLanguage}</legend>
            <div className="eden-ai-callback-form__choices">
              <label className="eden-ai-callback-form__choice">
                <input
                  type="radio"
                  name="preferredLanguage"
                  value="en"
                  checked={form.preferredLanguage === "en"}
                  onChange={() => updateField("preferredLanguage", "en")}
                />
                <span>{copy.languages.en}</span>
              </label>
              <label className="eden-ai-callback-form__choice">
                <input
                  type="radio"
                  name="preferredLanguage"
                  value="vi"
                  checked={form.preferredLanguage === "vi"}
                  onChange={() => updateField("preferredLanguage", "vi")}
                />
                <span>{copy.languages.vi}</span>
              </label>
            </div>
          </fieldset>

          <label className="eden-ai-callback-form__field">
            <span>{copy.reasonForCall}</span>
            <select
              name="reasonForCall"
              value={form.reasonForCall}
              onChange={(event) =>
                updateField(
                  "reasonForCall",
                  event.target.value as FormState["reasonForCall"],
                )
              }
              required
            >
              <option value="">{copy.reasonPlaceholder}</option>
              {LIVE_VIDEO_REASON_IDS.map((reasonId) => (
                <option key={reasonId} value={reasonId}>
                  {copy.reasons[reasonId]}
                </option>
              ))}
            </select>
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
      </div>
    </div>
  );
}
