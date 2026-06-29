"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import AiIntakeAvatarBackdrop from "./AiIntakeAvatarBackdrop";
import { AiIntakeBrandedMediaFrame, AiIntakeVideoTopBar } from "./AiIntakeVideoBrand";
import { getAiIntakeCopy } from "./ai-intake-i18n";

type AiReceptionistPlaceholderPanelProps = {
  active?: boolean;
};

export default function AiReceptionistPlaceholderPanel({
  active = true,
}: AiReceptionistPlaceholderPanelProps) {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeCopy(language), [language]);
  const fullText = useMemo(() => copy.greeting.join("\n"), [copy.greeting]);
  const [typedText, setTypedText] = useState("");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!active) return undefined;

    if (prefersReducedMotion) {
      setTypedText(fullText);
      return undefined;
    }

    let index = 0;
    setTypedText("");

    const interval = window.setInterval(() => {
      index += 1;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        window.clearInterval(interval);
      }
    }, 22);

    return () => window.clearInterval(interval);
  }, [active, fullText, prefersReducedMotion]);

  return (
    <div className="eden-ai-video" aria-label={copy.assistantTitle}>
      <div className="eden-ai-video__glow" aria-hidden="true" />
      <div className="eden-ai-video__frame">
        <div className="eden-ai-video__glass">
          <AiIntakeVideoTopBar
            statusLabel={copy.statusLabel}
            badge={copy.badgePreview}
            soundButton={
              <button
                type="button"
                className="eden-ai-video__sound"
                aria-label={copy.mute}
                disabled
              >
                <Volume2 size={16} aria-hidden="true" />
              </button>
            }
          />

          <div className="eden-ai-video__stage eden-ai-video__stage--live">
            <AiIntakeBrandedMediaFrame showWatermark={false} showCornerBadge={false}>
              <AiIntakeAvatarBackdrop />
              <div className="eden-ai-video__media-overlay eden-ai-video__media-overlay--preview">
                <p className="eden-ai-video__placeholder-label">{copy.placeholderLabel}</p>
                <button
                  type="button"
                  className="eden-ai-video__play"
                  aria-label="Preview placeholder"
                  disabled
                >
                  <Play size={28} aria-hidden="true" />
                </button>
                <pre className="eden-ai-video__script" aria-live="polite" aria-atomic="true">
                  {typedText}
                  {!prefersReducedMotion && typedText.length < fullText.length ? (
                    <span className="eden-ai-video__cursor" aria-hidden="true">
                      |
                    </span>
                  ) : null}
                </pre>
              </div>
            </AiIntakeBrandedMediaFrame>
          </div>

          <div className="eden-ai-video__shimmer" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
