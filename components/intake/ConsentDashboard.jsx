"use client";

import { CONSENT_DOCS } from "@/lib/intake/consent-docs";
import IntakeField from "./IntakeField";

/**
 * @param {{
 *   data: Record<string, unknown>,
 *   onChange: (name: string, value: unknown) => void,
 *   onOpenConsent: (id: string) => void,
 * }} props
 */
export default function ConsentDashboard({ data, onChange, onOpenConsent }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dfe8e2] bg-white shadow-lg">
      <div className="border-b border-[#e4ece6] bg-gradient-to-r from-[#fbfefc] to-white px-6 py-6">
        <h2 className="flex items-center gap-3 text-2xl font-black text-[#06461f]">🛡 Legal & Consent</h2>
        <p className="mt-2 text-sm leading-7 text-[#243142]">
          Please review each consent and authorization carefully. Click each consent row to open the full form,
          review the details, and acknowledge your agreement.
        </p>
      </div>

      <div className="divide-y divide-[#e4ece6]">
        {CONSENT_DOCS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpenConsent(c.id)}
            className="grid w-full gap-4 px-5 py-5 text-left transition hover:bg-[#f8fcf9] md:grid-cols-[58px_1fr_280px_52px] md:items-center"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#eef7f0] text-2xl">{c.icon}</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#176b25]">
                {c.num}. {c.title}
              </h3>
              <ul className="mt-2 list-disc pl-5 text-xs leading-6 text-[#1d3525]">
                {c.short.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <label
              className="flex items-start gap-2 text-xs font-bold leading-5"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                name={`${c.id}Ack`}
                checked={data[`${c.id}Ack`] === "Yes" || data[`${c.id}Ack`] === true}
                onChange={(e) => onChange(`${c.id}Ack`, e.target.checked ? "Yes" : "")}
                className="mt-0.5 accent-[#0E6B4F]"
              />
              {c.ack} *
            </label>
            <span
              className="rounded-lg border border-[#9ccc9f] px-3 py-2 text-center text-sm font-extrabold text-[#08751f]"
              onClick={(e) => {
                e.stopPropagation();
                onOpenConsent(c.id);
              }}
            >
              View
            </span>
          </button>
        ))}
      </div>

      <div className="border-t border-[#e4ece6] bg-[#fbfefc] px-6 py-6">
        <h2 className="mb-4 text-lg font-black text-[#08751f]">👤 Parent / Guardian Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <IntakeField
            field={{ name: "legalGlobalName", label: "Parent / Guardian Full Name", type: "text", required: true, placeholder: "Type full name" }}
            value={data.legalGlobalName}
            onChange={onChange}
          />
          <IntakeField field={{ name: "legalGlobalDate", label: "Date", type: "date", required: true }} value={data.legalGlobalDate} onChange={onChange} />
        </div>
        <div className="mt-4">
          <IntakeField
            field={{ name: "legalGlobalSignature", label: "Signature", type: "text", required: true, placeholder: "Type or draw your signature here" }}
            value={data.legalGlobalSignature}
            onChange={onChange}
          />
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#b8ddbf] bg-[#f1faf3] p-3 text-xs font-semibold text-[#075d21]">
          🔒 <span><b>Important:</b> By signing above, I confirm that I have read, understood, and agree to all consents and authorizations listed in this section.</span>
        </div>
      </div>
    </div>
  );
}
