"use client";

import { useEffect, useMemo, useRef } from "react";
import { CalendarDays, Loader2, MessageCircle, PenLine, Phone, Video, X } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { EDEN_INTAKE_PHONE_HREF } from "./ai-intake-config";
import { getAiIntakeSection } from "./ai-intake-i18n";
import type { LiveCoordinatorModalPhase } from "./types";

type LiveCoordinatorModalProps = {
  open: boolean;
  phase: LiveCoordinatorModalPhase;
  joinUrl?: string | null;
  onClose: () => void;
  onJoinVideoCall?: () => void;
  onScheduleCall?: () => void;
  onContinueChat?: () => void;
  onLeaveMessage?: () => void;
};

export default function LiveCoordinatorModal({
  open,
  phase,
  joinUrl,
  onClose,
  onJoinVideoCall,
  onScheduleCall,
  onContinueChat,
  onLeaveMessage,
}: LiveCoordinatorModalProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).coordinator, [language]);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && phase !== "loading") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus?.focus();
    };
  }, [open, onClose, phase]);

  if (!open) return null;

  const canJoinVideo = Boolean(joinUrl && onJoinVideoCall);

  return (
    <div className="eden-ai-modal" role="presentation">
      <button
        type="button"
        className="eden-ai-modal__backdrop"
        aria-label={copy.closeLabel}
        onClick={phase === "loading" ? undefined : onClose}
        disabled={phase === "loading"}
      />
      <div
        className="eden-ai-modal__panel eden-ai-modal__panel--connect"
        role="dialog"
        aria-modal="true"
        aria-labelledby="eden-ai-modal-title"
        aria-describedby="eden-ai-modal-description"
        aria-busy={phase === "loading"}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="eden-ai-modal__close"
          onClick={onClose}
          aria-label={copy.closeLabel}
          disabled={phase === "loading"}
        >
          <X size={18} aria-hidden="true" />
        </button>

        {phase === "loading" ? (
          <div className="eden-ai-modal__connect">
            <div className="eden-ai-modal__video-ring" aria-hidden="true">
              <Loader2 size={26} className="eden-ai-video__spinner" />
            </div>
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.loadingTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__status">
              {copy.loadingStatus}
            </p>
          </div>
        ) : null}

        {phase === "notified" ? (
          <div className="eden-ai-modal__connect">
            <div className="eden-ai-modal__video-ring" aria-hidden="true">
              <Video size={26} />
            </div>
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.notifiedTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__text eden-ai-modal__text--notice">
              {copy.notifiedMessage}
            </p>
            <div className="eden-ai-modal__actions">
              {canJoinVideo ? (
                <button type="button" className="eden-ai-modal__action eden-ai-modal__action--primary" onClick={onJoinVideoCall}>
                  <Video size={18} aria-hidden="true" />
                  {copy.joinVideoCall}
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {phase === "emailFailed" ? (
          <div className="eden-ai-modal__connect">
            <div className="eden-ai-modal__video-ring eden-ai-modal__video-ring--muted" aria-hidden="true">
              <Video size={26} />
            </div>
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.emailFailedTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__text eden-ai-modal__text--notice">
              {copy.emailFailedMessage}
            </p>
            <div className="eden-ai-modal__actions">
              {canJoinVideo ? (
                <button type="button" className="eden-ai-modal__action eden-ai-modal__action--primary" onClick={onJoinVideoCall}>
                  <Video size={18} aria-hidden="true" />
                  {copy.joinVideoCall}
                </button>
              ) : null}
              <a className="eden-ai-modal__action" href={EDEN_INTAKE_PHONE_HREF}>
                <Phone size={18} aria-hidden="true" />
                {copy.callEdenNow}
              </a>
              <button type="button" className="eden-ai-modal__action" onClick={onScheduleCall}>
                <CalendarDays size={18} aria-hidden="true" />
                {copy.scheduleCall}
              </button>
              <button type="button" className="eden-ai-modal__action" onClick={onLeaveMessage}>
                <PenLine size={18} aria-hidden="true" />
                {copy.leaveMessage}
              </button>
            </div>
          </div>
        ) : null}

        {phase === "unavailable" ? (
          <div className="eden-ai-modal__connect">
            <div className="eden-ai-modal__video-ring eden-ai-modal__video-ring--muted" aria-hidden="true">
              <Phone size={26} />
            </div>
            <h2 id="eden-ai-modal-title" className="eden-ai-modal__title">
              {copy.unavailableTitle}
            </h2>
            <p id="eden-ai-modal-description" className="eden-ai-modal__text">
              {copy.unavailableText}
            </p>
            <div className="eden-ai-modal__actions">
              <button type="button" className="eden-ai-modal__action eden-ai-modal__action--primary" onClick={onContinueChat}>
                <MessageCircle size={18} aria-hidden="true" />
                {copy.continueChat}
              </button>
              <button type="button" className="eden-ai-modal__action" onClick={onScheduleCall}>
                <CalendarDays size={18} aria-hidden="true" />
                {copy.scheduleCall}
              </button>
              <button type="button" className="eden-ai-modal__action" onClick={onLeaveMessage}>
                <PenLine size={18} aria-hidden="true" />
                {copy.leaveMessage}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
