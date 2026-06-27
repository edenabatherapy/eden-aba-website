"use client";

import { FormEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import "./EdenChatWidget.css";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  confirmationId?: string;
  intakeSubmitted?: boolean;
};

const QUICK_QUESTIONS = [
  "What is ABA therapy?",
  "How do I verify insurance?",
  "How do I start intake?",
];

function createWelcomeMessage(language: string) {
  return (
    getTranslation(language).pages.edenChat?.welcomeMessage ??
    "Hi, I'm the Eden ABA Therapy assistant. I can answer general questions about ABA therapy, insurance, intake, and family support. How can I help today?"
  );
}

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function EdenChatWidget() {
  const dialogTitleId = useId();
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { language } = useSiteLanguage();
  const chat = getTranslation(language).pages.edenChat;
  const quickQuestions = chat?.quickQuestions ?? QUICK_QUESTIONS;

  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "welcome",
      role: "assistant",
      content: createWelcomeMessage(language),
    },
  ]);
  const [previousResponseId, setPreviousResponseId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setMessages((current) => {
      const nonWelcome = current.filter((message) => message.id !== "welcome");
      return [
        {
          id: "welcome",
          role: "assistant",
          content: createWelcomeMessage(language),
        },
        ...nonWelcome,
      ];
    });
  }, [language]);

  const handleOpenChat = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Ask Eden clicked");
    }
    setIsOpen(true);
  }, []);

  const handleCloseChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const container = messagesRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }, [messages, loading, isOpen]);

  const sendMessage = async (rawMessage: string) => {
    const message = rawMessage.trim();
    if (!message || loading) return;

    setError("");
    setDraft("");
    setMessages((current) => [
      ...current,
      { id: createMessageId(), role: "user", content: message },
    ]);
    setLoading(true);

    try {
      const response = await fetch("/api/eden-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          previousResponseId,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        content?: string;
        responseId?: string;
        message?: string;
        error?: string;
        reason?: string;
        detail?: string;
        openAiStatus?: number;
        openAiCode?: string;
        intakeSubmitted?: boolean;
        confirmationId?: string;
      };

      if (!response.ok || !data.ok || !data.content) {
        const detailParts = [
          data.message || chat?.defaultError || "The Eden assistant could not respond right now.",
          data.detail ? `Details: ${data.detail}` : "",
          data.error ? `Code: ${data.error}` : "",
          data.openAiStatus ? `OpenAI HTTP ${data.openAiStatus}` : "",
        ].filter(Boolean);

        console.error("[eden-chat] API failure", {
          status: response.status,
          error: data.error,
          reason: data.reason,
          message: data.message,
        });

        throw new Error(detailParts.join(" "));
      }

      setPreviousResponseId(data.responseId || null);
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content: data.content || "",
          confirmationId: data.confirmationId,
          intakeSubmitted: data.intakeSubmitted === true,
        },
      ]);
    } catch (sendError) {
      const messageText =
        sendError instanceof Error
          ? sendError.message
          : chat?.defaultError || "The Eden assistant could not respond right now.";
      setError(messageText);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(draft);
  };

  return (
    <div className="eden-chat-root">
      {!isOpen ? (
        <button
          type="button"
          className="eden-chat-button"
          onClick={handleOpenChat}
          aria-label={chat?.openLabel ?? "Open Eden ABA Therapy assistant"}
          aria-expanded={false}
          aria-controls="eden-chat-panel"
        >
          <MessageCircle size={18} aria-hidden />
          {chat?.buttonLabel ?? "Ask Eden"}
        </button>
      ) : null}

      {isOpen ? (
        <section
          id="eden-chat-panel"
          className="eden-chat-panel eden-chat-panel--open"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogTitleId}
        >
          <div className="eden-chat-header">
            <div className="eden-chat-header-brand">
              <span className="eden-chat-avatar" aria-hidden="true" />
              <EdenLogo size="compact" className="eden-chat-logo" />
              <div className="eden-chat-header-text">
                <strong id={dialogTitleId}>{chat?.panelTitle ?? "Eden ABA Therapy Assistant"}</strong>
                <p>
                  <span className="eden-chat-status" aria-hidden="true" />
                  {chat?.statusLabel ?? "General information only"}
                </p>
              </div>
            </div>
            <button type="button" onClick={handleCloseChat} aria-label={chat?.closeLabel ?? "Close Eden assistant"}>
              <X size={16} aria-hidden />
            </button>
          </div>

          <div className="eden-chat-messages" ref={messagesRef} aria-live="polite">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`eden-chat-bubble eden-chat-bubble--${message.role}${
                  message.intakeSubmitted ? " eden-chat-bubble--intake-success" : ""
                }`}
              >
                <p>{message.content}</p>
                {message.intakeSubmitted && message.confirmationId ? (
                  <p className="eden-chat-confirmation">
                    {chat?.confirmationPrefix ?? "Confirmation ID:"}{" "}
                    <strong>{message.confirmationId}</strong>
                  </p>
                ) : null}
              </div>
            ))}

            {loading ? (
              <div
                className="eden-chat-bubble eden-chat-bubble--assistant eden-chat-typing"
                aria-label={chat?.typingLabel ?? "Eden assistant is typing"}
              >
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </div>

          <div className="eden-chat-actions" role="group" aria-label={chat?.quickQuestionsAria ?? "Quick questions"}>
            {quickQuestions.map((question) => (
              <button
                key={question}
                type="button"
                disabled={loading}
                onClick={() => void sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          {error ? <p className="eden-chat-error">{error}</p> : null}

          <form className="eden-chat-input" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder={chat?.placeholder ?? "Ask about ABA therapy, insurance, or intake..."}
              aria-label={chat?.messageLabel ?? "Message the Eden assistant"}
              disabled={loading}
              maxLength={2000}
            />
            <button type="submit" disabled={loading || !draft.trim()} aria-label={chat?.sendAriaLabel ?? "Send message"}>
              <Send size={16} aria-hidden />
              <span className="eden-chat-send-label">{chat?.sendLabel ?? "Send"}</span>
            </button>
          </form>

          <p className="eden-chat-disclaimer">
            {chat?.disclaimer ??
              "This assistant provides general information only. It does not diagnose autism, provide medical advice, or replace care from a qualified clinician. If this is an emergency, call 911."}
          </p>
        </section>
      ) : null}
    </div>
  );
}
