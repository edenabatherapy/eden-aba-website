"use client";

import IntakeCallbackMessageModal from "./IntakeCallbackMessageModal";
import LiveCoordinatorModal from "./LiveCoordinatorModal";
import LiveVideoPreCallFormModal from "./LiveVideoPreCallFormModal";
import type { LiveVideoIntakeController } from "@/hooks/useLiveVideoIntake";
import "./ai-intake-assistant.css";

type LiveVideoIntakeModalsProps = Pick<
  LiveVideoIntakeController,
  | "preCallModalOpen"
  | "closePreCallModal"
  | "submitPreCallAndStartVideo"
  | "connectModalOpen"
  | "connectModalPhase"
  | "dailyJoinUrl"
  | "closeConnectModal"
  | "joinDailyVideoCall"
  | "handleScheduleCall"
  | "handleContinueChat"
  | "handleLeaveMessage"
  | "callbackModalOpen"
  | "setCallbackModalOpen"
>;

export default function LiveVideoIntakeModals({
  preCallModalOpen,
  closePreCallModal,
  submitPreCallAndStartVideo,
  connectModalOpen,
  connectModalPhase,
  dailyJoinUrl,
  closeConnectModal,
  joinDailyVideoCall,
  handleScheduleCall,
  handleContinueChat,
  handleLeaveMessage,
  callbackModalOpen,
  setCallbackModalOpen,
}: LiveVideoIntakeModalsProps) {
  return (
    <>
      <LiveVideoPreCallFormModal
        open={preCallModalOpen}
        onClose={closePreCallModal}
        onSubmit={submitPreCallAndStartVideo}
      />

      <LiveCoordinatorModal
        open={connectModalOpen}
        phase={connectModalPhase}
        joinUrl={dailyJoinUrl}
        onClose={closeConnectModal}
        onJoinVideoCall={joinDailyVideoCall}
        onScheduleCall={handleScheduleCall}
        onContinueChat={handleContinueChat}
        onLeaveMessage={handleLeaveMessage}
      />

      <IntakeCallbackMessageModal open={callbackModalOpen} onClose={() => setCallbackModalOpen(false)} />
    </>
  );
}
