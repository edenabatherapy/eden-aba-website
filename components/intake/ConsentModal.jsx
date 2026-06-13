"use client";

import { useEffect } from "react";
import EdenLogo from "@/components/EdenLogo";
import { CONSENT_DOCS } from "@/lib/intake/consent-docs";
import IntakeField from "./IntakeField";

/**
 * @param {{
 *   consentId: string | null,
 *   data: Record<string, unknown>,
 *   onChange: (name: string, value: unknown) => void,
 *   onClose: () => void,
 * }} props
 */
export default function ConsentModal({ consentId, data, onChange, onClose }) {
  const doc = CONSENT_DOCS.find((c) => c.id === consentId);

  useEffect(() => {
    if (!consentId) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [consentId, onClose]);

  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/55 p-6" role="dialog" aria-modal="true" aria-labelledby="consent-modal-title">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-2xl border border-[#dfe8e2] bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#e4ece6] px-6 py-4">
          <div className="flex items-center gap-3">
            <EdenLogo size="intakePanel" />
            <p className="text-sm font-extrabold text-[#08751f]">Step 3 of 6: Legal & Consent</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg px-2 text-2xl text-[#667085] hover:bg-slate-100" aria-label="Close consent modal">
            ×
          </button>
        </div>

        <div className="px-6 py-6">
          <h2 id="consent-modal-title" className="font-serif text-3xl text-[#2f8a35]">
            {doc.title}
          </h2>
          <h3 className="mt-2 text-sm font-bold text-[#115c24]">{doc.subtitle}</h3>
          <p className="mt-3 text-sm leading-7 text-[#243b2b]">
            Please read the following information carefully. By signing below, you acknowledge and agree to this section.
          </p>
          <ul className="mt-4 space-y-3">
            {doc.items.map((item) => (
              <li key={item} className="relative pl-7 text-sm leading-7 text-[#243b2b] before:absolute before:left-0 before:font-black before:text-[#168f30] before:content-['✔']">
                {item}
              </li>
            ))}
          </ul>

          {doc.extra === "pickup" && (
            <div className="mt-4 rounded-xl border border-dashed border-[#9bd0a2] bg-[#fbfefc] p-4">
              <h3 className="font-bold text-[#115c24]">Authorized Pick-Up Persons</h3>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0b6f20] text-white">
                      <th className="p-2">Full Name</th>
                      <th className="p-2">Relationship</th>
                      <th className="p-2">Phone</th>
                      <th className="p-2">Photo ID Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((i) => (
                      <tr key={i} className="border border-[#d8e6da]">
                        <td className="p-2">
                          <input name={`pickupName${i}`} value={String(data[`pickupName${i}`] ?? "")} onChange={(e) => onChange(`pickupName${i}`, e.target.value)} className="w-full rounded border px-2 py-1.5" placeholder="Enter full name" />
                        </td>
                        <td className="p-2">
                          <input name={`pickupRel${i}`} value={String(data[`pickupRel${i}`] ?? "")} onChange={(e) => onChange(`pickupRel${i}`, e.target.value)} className="w-full rounded border px-2 py-1.5" placeholder="Relationship" />
                        </td>
                        <td className="p-2">
                          <input name={`pickupPhone${i}`} value={String(data[`pickupPhone${i}`] ?? "")} onChange={(e) => onChange(`pickupPhone${i}`, e.target.value)} className="w-full rounded border px-2 py-1.5" placeholder="(555) 555-5555" />
                        </td>
                        <td className="p-2">
                          <label className="inline-flex items-center gap-2">
                            <input type="checkbox" checked={data[`pickupId${i}`] === "Yes"} onChange={(e) => onChange(`pickupId${i}`, e.target.checked ? "Yes" : "")} className="accent-[#0E6B4F]" />
                            Yes
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {doc.extra === "custody" && (
            <div className="mt-4 space-y-3 rounded-xl border border-dashed border-[#9bd0a2] bg-[#fbfefc] p-4">
              <IntakeField
                field={{ name: "legalCustody", label: "Do both parents/guardians have legal custody?", type: "radio", required: true, options: ["Both", "One"] }}
                value={data.legalCustody}
                onChange={onChange}
              />
              <IntakeField field={{ name: "custodyExplain", label: "If no, please explain", type: "text", placeholder: "Please provide details about custody arrangement" }} value={data.custodyExplain} onChange={onChange} />
              <IntakeField
                field={{
                  name: "treatmentDecisionMaker",
                  label: "Who is authorized to make treatment decisions?",
                  type: "select",
                  options: ["Both Parents", "Mother", "Father", "Legal Guardian", "Other"],
                }}
                value={data.treatmentDecisionMaker}
                onChange={onChange}
              />
              <IntakeField field={{ name: "legalRestrictions", label: "Court orders or legal restrictions", type: "text", placeholder: "Please describe any restrictions" }} value={data.legalRestrictions} onChange={onChange} />
            </div>
          )}

          {doc.extra === "safety" && (
            <div className="mt-4 rounded-xl border border-dashed border-[#9bd0a2] bg-[#fbfefc] p-4">
              <IntakeField
                field={{ name: "safetyConcerns", label: "Specific safety considerations or concerns", type: "textarea", placeholder: "Share any specific safety considerations or concerns." }}
                value={data.safetyConcerns}
                onChange={onChange}
              />
            </div>
          )}

          <label className="mt-5 flex items-start gap-3 rounded-lg border border-[#cfe3d3] bg-[#fbfefc] p-3 text-sm font-extrabold">
            <input
              type="checkbox"
              name={`${doc.id}Ack`}
              checked={data[`${doc.id}Ack`] === "Yes" || data[`${doc.id}Ack`] === true}
              onChange={(e) => onChange(`${doc.id}Ack`, e.target.checked ? "Yes" : "")}
              className="mt-0.5 accent-[#0E6B4F]"
            />
            {doc.ack} *
          </label>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <IntakeField field={{ name: `${doc.id}Name`, label: "Parent / Guardian Full Name", type: "text", required: true, placeholder: "Type full name" }} value={data[`${doc.id}Name`]} onChange={onChange} />
            <IntakeField field={{ name: `${doc.id}Date`, label: "Date", type: "date", required: true }} value={data[`${doc.id}Date`]} onChange={onChange} />
          </div>
          <div className="mt-4">
            <IntakeField field={{ name: `${doc.id}Signature`, label: "Signature", type: "text", required: true, placeholder: "Type or draw your signature here" }} value={data[`${doc.id}Signature`]} onChange={onChange} />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#e4ece6] bg-[#fbfefc] px-6 py-4">
          <button type="button" onClick={() => window.print()} className="rounded-full bg-gradient-to-b from-[#168f30] to-[#006d19] px-6 py-3 text-sm font-extrabold text-white">
            🖨 Print
          </button>
          <button type="button" onClick={onClose} className="rounded-full border border-[#9ccc9f] bg-white px-6 py-3 text-sm font-extrabold text-[#08751f]">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
