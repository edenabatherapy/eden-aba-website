"use client";

import { useState } from "react";
import EdenLogo from "@/components/EdenLogo";
import { INTAKE_EMAIL, INTAKE_PHONE } from "@/lib/intake/constants";

/**
 * @param {{ data: Record<string, unknown>, meta: { messages?: Array<{ subject?: string, body?: string, time?: string }> }, onChange: (name: string, value: unknown) => void, onSaveMessage: (subject: string, body: string) => void }} props
 */
export default function MessagesPanel({ data, meta, onChange, onSaveMessage }) {
  const [subject, setSubject] = useState(String(data.portalMsgSubject ?? ""));
  const [body, setBody] = useState(String(data.portalMsgBody ?? ""));

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <EdenLogo size="intakePanel" className="shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-[#06461f]">✉ Messages</h2>
            <p className="mt-2 text-sm leading-7 text-[#243142]">
              Prepare a message for the intake team. Messages save locally until you export or connect the form to a secure backend.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-bold">
            Subject
            <input
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                onChange("portalMsgSubject", e.target.value);
              }}
              placeholder="Subject"
              className="rounded-lg border border-[#cfd8d3] px-3 py-2.5"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold">
            Message
            <textarea
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                onChange("portalMsgBody", e.target.value);
              }}
              placeholder="Type your message here"
              className="min-h-[130px] rounded-lg border border-[#cfd8d3] px-3 py-2.5"
            />
          </label>
          <button
            type="button"
            onClick={() => onSaveMessage(subject, body)}
            className="w-fit rounded-lg bg-gradient-to-b from-[#168f30] to-[#006d19] px-6 py-3 text-sm font-extrabold text-white"
          >
            Save Message Draft
          </button>
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
