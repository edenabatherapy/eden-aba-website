"use client";

import { useEffect, useState } from "react";
import EdenLogo from "@/components/EdenLogo";
import {
  CHILD_CLOCK_STAGES,
  childClockNoteTextColor,
  type ChildClockStage,
} from "@/lib/child-clock-stages";
import "./ChildClockPanel.css";

declare global {
  interface Window {
    initChildClock?: () => void;
    getClockActiveStageIndex?: () => number;
  }
}

const CHILD_CLOCK_SCRIPT = "/assets/js/child-clock.js";

function StageNote({
  stage,
  className,
}: {
  stage: ChildClockStage;
  className?: string;
}) {
  const textColor = childClockNoteTextColor(stage.color);

  return (
    <div
      className={`eden-child-clock__note ${className ?? ""}`}
      style={{
        backgroundColor: stage.color,
        color: textColor,
        boxShadow: `0 0 30px ${stage.color}66`,
      }}
      aria-live="polite"
    >
      <div key={stage.id} className="eden-child-clock__note-content eden-child-clock__note--visible">
        <h4 className="eden-child-clock__note-title">{stage.title}</h4>
        <p className="eden-child-clock__note-text">{stage.description}</p>
      </div>
    </div>
  );
}

function ChildClockStaticFallback({ stage }: { stage: ChildClockStage }) {
  return (
    <div className="eden-child-clock__fallback" aria-hidden="true">
      <svg viewBox="0 0 400 400" className="eden-child-clock__fallback-svg" role="presentation">
        <defs>
          <radialGradient id="edenClockFallbackGlow" cx="50%" cy="46%" r="58%">
            <stop offset="0%" stopColor={stage.color} stopOpacity="0.45" />
            <stop offset="55%" stopColor="#0f766e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="400" fill="url(#edenClockFallbackGlow)" />
        {[0, 1, 2, 3, 4].map((ring) => (
          <circle
            key={ring}
            cx="200"
            cy="200"
            r={58 + ring * 28}
            fill="none"
            stroke={stage.color}
            strokeOpacity={0.34 - ring * 0.05}
            strokeWidth={ring === 0 ? 3 : 1.5}
          />
        ))}
        <circle cx="200" cy="200" r="54" fill="rgba(255,255,255,0.08)" stroke={stage.color} strokeWidth="4" />
        <line x1="200" y1="200" x2="200" y2="132" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        <line x1="200" y1="200" x2="248" y2="200" stroke={stage.color} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <circle cx="200" cy="200" r="8" fill="#ffffff" />
      </svg>
      <p className="eden-child-clock__fallback-label">Autism awareness timeline</p>
    </div>
  );
}

function ChildClockErrorFallback() {
  return (
    <div className="eden-child-clock__error" role="img" aria-label="Eden ABA Therapy autism awareness visualization unavailable">
      <div className="eden-child-clock__error-brand">
        <EdenLogo size="compact" className="eden-child-clock__error-logo" />
      </div>
      <p className="eden-child-clock__error-title">Eden ABA Therapy</p>
      <p className="eden-child-clock__error-text">
        Early screening and family support matter. Explore autism resources while this visualization loads.
      </p>
    </div>
  );
}

export default function ChildClockPanel() {
  const [stageIndex, setStageIndex] = useState(0);
  const [clockPainted, setClockPainted] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  const activeStage = CHILD_CLOCK_STAGES[stageIndex] ?? CHILD_CLOCK_STAGES[0];
  const showStaticFallback = !clockPainted && !scriptFailed;

  useEffect(() => {
    const canvas = document.getElementById("scene");
    if (!canvas) return undefined;

    if (canvas.dataset.hasPainted === "true") {
      setClockPainted(true);
    }

    const handlePainted = () => setClockPainted(true);
    canvas.addEventListener("eden-clock-painted", handlePainted);

    return () => canvas.removeEventListener("eden-clock-painted", handlePainted);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let frame = 0;

    const beginSync = () => {
      if (cancelled) return;

      window.initChildClock?.();

      const canvas = document.getElementById("scene");
      if (canvas?.dataset.hasPainted === "true") {
        setClockPainted(true);
      }

      const syncStageFromClock = () => {
        const nextIndex = window.getClockActiveStageIndex?.() ?? 0;
        setStageIndex(nextIndex);
        frame = window.requestAnimationFrame(syncStageFromClock);
      };

      frame = window.requestAnimationFrame(syncStageFromClock);
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-child-clock="true"]');

    if (existingScript) {
      if (window.initChildClock) {
        beginSync();
      } else {
        existingScript.addEventListener("load", beginSync, { once: true });
        existingScript.addEventListener("error", () => setScriptFailed(true), { once: true });
      }
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(frame);
      };
    }

    const script = document.createElement("script");
    script.src = CHILD_CLOCK_SCRIPT;
    script.async = true;
    script.dataset.childClock = "true";
    script.onload = beginSync;
    script.onerror = () => setScriptFailed(true);
    document.body.appendChild(script);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="eden-child-clock-shell">
      <div className="eden-child-clock">
        {showStaticFallback ? <ChildClockStaticFallback stage={activeStage} /> : null}
        {scriptFailed ? <ChildClockErrorFallback /> : null}

        {!scriptFailed ? (
          <canvas id="scene" aria-label="Child Clock autism early screening visualization" />
        ) : null}

        <div className="eden-child-clock__overlay">
          <StageNote stage={activeStage} className="eden-child-clock__note--desktop" />
        </div>
      </div>

      <div className="eden-child-clock__note-mobile">
        <StageNote stage={activeStage} />
      </div>
    </div>
  );
}
