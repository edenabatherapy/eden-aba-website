"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { AI_RECEPTIONIST_GREETING } from "./ai-intake-config";

type AiReceptionistPlaceholderPanelProps = {
  active?: boolean;
};

export default function AiReceptionistPlaceholderPanel({
  active = true,
}: AiReceptionistPlaceholderPanelProps) {
  const fullText = useMemo(() => AI_RECEPTIONIST_GREETING.join("\n"), []);
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
    <div className="eden-ai-video" aria-label="AI receptionist preview">
      <div className="eden-ai-video__glow" aria-hidden="true" />
      <div className="eden-ai-video__frame">
        <div className="eden-ai-video__glass">
          <div className="eden-ai-video__topbar">
            <div className="eden-ai-video__status">
              <span className="eden-ai-video__status-dot" aria-hidden="true" />
              <span className="eden-ai-video__status-label">AI Receptionist</span>
              <span className="eden-ai-video__status-badge">Preview Mode</span>
            </div>
            <button
              type="button"
              className="eden-ai-video__sound"
              aria-label="Sound disabled in preview mode"
              disabled
            >
              <Volume2 size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="eden-ai-video__stage">
            <p className="eden-ai-video__placeholder-label">AI Receptionist Video</p>
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

          <div className="eden-ai-video__shimmer" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
