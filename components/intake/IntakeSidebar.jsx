"use client";

import { motion } from "framer-motion";
import EdenLogo from "@/components/EdenLogo";
import { Card } from "@/components/ui/card";

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
    <aside className="h-fit w-full self-start lg:sticky lg:top-24">
      <Card className="rounded-3xl border border-[#dfe8e2] bg-white p-5 shadow-sm">
        <div className="flex justify-center py-2 lg:justify-start">
          <EdenLogo size="sidebar" priority />
        </div>

        <nav className="mt-4 grid gap-2" aria-label="Intake portal tabs">
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
            className="mt-4 rounded-xl border border-[#dfe8e2] bg-gradient-to-br from-white to-[#f8fcf9] p-4 text-sm"
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

        <div className="mt-4 space-y-3 text-sm">
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
      </Card>
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
