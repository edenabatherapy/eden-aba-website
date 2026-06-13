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
 * }} props
 */
export default function ConsentDashboard({ data, onChange, onOpenConsent, consentDashboard = {} }) {
  const cd = consentDashboard;
  const completedCount = CONSENT_DOCS.filter(
    (c) => data[`${c.id}Ack`] === "Yes" || data[`${c.id}Ack`] === true
  ).length;

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

      <div className="border-t border-[#e4ece6] bg-[#fafcfb] px-6 py-5">
        <IntakeField
          field={{ name: "legalGlobalName", label: cd.legalName || "Parent / Guardian Full Name *", type: "text", required: true }}
          value={data.legalGlobalName}
          onChange={onChange}
        />
      </div>
    </motion.div>
  );
}
