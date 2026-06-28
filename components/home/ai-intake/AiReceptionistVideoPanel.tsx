"use client";

import { useEffect, useMemo, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import { AI_RECEPTIONIST_GREETING } from "./ai-intake-config";

type AiReceptionistVideoPanelProps = {
  active?: boolean;
};

export default function AiReceptionistVideoPanel({ active = true }: AiReceptionistVideoPanelProps) {
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
    <div className="eden-ai-video" aria-label="AI receptionist video preview">
      <div className="eden-ai-video__glow" aria-hidden="true" />
      <div className="eden-ai-video__frame">
        <div className="eden-ai-video__glass">
          <div className="eden-ai-video__topbar">
            <div className="eden-ai-video__status">
              <span className="eden-ai-video__status-dot" aria-hidden="true" />
              <span className="eden-ai-video__status-label">AI Receptionist</span>
              <span className="eden-ai-video__status-badge">Available Now</span>
            </div>
            <button
              type="button"
              className="eden-ai-video__sound"
              aria-label="Sound enabled (demonstration)"
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
              aria-label="Play AI receptionist preview (coming soon)"
              disabled
            >
              <Play size={28} aria-hidden="true" />
            </button>
            <pre
              className="eden-ai-video__script"
              aria-live="polite"
              aria-atomic="true"
            >
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
