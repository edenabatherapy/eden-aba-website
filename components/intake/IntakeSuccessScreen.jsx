"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Home, RotateCcw } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";

export default function IntakeSuccessScreen({
  message,
  confirmationId,
  submittedAt,
  labels = {},
  onStartNew,
  onReturnHome,
}) {
  const formattedSubmittedAt = submittedAt
    ? new Date(submittedAt).toLocaleString()
    : new Date().toLocaleString();

  return (
    <div className="mx-auto max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[2rem] border border-[#b8ddbf] bg-gradient-to-br from-[#f1faf3] via-white to-[#eef7f0] p-8 text-center shadow-2xl shadow-emerald-950/10 md:p-12"
      >
        <EdenLogo size="intake" className="mx-auto mb-6" />

        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#08751f] text-white shadow-lg">
          <CheckCircle2 size={40} />
        </div>

        <h2 className="mt-8 text-3xl font-black text-[#06461f] md:text-4xl">
          {labels.title || "Intake Submitted Successfully"}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-[#243142]">
          {message || labels.message || "Your intake has been submitted successfully."}
        </p>

        <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-[#cde6d2] bg-white/90 p-6 text-left shadow-sm">
          <dl className="space-y-4">
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#667085]">
                {labels.confirmationLabel || "Confirmation ID"}
              </dt>
              <dd className="mt-1 break-all font-mono text-lg font-black text-[#06461f]">
                {confirmationId || "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#667085]">
                {labels.submittedAtLabel || "Submitted"}
              </dt>
              <dd className="mt-1 text-base font-bold text-[#243142]">{formattedSubmittedAt}</dd>
            </div>
            <div>
              <dt className="text-xs font-black uppercase tracking-[0.14em] text-[#667085]">
                {labels.responseTimeLabel || "Expected response time"}
              </dt>
              <dd className="mt-1 text-base font-bold text-[#243142]">
                {labels.responseTime || "Our intake team will contact you within 24–48 hours."}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onStartNew}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#168f30] to-[#006d19] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-900/15 transition hover:brightness-105"
          >
            <RotateCcw size={18} />
            {labels.startNew || "Start New Intake"}
          </button>
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8cc495] bg-white px-8 py-4 text-base font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]"
          >
            <Home size={18} />
            {labels.returnHome || "Return Home"}
          </button>
        </div>

        <p className="mt-8 text-sm font-semibold text-[#667085]">
          {labels.privacyNote ||
            "Your submitted information is no longer shown on this screen. Save your confirmation ID for your records."}
        </p>
      </motion.div>
    </div>
  );
}
