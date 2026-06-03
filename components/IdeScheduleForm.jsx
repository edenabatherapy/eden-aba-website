"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import EdenButton from "@/components/EdenButton";

export default function IdeScheduleForm({ t }) {
  const f = t.pages.ideEvaluation.form;
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    childFirstName: "",
    childDateOfBirth: "",
    zipCode: "",
    preferredLocation: "",
    completedScreener: "",
    concerns: "",
    hasDiagnosis: "",
    consent: false,
  });

  const updateForm = (key, value) => {
    if (key === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      const formatted =
        digits.length > 6
          ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
          : digits.length > 3
            ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
            : digits;
      setForm((old) => ({ ...old, phone: formatted }));
      return;
    }
    setForm((old) => ({ ...old, [key]: value }));
  };

  const phoneDigits = form.phone.replace(/\D/g, "");
  const emailValid = form.email.includes("@") && form.email.includes(".");
  const phoneValid = phoneDigits.length >= 10;
  const valid =
    form.parentFirstName.trim() &&
    form.parentLastName.trim() &&
    emailValid &&
    phoneValid &&
    form.zipCode.trim() &&
    form.preferredLocation &&
    form.consent;

  const fieldClass =
    "w-full rounded-2xl border border-[#0E6B4F]/15 bg-white px-4 py-4 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#0E6B4F] focus:ring-4 focus:ring-[#0E6B4F]/10";

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!valid) return;

    const payload = {
      ...form,
      parentFirstName: form.parentFirstName.trim(),
      parentLastName: form.parentLastName.trim(),
      email: form.email.trim(),
      zipCode: form.zipCode.trim(),
      submittedAt: new Date().toISOString(),
    };

    // TODO: Connect to Eden ABA Therapy IDE evaluation request API endpoint.
    if (typeof window !== "undefined") {
      localStorage.setItem("eden-ide-evaluation-placeholder", JSON.stringify(payload));
    }
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-8 text-center shadow-xl md:p-10">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#0E6B4F]/10">
          <CheckCircle2 size={36} className="text-[#0E6B4F]" />
        </div>
        <p className="mt-6 text-lg font-semibold leading-8 text-slate-600">{f.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[#0E6B4F]/10 bg-white p-6 shadow-2xl md:p-10">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.parentFirstName}
          <input required className={fieldClass} value={form.parentFirstName} onChange={(e) => updateForm("parentFirstName", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.parentLastName}
          <input required className={fieldClass} value={form.parentLastName} onChange={(e) => updateForm("parentLastName", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {f.fields.email}
          <input required type="email" className={fieldClass} value={form.email} onChange={(e) => updateForm("email", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {f.fields.phone}
          <input required type="tel" className={fieldClass} value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.childDateOfBirth}
          <input type="date" className={fieldClass} value={form.childDateOfBirth} onChange={(e) => updateForm("childDateOfBirth", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.childFirstName}
          <input className={fieldClass} value={form.childFirstName} onChange={(e) => updateForm("childFirstName", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.zipCode}
          <input required className={fieldClass} value={form.zipCode} onChange={(e) => updateForm("zipCode", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700">
          {f.fields.preferredLocation}
          <select required className={fieldClass} value={form.preferredLocation} onChange={(e) => updateForm("preferredLocation", e.target.value)}>
            <option value="">{f.locationPlaceholder}</option>
            {f.locationOptions.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {f.fields.completedScreener}
          <select className={fieldClass} value={form.completedScreener} onChange={(e) => updateForm("completedScreener", e.target.value)}>
            <option value="">{f.selectPlaceholder}</option>
            {f.screenerOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {f.fields.concerns}
          <textarea rows={3} className={fieldClass} value={form.concerns} onChange={(e) => updateForm("concerns", e.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-black text-slate-700 md:col-span-2">
          {f.fields.hasDiagnosis}
          <select className={fieldClass} value={form.hasDiagnosis} onChange={(e) => updateForm("hasDiagnosis", e.target.value)}>
            <option value="">{f.selectPlaceholder}</option>
            {f.diagnosisOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 rounded-2xl bg-[#FAF7F0] p-5 text-sm font-semibold leading-7 text-slate-700">
        <input type="checkbox" checked={form.consent} onChange={(e) => updateForm("consent", e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#0E6B4F]" />
        <span>{f.consent}</span>
      </label>

      {submitted && !valid && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-600">{f.validationError}</p>}

      <EdenButton type="submit" size="form" className="mt-8 w-full sm:w-auto">
        {f.submit}
      </EdenButton>
    </form>
  );
}
