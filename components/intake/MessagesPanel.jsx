"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { INTAKE_EMAIL, INTAKE_PHONE } from "@/lib/intake/constants";

const SUCCESS_MESSAGE =
  "Your message has been sent successfully. A member of our support team will contact you shortly.";
const FAILURE_MESSAGE = "Unable to send message at this time. Your draft has been preserved.";

/**
 * @param {{
 *   data: Record<string, unknown>,
 *   meta: { messages?: Array<{ subject?: string, body?: string, time?: string }> },
 *   onChange: (name: string, value: unknown) => void,
 *   onSaveMessage: (subject: string, body: string) => void,
 *   onSendToSupport: (subject: string, body: string) => Promise<{ ok: boolean, message?: string }>,
 *   labels?: Record<string, string>,
 * }} props
 */
export default function MessagesPanel({
  data,
  meta,
  onChange,
  onSaveMessage,
  onSendToSupport,
  labels = {},
}) {
  const [subject, setSubject] = useState(String(data.portalMsgSubject ?? ""));
  const [body, setBody] = useState(String(data.portalMsgBody ?? ""));
  const [subjectError, setSubjectError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [sending, setSending] = useState(false);
  const [banner, setBanner] = useState(null);

  const validateFields = () => {
    const nextSubjectError = subject.trim() ? "" : labels.subjectRequired || "Subject is required.";
    const nextBodyError = body.trim() ? "" : labels.messageRequired || "Message is required.";
    setSubjectError(nextSubjectError);
    setBodyError(nextBodyError);
    return !nextSubjectError && !nextBodyError;
  };

  const handleSend = async () => {
    setBanner(null);
    if (!validateFields()) return;

    setSending(true);
    try {
      const result = await onSendToSupport(subject.trim(), body.trim());
      if (result.ok) {
        setBanner({ type: "success", message: result.message || SUCCESS_MESSAGE });
        setSubjectError("");
        setBodyError("");
      } else {
        setBanner({ type: "error", message: result.message || FAILURE_MESSAGE });
      }
    } catch {
      setBanner({ type: "error", message: FAILURE_MESSAGE });
    } finally {
      setSending(false);
    }
  };

  const fieldClass = (hasError) =>
    `rounded-lg border px-3 py-2.5 outline-none transition focus:ring-4 ${
      hasError
        ? "border-[#f04438] focus:border-[#f04438] focus:ring-[#f04438]/15"
        : "border-[#cfd8d3] focus:border-[#128c8c] focus:ring-[#49b8c8]/20"
    }`;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <EdenLogo size="intakePanel" className="shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-[#06461f]">✉ Messages</h2>
            <p className="mt-2 text-sm leading-7 text-[#243142]">
              {labels.intro ||
                "Send a message to our support team or save a draft locally while you complete your intake."}
            </p>
          </div>
        </div>

        {banner ? (
          <div
            className={`mt-5 rounded-xl border px-4 py-3 text-sm font-semibold ${
              banner.type === "success"
                ? "border-[#b8ddbf] bg-[#f1faf3] text-[#06461f]"
                : "border-[#f5b5ad] bg-[#fff5f4] text-[#b42318]"
            }`}
          >
            {banner.message}
          </div>
        ) : null}

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-bold">
            Subject
            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                onChange("portalMsgSubject", e.target.value);
                if (subjectError && e.target.value.trim()) setSubjectError("");
              }}
              placeholder="Subject"
              className={fieldClass(Boolean(subjectError))}
              aria-invalid={Boolean(subjectError)}
            />
            {subjectError ? <span className="text-sm font-semibold text-[#f04438]">{subjectError}</span> : null}
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Message
            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                onChange("portalMsgBody", e.target.value);
                if (bodyError && e.target.value.trim()) setBodyError("");
              }}
              placeholder="Type your message here"
              className={`min-h-[130px] ${fieldClass(Boolean(bodyError))}`}
              aria-invalid={Boolean(bodyError)}
            />
            {bodyError ? <span className="text-sm font-semibold text-[#f04438]">{bodyError}</span> : null}
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onSaveMessage(subject, body)}
              className="rounded-lg border border-[#8cc495] bg-white px-6 py-3 text-sm font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]"
            >
              {labels.saveDraft || "Save Message Draft"}
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-b from-[#168f30] to-[#006d19] px-6 py-3 text-sm font-extrabold text-white shadow-md transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send size={16} aria-hidden />
              {sending ? labels.sending || "Sending…" : labels.sendToSupport || "Send to Support Team"}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <h2 className="text-xl font-black text-[#06461f]">Contact Eden ABA Therapy</h2>
        <p className="mt-3 text-base font-bold text-[#08751f]">☎ {INTAKE_PHONE}</p>
        <p className="text-base font-bold text-[#08751f]">✉ {INTAKE_EMAIL}</p>
        <p className="mt-4 text-sm leading-7 text-[#374151]">
          <b>Helpful tip:</b> Keep insurance card, diagnosis report, IEP/evaluation, and referral ready before final submission.
        </p>
      </div>

      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <h2 className="text-xl font-black text-[#06461f]">Saved Messages</h2>
        {(meta.messages || []).length === 0 ? (
          <p className="mt-3 text-sm text-[#667085]">No saved messages yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {(meta.messages || []).map((m, i) => (
              <div key={`${m.time}-${i}`} className="rounded-xl border border-[#dfe8e2] bg-[#fbfefc] p-4">
                <b className="text-sm">{m.subject || "No subject"}</b>
                <p className="text-xs text-[#667085]">{m.time ? new Date(m.time).toLocaleString() : ""}</p>
                <p className="mt-2 text-sm leading-6">{m.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
