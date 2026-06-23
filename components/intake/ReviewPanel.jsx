"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, Download, FileText, Pencil, Printer } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { fadeUp, staggerContainer, staggerItem } from "./intake-motion";

function formatValue(value) {
  if (Array.isArray(value)) return value.join(", ");
  if (value === null || value === undefined || value === "") return "—";
  return String(value);
}

function fill(template, vars) {
  return Object.entries(vars).reduce(
    (text, [key, value]) => text.replaceAll(`{${key}}`, String(value)),
    template || ""
  );
}

/**
 * @param {{
 *   data: Record<string, unknown>,
 *   onBack: () => void,
 *   onExport: () => void,
 *   intakeSteps: Array<{ title: string }>,
 *   stepSections: Array<{ sections: Array<{ title: string, fields: Array<{ name: string, label: string }> }> }>,
 *   reviewPanel: Record<string, string>,
 * }} props
 */
export default function ReviewPanel({
  data,
  onBack,
  onExport,
  intakeSteps = [],
  stepSections = [],
  reviewPanel = {},
}) {
  const rp = reviewPanel;
  const usedKeys = new Set();

  return (
    <div className="space-y-6">
      <motion.div
        {...fadeUp}
        className="overflow-hidden rounded-[1.75rem] border border-[#cde6d2] bg-gradient-to-br from-[#f1faf3] via-white to-[#fff8df] p-6 shadow-lg md:p-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <EdenLogo size="intake" className="shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128c8c]">{rp.eyebrow || "Review before submit"}</p>
              <h2 className="mt-2 flex items-center gap-3 text-2xl font-black text-[#06461f] md:text-3xl">
                <CheckCircle2 className="text-[#08751f]" size={32} />
                {rp.title || "Full Intake Review"}
              </h2>
              <p className="mt-3 max-w-none text-sm leading-7 text-[#243142] md:text-base">
                {rp.description ||
                  "Review your saved information before submission. Return to any step in the sidebar or intake form to edit fields."}
              </p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
            className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#08751f] text-white shadow-xl ring-4 ring-[#b8ddbf]/50"
          >
            <CheckCircle2 size={32} />
          </motion.div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-[#9ccc9f] bg-white px-5 py-2.5 text-sm font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]"
          >
            <ChevronLeft size={18} /> {rp.backToIntake || "Back to Intake"}
          </button>
          <button
            type="button"
            onClick={onExport}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#168f30] to-[#006d19] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg transition hover:brightness-105"
          >
            <Download size={18} /> {rp.exportPacket || "Export Packet"}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-[#9ccc9f] bg-white px-5 py-2.5 text-sm font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]"
          >
            <Printer size={18} /> {rp.printPdf || "Print / Save PDF"}
          </button>
        </div>
      </motion.div>

      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="grid gap-5">
        {intakeSteps.map((stepMeta, stepIndex) => {
          const config = stepSections[stepIndex];
          if (!config) return null;

          return (
            <motion.div
              key={`${stepMeta.title}-${stepIndex}`}
              variants={staggerItem}
              className="overflow-hidden rounded-[1.5rem] border border-[#dfe8e2] bg-white shadow-md"
            >
              <div className="flex items-center justify-between gap-4 border-b border-[#eef2ef] bg-gradient-to-r from-[#f8fcf9] to-white px-5 py-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-[#128c8c]">
                    {fill(rp.stepLabel, { n: stepIndex + 1 }) || `Step ${stepIndex + 1}`}
                  </p>
                  <h3 className="text-lg font-black text-[#06461f]">{stepMeta.title}</h3>
                </div>
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1 rounded-full border border-[#dfe8e2] px-3 py-1.5 text-xs font-black text-[#08751f] transition hover:border-[#9ccc9f] hover:bg-[#f4faf6]"
                >
                  <Pencil size={14} /> {rp.edit || "Edit"}
                </button>
              </div>
              <div className="divide-y divide-[#eef2ef]">
                {config.sections.map((section) => {
                  const rows = section.fields
                    .map((field) => {
                      usedKeys.add(field.name);
                      const val = data[field.name];
                      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
                        return null;
                      }
                      return (
                        <div key={field.name} className="grid gap-1 px-5 py-3 md:grid-cols-[minmax(180px,34%)_1fr] md:gap-4">
                          <dt className="text-xs font-black uppercase tracking-wide text-[#667085]">{field.label}</dt>
                          <dd className="text-sm font-semibold leading-6 text-[#111827]">{formatValue(val)}</dd>
                        </div>
                      );
                    })
                    .filter(Boolean);

                  if (rows.length === 0) return null;

                  return (
                    <div key={section.title}>
                      <div className="flex items-center gap-2 bg-[#fafcfb] px-5 py-2.5">
                        <FileText size={16} className="text-[#128c8c]" />
                        <p className="text-sm font-black text-[#06461f]">{section.title}</p>
                      </div>
                      <dl>{rows}</dl>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {Object.entries(data).filter(([key, value]) => !usedKeys.has(key) && formatValue(value) !== "—").length > 0 && (
        <motion.div {...fadeUp} className="overflow-hidden rounded-[1.5rem] border border-[#dfe8e2] bg-white shadow-md">
          <div className="border-b border-[#eef2ef] px-5 py-4">
            <h3 className="text-lg font-black text-[#06461f]">{rp.additionalFields || "Additional Saved Fields"}</h3>
          </div>
          <dl className="divide-y divide-[#eef2ef]">
            {Object.entries(data)
              .filter(([key, value]) => !usedKeys.has(key) && formatValue(value) !== "—")
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([key, value]) => (
                <div key={key} className="grid gap-1 px-5 py-3 md:grid-cols-[minmax(180px,34%)_1fr] md:gap-4">
                  <dt className="text-xs font-black uppercase tracking-wide text-[#667085]">{key}</dt>
                  <dd className="text-sm font-semibold leading-6 text-[#111827]">{formatValue(value)}</dd>
                </div>
              ))}
          </dl>
        </motion.div>
      )}
    </div>
  );
}
