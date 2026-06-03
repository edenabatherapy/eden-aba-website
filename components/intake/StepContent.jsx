"use client";

import { STEP_SECTIONS } from "@/lib/intake/step-config";
import ConsentDashboard from "./ConsentDashboard";
import IntakeField from "./IntakeField";

/**
 * @param {{
 *   step: number,
 *   data: Record<string, unknown>,
 *   onChange: (name: string, value: unknown) => void,
 *   onOpenConsent: (id: string) => void,
 *   documentMeta: Record<string, { name?: string }>,
 * }} props
 */
export default function StepContent({ step, data, onChange, onOpenConsent, documentMeta }) {
  const config = STEP_SECTIONS[step];
  if (!config) return null;

  return (
    <div className="space-y-4">
      {step === 0 && (
        <div className="rounded-2xl border border-[#d9e9dd] bg-gradient-to-r from-[#f3faf5] to-white p-6">
          <div className="flex gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#16942f] to-[#006d19] text-2xl text-white">📋</span>
            <div>
              <h2 className="text-xl font-black text-[#06461f]">Before You Begin</h2>
              <p className="mt-2 text-sm leading-7 text-[#243142]">
                Thank you for choosing Eden ABA Therapy. Please complete this advanced intake form to help our team understand your child&apos;s needs, verify eligibility, and coordinate services efficiently.
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          {config.sections.slice(0, 2).map((section) => (
            <SectionBlock key={section.title} section={section} data={data} onChange={onChange} documentMeta={documentMeta} />
          ))}
          <ConsentDashboard data={data} onChange={onChange} onOpenConsent={onOpenConsent} />
          {config.sections.slice(2).map((section) => (
            <SectionBlock key={section.title} section={section} data={data} onChange={onChange} documentMeta={documentMeta} />
          ))}
        </>
      )}

      {step !== 2 &&
        config.sections.map((section) => (
          <SectionBlock key={section.title} section={section} data={data} onChange={onChange} documentMeta={documentMeta} />
        ))}

      {step === 5 && (
        <div className="rounded-xl border border-[#cfe3d3] bg-[#f6fbf7] p-4 text-sm leading-7 text-[#06461f]">
          🛡 <b>Security note:</b> This form saves drafts in this browser only. Production use should submit over HTTPS to a HIPAA-ready backend with encryption at rest, role-based access, audit logs, retention policy, breach procedures, and BAAs.
        </div>
      )}
    </div>
  );
}

function SectionBlock({ section, data, onChange, documentMeta }) {
  const isUploadGrid = section.fields.some((f) => f.type === "file") && section.fields.length > 4;

  return (
    <div className="rounded-2xl border border-[#dfe8e2] bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{section.icon}</span>
        <h2 className="text-lg font-black text-[#06461f]">{section.title}</h2>
      </div>
      <div className={isUploadGrid ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-4" : "grid gap-4 md:grid-cols-2"}>
        {section.fields.map((field) => (
          <IntakeField
            key={field.name}
            field={field}
            value={data[field.name]}
            onChange={onChange}
            fileMeta={documentMeta[field.name]}
          />
        ))}
      </div>
    </div>
  );
}
