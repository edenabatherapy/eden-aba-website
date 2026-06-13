"use client";

import { motion } from "framer-motion";
import EdenLogo from "@/components/EdenLogo";

/**
 * @param {{
 *   activeTab: string,
 *   currentStep: number,
 *   intakeSteps: Array<{ title: string, subtitle?: string }>,
 *   sidebar: Record<string, unknown>,
 *   tabs: Array<{ id: string, label: string }>,
 *   onTabChange: (tab: string) => void,
 *   onStepJump: (step: number) => void,
 *   onShowHelp: () => void,
 * }} props
 */
export default function IntakeSidebar({
  activeTab,
  currentStep,
  intakeSteps,
  sidebar,
  tabs,
  onTabChange,
  onStepJump,
  onShowHelp,
}) {
  const draftNote = sidebar.draftNote || "";
  const estimatedTime = sidebar.estimatedTime || "Estimated time:";
  const estimatedTimeValue = sidebar.estimatedTimeValue || "";

  return (
    <aside className="hidden w-[275px] shrink-0 flex-col gap-6 border-r border-[#dfe8e2] bg-white/95 p-5 backdrop-blur-sm lg:flex lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
      <div className="flex justify-center py-2">
        <EdenLogo size="sidebar" priority />
      </div>

      <nav className="grid gap-2" aria-label="Intake portal tabs">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            whileHover={{ x: 2 }}
            className={`rounded-xl px-4 py-3 text-left text-base font-bold transition ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-[#edf7ef] to-[#f8fcf9] text-[#08751f] shadow-sm ring-1 ring-[#cde6d2]"
                : "text-[#111827] hover:bg-[#f6fbf7]"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </nav>

      {activeTab === "intake" && (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[#dfe8e2] bg-gradient-to-br from-white to-[#f8fcf9] p-4 text-sm shadow-sm"
        >
          <b className="text-[#08751f]">{sidebar.checklist || "Intake Checklist"}</b>
          <ul className="mt-3 space-y-2">
            {intakeSteps.map((s, i) => (
              <li key={`${s.title}-${i}`}>
                <button
                  type="button"
                  onClick={() => onStepJump(i)}
                  className={`flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-xs leading-5 transition hover:bg-[#edf7ef] ${
                    i < currentStep ? "font-bold text-[#08751f]" : i === currentStep ? "font-black text-[#08751f]" : "text-[#374151]"
                  }`}
                >
                  <span className="mt-0.5">{i < currentStep ? "✓" : i === currentStep ? "→" : "○"}</span>
                  {i + 1}. {s.title}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <div className="mt-auto space-y-3 text-sm">
        <div className="rounded-xl border border-[#dfe8e2] bg-[#fafcfb] p-4 leading-6">
          🛡 <span>{draftNote}</span>
        </div>
        <div className="rounded-xl border border-[#dfe8e2] bg-[#fafcfb] p-4 leading-6">
          ⏱{" "}
          <span>
            <b>{estimatedTime}</b>
            <br />
            {estimatedTimeValue}
          </span>
        </div>
        <button
          type="button"
          onClick={onShowHelp}
          className="w-full rounded-xl border border-[#dfe8e2] p-4 text-left leading-6 transition hover:border-[#8cc495] hover:bg-[#f3faf5]"
        >
          👤{" "}
          <span>
            <b>{sidebar.needHelp || "Need Help?"}</b>
            <br />
            {sidebar.needHelpSub || "Contact our team anytime."}
          </span>
        </button>
      </div>
    </aside>
  );
}

export function buildIntakeTabs(sidebar) {
  const tabLabels = sidebar?.tabs || {};
  return [
    { id: "intake", label: tabLabels.intake || "▣ Intake Form" },
    { id: "documents", label: tabLabels.documents || "▤ My Documents" },
    { id: "messages", label: tabLabels.messages || "✉ Messages" },
  ];
}
