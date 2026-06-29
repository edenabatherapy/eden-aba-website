"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import AiIntakeActionButtons from "./AiIntakeActionButtons";
import AiReceptionistVideoPanel from "./AiReceptionistVideoPanel";
import { EDEN_START_AI_CHAT_EVENT } from "./ai-intake-config";
import LiveCoordinatorModal from "./LiveCoordinatorModal";
import IntakeCallbackMessageModal from "./IntakeCallbackMessageModal";
import TrustedHealthcareTech from "./TrustedHealthcareTech";
import { getAiIntakeSection } from "./ai-intake-i18n";
import type { AiIntakeAssistantHandlers, AiIntakeActionId, LiveCoordinatorModalPhase } from "./types";
import "./ai-intake-assistant.css";

type AiIntakeAssistantSectionProps = AiIntakeAssistantHandlers;

const CONNECTING_DURATION_MS = 3800;

export default function AiIntakeAssistantSection({
  onAskQuestion,
  onCheckInsurance,
  onSchedule,
  onStartIntake,
  onProviderReferral,
  onSpeakWithPerson,
  onScheduleCall,
}: AiIntakeAssistantSectionProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language), [language]);

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPhase, setModalPhase] = useState<LiveCoordinatorModalPhase>("connecting");
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!modalOpen || modalPhase !== "connecting") return undefined;

    const timer = window.setTimeout(() => {
      setModalPhase("unavailable");
    }, CONNECTING_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [modalOpen, modalPhase]);

  const openLiveCoordinatorModal = useCallback(() => {
    setModalPhase("connecting");
    setModalOpen(true);
    onSpeakWithPerson?.();
  }, [onSpeakWithPerson]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalPhase("connecting");
  }, []);

  const handleAction = useCallback(
    (actionId: AiIntakeActionId) => {
      switch (actionId) {
        case "ask-question":
          setChatActive(true);
          onAskQuestion?.();
          window.dispatchEvent(new CustomEvent(EDEN_START_AI_CHAT_EVENT));
          sectionRef.current
            ?.querySelector<HTMLElement>(".eden-ai-video")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
          break;
        case "check-insurance":
          onCheckInsurance?.();
          break;
        case "schedule":
          onSchedule?.();
          break;
        case "start-intake":
          onStartIntake?.();
          break;
        case "provider-referral":
          onProviderReferral?.();
          break;
        case "speak-with-person":
          openLiveCoordinatorModal();
          break;
        default:
          break;
      }
    },
    [
      onAskQuestion,
      onCheckInsurance,
      onSchedule,
      onStartIntake,
      onProviderReferral,
      openLiveCoordinatorModal,
    ],
  );

  const handleContinueChat = useCallback(() => {
    closeModal();
    setChatActive(true);
    window.dispatchEvent(new CustomEvent(EDEN_START_AI_CHAT_EVENT));
    sectionRef.current
      ?.querySelector<HTMLElement>(".eden-ai-video")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [closeModal]);

  const handleLeaveMessage = useCallback(() => {
    closeModal();
    setCallbackModalOpen(true);
  }, [closeModal]);

  return (
    <section
      ref={sectionRef}
      id="meet-eden-ai"
      className={`eden-ai-intake${isVisible ? " eden-ai-intake--visible" : ""}`}
      aria-labelledby="eden-ai-intake-title"
    >
      <div className="eden-ai-intake__ambient" aria-hidden="true" />

      <div className="eden-ai-intake__shell">
        <div className="eden-ai-intake__grid">
          <div className="eden-ai-intake__panel-wrap">
            {isVisible ? <AiReceptionistVideoPanel active={isVisible || chatActive} /> : null}
            {isVisible ? <AiIntakeActionButtons onAction={handleAction} /> : null}
          </div>

          <div className="eden-ai-intake__content">
            <p className="eden-ai-intake__eyebrow">
              <Sparkles size={14} aria-hidden="true" />
              {copy.eyebrow}
            </p>
            <h2 id="eden-ai-intake-title" className="eden-ai-intake__title">
              {copy.titleLead}
              <span>{copy.titleAccent}</span>
            </h2>
            <p className="eden-ai-intake__subtitle">{copy.subtitle}</p>
            <p className="eden-ai-intake__description">{copy.description}</p>

            <ul className="eden-ai-intake__capabilities" aria-label={copy.capabilitiesAriaLabel}>
              {copy.capabilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="eden-ai-intake__ctas">
              <button type="button" className="eden-ai-intake__cta eden-ai-intake__cta--primary" onClick={() => handleAction("start-intake")}>
                {copy.cta.startIntake}
              </button>
              <button type="button" className="eden-ai-intake__cta eden-ai-intake__cta--secondary" onClick={() => handleAction("ask-question")}>
                {copy.cta.askQuestion}
              </button>
              <button type="button" className="eden-ai-intake__cta eden-ai-intake__cta--ghost" onClick={openLiveCoordinatorModal}>
                {copy.cta.speakWithPerson}
              </button>
            </div>
          </div>
        </div>

        {isVisible ? <TrustedHealthcareTech /> : null}
      </div>

      <LiveCoordinatorModal
        open={modalOpen}
        phase={modalPhase}
        onClose={closeModal}
        onScheduleCall={() => {
          closeModal();
          onScheduleCall?.();
        }}
        onContinueChat={handleContinueChat}
        onLeaveMessage={handleLeaveMessage}
      />

      <IntakeCallbackMessageModal
        open={callbackModalOpen}
        onClose={() => setCallbackModalOpen(false)}
      />
    </section>
  );
}
