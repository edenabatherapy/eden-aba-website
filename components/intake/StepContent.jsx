"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { STEP_SECTIONS as STEP_SECTIONS_EN } from "@/lib/intake/step-config";
import { INTAKE_STEPS as INTAKE_STEPS_EN } from "@/lib/intake/constants";
import { SITE_IMAGES } from "@/lib/site-images";
import ConsentDashboard from "./ConsentDashboard";
import IntakeField from "./IntakeField";
import {
  CARD_SELECT_FIELDS,
  fadeUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  stepTransition,
} from "./intake-motion";

const STEP_VISUALS = {
  0: {
    image: SITE_IMAGES.intake.hero,
    imageAlt: "Family meeting with Eden ABA Therapy intake coordinator",
    accent: "from-[#fff8df] via-white to-[#eef9f4]",
  },
  1: {
    image: SITE_IMAGES.insurance.hero,
    imageAlt: "Insurance benefits support for ABA therapy families",
    accent: "from-[#eef9f4] via-white to-[#f6fbf7]",
  },
  4: {
    image: SITE_IMAGES.abaTherapy.hero,
    imageAlt: "Therapist supporting a child during ABA therapy session",
    accent: "from-[#f6fbf7] via-white to-[#fff8df]",
  },
};

const SECTION_ICONS = {
  "Child Information": "👤",
  "Parent / Guardian Information": "👥",
  "Diagnosis & Medical Information": "🩺",
  "Insurance Information": "🛡",
  "Family Information": "👨‍👩‍👧",
  "Behavior & Safety Profile": "🛡️",
  "Upload Required Documents": "📄",
  "Final Intake Review": "✅",
  "Digital Signature": "🖊",
};

/**
 * @param {{
 *   step: number,
 *   data: Record<string, unknown>,
 *   onChange: (name: string, value: unknown) => void,
 *   onOpenConsent: (id: string) => void,
 *   consentDashboard?: Record<string, string>,
 *   fieldErrors?: Record<string, string>,
 * }} props
 */
