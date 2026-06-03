"use client";

import { INTAKE_STEPS } from "@/lib/intake/constants";

const TABS = [
  { id: "intake", label: "▣ Intake Form" },
  { id: "documents", label: "▤ My Documents" },
  { id: "messages", label: "✉ Messages" },
];

/**
 * @param {{
 *   activeTab: string,
 *   currentStep: number,
 *   onTabChange: (tab: string) => void,
 *   onStepJump: (step: number) => void,
 *   onShowHelp: () => void,
 * }} props
 */
export default function IntakeSidebar({ activeTab, currentStep, onTabChange, onStepJump, onShowHelp }) {
  return (
    <aside className="hidden w-[275px] shrink-0 flex-col gap-6 border-r border-[#dfe8e2] bg-white p-5 lg:flex lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
      <div className="flex justify-center py-2">
        <img src="/logo.png" alt="Eden ABA Therapy" className="max-w-[210px] object-contain" />
      </div>

      <nav className="grid gap-2" aria-label="Intake portal tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`rounded-xl px-4 py-3 text-left text-base font-bold transition ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#edf7ef] to-[#f8fcf9] text-[#08751f]"
                : "text-[#111827] hover:bg-[#f6fbf7]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "intake" && (
        <div className="rounded-xl border border-[#dfe8e2] bg-white p-4 text-sm shadow-sm">
          <b className="text-[#08751f]">Intake Checklist</b>
          <ul className="mt-3 space-y-2">
            {INTAKE_STEPS.map((s, i) => (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => onStepJump(i)}
                  className={`flex w-full items-start gap-2 text-left text-xs leading-5 transition hover:bg-[#f6fbf7] ${
                    i < currentStep ? "font-bold text-[#08751f]" : i === currentStep ? "font-black text-[#08751f]" : "text-[#374151]"
                  }`}
                >
                  <span>{i < currentStep ? "✓" : i === currentStep ? "→" : "○"}</span>
                  {i + 1}. {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto space-y-3 text-sm">
        <div className="rounded-xl border border-[#dfe8e2] p-4 leading-6">
          🛡 <span>Your information is stored as a <b>local draft</b> in this browser. Secure backend submission is required for production PHI.</span>
        </div>
        <div className="rounded-xl border border-[#dfe8e2] p-4 leading-6">
          ⏱ <span><b>Estimated time:</b><br />15–25 minutes with documents ready.</span>
        </div>
        <button type="button" onClick={onShowHelp} className="w-full rounded-xl border border-[#dfe8e2] p-4 text-left leading-6 transition hover:border-[#8cc495] hover:bg-[#f3faf5]">
          👤 <span><b>Need Help?</b><br />Contact our team anytime.</span>
        </button>
      </div>
    </aside>
  );
}

export { TABS };
