"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { MAX_FILE_SIZE } from "@/lib/intake/constants";
import {
  getLocalizedIntakeSidebar,
  getLocalizedIntakeSteps,
  getLocalizedIntakeUi,
  getLocalizedStepSections,
  getLocalizedStepTips,
} from "@/lib/intake/localize";
import { getIntakeForm } from "@/lib/i18n";
import { exportPacketFile, importPacketFile, submitIntake } from "@/lib/intake/export";
import {
  applyLegalGlobalSideEffects,
  ensureLegalGlobalFields,
  getLegalGlobalFieldErrors,
  getTodayLegalDate,
  hasLegalGlobalChanges,
  LEGAL_GLOBAL_FIELDS,
  parseLegalValidationMessage,
} from "@/lib/intake/legal-global";
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
import EdenLogo from "@/components/EdenLogo";
import RecaptchaNotice from "@/components/RecaptchaNotice";
import ReCaptchaVerification from "@/components/security/ReCaptchaVerification";
import { useReCaptchaV2 } from "@/hooks/useReCaptchaV2";
import IntakeBrandHeader from "./IntakeBrandHeader";
import IntakeSidebar, { buildIntakeTabs } from "./IntakeSidebar";
import MessagesPanel from "./MessagesPanel";
import ProgressPanel from "./ProgressPanel";
import ReviewPanel from "./ReviewPanel";
import StepContent from "./StepContent";

/**
 * Advanced Eden ABA Therapy 6-step intake form.
 * Local draft storage only — connect POST /api/intake for secure production submission.
 */
