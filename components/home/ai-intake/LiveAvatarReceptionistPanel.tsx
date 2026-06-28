"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertCircle, Loader2, Mic, Square, Volume2 } from "lucide-react";
import { EDEN_START_AI_CHAT_EVENT } from "./ai-intake-config";

type LiveAvatarPanelState = "idle" | "loading" | "connecting" | "live" | "error";

type LiveAvatarReceptionistPanelProps = {
  active?: boolean;
  onFallback: () => void;
};

type LiveAvatarSessionModule = typeof import("@heygen/liveavatar-web-sdk");

const CONNECT_TIMEOUT_MS = 45000;

export default function LiveAvatarReceptionistPanel({
  active = true,
  onFallback,
}: LiveAvatarReceptionistPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sessionRef = useRef<InstanceType<LiveAvatarSessionModule["LiveAvatarSession"]> | null>(null);
  const sdkRef = useRef<LiveAvatarSessionModule | null>(null);
  const connectTimeoutRef = useRef<number | null>(null);
  const isMutedRef = useRef(false);

  const [panelState, setPanelState] = useState<LiveAvatarPanelState>("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Tap Start AI Chat to begin your intake conversation.",
  );
  const [isMuted, setIsMuted] = useState(false);

  isMutedRef.current = isMuted;

  const clearConnectTimeout = useCallback(() => {
    if (connectTimeoutRef.current !== null) {
      window.clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
  }, []);

  const cleanupSession = useCallback(async () => {
    clearConnectTimeout();
    const session = sessionRef.current;
    sessionRef.current = null;

    if (session) {
      try {
        await session.stop();
      } catch {
        // Session may already be stopped.
      }
    }

    const video = videoRef.current;
    if (video) {
      video.srcObject = null;
    }
  }, [clearConnectTimeout]);

  useEffect(() => {
    return () => {
      void cleanupSession();
    };
  }, [cleanupSession]);

  const attachStream = useCallback(() => {
    const session = sessionRef.current;
    const video = videoRef.current;

    if (!session || !video) return;

    session.attach(video);
    video.muted = isMutedRef.current;
    void video.play().catch(() => {
      // Autoplay may require additional user interaction on some browsers.
    });
  }, []);

  const handleSessionFailure = useCallback(
    async (message: string) => {
      console.error("[LiveAvatarReceptionistPanel]", message);
      await cleanupSession();
      clearConnectTimeout();
      setPanelState("error");
      setStatusMessage(message);
    },
    [cleanupSession, clearConnectTimeout],
  );

  const handleStartChat = useCallback(async () => {
    if (panelState === "loading" || panelState === "connecting" || panelState === "live") {
      return;
    }

    setPanelState("loading");
    setStatusMessage("Preparing your Eden AI intake assistant...");

    try {
      const response = await fetch("/api/liveavatar/session", {
        method: "POST",
        headers: { Accept: "application/json" },
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        sessionToken?: string;
        message?: string;
      };

      if (!response.ok || !payload.ok || !payload.sessionToken) {
        throw new Error(payload.message || "LiveAvatar session could not be created.");
      }

      setPanelState("connecting");
      setStatusMessage("Connecting to Eden. This may take a few seconds...");

      const sdk = sdkRef.current ?? (await import("@heygen/liveavatar-web-sdk"));
      sdkRef.current = sdk;

      const session = new sdk.LiveAvatarSession(payload.sessionToken, {
        voiceChat: true,
      });
      sessionRef.current = session;

      session.on(sdk.SessionEvent.SESSION_STREAM_READY, () => {
        clearConnectTimeout();
        attachStream();
        setPanelState("live");
        setStatusMessage("Eden is ready. You can speak when the avatar is listening.");
      });

      session.on(sdk.SessionEvent.SESSION_STATE_CHANGED, (state) => {
        if (state === sdk.SessionState.CONNECTING) {
          setStatusMessage("Connecting to Eden...");
        }
        if (state === sdk.SessionState.CONNECTED) {
          attachStream();
        }
      });

      session.on(sdk.SessionEvent.SESSION_DISCONNECTED, (reason) => {
        clearConnectTimeout();
        if (reason === sdk.SessionDisconnectReason.SESSION_START_FAILED) {
          void handleSessionFailure("LiveAvatar could not start. Please try again.");
          return;
        }
        setPanelState("idle");
        setStatusMessage("Session ended. Tap Start AI Chat to begin again.");
      });

      connectTimeoutRef.current = window.setTimeout(() => {
        void handleSessionFailure(
          "Connection timed out. LiveAvatar may be unavailable right now.",
        );
      }, CONNECT_TIMEOUT_MS);

      await session.start();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "LiveAvatar is unavailable right now. Please try again.";
      await handleSessionFailure(message);
    }
  }, [
    attachStream,
    clearConnectTimeout,
    handleSessionFailure,
    panelState,
  ]);

  useEffect(() => {
    const handleExternalStart = () => {
      void handleStartChat();
    };

    window.addEventListener(EDEN_START_AI_CHAT_EVENT, handleExternalStart);
    return () => window.removeEventListener(EDEN_START_AI_CHAT_EVENT, handleExternalStart);
  }, [handleStartChat]);

  const handleEndChat = useCallback(async () => {
    await cleanupSession();
    setPanelState("idle");
    setStatusMessage("Session ended. Tap Start AI Chat to begin again.");
  }, [cleanupSession]);

  const toggleMute = useCallback(async () => {
    const session = sessionRef.current;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }

    if (!session || panelState !== "live") return;

    try {
      if (nextMuted) {
        await session.voiceChat.mute();
      } else {
        await session.voiceChat.unmute();
      }
    } catch {
      // Microphone permissions may be unavailable.
    }
  }, [isMuted, panelState]);

  const isBusy = panelState === "loading" || panelState === "connecting";

  return (
    <div className="eden-ai-video eden-ai-video--liveavatar" aria-label="LiveAvatar AI receptionist">
      <div className="eden-ai-video__glow" aria-hidden="true" />
      <div className="eden-ai-video__frame">
        <div className="eden-ai-video__glass">
          <div className="eden-ai-video__topbar">
            <div className="eden-ai-video__status">
              <span className="eden-ai-video__status-dot" aria-hidden="true" />
              <span className="eden-ai-video__status-label">AI Receptionist</span>
              <span className="eden-ai-video__status-badge">
                {panelState === "live" ? "Live" : panelState === "error" ? "Unavailable" : "Available Now"}
              </span>
            </div>
            <button
              type="button"
              className="eden-ai-video__sound"
              aria-label={isMuted ? "Unmute avatar audio" : "Mute avatar audio"}
              onClick={toggleMute}
              disabled={panelState !== "live"}
            >
              <Volume2 size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="eden-ai-video__stage eden-ai-video__stage--live">
            <div className="eden-ai-video__media-wrap">
              <video
                ref={videoRef}
                className="eden-ai-video__media"
                playsInline
                muted={isMuted}
                aria-label="Eden AI intake assistant avatar video"
              />
              {panelState !== "live" ? (
                <div className="eden-ai-video__media-overlay">
                  <p className="eden-ai-video__placeholder-label">Katya · Eden AI Intake Assistant</p>
                  {isBusy ? (
                    <div className="eden-ai-video__loading" role="status" aria-live="polite">
                      <Loader2 size={28} className="eden-ai-video__spinner" aria-hidden="true" />
                      <span>{statusMessage}</span>
                    </div>
                  ) : panelState === "error" ? (
                    <div className="eden-ai-video__error" role="alert">
                      <AlertCircle size={24} aria-hidden="true" />
                      <p>{statusMessage}</p>
                      <div className="eden-ai-video__error-actions">
                        <button
                          type="button"
                          className="eden-ai-video__start-chat"
                          onClick={() => void handleStartChat()}
                        >
                          Try Again
                        </button>
                        <button
                          type="button"
                          className="eden-ai-video__end-chat"
                          onClick={onFallback}
                        >
                          Use Preview
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="eden-ai-video__intro">{statusMessage}</p>
                      <button
                        type="button"
                        className="eden-ai-video__start-chat"
                        onClick={() => void handleStartChat()}
                        disabled={!active}
                      >
                        <Mic size={18} aria-hidden="true" />
                        Start AI Chat
                      </button>
                    </>
                  )}
                </div>
              ) : null}
            </div>

            {panelState === "live" ? (
              <div className="eden-ai-video__live-controls">
                <p className="eden-ai-video__live-status" role="status" aria-live="polite">
                  {statusMessage}
                </p>
                <button type="button" className="eden-ai-video__end-chat" onClick={() => void handleEndChat()}>
                  <Square size={14} aria-hidden="true" />
                  End Chat
                </button>
              </div>
            ) : null}
          </div>

          <div className="eden-ai-video__shimmer" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
