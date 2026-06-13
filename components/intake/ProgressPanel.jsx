"use client";

import { motion } from "framer-motion";
import { INTAKE_EMAIL, INTAKE_PHONE } from "@/lib/intake/constants";
import { fadeUp } from "./intake-motion";

function fill(template, vars) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template || ""
  );
}

/**
 * @param {{
 *   currentStep: number,
 *   stepTitle: string,
 *   completion: { total: number, complete: number, pct: number },
 *   overall: { total: number, complete: number, pct: number },
 *   saveStatus: string,
 *   stepTips: string[],
 *   progressPanel: Record<string, unknown>,
 *   onSave: () => void,
 * }} props
 */
export default function ProgressPanel({
  currentStep,
  stepTitle,
  completion,
  overall,
  saveStatus,
  stepTips,
  progressPanel,
  onSave,
}) {
  const pp = progressPanel || {};
  const stepPct = ((currentStep + 1) / 6) * 100;
  const checklist = Array.isArray(pp.checklist) ? pp.checklist : [];

  return (
    <aside className="flex flex-col gap-5">
      <motion.div {...fadeUp} className="rounded-[1.5rem] border border-[#e0e7e2] bg-white p-6 shadow-lg shadow-emerald-950/5">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-white text-xl shadow-inner ring-1 ring-[#cde6d2]">📈</span>
          {pp.title || "Your Progress"}
        </h3>
        <div className="mt-5 flex items-center gap-5">
          <div
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full transition-all duration-500"
            style={{ background: `conic-gradient(#08751f ${stepPct}%, #e6ede8 0)` }}
          >
            <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white text-center shadow-inner ring-1 ring-[#eef2ef]">
              <span className="text-2xl font-extrabold text-[#08751f]">{currentStep + 1}</span>
              <span className="text-[10px] font-bold text-[#667085]">/ 6</span>
            </div>
          </div>
          <div className="text-sm leading-7">
            {fill(pp.stepOf, { current: currentStep + 1, total: 6 })}
            <br />
            <b className="text-base text-[#08751f]">{stepTitle}</b>
            <p className="mt-2 text-xs text-[#334155]">
              {fill(pp.stepRequired, {
                complete: completion.complete,
                total: completion.total,
                pct: completion.pct,
              })}
            </p>
            <p className="text-xs text-[#334155]">
              {fill(pp.overallEstimate, {
                complete: overall.complete,
                total: overall.total,
                pct: overall.pct,
              })}
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7eee9]">
          <motion.span
            className="block h-full bg-gradient-to-r from-[#168f30] to-[#006d19]"
            initial={{ width: 0 }}
            animate={{ width: `${completion.pct}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs text-[#667085]">
          <span>
            {fill(pp.requiredFieldsComplete, {
              complete: completion.complete,
              total: completion.total,
            })}
          </span>
          <span>{saveStatus}</span>
        </div>
      </motion.div>

      <motion.div {...fadeUp} className="rounded-[1.5rem] border border-[#e0e7e2] bg-white p-6 shadow-lg shadow-emerald-950/5">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-white text-xl shadow-inner ring-1 ring-[#cde6d2]">✅</span>
          {pp.beforeSubmit || "Before You Submit"}
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-[#334155]">
          {checklist.map((item, i) => (
            <motion.li
              key={item}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.05 }}
              className="flex items-center gap-2"
            >
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#eef7f0] text-xs font-black text-[#08751f]">✓</span>
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div {...fadeUp} className="rounded-[1.5rem] border border-[#e0e7e2] bg-white p-6 shadow-lg shadow-emerald-950/5">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-white text-xl shadow-inner ring-1 ring-[#cde6d2]">💡</span>
          {pp.stepGuidance || "Step Guidance"}
        </h3>
        <div
          className="mt-4 rounded-xl border border-[#d7e8db] bg-gradient-to-br from-[#f6fbf7] to-white p-4 text-sm leading-7 text-[#1f3527]"
          dangerouslySetInnerHTML={{ __html: stepTips[currentStep] || "" }}
        />
        <button type="button" onClick={onSave} className="mt-4 w-full rounded-xl border border-[#9ccc9f] bg-white py-2.5 text-sm font-black text-[#08751f] transition hover:bg-[#f4faf6]">
          {pp.saveProgress || "💾 Save My Progress"}
        </button>
        <button type="button" onClick={() => window.print()} className="mt-3 w-full rounded-xl border border-[#9ccc9f] bg-white py-2.5 text-sm font-black text-[#08751f] transition hover:bg-[#f4faf6]">
          {pp.printPdf || "🖨 Print / Save PDF"}
        </button>
      </motion.div>

      <motion.div {...fadeUp} className="rounded-[1.5rem] border border-[#e0e7e2] bg-white p-6 shadow-lg shadow-emerald-950/5">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-white text-xl shadow-inner ring-1 ring-[#cde6d2]">💬</span>
          {pp.needHelp || "Need Help?"}
        </h3>
        <p className="mt-4 text-center text-base leading-8">{pp.needHelpBody || "Our team is here to help you every step of the way!"}</p>
        <p className="mt-3 flex items-center gap-3 font-extrabold text-[#08751f]">☎ {INTAKE_PHONE}</p>
        <p className="flex items-center gap-3 font-extrabold text-[#08751f]">✉ {INTAKE_EMAIL}</p>
      </motion.div>

      <motion.div {...fadeUp} className="rounded-[1.5rem] border border-[#e0e7e2] bg-white p-6 shadow-lg shadow-emerald-950/5">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-white text-xl shadow-inner ring-1 ring-[#cde6d2]">🛡</span>
          {pp.infoSafe || "Your Information is Safe"}
        </h3>
        <p className="mt-4 text-base leading-8 text-[#334155]">{pp.infoSafeBody || ""}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#cde6d2] bg-[#eef7f0] px-3 py-2 text-xs font-black text-[#08751f]">
          {pp.autosaveEnabled || "✓ Local draft autosave enabled"}
        </span>
      </motion.div>
    </aside>
  );
}
