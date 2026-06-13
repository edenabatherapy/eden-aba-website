"use client";

import EdenLogo from "@/components/EdenLogo";

/**
 * Consistent Eden branding bar for intake flow steps and panels.
 * @param {{ subtitle?: string, compact?: boolean }} props
 */
export default function IntakeBrandHeader({ subtitle, compact = false }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border border-[#dfe8e2] bg-white shadow-sm ${
        compact ? "px-3 py-2.5" : "px-4 py-3"
      }`}
    >
      <EdenLogo size={compact ? "intakePanel" : "intake"} priority />
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-[#06461f]">Eden ABA Therapy</p>
        <p className="truncate text-xs font-semibold text-[#128c8c]">
          {subtitle || "Secure Intake Form"}
        </p>
      </div>
    </div>
  );
}
