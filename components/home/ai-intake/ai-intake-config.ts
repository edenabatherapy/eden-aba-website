import type { AiIntakeActionId, AiIntakeIntegrationId } from "./types";

export const AI_INTAKE_CAPABILITIES = [
  "Answer common ABA therapy questions with clear, family-friendly guidance",
  "Explain Eden services, settings, and what families may expect during care",
  "Walk through insurance verification steps and documentation families may need",
  "Help with scheduling questions and appointment preparation",
  "Guide families through the intake process step by step",
  "Support provider referral questions and professional handoff expectations",
  "Respond to frequently asked questions about getting started",
  "Connect families with a live intake coordinator whenever one is available",
] as const;

export type AiIntakeActionConfig = {
  id: AiIntakeActionId;
  label: string;
  description: string;
  icon: "message" | "shield" | "calendar" | "clipboard" | "referral" | "person";
};

export const AI_INTAKE_ACTIONS: AiIntakeActionConfig[] = [
  {
    id: "ask-question",
    label: "Ask a Question",
    description: "Chat with Eden about ABA, services, and next steps.",
    icon: "message",
  },
  {
    id: "check-insurance",
    label: "Check Insurance",
    description: "Learn how Eden may help verify benefits.",
    icon: "shield",
  },
  {
    id: "schedule",
    label: "Schedule Appointment",
    description: "Explore scheduling options when appropriate.",
    icon: "calendar",
  },
  {
    id: "start-intake",
    label: "Start Intake",
    description: "Begin the family intake journey with confidence.",
    icon: "clipboard",
  },
  {
    id: "provider-referral",
    label: "Provider Referral",
    description: "Professional referral guidance for care partners.",
    icon: "referral",
  },
  {
    id: "speak-with-person",
    label: "Speak with a Person",
    description: "Request a live Eden intake coordinator.",
    icon: "person",
  },
];

export type TrustedTechCard = {
  id: AiIntakeIntegrationId;
  name: string;
  role: string;
  description: string;
};

export const TRUSTED_HEALTHCARE_TECH: TrustedTechCard[] = [
  {
    id: "heygen",
    name: "HeyGen",
    role: "AI Avatar",
    description: "Future avatar experience for welcoming, visual intake conversations.",
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    role: "Natural Voice",
    description: "Planned natural voice layer for warm, accessible guidance.",
  },
  {
    id: "openai",
    name: "OpenAI",
    role: "Conversation Intelligence",
    description: "Structured conversational support for common intake questions.",
  },
  {
    id: "calendly",
    name: "Calendly",
    role: "Scheduling",
    description: "Appointment coordination when families are ready to schedule.",
  },
  {
    id: "daily",
    name: "Daily.co",
    role: "Secure Video Calls",
    description: "Secure video connection options for virtual intake support.",
  },
  {
    id: "ringcentral",
    name: "RingCentral",
    role: "Business Phone",
    description: "Professional phone routing to Eden intake coordinators.",
  },
  {
    id: "centralreach",
    name: "CentralReach",
    role: "ABA Practice Management",
    description: "Clinical operations platform supporting Eden care workflows.",
  },
];

export const AI_RECEPTIONIST_GREETING = [
  "Hello!",
  "I'm Eden,",
  "your AI Intake Assistant.",
  "",
  "I'm here to answer questions about ABA therapy,",
  "insurance,",
  "appointments,",
  "and getting started.",
  "",
  "How can I help today?",
] as const;
