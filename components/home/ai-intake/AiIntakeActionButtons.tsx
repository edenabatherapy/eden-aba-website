"use client";

import {
  CalendarDays,
  ClipboardCheck,
  MessageCircle,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { useMemo } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { AI_INTAKE_ACTIONS } from "./ai-intake-config";
import { getAiIntakeCopy } from "./ai-intake-i18n";
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
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeCopy(language), [language]);

  return (
    <div className="eden-ai-actions" role="group" aria-label={copy.actionsAriaLabel}>
      {AI_INTAKE_ACTIONS.map((action) => {
        const Icon = ICONS[action.icon];
        const actionCopy = copy.actions[action.id];
        return (
          <button
            key={action.id}
            type="button"
            className="eden-ai-actions__button"
            onClick={() => onAction(action.id)}
            aria-label={`${actionCopy.label}. ${actionCopy.description}`}
          >
            <span className="eden-ai-actions__icon" aria-hidden="true">
              <Icon size={18} strokeWidth={2.25} />
            </span>
            <span className="eden-ai-actions__label">{actionCopy.label}</span>
          </button>
        );
      })}
    </div>
  );
}
