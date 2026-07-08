"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { useLiveVideoIntake } from "@/hooks/useLiveVideoIntake";
import AiIntakeActionButtons from "./AiIntakeActionButtons";
import AiReceptionistVideoPanel from "./AiReceptionistVideoPanel";
import { EDEN_START_AI_CHAT_EVENT } from "./ai-intake-config";
import LiveVideoIntakeModals from "./LiveVideoIntakeModals";
import { getAiIntakeSection } from "./ai-intake-i18n";
import type { AiIntakeAssistantHandlers, AiIntakeActionId } from "./types";
import "./ai-intake-assistant.css";

type AiIntakeAssistantSectionProps = AiIntakeAssistantHandlers;

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
  const [chatActive, setChatActive] = useState(false);

  const liveVideo = useLiveVideoIntake({
    onSpeakWithPerson,
    onScheduleCall,
    scrollToChatSelector: ".eden-ai-video",
  });

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
          liveVideo.openPreCallModal();
          break;
        default:
          break;
      }
    },
    [
      liveVideo.openPreCallModal,
      onAskQuestion,
      onCheckInsurance,
      onSchedule,
      onStartIntake,
      onProviderReferral,
    ],
  );

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
              <button type="button" className="eden-ai-intake__cta eden-ai-intake__cta--ghost" onClick={liveVideo.openPreCallModal}>
                {copy.cta.speakWithPerson}
              </button>
            </div>
          </div>
        </div>
      </div>

      <LiveVideoIntakeModals {...liveVideo} />
    </section>
  );
}
