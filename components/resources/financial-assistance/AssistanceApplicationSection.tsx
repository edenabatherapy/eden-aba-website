"use client";

import { useCallback, useState } from "react";
import { ClipboardCheck, Search } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { APPLICATION_STATUS_LABELS, LEGAL_DISCLAIMER } from "@/lib/financial-platform/constants";

const SERVICE_OPTIONS = [
  "ABA therapy subsidy",
  "Assessment support",
  "Parent training",
  "Transportation assistance",
  "Equipment",
  "Emergency need",
];

export default function AssistanceApplicationSection() {
  const reduceMotion = useReducedMotion();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ trackingCode?: string; error?: string } | null>(null);
  const [trackCode, setTrackCode] = useState("");
  const [trackResult, setTrackResult] = useState<{
    status?: string;
    createdAt?: string;
    county?: string;
    error?: string;
  } | null>(null);

  const [form, setForm] = useState({
    applicantName: "",
    applicantEmail: "",
    applicantPhone: "",
    householdSize: 3,
    annualIncome: "",
    insuranceStatus: "",
    county: "",
    diagnosis: "",
    childAge: "",
    requestedServices: [] as string[],
    requestedHours: "",
    emergencyNeed: false,
    consentSigned: false,
    signatureData: "",
  });

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      requestedServices: prev.requestedServices.includes(service)
        ? prev.requestedServices.filter((s) => s !== service)
        : [...prev.requestedServices, service],
    }));
  };

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!form.consentSigned) {
        setResult({ error: "Consent and electronic signature are required." });
        return;
      }
      if (form.requestedServices.length === 0) {
        setResult({ error: "Select at least one requested service." });
        return;
      }

      setSubmitting(true);
      setResult(null);

      try {
        const res = await fetch("/api/financial-platform/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            applicantName: form.applicantName,
            applicantEmail: form.applicantEmail,
            applicantPhone: form.applicantPhone || undefined,
            householdSize: form.householdSize,
            annualIncomeCents: form.annualIncome
              ? Math.round(Number(form.annualIncome) * 100)
              : undefined,
            insuranceStatus: form.insuranceStatus || undefined,
            county: form.county,
            diagnosis: form.diagnosis || undefined,
            childAge: form.childAge ? Number(form.childAge) : undefined,
            requestedServices: form.requestedServices,
            requestedHours: form.requestedHours ? Number(form.requestedHours) : undefined,
            emergencyNeed: form.emergencyNeed,
            consentSigned: true,
            signatureData: form.signatureData || form.applicantName,
          }),
        });
        const data = await res.json();
        if (!data.ok) {
          setResult({ error: data.message ?? "Unable to submit application." });
          return;
        }
        setResult({ trackingCode: data.application.trackingCode });
      } catch {
        setResult({ error: "Unable to submit application. Please contact Eden ABA Therapy." });
      } finally {
        setSubmitting(false);
      }
    },
    [form],
  );

  const handleTrack = useCallback(async () => {
    if (!trackCode.trim()) return;
    setTrackResult(null);
    try {
      const res = await fetch(
        `/api/financial-platform/applications?code=${encodeURIComponent(trackCode.trim())}`,
      );
      const data = await res.json();
      if (!data.ok) {
        setTrackResult({ error: data.message ?? "Application not found." });
        return;
      }
      setTrackResult({
        status: data.application.status,
        createdAt: data.application.createdAt,
        county: data.application.county,
      });
    } catch {
      setTrackResult({ error: "Unable to look up application." });
    }
  }, [trackCode]);

  const reveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section
      id="assistance-application"
      className="scroll-mt-28 border-t border-slate-200 bg-slate-50 px-4 py-16 dark:border-slate-800 dark:bg-slate-900 lg:px-8 lg:py-20"
      aria-labelledby="application-heading"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div {...reveal}>
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[#0b4f4f]">
            <ClipboardCheck size={14} aria-hidden />
            Family assistance
          </p>
          <h2 id="application-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
            Request financial assistance
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            Complete a secure application for Eden&apos;s Autism Care Fund. Assistance depends on available funding,
            eligibility, and program policies—not guaranteed.
          </p>
          <p className="mt-4 text-sm text-amber-800 dark:text-amber-200" role="note">
            {LEGAL_DISCLAIMER}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-950">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="app-name" className="text-xs font-bold uppercase text-slate-500">Applicant name</label>
              <input id="app-name" required value={form.applicantName} onChange={(e) => setForm({ ...form, applicantName: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="app-email" className="text-xs font-bold uppercase text-slate-500">Email</label>
              <input id="app-email" type="email" required value={form.applicantEmail} onChange={(e) => setForm({ ...form, applicantEmail: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="app-county" className="text-xs font-bold uppercase text-slate-500">County</label>
              <input id="app-county" required value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="app-household" className="text-xs font-bold uppercase text-slate-500">Household size</label>
              <input id="app-household" type="number" min={1} max={20} required value={form.householdSize} onChange={(e) => setForm({ ...form, householdSize: Number(e.target.value) })} className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <fieldset>
            <legend className="text-xs font-bold uppercase text-slate-500">Requested services</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SERVICE_OPTIONS.map((service) => (
                <button
                  key={service}
                  type="button"
                  aria-pressed={form.requestedServices.includes(service)}
                  onClick={() => toggleService(service)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    form.requestedServices.includes(service)
                      ? "bg-[#0b4f4f] text-white"
                      : "border border-slate-200 text-slate-700 dark:border-slate-600 dark:text-slate-200"
                  }`}
                >
                  {service}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.emergencyNeed} onChange={(e) => setForm({ ...form, emergencyNeed: e.target.checked })} />
            This is an emergency need
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" required checked={form.consentSigned} onChange={(e) => setForm({ ...form, consentSigned: e.target.checked })} className="mt-1" />
            <span>
              I consent to Eden ABA Therapy reviewing this application and contacting me. I understand assistance is not
              guaranteed and depends on available funding and eligibility.
            </span>
          </label>

          <button type="submit" disabled={submitting} className="w-full rounded-full bg-[#0b4f4f] px-6 py-3.5 text-sm font-extrabold text-white disabled:opacity-60">
            {submitting ? "Submitting…" : "Submit application"}
          </button>

          {result?.trackingCode ? (
            <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300" role="status">
              Application received. Your tracking code: <strong>{result.trackingCode}</strong>
            </p>
          ) : null}
          {result?.error ? <p className="text-sm text-red-600" role="alert">{result.error}</p> : null}
        </form>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
          <h3 className="flex items-center gap-2 text-lg font-extrabold">
            <Search size={18} aria-hidden />
            Track application status
          </h3>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              placeholder="EDEN-XXXXXXXX"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
              aria-label="Tracking code"
            />
            <button type="button" onClick={handleTrack} className="rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-white dark:bg-slate-700">
              Look up
            </button>
          </div>
          {trackResult?.status ? (
            <p className="mt-4 text-sm">
              Status: <strong>{APPLICATION_STATUS_LABELS[trackResult.status] ?? trackResult.status}</strong>
              {trackResult.county ? ` · ${trackResult.county}` : ""}
              {trackResult.createdAt ? ` · Submitted ${new Date(trackResult.createdAt).toLocaleDateString()}` : ""}
            </p>
          ) : null}
          {trackResult?.error ? <p className="mt-4 text-sm text-red-600">{trackResult.error}</p> : null}
        </div>
      </div>
    </section>
  );
}
