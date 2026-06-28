"use client";

import {
  CalendarDays,
  ClipboardCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { AI_INTAKE_ACTIONS } from "./ai-intake-config";
import type { AiIntakeActionId } from "./types";

const ICONS = {
  message: MessageCircle,
  shield: ShieldCheck,
  calendar: CalendarDays,
  clipboard: ClipboardCheck,
  referral: Stethoscope,
  person: Phone,
} as const;

type AiIntakeActionButtonsProps = {
  onAction: (actionId: AiIntakeActionId) => void;
};

export default function AiIntakeActionButtons({ onAction }: AiIntakeActionButtonsProps) {
  return (
    <div className="eden-ai-actions" role="group" aria-label="AI intake assistant actions">
      {AI_INTAKE_ACTIONS.map((action) => {
        const Icon = ICONS[action.icon];
        return (
          <button
            key={action.id}
            type="button"
            className="eden-ai-actions__button"
            onClick={() => onAction(action.id)}
            aria-label={`${action.label}. ${action.description}`}
          >
            <span className="eden-ai-actions__icon" aria-hidden="true">
              <Icon size={18} strokeWidth={2.25} />
            </span>
            <span className="eden-ai-actions__label">{action.label}</span>
          </button>
        );
      })}
    </div>
  );
}
