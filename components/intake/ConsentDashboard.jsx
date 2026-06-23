"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { CONSENT_DOCS } from "@/lib/intake/consent-docs";
import IntakeField from "./IntakeField";
import { fadeUp, staggerContainer, staggerItem } from "./intake-motion";

/**
 * @param {{
 *   data: Record<string, unknown>,
 *   onChange: (name: string, value: unknown) => void,
 *   onOpenConsent: (id: string) => void,
 *   consentDashboard?: Record<string, string>,
 *   fieldErrors?: Record<string, string>,
 * }} props
 */
export default function ConsentDashboard({
  data,
  onChange,
  onOpenConsent,
  consentDashboard = {},
  fieldErrors = {},
}) {
  const cd = consentDashboard;
  const completedCount = CONSENT_DOCS.filter(
    (c) => data[`${c.id}Ack`] === "Yes" || data[`${c.id}Ack`] === true
  ).length;
  const hasLegalErrors = LEGAL_GLOBAL_FIELDS.some((name) => fieldErrors[name]);

  return (
    <motion.div
      {...fadeUp}
      className="overflow-hidden rounded-[1.75rem] border border-[#dfe8e2] bg-white shadow-lg"
    >
      <div className="border-b border-[#e4ece6] bg-gradient-to-r from-[#0b4f4f] via-[#1f7a2e] to-[#128c8c] px-6 py-7 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-black">
              <ShieldCheck size={28} className="text-lime-300" />
              {cd.title || "Legal & Consent"}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-emerald-50/95">
              {cd.description ||
                "Please review each consent and authorization carefully. Click each consent row to open the full form, review the details, and acknowledge your agreement."}
            </p>
          </div>
          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
            <p className="text-2xl font-black text-lime-300">{completedCount}/{CONSENT_DOCS.length}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">{cd.acknowledged || "Acknowledged"}</p>
          </div>
        </div>
      </div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="divide-y divide-[#e4ece6]">
        {CONSENT_DOCS.map((c) => {
          const acknowledged = data[`${c.id}Ack`] === "Yes" || data[`${c.id}Ack`] === true;
          return (
            <motion.div key={c.id} variants={staggerItem}>
              <button
                type="button"
                onClick={() => onOpenConsent(c.id)}
                className={`grid w-full gap-4 px-5 py-5 text-left transition md:grid-cols-[58px_1fr_280px_52px] md:items-center ${
                  acknowledged ? "bg-[#f6fbf7]" : "hover:bg-[#f8fcf9]"
                }`}
              >
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl shadow-sm ${
                    acknowledged ? "bg-[#08751f] text-white" : "bg-[#eef7f0]"
                  }`}
                >
                  {acknowledged ? <CheckCircle2 size={26} /> : c.icon}
                </span>
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
                    checked={acknowledged}
                    onChange={(e) => onChange(`${c.id}Ack`, e.target.checked ? "Yes" : "No")}
                    className="mt-0.5 h-4 w-4 rounded border-[#9ccc9f] text-[#08751f]"
                  />
                  {cd.yesAcknowledge || c.ack}
                </label>
                <ChevronRight className="hidden text-[#08751f] md:block" size={22} />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      <div
        id="eden-legal-signature-section"
        className={`border-t border-[#e4ece6] bg-[#fafcfb] px-6 py-5 ${hasLegalErrors ? "ring-2 ring-inset ring-red-200" : ""}`}
      >
        <h3 className="text-sm font-black uppercase tracking-[0.14em] text-[#08751f]">
          {cd.legalSignatureTitle || "Legal Signature"}
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#475467]">
          {cd.legalSignatureHint ||
            "Enter your full legal name, signature, and date to confirm the consent acknowledgments above."}
        </p>

        {hasLegalErrors ? (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
            {cd.legalSignatureError ||
              "Please complete the legal name, date, and signature before continuing or submitting."}
          </p>
        ) : null}

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <LegalField
            field={{
              name: "legalGlobalName",
              label: cd.legalGlobalName || cd.legalName || "Parent / Guardian Full Name *",
              type: "text",
              required: true,
              placeholder: "Type full legal name",
            }}
            value={data.legalGlobalName}
            error={fieldErrors.legalGlobalName}
            onChange={onChange}
          />
          <LegalField
            field={{
              name: "legalGlobalDate",
              label: cd.legalGlobalDate || "Date *",
              type: "date",
              required: true,
              hint:
                cd.legalGlobalDateHint ||
                "Required. Auto-filled to today when you sign or acknowledge consent above.",
            }}
            value={data.legalGlobalDate}
            error={fieldErrors.legalGlobalDate}
            onChange={onChange}
          />
          <div className="md:col-span-2">
            <LegalField
              field={{
                name: "legalGlobalSignature",
                label: cd.legalGlobalSignature || "Signature *",
                type: "text",
                required: true,
                placeholder: "Type full legal name as signature",
              }}
              value={data.legalGlobalSignature}
              error={fieldErrors.legalGlobalSignature}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const LEGAL_GLOBAL_FIELDS = ["legalGlobalName", "legalGlobalDate", "legalGlobalSignature"];

function LegalField({ field, value, error, onChange }) {
  const { hint, ...fieldProps } = field;
  return (
    <div>
      <IntakeField field={fieldProps} value={value} onChange={onChange} />
      {hint ? <p className="mt-1.5 text-xs leading-5 text-[#667085]">{hint}</p> : null}
      {error ? (
        <p className="mt-1.5 text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
