"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { INTAKE_STEPS, MAX_FILE_SIZE } from "@/lib/intake/constants";
import { exportPacketFile, importPacketFile, submitIntake } from "@/lib/intake/export";
import {
  appendAudit,
  clearAllDrafts,
  loadActiveTab,
  loadCurrentStep,
  loadFormData,
  loadMeta,
  saveActiveTab,
  saveCurrentStep,
  saveFormData,
  saveMeta,
} from "@/lib/intake/storage";
import { getOverallCompletion, getStepCompletion, validateStep } from "@/lib/intake/validation";
import ConsentModal from "./ConsentModal";
import DocumentsPanel from "./DocumentsPanel";
import IntakeSidebar, { TABS } from "./IntakeSidebar";
import MessagesPanel from "./MessagesPanel";
import ProgressPanel from "./ProgressPanel";
import ReviewPanel from "./ReviewPanel";
import StepContent from "./StepContent";

/**
 * Advanced Eden ABA Therapy 6-step intake form.
 * Local draft storage only — connect POST /api/intake for secure production submission.
 */
export default function AdvancedIntakeForm({ t }) {
  const p = t.pages.intake;
  const formRef = useRef(null);
  const fileRefs = useRef(new Map());

  const [activeTab, setActiveTab] = useState("intake");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [meta, setMeta] = useState({ documents: {}, messages: [], audit: [] });
  const [saveStatus, setSaveStatus] = useState("Autosaved");
  const [consentModalId, setConsentModalId] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    setFormData(loadFormData());
    setCurrentStep(loadCurrentStep());
    setActiveTab(loadActiveTab());
    setMeta(loadMeta());
    setMounted(true);
  }, []);

  const persist = useCallback(
    (nextData, nextStep = currentStep, nextTab = activeTab, nextMeta = meta, action = "Draft saved") => {
      saveFormData(nextData);
      saveCurrentStep(nextStep);
      saveActiveTab(nextTab);
      const audited = appendAudit(nextMeta, action, nextStep);
      saveMeta(audited);
      setSaveStatus("Saved just now");
      setMeta(audited);
    },
    [activeTab, currentStep, meta]
  );

  const handleChange = useCallback(
    (name, value) => {
      setFormData((prev) => {
        const next = { ...prev, [name]: value };

        if (value instanceof File) {
          if (value.size > MAX_FILE_SIZE) {
            window.alert("File is over 10MB. Please upload a smaller file.");
            return prev;
          }
          fileRefs.current.set(name, value);
          setMeta((m) => {
            const documents = {
              ...m.documents,
              [name]: {
                name: value.name,
                size: value.size,
                type: value.type,
                selectedAt: new Date().toISOString(),
              },
            };
            const nextMeta = appendAudit({ ...m, documents }, `Document selected: ${name}`, currentStep);
            saveMeta(nextMeta);
            return nextMeta;
          });
          return prev;
        }

        if (name === "dob" && value) {
          const d = new Date(String(value));
          const now = new Date();
          let years = now.getFullYear() - d.getFullYear();
          const m = now.getMonth() - d.getMonth();
          if (m < 0 || (m === 0 && now.getDate() < d.getDate())) years--;
          if (years >= 0 && years < 30) next.childAge = String(years);
        }

        persist(next, currentStep, activeTab, meta, "Field updated");
        return next;
      });
    },
    [activeTab, currentStep, meta, persist]
  );

  const handleTabChange = (tab) => {
    persist(formData, currentStep, tab, meta, `Opened ${tab} tab`);
    setActiveTab(tab);
    setShowReview(false);
  };

  const handleStepJump = (step) => {
    persist(formData, step, "intake", meta, `Jumped to step ${step + 1}`);
    setCurrentStep(step);
    setActiveTab("intake");
    setShowReview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    if (!validateStep(currentStep, formData, formRef.current)) return;
    persist(formData, currentStep, activeTab, meta, "Validated step");

    if (currentStep === 5) {
      setShowReview(true);
      setActiveTab("intake");
      return;
    }

    const next = currentStep + 1;
    persist(formData, next, activeTab, meta, "Next step");
    setCurrentStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (currentStep === 0) return;
    const next = currentStep - 1;
    persist(formData, next, activeTab, meta, "Previous step");
    setCurrentStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSaveExit = () => {
    persist(formData, currentStep, activeTab, meta, "Save & exit");
    window.alert("✓ Your intake form has been saved locally. You can close this page and continue later in this browser.");
  };

  const handleFinalSubmit = async () => {
    if (!validateStep(5, formData, formRef.current)) return;
    persist(formData, currentStep, activeTab, meta, "Final validation");

    setSubmitting(true);
    setSubmitResult(null);

    const files = Object.fromEntries(fileRefs.current.entries());
    const result = await submitIntake(formData, meta, files);

    setSubmitting(false);

    if (result.ok && result.mode === "backend") {
      setSubmitResult({
        ok: true,
        confirmationId: result.confirmationId,
        submittedAt: result.submittedAt,
        message: result.message,
      });
      persist(formData, currentStep, activeTab, meta, "Submitted to server");
      return;
    }

    setSubmitResult({
      ok: false,
      message: result.message || p.submitError,
    });
  };

  const handleClearDraft = () => {
    if (!window.confirm("Clear all locally saved intake data, document metadata, messages, and audit log from this browser?")) return;
    clearAllDrafts();
    window.location.reload();
  };

  const handleImport = async (file) => {
    try {
      const imported = await importPacketFile(file);
      setFormData(imported.intake);
      setMeta(imported.meta);
      persist(imported.intake, currentStep, activeTab, imported.meta, "Backup imported");
      window.alert("Backup imported successfully.");
    } catch {
      window.alert("Could not import this JSON backup.");
    }
  };

  const handleSaveMessage = (subject, body) => {
    const messages = [{ subject, body, time: new Date().toISOString() }, ...(meta.messages || [])];
    const nextMeta = { ...meta, messages };
    persist({ ...formData, portalMsgSubject: subject, portalMsgBody: body }, currentStep, "messages", nextMeta, "Message draft saved");
    setFormData((d) => ({ ...d, portalMsgSubject: subject, portalMsgBody: body }));
    setMeta(nextMeta);
  };

  const stepCompletion = getStepCompletion(currentStep, formData);
  const overall = getOverallCompletion(formData);
  const stepInfo = INTAKE_STEPS[currentStep];

  if (!mounted) {
    return <div className="min-h-screen bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] px-4 py-20 text-center text-[#0b4f4f]">Loading intake form…</div>;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4]">
      <div className="mx-auto flex max-w-[1400px] flex-col lg:flex-row">
        <IntakeSidebar
          activeTab={activeTab}
          currentStep={currentStep}
          onTabChange={handleTabChange}
          onStepJump={handleStepJump}
          onShowHelp={() => window.alert(`Need help? Call ${p.phone || "+1 (703) 587-5238"} or email info@edenabatherapy.com`)}
        />

        <div className="min-w-0 flex-1 px-4 py-8 lg:px-8">
          {/* Mobile tab bar */}
          <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${activeTab === tab.id ? "bg-[#0E6B4F] text-white" : "border border-[#9ccc9f] bg-white text-[#08751f]"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-6">
            <h1 className="text-3xl font-black text-[#06461f] md:text-4xl">{p.title}</h1>
            <p className="mt-2 text-base font-semibold text-[#243142]">
              {activeTab === "intake" && !showReview ? stepInfo?.subtitle : p.secureDraftNote}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" onClick={() => { setShowReview(true); setActiveTab("intake"); }} className="rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f]">Review All</button>
              <button type="button" onClick={() => exportPacketFile(formData, meta)} className="rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f]">Export Packet</button>
              <label className="cursor-pointer rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f]">
                Import Backup
                <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
              </label>
              <button type="button" onClick={handleClearDraft} className="rounded-full border border-[#f5b5ad] bg-[#fff5f4] px-4 py-2 text-xs font-black text-[#b42318]">Clear Draft</button>
              <span className="inline-flex items-center rounded-full border border-[#cde6d2] bg-[#eef7f0] px-3 py-2 text-xs font-black text-[#08751f]">✓ Local draft autosave</span>
            </div>
          </div>

          {activeTab === "intake" && !showReview && (
            <>
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {INTAKE_STEPS.map((s, i) => (
                  <div key={s.title} className={`min-w-[120px] flex-1 text-center ${i <= currentStep ? "opacity-100" : "opacity-60"}`}>
                    <div
                      className={`mx-auto grid h-11 w-11 place-items-center rounded-full border text-sm font-black ${
                        i < currentStep
                          ? "border-[#08751f] bg-[#08751f] text-white"
                          : i === currentStep
                            ? "border-[#08751f] bg-gradient-to-b from-[#239035] to-[#006c18] text-white shadow-lg"
                            : "border-[#cfd8d3] bg-white text-[#667085]"
                      }`}
                    >
                      {i < currentStep ? "✓" : i + 1}
                    </div>
                    <p className={`mt-2 text-xs font-bold ${i === currentStep ? "text-[#08751f]" : "text-[#667085]"}`}>{s.title}</p>
                  </div>
                ))}
              </div>

              <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_330px]">
                <form ref={formRef} className="rounded-2xl border border-[#dfe8e2] bg-white p-5 shadow-lg md:p-6" onSubmit={(e) => e.preventDefault()}>
                  <StepContent
                    step={currentStep}
                    data={formData}
                    onChange={handleChange}
                    onOpenConsent={setConsentModalId}
                    documentMeta={meta.documents || {}}
                  />
                  <div className="mt-6 flex flex-col gap-3 border-t border-[#e4ece6] pt-5 sm:flex-row sm:justify-between">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="rounded-lg border border-[#8cc495] bg-white px-6 py-3 text-sm font-extrabold text-[#08751f] disabled:opacity-40"
                    >
                      ← Previous Step
                    </button>
                    <button type="button" onClick={handleSaveExit} className="rounded-lg border border-[#8cc495] bg-white px-6 py-3 text-sm font-extrabold text-[#08751f]">
                      💾 Save & Exit
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="rounded-lg bg-gradient-to-b from-[#168f30] to-[#006d19] px-6 py-3 text-sm font-extrabold text-white shadow-lg"
                    >
                      {currentStep === 5 ? "Review & Submit ✓" : "Next Step →"}
                    </button>
                  </div>
                </form>

                <ProgressPanel
                  currentStep={currentStep}
                  stepTitle={stepInfo?.title || ""}
                  completion={stepCompletion}
                  overall={overall}
                  saveStatus={saveStatus}
                  onSave={handleSaveExit}
                />
              </div>
            </>
          )}

          {activeTab === "intake" && showReview && (
            <ReviewPanel
              data={formData}
              onBack={() => setShowReview(false)}
              onExport={() => exportPacketFile(formData, meta)}
            />
          )}

          {showReview && activeTab === "intake" && (
            <div className="mt-6 space-y-4">
              {submitResult?.ok ? (
                <div className="rounded-2xl border border-[#b8ddbf] bg-[#f1faf3] p-6 text-[#06461f]">
                  <p className="text-lg font-black">{p.submitSuccess}</p>
                  <p className="mt-2 font-bold">
                    {(p.submitConfirmation || "Confirmation ID: {id}").replace("{id}", submitResult.confirmationId || "")}
                  </p>
                  {submitResult.submittedAt && (
                    <p className="mt-1 text-sm">
                      {(p.submitSubmittedAt || "Submitted: {date}").replace(
                        "{date}",
                        new Date(submitResult.submittedAt).toLocaleString()
                      )}
                    </p>
                  )}
                </div>
              ) : submitResult?.ok === false ? (
                <div className="rounded-2xl border border-[#f5b5ad] bg-[#fff5f4] p-6 text-[#b42318]">
                  <p className="font-black">{submitResult.message}</p>
                  <p className="mt-2 text-sm">{p.exportBackupHint}</p>
                </div>
              ) : null}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={submitting || submitResult?.ok}
                  className="rounded-lg bg-gradient-to-b from-[#168f30] to-[#006d19] px-8 py-4 text-base font-extrabold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? p.submitting || "Submitting…" : p.reviewSubmit}
                </button>
              </div>
            </div>
          )}

          {activeTab === "documents" && <DocumentsPanel meta={meta} data={formData} onClearDraft={handleClearDraft} />}
          {activeTab === "messages" && (
            <MessagesPanel data={formData} meta={meta} onChange={handleChange} onSaveMessage={handleSaveMessage} />
          )}

          <p className="mt-8 text-center text-xs text-[#667085]">
            🔒 Your information is stored as a local draft in this browser for convenience. Secure backend submission is required for production PHI handling.
          </p>
        </div>
      </div>

      <ConsentModal
        consentId={consentModalId}
        data={formData}
        onChange={handleChange}
        onClose={() => {
          persist(formData, currentStep, activeTab, meta, "Closed consent modal");
          setConsentModalId(null);
        }}
      />
    </section>
  );
}
