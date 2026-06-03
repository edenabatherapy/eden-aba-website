"use client";

/**
 * @param {{ data: Record<string, unknown>, onBack: () => void, onExport: () => void }} props
 */
export default function ReviewPanel({ data, onBack, onExport }) {
  const rows = Object.entries(data).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-6 shadow-lg">
        <h2 className="text-2xl font-black text-[#06461f]">✅ Full Intake Review</h2>
        <p className="mt-2 text-sm leading-7 text-[#243142]">
          Review saved data before submission/export. Use the Intake Form tab to edit any item.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={onBack} className="rounded-lg border border-[#9ccc9f] bg-white px-5 py-2.5 text-sm font-extrabold text-[#08751f]">
            Back to Intake
          </button>
          <button type="button" onClick={onExport} className="rounded-lg bg-gradient-to-b from-[#168f30] to-[#006d19] px-5 py-2.5 text-sm font-extrabold text-white">
            Export Packet
          </button>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-[#9ccc9f] bg-white px-5 py-2.5 text-sm font-extrabold text-[#08751f]">
            Print / Save PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#dfe8e2] bg-white p-4 shadow-lg">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#f3faf5] text-[#06461f]">
              <th className="border border-[#e4ece6] p-2 text-left">Field</th>
              <th className="border border-[#e4ece6] p-2 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([key, value]) => (
              <tr key={key}>
                <th className="border border-[#e4ece6] p-2 align-top font-bold">{key}</th>
                <td className="border border-[#e4ece6] p-2 align-top">
                  {Array.isArray(value) ? value.join(", ") : String(value ?? "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