export default function StepContent({
  step,
  data,
  onChange,
  onOpenConsent,
  documentMeta,
  stepSections = STEP_SECTIONS_EN,
  intakeSteps = INTAKE_STEPS_EN,
  ui = {},
  consentDashboard = {},
  fieldErrors = {},
}) {
  const config = stepSections[step];
  if (!config) return null;

  const stepMeta = intakeSteps[step];
  const visual = STEP_VISUALS[step];
  const useAccordion = step === 1 || step === 3 || step === 4;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={step} {...stepTransition} className="space-y-6">
        {step === 0 && <WelcomeHero stepMeta={stepMeta} visual={visual} ui={ui} />}

        {step === 1 && visual && (
          <StepBanner
            eyebrow={ui.medicalInsuranceEyebrow || "Medical & Insurance"}
            title={stepMeta?.subtitle}
            image={visual.image}
            imageAlt={visual.imageAlt}
            compact
          />
        )}

        {step === 3 && (
          <StepBanner
            eyebrow={ui.financialEyebrow || "Financial & Communication"}
            title={stepMeta?.subtitle}
            image={SITE_IMAGES.aboutEden.contactSupport}
            imageAlt="Eden ABA care coordinator supporting a family"
            compact
          />
        )}

        {step === 4 && visual && (
          <StepBanner
            eyebrow={ui.familyClinicalEyebrow || "Family & Clinical Goals"}
            title={ui.familyClinicalTitle || stepMeta?.subtitle}
            image={visual.image}
            imageAlt={visual.imageAlt}
            compact
          />
        )}

        {step === 5 && <ReviewStepHeader stepMeta={stepMeta} ui={ui} />}

        {step === 2 && (
          <>
            {config.sections.slice(0, 2).map((section, index) => (
              <SectionBlock
                key={section.title}
                section={section}
                data={data}
                onChange={onChange}
                documentMeta={documentMeta}
                step={step}
              sectionIndex={index}
              collapsible={false}
              selectOptionLabel={ui.selectOption}
            />
            ))}
            <ConsentDashboard
              data={data}
              onChange={onChange}
              onOpenConsent={onOpenConsent}
              consentDashboard={consentDashboard}
              fieldErrors={fieldErrors}
            />
            {config.sections.slice(2).map((section, index) => (
              <SectionBlock
                key={section.title}
                section={section}
                data={data}
                onChange={onChange}
                documentMeta={documentMeta}
                step={step}
                sectionIndex={index + 2}
                collapsible={false}
                selectOptionLabel={ui.selectOption}
              />
            ))}
          </>
        )}

        {step !== 2 &&
          config.sections.map((section, index) => (
            <SectionBlock
              key={section.title}
              section={section}
              data={data}
              onChange={onChange}
              documentMeta={documentMeta}
              step={step}
              sectionIndex={index}
              collapsible={useAccordion}
              defaultOpen={index === 0}
              selectOptionLabel={ui.selectOption}
            />
          ))}

        {step === 5 && (
          <motion.div
            {...fadeUp}
            className="rounded-2xl border border-[#b8ddbf] bg-gradient-to-br from-[#f1faf3] to-white p-5 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#08751f] text-white shadow-lg">
                <ShieldCheck size={24} />
              </span>
              <p className="text-sm leading-7 text-[#06461f]">
                <b>Security note:</b> This form saves drafts in this browser only. Production use should submit over HTTPS to a HIPAA-ready backend with encryption at rest, role-based access, audit logs, retention policy, breach procedures, and BAAs.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function WelcomeHero({ stepMeta, visual, ui }) {
  const badges = [ui.timeEstimate, ui.autosaved, ui.hipaaNote].filter(Boolean);
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[1.75rem] border border-[#cde6d2] bg-gradient-to-br from-[#0b4f4f] via-[#1f7a2e] to-[#128c8c] shadow-xl shadow-emerald-950/15"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        <div className="p-6 md:p-8 lg:p-10">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-lime-200 backdrop-blur-sm"
          >
            <Sparkles size={14} /> {ui.welcomeBadge || "Welcome"}
          </motion.span>
          <motion.h2
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="mt-5 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl"
          >
            {ui.welcomeTitle || stepMeta?.title || "Basic Information"}
          </motion.h2>
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.45 }}
            className="mt-4 max-w-3xl text-base leading-8 text-emerald-50/95"
          >
            {ui.welcomeSubtitle ||
              "Thank you for choosing Eden ABA Therapy. Please complete this secure intake form so our team can understand your child's needs, verify eligibility, and coordinate services efficiently."}
          </motion.p>
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.45 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            {(badges.length ? badges : ["15–25 min with documents ready", "Autosaved local draft", "HIPAA-ready submission"]).map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white backdrop-blur-sm"
              >
                <HeartHandshake size={14} className="text-lime-300" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative min-h-[220px] lg:min-h-full"
        >
          {/* TODO: Replace with final brand photo — family intake consultation at Eden ABA Therapy. */}
          <img
            src={visual?.image || SITE_IMAGES.intake.hero}
            alt={visual?.imageAlt || "Eden ABA Therapy intake welcome"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b4f4f]/50 via-transparent to-transparent lg:bg-gradient-to-l lg:from-[#0b4f4f]/40 lg:via-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StepBanner({ eyebrow, title, image, imageAlt, compact = false }) {
  if (compact) {
    return (
      <motion.div
        {...fadeUp}
        className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#dfe8e2] bg-white shadow-md md:flex-row md:items-center"
      >
        <div className="relative h-36 w-full shrink-0 md:h-28 md:w-44 lg:h-32 lg:w-52">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b4f4f]/20 to-transparent" />
        </div>
        <div className="px-5 pb-5 md:py-4 md:pr-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128c8c]">{eyebrow}</p>
          <p className="mt-2 text-sm font-semibold leading-7 text-[#243142] md:text-base">{title}</p>
        </div>
      </motion.div>
    );
  }

  return null;
}

function ReviewStepHeader({ stepMeta }) {
  return (
    <motion.div
      {...scaleIn}
      className="overflow-hidden rounded-[1.75rem] border border-[#cde6d2] bg-gradient-to-br from-[#f1faf3] via-white to-[#fff8df] p-6 shadow-lg md:p-8"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <EdenLogo size="intake" className="shrink-0" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#128c8c]">Almost done</p>
            <h2 className="mt-2 text-2xl font-black text-[#06461f] md:text-3xl">{stepMeta?.title}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#243142] md:text-base">{stepMeta?.subtitle}</p>
          </div>
        </div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
          className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#168f30] to-[#006d19] text-white shadow-xl ring-4 ring-[#b8ddbf]/60"
        >
          <ShieldCheck size={36} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function SectionBlock({
  section,
  data,
  onChange,
  documentMeta,
  step,
  sectionIndex,
  collapsible,
  defaultOpen = true,
  selectOptionLabel = "Select option",
}) {
  const [open, setOpen] = useState(defaultOpen);
  const isUploadGrid = section.fields.some((f) => f.type === "file") && section.fields.length > 4;
  const isInsuranceUpload = step === 1 && section.title === "Insurance Information";
  const isHighlightSection = step === 5 && (section.title === "Final Intake Review" || section.title === "Digital Signature");
  const icon = SECTION_ICONS[section.title] || section.icon;

  const inner = (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={isUploadGrid ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"}
    >
      {section.fields.map((field, fieldIndex) => (
        <motion.div
          key={field.name}
          variants={staggerItem}
          className={
            field.type === "textarea" || field.type === "radio" || field.type === "checkbox-group"
              ? "sm:col-span-2 xl:col-span-3"
              : ""
          }
        >
          <IntakeField
            field={field}
            value={data[field.name]}
            onChange={onChange}
            fileMeta={documentMeta[field.name]}
            useCardSelect={CARD_SELECT_FIELDS.has(field.name)}
            uploadVariant={field.type === "file" ? (isUploadGrid ? "card" : isInsuranceUpload ? "insurance" : "default") : "default"}
            animDelay={fieldIndex * 0.02}
            selectOptionLabel={selectOptionLabel}
          />
        </motion.div>
      ))}
    </motion.div>
  );

  const shellClass = isHighlightSection
    ? "rounded-[1.75rem] border-2 border-[#b8ddbf] bg-gradient-to-br from-[#f6fbf7] to-white p-5 shadow-lg md:p-6"
    : "rounded-[1.75rem] border border-[#dfe8e2] bg-white p-5 shadow-md transition-shadow hover:shadow-lg md:p-6";

  if (collapsible) {
    return (
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: sectionIndex * 0.05, duration: 0.4 }}
        className={`overflow-hidden ${shellClass}`}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-[#f8fcf9] text-2xl shadow-inner ring-1 ring-[#cde6d2]">
              {icon}
            </span>
            <div>
              <h2 className="text-lg font-black text-[#06461f] md:text-xl">{section.title}</h2>
              <p className="mt-0.5 text-xs font-semibold text-[#667085]">
                {section.fields.length} field{section.fields.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown size={22} className="text-[#08751f]" />
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-[#e4ece6] pt-5">{inner}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: sectionIndex * 0.05, duration: 0.4 }}
      className={shellClass}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-[#eef2ef] pb-4">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#eef7f0] to-[#f8fcf9] text-2xl shadow-inner ring-1 ring-[#cde6d2]">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-black text-[#06461f] md:text-xl">{section.title}</h2>
          {step === 0 && sectionIndex === 0 && (
            <p className="mt-1 text-xs font-semibold text-[#667085]">Child details used for records and insurance</p>
          )}
          {step === 0 && sectionIndex === 1 && (
            <p className="mt-1 text-xs font-semibold text-[#667085]">Primary contact and emergency information</p>
          )}
        </div>
      </div>
      {inner}
    </motion.div>
  );
}
