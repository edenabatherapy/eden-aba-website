"use client";

import { useCallback, useRef, useState } from "react";
import { EDEN_START_AI_CHAT_EVENT } from "@/components/home/ai-intake/ai-intake-config";
import type { LiveCoordinatorModalPhase } from "@/components/home/ai-intake/types";
import type { LiveVideoPreCallIntake } from "@/lib/daily/live-video-intake-payload";

type CreateDailyRoomResponse = {
  ok?: boolean;
  joinUrl?: string;
  emailNotificationSent?: boolean;
  message?: string;
};

export type UseLiveVideoIntakeOptions = {
  onSpeakWithPerson?: () => void;
  onScheduleCall?: () => void;
  scrollToChatSelector?: string;
};

export function useLiveVideoIntake(options: UseLiveVideoIntakeOptions = {}) {
  const { onSpeakWithPerson, onScheduleCall, scrollToChatSelector } = options;
  const speakWithPersonInFlightRef = useRef(false);

  const [preCallModalOpen, setPreCallModalOpen] = useState(false);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [connectModalPhase, setConnectModalPhase] = useState<LiveCoordinatorModalPhase>("loading");
  const [dailyJoinUrl, setDailyJoinUrl] = useState<string | null>(null);
  const [callbackModalOpen, setCallbackModalOpen] = useState(false);

  const openPreCallModal = useCallback(() => {
    setPreCallModalOpen(true);
    onSpeakWithPerson?.();
  }, [onSpeakWithPerson]);

  const closePreCallModal = useCallback(() => {
    setPreCallModalOpen(false);
  }, []);

  const closeConnectModal = useCallback(() => {
    setConnectModalOpen(false);
    setConnectModalPhase("loading");
    setDailyJoinUrl(null);
  }, []);

  const joinDailyVideoCall = useCallback(() => {
    if (!dailyJoinUrl) return;
    window.open(dailyJoinUrl, "_blank", "noopener,noreferrer");
  }, [dailyJoinUrl]);

  const openDailyVideoRoom = useCallback((joinUrl: string) => {
    window.open(joinUrl, "_blank", "noopener,noreferrer");
  }, []);

  const submitPreCallAndStartVideo = useCallback(
    async (intake: LiveVideoPreCallIntake) => {
      if (speakWithPersonInFlightRef.current) return;

      speakWithPersonInFlightRef.current = true;
      setPreCallModalOpen(false);
      setConnectModalOpen(true);
      setConnectModalPhase("loading");
      setDailyJoinUrl(null);

      try {
        const response = await fetch("/api/daily/create-room", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageUrl: typeof window !== "undefined" ? window.location.href : "",
            intake,
          }),
        });

        const result = (await response.json().catch(() => ({}))) as CreateDailyRoomResponse;

        if (!response.ok || !result.ok || !result.joinUrl) {
          setConnectModalPhase("unavailable");
          return;
        }

        setDailyJoinUrl(result.joinUrl);
        setConnectModalPhase(result.emailNotificationSent ? "notified" : "emailFailed");
        openDailyVideoRoom(result.joinUrl);
      } catch {
        setConnectModalPhase("unavailable");
      } finally {
        speakWithPersonInFlightRef.current = false;
      }
    },
    [openDailyVideoRoom],
  );

  const handleContinueChat = useCallback(() => {
    closeConnectModal();
    window.dispatchEvent(new CustomEvent(EDEN_START_AI_CHAT_EVENT));
    if (scrollToChatSelector) {
      document.querySelector(scrollToChatSelector)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [closeConnectModal, scrollToChatSelector]);

  const handleLeaveMessage = useCallback(() => {
    closeConnectModal();
    setCallbackModalOpen(true);
  }, [closeConnectModal]);

  const handleScheduleCall = useCallback(() => {
    closeConnectModal();
    onScheduleCall?.();
  }, [closeConnectModal, onScheduleCall]);

  return {
    preCallModalOpen,
    openPreCallModal,
    closePreCallModal,
    connectModalOpen,
    connectModalPhase,
    dailyJoinUrl,
    closeConnectModal,
    joinDailyVideoCall,
    submitPreCallAndStartVideo,
    callbackModalOpen,
    setCallbackModalOpen,
    handleContinueChat,
    handleLeaveMessage,
    handleScheduleCall,
  };
}

export type LiveVideoIntakeController = ReturnType<typeof useLiveVideoIntake>;
