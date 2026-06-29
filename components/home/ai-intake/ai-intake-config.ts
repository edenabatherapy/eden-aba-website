import type { AiIntakeActionId, AiIntakeIntegrationId } from "./types";

export const EDEN_START_AI_CHAT_EVENT = "eden:start-ai-chat";

/** Eden intake line for live video fallback options. */
export const EDEN_INTAKE_PHONE_HREF = "tel:+17035875238";

export type AiIntakeActionConfig = {
  id: AiIntakeActionId;
  icon: "message" | "shield" | "calendar" | "clipboard" | "referral" | "person";
};

export const AI_INTAKE_ACTIONS: AiIntakeActionConfig[] = [
  { id: "ask-question", icon: "message" },
  { id: "check-insurance", icon: "shield" },
  { id: "schedule", icon: "calendar" },
  { id: "start-intake", icon: "clipboard" },
  { id: "provider-referral", icon: "referral" },
  { id: "speak-with-person", icon: "person" },
];

export const TRUSTED_HEALTHCARE_TECH_IDS: AiIntakeIntegrationId[] = [
  "heygen",
  "elevenlabs",
  "openai",
  "calendly",
  "daily",
  "ringcentral",
  "centralreach",
];
