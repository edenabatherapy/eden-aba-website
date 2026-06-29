"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bot, CalendarDays, PenLine, Phone, Video, X } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { EDEN_INTAKE_PHONE_HREF, getEdenLiveVideoUrl } from "./ai-intake-config";
import { getAiIntakeSection } from "./ai-intake-i18n";

type LiveCoordinatorModalProps = {
  open: boolean;
  onClose: () => void;
  onScheduleCall?: () => void;
  onContinueWithAi?: () => void;
  onLeaveMessage?: () => void;
};

export default function LiveCoordinatorModal({
  open,
  onClose,
  onScheduleCall,
  onContinueWithAi,
  onLeaveMessage,
}: LiveCoordinatorModalProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).coordinator, [language]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [liveVideoUnavailable, setLiveVideoUnavailable] = useState(false);

  useEffect(() => {
    if (!open) {
      setLiveVideoUnavailable(false);
      return undefined;
    }

    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [open, onClose]);

  const handleStartLiveVideo = useCallback(() => {
    const liveVideoUrl = getEdenLiveVideoUrl();

    if (liveVideoUrl) {
      setLiveVideoUnavailable(false);
      window.open(liveVideoUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setLiveVideoUnavailable(true);
  }, []);

  if (!open) return null;

  return (
    <div className="eden-ai-modal" role="presentation">
      <button
        type="button"
        className="eden-ai-modal__backdrop"
        aria-label={copy.closeLabel}
        onClick={onClose}
      />
      <div
        className="eden-ai-modal__panel eden-ai-modal__panel--connect"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eden-ai-modal-title"
        aria-describedby="eden-ai-modal-description"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="eden-ai-modal__close"
          onClick={onClose}
          aria-label={copy.closeLabel}
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="eden-ai-modal__connect">
          <div className="eden-ai-modal__video-ring" aria-hidden="true">
            <Video size={26} />
          </div>

          <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
            {copy.title}
          </h2>
          <p id="eden-ai-modal-description" className="eden-ai-modal__text">
            {copy.description}
          </p>

          {liveVideoUnavailable ? (
            <p className="eden-ai-modal__notice" role="alert">
              {copy.liveVideoUnavailable}
            </p>
          ) : null}

          <div className="eden-ai-modal__actions">
            <button
              type="button"
              className="eden-ai-modal__action eden-ai-modal__action--primary"
              onClick={handleStartLiveVideo}
            >
              <Video size={18} aria-hidden="true" />
              {copy.startLiveVideo}
            </button>

            <a className="eden-ai-modal__action" href={EDEN_INTAKE_PHONE_HREF}>
              <Phone size={18} aria-hidden="true" />
              {copy.callEdenNow}
            </a>

            <button type="button" className="eden-ai-modal__action" onClick={onScheduleCall}>
              <CalendarDays size={18} aria-hidden="true" />
              {copy.scheduleCall}
            </button>

            <button type="button" className="eden-ai-modal__action" onClick={onContinueWithAi}>
              <Bot size={18} aria-hidden="true" />
              {copy.continueWithAi}
            </button>

            <button type="button" className="eden-ai-modal__action" onClick={onLeaveMessage}>
              <PenLine size={18} aria-hidden="true" />
              {copy.leaveMessage}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
