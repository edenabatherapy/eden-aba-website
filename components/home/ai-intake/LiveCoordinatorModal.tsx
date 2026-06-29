"use client";

import { useEffect, useMemo, useRef } from "react";
import { CalendarDays, MessageCircle, PenLine, Phone, X } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getAiIntakeSection } from "./ai-intake-i18n";
import type { LiveCoordinatorModalPhase } from "./types";

type LiveCoordinatorModalProps = {
  open: boolean;
  phase: LiveCoordinatorModalPhase;
  onClose: () => void;
  onScheduleCall?: () => void;
  onContinueChat?: () => void;
  onLeaveMessage?: () => void;
};

export default function LiveCoordinatorModal({
  open,
  phase,
  onClose,
  onScheduleCall,
  onContinueChat,
  onLeaveMessage,
}: LiveCoordinatorModalProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).coordinator, [language]);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

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
        ref={dialogRef}
        className="eden-ai-modal__panel"
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
          aria-label="Close dialog"
        >
          <X size={18} aria-hidden="true" />
        </button>

        {phase === "connecting" ? (
          <div className="eden-ai-modal__connecting">
            <div className="eden-ai-modal__pulse-ring" aria-hidden="true">
              <Phone size={24} />
            </div>
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.connectingTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__status">
              {copy.connectingStatus}
              <span className="eden-ai-modal__dots" aria-hidden="true">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </p>
            <p className="eden-ai-modal__wait">
              {copy.waitLabel} <strong>{copy.waitTime}</strong>
            </p>
          </div>
        ) : (
          <div className="eden-ai-modal__unavailable">
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.unavailableTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__text">
              {copy.unavailableText}
            </p>
            <div className="eden-ai-modal__actions">
              <button type="button" className="eden-ai-modal__action" onClick={onScheduleCall}>
                <CalendarDays size={18} aria-hidden="true" />
                {copy.scheduleCall}
              </button>
              <button type="button" className="eden-ai-modal__action" onClick={onContinueChat}>
                <MessageCircle size={18} aria-hidden="true" />
                {copy.continueChat}
              </button>
              <button type="button" className="eden-ai-modal__action" onClick={onLeaveMessage}>
                <PenLine size={18} aria-hidden="true" />
                {copy.leaveMessage}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
