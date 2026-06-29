import type { ReactNode } from "react";
import {
  EDEN_AI_INTAKE_LOGO_ALT,
  EDEN_AI_INTAKE_LOGO_PATH,
} from "./ai-intake-brand";

type AiIntakeVideoTopBarProps = {
  statusLabel?: string;
  badge: string;
  soundButton: ReactNode;
};

export function AiIntakeVideoTopBar({
  statusLabel = "Eden AI Intake Assistant",
  badge,
  soundButton,
}: AiIntakeVideoTopBarProps) {
  return (
    <div className="eden-ai-video__topbar">
      <div className="eden-ai-video__status">
        <img
          src={EDEN_AI_INTAKE_LOGO_PATH}
          alt=""
          className="eden-ai-video__brand-mark"
          aria-hidden="true"
          width={28}
          height={28}
        />
        <span className="eden-ai-video__status-dot" aria-hidden="true" />
        <span className="eden-ai-video__status-label">{statusLabel}</span>
        <span className="eden-ai-video__status-badge">{badge}</span>
      </div>
      {soundButton}
    </div>
  );
}

type AiIntakeBrandedMediaFrameProps = {
  children: ReactNode;
  showWatermark?: boolean;
  showCornerBadge?: boolean;
};

export function AiIntakeBrandedMediaFrame({
  children,
  showWatermark = true,
  showCornerBadge = true,
}: AiIntakeBrandedMediaFrameProps) {
  return (
    <div className="eden-ai-video__media-wrap eden-ai-video__media-wrap--branded">
      {showWatermark ? (
        <img
          src={EDEN_AI_INTAKE_LOGO_PATH}
          alt=""
          className="eden-ai-video__watermark"
          aria-hidden="true"
        />
      ) : null}
      {showCornerBadge ? (
        <div className="eden-ai-video__corner-badge" aria-hidden="true">
          <img src={EDEN_AI_INTAKE_LOGO_PATH} alt="" width={48} height={48} />
        </div>
      ) : null}
      {children}
    </div>
  );
}

export { EDEN_AI_INTAKE_LOGO_ALT, EDEN_AI_INTAKE_LOGO_PATH };
