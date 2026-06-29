"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Loader2, Mic, Square, Volume2 } from "lucide-react";
import { useSiteLanguage, type SiteLanguage } from "@/hooks/useSiteLanguage";
import { AiIntakeBrandedMediaFrame, AiIntakeVideoTopBar } from "./AiIntakeVideoBrand";
import AiIntakeAvatarBackdrop from "./AiIntakeAvatarBackdrop";
import { EDEN_START_AI_CHAT_EVENT } from "./ai-intake-config";
import { getAiIntakeCopy } from "./ai-intake-i18n";
import { EDEN_CHROMA_KEY_OPTIONS } from "@/lib/liveavatar/chroma-key-config";
import { setupChromaKey } from "@/lib/liveavatar/chromaKey";

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
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeCopy(language), [language]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chromaCleanupRef = useRef<(() => void) | null>(null);
  const sessionRef = useRef<InstanceType<LiveAvatarSessionModule["LiveAvatarSession"]> | null>(null);
  const sdkRef = useRef<LiveAvatarSessionModule | null>(null);
  const connectTimeoutRef = useRef<number | null>(null);
  const isMutedRef = useRef(false);
  const sessionLanguageRef = useRef<SiteLanguage | null>(null);
  const isRestartingForLanguageRef = useRef(false);
  const panelStateRef = useRef<LiveAvatarPanelState>("idle");
  const restartInFlightRef = useRef(false);

  const [panelState, setPanelState] = useState<LiveAvatarPanelState>("idle");
  const [statusMessage, setStatusMessage] = useState(copy.idleIntro);
  const [isMuted, setIsMuted] = useState(false);

  isMutedRef.current = isMuted;
  panelStateRef.current = panelState;

  useEffect(() => {
    if (panelState === "idle") {
      setStatusMessage(copy.idleIntro);
    }
  }, [copy.idleIntro, panelState]);

  const stopChromaKey = useCallback(() => {
    if (chromaCleanupRef.current) {
      chromaCleanupRef.current();
      chromaCleanupRef.current = null;
    }
  }, []);

  const clearConnectTimeout = useCallback(() => {
    if (connectTimeoutRef.current !== null) {
      window.clearTimeout(connectTimeoutRef.current);
      connectTimeoutRef.current = null;
    }
  }, []);

  const cleanupSession = useCallback(async () => {
    clearConnectTimeout();
    stopChromaKey();
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

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    sessionLanguageRef.current = null;
  }, [clearConnectTimeout, stopChromaKey]);

  useEffect(() => {
    return () => {
      void cleanupSession();
    };
  }, [cleanupSession]);

  useEffect(() => {
    if (panelState !== "live") {
      stopChromaKey();
      return undefined;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return undefined;

    const startWhenReady = () => {
      if (!video || !canvas || video.readyState < 2) return;
      stopChromaKey();
      chromaCleanupRef.current = setupChromaKey(video, canvas, EDEN_CHROMA_KEY_OPTIONS);
    };

    if (video.readyState >= 2) {
      startWhenReady();
    } else {
      video.addEventListener("loadedmetadata", startWhenReady);
      video.addEventListener("loadeddata", startWhenReady);
    }

    return () => {
      video.removeEventListener("loadedmetadata", startWhenReady);
      video.removeEventListener("loadeddata", startWhenReady);
      stopChromaKey();
    };
  }, [panelState, stopChromaKey]);

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
      isRestartingForLanguageRef.current = false;
      await cleanupSession();
      clearConnectTimeout();
      setPanelState("error");
      setStatusMessage(message);
    },
    [cleanupSession, clearConnectTimeout],
  );

  const startChatSession = useCallback(
    async (options?: { force?: boolean }) => {
      if (restartInFlightRef.current) return;
      if (
        !options?.force &&
        (panelState === "loading" || panelState === "connecting" || panelState === "live")
      ) {
        return;
      }

      restartInFlightRef.current = true;

      try {
        if (options?.force) {
          isRestartingForLanguageRef.current = true;
          await cleanupSession();
        }

        setPanelState("loading");
        setStatusMessage(copy.preparing);

        const response = await fetch("/api/liveavatar/session", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language }),
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
        setStatusMessage(copy.connecting);

        const sdk = sdkRef.current ?? (await import("@heygen/liveavatar-web-sdk"));
        sdkRef.current = sdk;

        const session = new sdk.LiveAvatarSession(payload.sessionToken, {
          voiceChat: true,
        });
        sessionRef.current = session;
        sessionLanguageRef.current = language;

        session.on(sdk.SessionEvent.SESSION_STREAM_READY, () => {
          clearConnectTimeout();
          attachStream();
          setPanelState("live");
          setStatusMessage(copy.ready);
          isRestartingForLanguageRef.current = false;
        });

        session.on(sdk.SessionEvent.SESSION_STATE_CHANGED, (state) => {
          if (state === sdk.SessionState.CONNECTING) {
            setStatusMessage(copy.connecting);
          }
          if (state === sdk.SessionState.CONNECTED) {
            attachStream();
          }
        });

        session.on(sdk.SessionEvent.SESSION_DISCONNECTED, (reason) => {
          clearConnectTimeout();
          if (isRestartingForLanguageRef.current) {
            return;
          }
          if (reason === sdk.SessionDisconnectReason.SESSION_START_FAILED) {
            void handleSessionFailure(copy.startFailed);
            return;
          }
          setPanelState("idle");
          setStatusMessage(copy.sessionEnded);
        });

        connectTimeoutRef.current = window.setTimeout(() => {
          void handleSessionFailure(copy.timeout);
        }, CONNECT_TIMEOUT_MS);

        await session.start();
      } catch (error) {
        isRestartingForLanguageRef.current = false;
        const message = error instanceof Error ? error.message : copy.unavailable;
        await handleSessionFailure(message);
      } finally {
        restartInFlightRef.current = false;
      }
    },
    [
      attachStream,
      clearConnectTimeout,
      cleanupSession,
      copy,
      handleSessionFailure,
      language,
      panelState,
    ],
  );

  const handleStartChat = useCallback(async () => {
    await startChatSession();
  }, [startChatSession]);

  useEffect(() => {
    const activeLanguage = sessionLanguageRef.current;
    if (activeLanguage === null || activeLanguage === language) {
      return;
    }

    const state = panelStateRef.current;
    if (state === "live" || state === "connecting" || state === "loading") {
      void startChatSession({ force: true });
    }
  }, [language, startChatSession]);

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
    setStatusMessage(copy.sessionEnded);
  }, [cleanupSession, copy.sessionEnded]);

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
    <div className="eden-ai-video eden-ai-video--liveavatar" aria-label={copy.assistantTitle}>
      <div className="eden-ai-video__glow" aria-hidden="true" />
      <div className="eden-ai-video__frame">
        <div className="eden-ai-video__glass">
          <AiIntakeVideoTopBar
            statusLabel={copy.statusLabel}
            badge={
              panelState === "live"
                ? copy.badgeLive
                : panelState === "error"
                  ? copy.badgeUnavailable
                  : copy.badgeAvailable
            }
            soundButton={
              <button
                type="button"
                className="eden-ai-video__sound"
                aria-label={isMuted ? copy.unmute : copy.mute}
                onClick={toggleMute}
                disabled={panelState !== "live"}
              >
                <Volume2 size={16} aria-hidden="true" />
              </button>
            }
          />

          <div className="eden-ai-video__stage eden-ai-video__stage--live">
            <AiIntakeBrandedMediaFrame showWatermark={false} showCornerBadge={false}>
              <AiIntakeAvatarBackdrop />
              <video
                ref={videoRef}
                className={`eden-ai-video__media eden-ai-video__media--source${
                  panelState === "live" ? " eden-ai-video__media--chroma-source" : ""
                }`}
                playsInline
                muted={isMuted}
                aria-hidden={panelState === "live"}
                aria-label={copy.avatarLabel}
              />
              <canvas
                ref={canvasRef}
                className={`eden-ai-video__media eden-ai-video__media-canvas${
                  panelState === "live" ? " eden-ai-video__media-canvas--visible" : ""
                }`}
                aria-hidden={panelState !== "live"}
                aria-label={copy.avatarLabel}
              />
              {panelState !== "live" ? (
                <div className="eden-ai-video__media-overlay">
                  <p className="eden-ai-video__placeholder-label">{copy.placeholderLabel}</p>
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
                          {copy.tryAgain}
                        </button>
                        <button
                          type="button"
                          className="eden-ai-video__end-chat"
                          onClick={onFallback}
                        >
                          {copy.usePreview}
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
                        {copy.startChat}
                      </button>
                    </>
                  )}
                </div>
              ) : null}
            </AiIntakeBrandedMediaFrame>

            {panelState === "live" ? (
              <div className="eden-ai-video__live-controls">
                <p className="eden-ai-video__live-status" role="status" aria-live="polite">
                  {statusMessage}
                </p>
                <button type="button" className="eden-ai-video__end-chat" onClick={() => void handleEndChat()}>
                  <Square size={14} aria-hidden="true" />
                  {copy.endChat}
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
