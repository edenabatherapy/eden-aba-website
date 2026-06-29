/** Phase 2 integration identifiers — wired when backends are connected. */
export type AiIntakeIntegrationId =
  | "openai"
  | "heygen"
  | "elevenlabs"
  | "calendly"
  | "daily"
  | "ringcentral"
  | "centralreach";

export type AiIntakeActionId =
  | "ask-question"
  | "check-insurance"
  | "schedule"
  | "start-intake"
  | "provider-referral"
  | "speak-with-person";

export type LiveCoordinatorModalPhase = "loading" | "unavailable";

export type AiIntakeAssistantHandlers = {
  onAskQuestion?: () => void;
  onCheckInsurance?: () => void;
  onSchedule?: () => void;
  onStartIntake?: () => void;
  onProviderReferral?: () => void;
  onSpeakWithPerson?: () => void;
  onScheduleCall?: () => void;
  onContinueChat?: () => void;
  onLeaveMessage?: () => void;
};
