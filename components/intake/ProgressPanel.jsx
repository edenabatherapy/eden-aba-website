"use client";

import { INTAKE_EMAIL, INTAKE_PHONE, STEP_TIPS } from "@/lib/intake/constants";

/**
 * @param {{
 *   currentStep: number,
 *   stepTitle: string,
 *   completion: { total: number, complete: number, pct: number },
 *   overall: { total: number, complete: number, pct: number },
 *   saveStatus: string,
 *   onSave: () => void,
 * }} props
 */
export default function ProgressPanel({ currentStep, stepTitle, completion, overall, saveStatus, onSave }) {
  const stepPct = ((currentStep + 1) / 6) * 100;

  return (
    <aside className="flex flex-col gap-5">
      <div className="rounded-2xl border border-[#e0e7e2] bg-white p-6 shadow-lg">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef7f0] text-xl">📈</span>
          Your Progress
        </h3>
        <div className="mt-5 flex items-center gap-5">
          <div
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
            style={{ background: `conic-gradient(#08751f ${stepPct}%, #e6ede8 0)` }}
          >
            <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-white text-center shadow-inner ring-1 ring-[#eef2ef]">
              <span className="text-2xl font-extrabold text-[#08751f]">{currentStep + 1}</span>
              <span className="text-[10px] font-bold text-[#667085]">of 6</span>
            </div>
          </div>
          <div className="text-sm leading-7">
            Step {currentStep + 1} of 6
            <br />
            <b className="text-base text-[#08751f]">{stepTitle}</b>
            <p className="mt-2 text-xs text-[#334155]">
              Step required: {completion.complete}/{completion.total} ({completion.pct}%)
            </p>
            <p className="text-xs text-[#334155]">
              Overall estimate: {overall.complete}/{overall.total} ({overall.pct}%)
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7eee9]">
          <span className="block h-full bg-gradient-to-r from-[#168f30] to-[#006d19] transition-all" style={{ width: `${completion.pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between text-xs text-[#667085]">
          <span>{completion.complete}/{completion.total} required fields complete</span>
          <span>{saveStatus}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-[#e0e7e2] bg-white p-6 shadow-lg">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef7f0] text-xl">✅</span>
          Before You Submit
        </h3>
        <ul className="mt-4 space-y-3 text-sm text-[#334155]">
          {[
            "Complete all required fields marked *",
            "Review all 10 consent items",
            "Upload insurance card and clinical documents",
            "Sign final verification",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#eef7f0] text-xs font-black text-[#08751f]">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-[#e0e7e2] bg-white p-6 shadow-lg">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef7f0] text-xl">💡</span>
          Step Guidance
        </h3>
        <div
          className="mt-4 rounded-xl border border-[#d7e8db] bg-[#f6fbf7] p-4 text-sm leading-7 text-[#1f3527]"
          dangerouslySetInnerHTML={{ __html: STEP_TIPS[currentStep] || "" }}
        />
        <button type="button" onClick={onSave} className="mt-4 w-full rounded-lg border border-[#9ccc9f] bg-white py-2.5 text-sm font-black text-[#08751f] hover:bg-[#f4faf6]">
          💾 Save My Progress
        </button>
        <button type="button" onClick={() => window.print()} className="mt-3 w-full rounded-lg border border-[#9ccc9f] bg-white py-2.5 text-sm font-black text-[#08751f] hover:bg-[#f4faf6]">
          🖨 Print / Save PDF
        </button>
      </div>

      <div className="rounded-2xl border border-[#e0e7e2] bg-white p-6 shadow-lg">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef7f0] text-xl">💬</span>
          Need Help?
        </h3>
        <p className="mt-4 text-center text-base leading-8">Our team is here to help you every step of the way!</p>
        <p className="mt-3 flex items-center gap-3 font-extrabold text-[#08751f]">☎ {INTAKE_PHONE}</p>
        <p className="flex items-center gap-3 font-extrabold text-[#08751f]">✉ {INTAKE_EMAIL}</p>
      </div>

      <div className="rounded-2xl border border-[#e0e7e2] bg-white p-6 shadow-lg">
        <h3 className="flex items-center gap-3 font-serif text-xl font-black text-[#08751f]">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eef7f0] text-xl">🛡</span>
          Your Information is Safe
        </h3>
        <p className="mt-4 text-base leading-8 text-[#334155]">
          Local draft autosave stores non-file data in this browser only. Production PHI submission requires secure backend storage over HTTPS.
        </p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#cde6d2] bg-[#eef7f0] px-3 py-2 text-xs font-black text-[#08751f]">
          ✓ Local draft autosave enabled
        </span>
      </div>
    </aside>
  );
}
