"use client";

import EdenLogo from "@/components/EdenLogo";
import { INTAKE_EMAIL, INTAKE_PHONE, REQUIRED_DOC_LABELS } from "@/lib/intake/constants";

/**
 * @param {{ meta: { documents?: Record<string, { name?: string }>, audit?: unknown[] }, data: Record<string, unknown>, onClearDraft: () => void }} props
 */
export default function DocumentsPanel({ meta, data, onClearDraft }) {
  const docs = meta.documents || {};
  const uploaded = Object.values(docs).filter((d) => d?.name).length;

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <EdenLogo size="intakePanel" className="shrink-0" />
          <div>
            <h2 className="text-2xl font-black text-[#06461f]">▤ My Documents</h2>
            <p className="mt-2 text-sm leading-7 text-[#243142]">
              Document tracking works locally in this browser. Files are selected locally — upload on submit requires secure backend integration (POST /api/intake).
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#dfe8e2] bg-[#fbfefc] p-4">
            <b className="block text-2xl text-[#08751f]">{uploaded}</b>
            <span className="text-sm text-[#334155]">documents selected</span>
          </div>
          <div className="rounded-xl border border-[#dfe8e2] bg-[#fbfefc] p-4">
            <b className="block text-2xl text-[#08751f]">{Object.keys(data).length}</b>
            <span className="text-sm text-[#334155]">saved fields</span>
          </div>
          <div className="rounded-xl border border-[#dfe8e2] bg-[#fbfefc] p-4">
            <b className="block text-2xl text-[#08751f]">{(meta.audit || []).length}</b>
            <span className="text-sm text-[#334155]">audit events</span>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <h2 className="text-xl font-black text-[#06461f]">Required / Helpful Uploads</h2>
        <div className="mt-4 space-y-2">
          {REQUIRED_DOC_LABELS.map((label, i) => {
            const key = `file${i}`;
            const selected = docs[key]?.name;
            return (
              <div key={label} className="flex flex-col gap-2 rounded-xl border border-[#dfe8e2] bg-[#fbfefc] p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <b className="text-sm text-[#111827]">{label}</b>
                  <p className="text-xs text-[#667085]">{selected || "Not selected yet — use Uploads step or Intake Form tab"}</p>
                </div>
                <span className={`inline-flex w-fit rounded-full border px-3 py-1 text-xs font-black ${selected ? "border-[#cfe3d3] bg-[#eef7f0] text-[#08751f]" : "border-[#f5b5ad] bg-[#fff5f4] text-[#b42318]"}`}>
                  {selected ? "Selected locally" : "Missing"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <h2 className="text-xl font-black text-[#06461f]">Need Help With Documents?</h2>
        <p className="mt-2 text-sm">☎ {INTAKE_PHONE}</p>
        <p className="text-sm">✉ {INTAKE_EMAIL}</p>
        <button type="button" onClick={onClearDraft} className="mt-4 rounded-lg border border-[#f5b5ad] bg-[#fff5f4] px-4 py-2 text-sm font-black text-[#b42318]">
          Clear saved draft
        </button>
      </div>
    </div>
  );
}