export default function AdvancedIntakeForm({ t, language = "en" }) {
  const p = t.pages.intake;
  const intakeForm = useMemo(() => getIntakeForm(language), [language]);
  const intakeSteps = useMemo(() => getLocalizedIntakeSteps(language), [language]);
  const stepSections = useMemo(() => getLocalizedStepSections(language), [language]);
  const stepTips = useMemo(() => getLocalizedStepTips(language), [language]);
  const sidebar = useMemo(() => getLocalizedIntakeSidebar(language), [language]);
  const tabs = useMemo(() => buildIntakeTabs(sidebar), [sidebar]);
  const ui = useMemo(() => getLocalizedIntakeUi(language), [language]);
  const advancedForm = intakeForm.advancedForm || {};
  const progressPanel = intakeForm.progressPanel || {};
  const reviewPanel = intakeForm.reviewPanel || {};
  const {
    recaptchaRef,
    recaptchaError,
    verifying,
    verifyingMessage,
    canSubmit: recaptchaReady,
    handleTokenChange,
    handleExpired,
    validating,
    resetRecaptcha,
    requireRecaptcha,
    verifyRecaptchaWithServer,
    releaseSubmitLock,
  } = useReCaptchaV2();
  const formRef = useRef(null);
  const fileRefs = useRef(new Map());

  const [activeTab, setActiveTab] = useState("intake");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [meta, setMeta] = useState({ documents: {}, messages: [], audit: [] });
  const [saveStatus, setSaveStatus] = useState(() => ui.autosaved || "Autosaved");
  const [consentModalId, setConsentModalId] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [missingFields, setMissingFields] = useState([]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setFormData(loadFormData());
      setCurrentStep(loadCurrentStep());
      setActiveTab(loadActiveTab());
      setMeta(loadMeta());
      setMounted(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const persist = useCallback(
    (nextData, nextStep = currentStep, nextTab = activeTab, nextMeta = meta, action = "Draft saved") => {
      saveFormData(nextData);
      saveCurrentStep(nextStep);
      saveActiveTab(nextTab);
      const audited = appendAudit(nextMeta, action, nextStep);
      saveMeta(audited);
      setSaveStatus(ui.savedJustNow || "Saved just now");
      setMeta(audited);
    },
    [activeTab, currentStep, meta]
  );

  const handleChange = useCallback(
    (name, value) => {
      setFormData((prev) => {
        let next = { ...prev, [name]: value };

        if (!(value instanceof File)) {
          next = applyLegalGlobalSideEffects(next, name, value);

          if (name === "finalSignature" && String(value ?? "").trim() && !String(next.finalDate ?? "").trim()) {
            next.finalDate = getTodayLegalDate();
          }

          setFieldErrors((current) => {
            let changed = false;
            const updated = { ...current };
            for (const field of LEGAL_GLOBAL_FIELDS) {
              if (updated[field] && String(next[field] ?? "").trim()) {
                delete updated[field];
                changed = true;
              }
            }
            if (updated[name] && String(next[name] ?? "").trim()) {
              delete updated[name];
              changed = true;
            }
            if (name.endsWith("Ack") && (value === "Yes" || value === true) && updated[name]) {
              delete updated[name];
              changed = true;
            }
            return changed ? updated : current;
          });
        }

        if (value instanceof File) {
          if (value.size > MAX_FILE_SIZE) {
            window.alert(advancedForm.fileTooLarge || "File is over 10MB. Please upload a smaller file.");
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

        if (fieldErrors[name]) {
          setFieldErrors((current) => {
            if (!current[name]) return current;
            const updated = { ...current };
            delete updated[name];
            return updated;
          });
        }

        persist(next, currentStep, activeTab, meta, "Field updated");
        return next;
      });
    },
    [activeTab, currentStep, fieldErrors, meta, persist]
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
    setFieldErrors({});
    setMissingFields([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    const validation = validateStep(currentStep, formData, formRef.current);
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors || {});
      setMissingFields(validation.missingFields || []);
      if (validation.errorStep === 2) {
        document.getElementById("eden-legal-signature-section")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setFieldErrors({});
    setMissingFields({});
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
    window.alert(advancedForm.savedLocally || p.saveAlert);
  };

  const handleFinalSubmit = async () => {
    const prepared = ensureLegalGlobalFields(formData);
    if (hasLegalGlobalChanges(formData, prepared)) {
      setFormData(prepared);
      persist(prepared, currentStep, activeTab, meta, "Legal fields applied");
    }

    const legalErrors = getLegalGlobalFieldErrors(prepared, {
      legalGlobalName: intakeForm.consentDashboard?.legalGlobalName,
      legalGlobalDate: intakeForm.consentDashboard?.legalGlobalDate,
      legalGlobalSignature: intakeForm.consentDashboard?.legalGlobalSignature,
    });

    if (Object.keys(legalErrors).length > 0) {
      setFieldErrors(legalErrors);
      setMissingFields(
        Object.keys(legalErrors).map((name) => ({
          name,
          label:
            name === "legalGlobalName"
              ? "Legal name"
              : name === "legalGlobalDate"
                ? "Legal signature date"
                : "Legal signature",
        })),
      );
      setShowReview(false);
      setCurrentStep(2);
      setActiveTab("intake");
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById("eden-legal-signature-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    setFieldErrors({});

    const validation = validateStep(5, prepared, formRef.current);
    if (!validation.valid) {
      setFieldErrors(validation.fieldErrors || {});
      setMissingFields(validation.missingFields || []);
      setShowReview(false);
      setCurrentStep(5);
      setActiveTab("intake");
      return;
    }

    persist(prepared, currentStep, activeTab, meta, "Final validation");

    if (!requireRecaptcha()) {
      setSubmitResult({
        ok: false,
        message: t.startAbaRecaptchaIncomplete || "Please complete the security verification.",
      });
      return;
    }

    setSubmitting(true);
    setSubmitResult(null);

    const files = Object.fromEntries(fileRefs.current.entries());

    const recaptcha = await verifyRecaptchaWithServer();
    if (!recaptcha.success) {
      setSubmitting(false);
      releaseSubmitLock();
      setSubmitResult({
        ok: false,
        message: p.recaptchaFailed || t.recaptchaFailed,
      });
      return;
    }

    const result = await submitIntake(prepared, meta, files, recaptcha.token);

    setSubmitting(false);
    releaseSubmitLock();

    if (result.ok && result.mode === "backend") {
      setSubmitResult({
        ok: true,
        confirmationId: result.confirmationId,
        submittedAt: result.submittedAt,
        message: result.message || p.submitSuccess,
      });
      resetRecaptcha();
      persist(prepared, currentStep, activeTab, meta, "Submitted to server");
      return;
    }

    setSubmitResult({
      ok: false,
      message: result.message || p.submitError,
    });

    const legalError = parseLegalValidationMessage(result.message);
    if (legalError) {
      setFieldErrors({ [legalError.field]: legalError.message });
      setMissingFields([{ name: legalError.field, label: legalError.message }]);
      setShowReview(false);
      setCurrentStep(2);
      setActiveTab("intake");
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.getElementById("eden-legal-signature-section")?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    resetRecaptcha();
  };

  const handleClearDraft = () => {
    if (!window.confirm(advancedForm.clearConfirm || "Clear all locally saved intake data from this browser?")) return;
    clearAllDrafts();
    window.location.reload();
  };

  const handleImport = async (file) => {
    try {
      const imported = await importPacketFile(file);
      setFormData(imported.intake);
      setMeta(imported.meta);
      persist(imported.intake, currentStep, activeTab, imported.meta, "Backup imported");
      window.alert(advancedForm.backupImported || "Backup imported successfully.");
    } catch {
      window.alert(advancedForm.backupImportFailed || "Could not import this JSON backup.");
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
  const stepInfo = intakeSteps[currentStep];
  const brandSubtitle =
    activeTab === "documents"
      ? advancedForm.myDocuments || "My Documents"
      : activeTab === "messages"
        ? advancedForm.messages || "Messages"
        : showReview
          ? advancedForm.reviewSubmitTab || p.reviewSubmit
          : (advancedForm.stepProgress || "Step {current} of {total} · {title}")
              .replace("{current}", String(currentStep + 1))
              .replace("{total}", "6")
              .replace("{title}", stepInfo?.title || sidebar?.tabs?.intake || "Intake Form");

  if (!mounted) {
    return (
      <section className="relative bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] py-12 lg:py-16">
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-5 lg:px-6">
          <div className="flex items-center justify-center py-20 text-center">
            <motion.div initial={false} animate={{ opacity: 1, y: 0 }} className="text-[#0b4f4f]">
              <EdenLogo size="intake" className="mx-auto mb-4" />
              <p className="font-bold">{advancedForm.loading || ui.loading || "Loading intake form…"}</p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const isActiveFormSteps = activeTab === "intake" && !showReview;
  const portalGridClass =
    "grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(220px,20%)_minmax(0,1fr)_minmax(240px,22%)] lg:gap-6 xl:grid-cols-[minmax(260px,20%)_minmax(0,58%)_minmax(300px,22%)] xl:gap-8";
  const twoColumnGridClass =
    "grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(240px,22%)_minmax(0,1fr)] lg:gap-8";

  const intakePageHeader = (
    <div className="mb-6">
      <motion.h1
        key={activeTab + String(showReview)}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-black text-[#06461f] md:text-4xl xl:text-[2.75rem]"
      >
        {p.title}
      </motion.h1>
      <p className="mt-2 text-base font-semibold leading-7 text-[#243142] xl:text-lg">
        {activeTab === "intake" && !showReview ? stepInfo?.subtitle : p.secureDraftNote}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => { setShowReview(true); setActiveTab("intake"); }} className="rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]">{advancedForm.reviewAll || "Review All"}</button>
        <button type="button" onClick={() => exportPacketFile(ensureLegalGlobalFields(formData), meta)} className="rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]">{advancedForm.exportPacket || "Export Packet"}</button>
        <label className="cursor-pointer rounded-full border border-[#9ccc9f] bg-white px-4 py-2 text-xs font-black text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]">
          {advancedForm.importBackup || "Import Backup"}
          <input type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
        </label>
        <button type="button" onClick={handleClearDraft} className="rounded-full border border-[#f5b5ad] bg-[#fff5f4] px-4 py-2 text-xs font-black text-[#b42318]">{advancedForm.clearDraft || "Clear Draft"}</button>
        <span className="inline-flex items-center rounded-full border border-[#cde6d2] bg-[#eef7f0] px-3 py-2 text-xs font-black text-[#08751f]">{advancedForm.localAutosave || "✓ Local draft autosave"}</span>
      </div>
    </div>
  );

  const stepProgressBar = (
    <>
      <div className="mb-4 hidden lg:block">
        <IntakeBrandHeader subtitle={brandSubtitle} />
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {intakeSteps.map((s, i) => (
            <motion.button
              key={s.title}
              type="button"
              onClick={() => handleStepJump(i)}
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`text-center transition ${i <= currentStep ? "opacity-100" : "opacity-55"}`}
            >
              <div
                className={`mx-auto grid h-10 w-10 place-items-center rounded-full border text-sm font-black transition sm:h-11 sm:w-11 ${
                  i < currentStep
                    ? "border-[#08751f] bg-[#08751f] text-white shadow-md"
                    : i === currentStep
                      ? "border-[#08751f] bg-gradient-to-b from-[#239035] to-[#006c18] text-white shadow-lg ring-4 ring-[#b8ddbf]/40"
                      : "border-[#cfd8d3] bg-white text-[#667085]"
                }`}
              >
                {i < currentStep ? "✓" : i + 1}
              </div>
              <p className={`mt-2 text-[10px] font-bold leading-snug sm:text-xs ${i === currentStep ? "text-[#08751f]" : "text-[#667085]"}`}>{s.title}</p>
            </motion.button>
          ))}
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7eee9]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#168f30] to-[#006d19]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / 6) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </>
  );

  const intakeFormCard = (
    <form ref={formRef} className="w-full rounded-[1.75rem] border border-[#dfe8e2] bg-white p-5 shadow-xl shadow-emerald-950/5 md:p-7 xl:p-8" onSubmit={(e) => e.preventDefault()}>
      <StepContent
        step={currentStep}
        data={formData}
        onChange={handleChange}
        onOpenConsent={setConsentModalId}
        documentMeta={meta.documents || {}}
        stepSections={stepSections}
        intakeSteps={intakeSteps}
        ui={ui}
        consentDashboard={intakeForm.consentDashboard}
        fieldErrors={fieldErrors}
        missingFields={missingFields}
      />
      <div className="mt-8 flex flex-col gap-3 border-t border-[#e4ece6] pt-6 sm:flex-row sm:flex-wrap sm:justify-between">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="rounded-xl border border-[#8cc495] bg-white px-6 py-3.5 text-sm font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6] disabled:opacity-40"
        >
          {p.previousStep}
        </button>
        <button type="button" onClick={handleSaveExit} className="rounded-xl border border-[#8cc495] bg-white px-6 py-3.5 text-sm font-extrabold text-[#08751f] shadow-sm transition hover:bg-[#f4faf6]">
          {p.saveExit}
        </button>
        <motion.button
          type="button"
          onClick={handleNext}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-xl bg-gradient-to-b from-[#168f30] to-[#006d19] px-6 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-emerald-900/15 sm:ml-auto"
        >
          {currentStep === 5 ? p.reviewSubmit : p.nextStep}
        </motion.button>
      </div>
    </form>
  );

  const progressAside = (
    <div className="w-full lg:sticky lg:top-24 lg:h-fit lg:self-start">
      <ProgressPanel
        currentStep={currentStep}
        stepTitle={stepInfo?.title || ""}
        completion={stepCompletion}
        overall={overall}
        saveStatus={saveStatus}
        stepTips={stepTips}
        progressPanel={progressPanel}
        onSave={handleSaveExit}
      />
    </div>
  );

  return (
    <section className="relative bg-gradient-to-br from-[#fff8df] via-white to-[#ddf4f4] py-12 pb-24 lg:py-16">
      <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-5 lg:px-6">
        {activeTab === "intake" && intakePageHeader}

        {isActiveFormSteps ? (
          <div className={portalGridClass}>
            <IntakeSidebar
              activeTab={activeTab}
              currentStep={currentStep}
              intakeSteps={intakeSteps}
              sidebar={sidebar}
              tabs={tabs}
              onTabChange={handleTabChange}
              onStepJump={handleStepJump}
              onShowHelp={() =>
                window.alert(
                  (advancedForm.needHelpAlert || "Need help? Call {phone} or email {email}")
                    .replace("{phone}", p.phone || "+1 (703) 587-5238")
                    .replace("{email}", "info@edenabatherapy.com")
                )
              }
            />

            <div className="min-w-0">
              <div className="mb-5 lg:hidden">
                <IntakeBrandHeader subtitle={brandSubtitle} />
              </div>
              {stepProgressBar}
              {intakeFormCard}
            </div>

            {progressAside}
          </div>
        ) : (
          <div className={twoColumnGridClass}>
            <IntakeSidebar
              activeTab={activeTab}
              currentStep={currentStep}
              intakeSteps={intakeSteps}
              sidebar={sidebar}
              tabs={tabs}
              onTabChange={handleTabChange}
              onStepJump={handleStepJump}
              onShowHelp={() =>
                window.alert(
                  (advancedForm.needHelpAlert || "Need help? Call {phone} or email {email}")
                    .replace("{phone}", p.phone || "+1 (703) 587-5238")
                    .replace("{email}", "info@edenabatherapy.com")
                )
              }
            />

            <main className="min-w-0">
              <div className="mb-5 lg:hidden">
                <IntakeBrandHeader subtitle={brandSubtitle} />
              </div>

              {activeTab !== "intake" && (
                <div className="mb-6">
                  <motion.h1
                    key={activeTab}
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-black text-[#06461f] md:text-4xl"
                  >
                    {activeTab === "documents"
                      ? advancedForm.myDocuments || "My Documents"
                      : advancedForm.messages || "Messages"}
                  </motion.h1>
                </div>
              )}

              {activeTab === "intake" && showReview && (
                <ReviewPanel
                  data={formData}
                  onBack={() => setShowReview(false)}
                  onExport={() => exportPacketFile(ensureLegalGlobalFields(formData), meta)}
                  intakeSteps={intakeSteps}
                  stepSections={stepSections}
                  reviewPanel={reviewPanel}
                />
              )}

              {showReview && activeTab === "intake" && (
                <div className="mt-6 space-y-4">
                  <AnimatePresence mode="wait">
                    {submitResult?.ok ? (
                      <motion.div
                        key="success"
                        initial={false}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="rounded-[1.5rem] border border-[#b8ddbf] bg-gradient-to-br from-[#f1faf3] to-white p-6 text-[#06461f] shadow-lg"
                      >
                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                          <EdenLogo size="success" className="shrink-0" />
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                            className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#08751f] text-white shadow-lg sm:order-last sm:ml-auto"
                          >
                            <CheckCircle2 size={28} />
                          </motion.span>
                          <div className="flex-1">
                            <p className="text-lg font-black">{submitResult.message || p.submitSuccess}</p>
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
                        </div>
                      </motion.div>
                    ) : submitResult?.ok === false ? (
                      <motion.div
                        key="error"
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[1.5rem] border border-[#f5b5ad] bg-[#fff5f4] p-6 text-[#b42318] shadow-md"
                      >
                        <p className="font-black">{submitResult.message}</p>
                        <p className="mt-2 text-sm">{p.exportBackupHint}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                  <div className="flex flex-col items-end gap-3">
                    <ReCaptchaVerification
                      ref={recaptchaRef}
                      onTokenChange={handleTokenChange}
                      onExpired={handleExpired}
                      error={recaptchaError}
                      disabled={submitting || verifying || validating || submitResult?.ok}
                    />
                    <motion.button
                      type="button"
                      onClick={handleFinalSubmit}
                      disabled={submitting || verifying || !recaptchaReady || submitResult?.ok}
                      whileHover={submitting || submitResult?.ok ? {} : { scale: 1.01 }}
                      whileTap={submitting || submitResult?.ok ? {} : { scale: 0.99 }}
                      className="rounded-xl bg-gradient-to-b from-[#168f30] to-[#006d19] px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-900/15 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting || verifying
                        ? verifying
                          ? "Verifying…"
                          : p.submitting || "Submitting…"
                        : p.reviewSubmit}
                    </motion.button>
                    <RecaptchaNotice align="right" />
                  </div>
                </div>
              )}

              {activeTab === "documents" && (
                <>
                  <div className="mb-5 hidden lg:block">
                    <IntakeBrandHeader subtitle={brandSubtitle} />
                  </div>
                  <DocumentsPanel meta={meta} data={formData} onClearDraft={handleClearDraft} />
                </>
              )}
              {activeTab === "messages" && (
                <>
                  <div className="mb-5 hidden lg:block">
                    <IntakeBrandHeader subtitle={brandSubtitle} />
                  </div>
                  <MessagesPanel data={formData} meta={meta} onChange={handleChange} onSaveMessage={handleSaveMessage} />
                </>
              )}

              <p className="mt-8 text-center text-xs text-[#667085]">🔒 {p.secureDraftNote}</p>
            </main>
          </div>
        )}

        {isActiveFormSteps && (
          <p className="mt-8 text-center text-xs text-[#667085]">🔒 {p.secureDraftNote}</p>
        )}
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
