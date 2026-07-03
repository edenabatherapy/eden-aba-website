"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Users } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import AboutSectionNav from "@/components/about/AboutSectionNav";
import { AnimatedCounter, fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "@/components/about/shared";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  CLINICAL_PROCESS_TIMELINE,
  CLINICAL_QUALITY_FAQ,
  CLINICAL_QUALITY_METRICS,
  CLINICAL_QUALITY_SECTION_NAV,
  CLINICAL_STANDARDS_POINTS,
  DATA_DRIVEN_VISUALS,
  ETHICAL_CARE_POINTS,
  EVIDENCE_BASED_POINTS,
  EXCELLENCE_FRAMEWORK_PILLARS,
  FAMILY_CENTERED_PRINCIPLES,
  SUPERVISION_STRUCTURE,
} from "@/lib/about/clinical-quality-data";
import { getButtonClasses } from "@/lib/button-styles";

const FRAME =
  "scroll-mt-28 rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10";

function MetricCard({ label, value, suffix, detail }: (typeof CLINICAL_QUALITY_METRICS)[number]) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.li
      ref={ref}
      variants={staggerItem}
      className="rounded-[1.5rem] border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:from-slate-800/50 dark:to-slate-900"
    >
      <p className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300">
        <AnimatedCounter value={value} suffix={suffix} isVisible={inView} />
      </p>
      <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
    </motion.li>
  );
}

export default function ClinicalQualityPage() {
  const clinicalProcessTimeline = useLocalizedContent("CLINICAL_PROCESS_TIMELINE", CLINICAL_PROCESS_TIMELINE);
  const clinicalQualityFaq = useLocalizedContent("CLINICAL_QUALITY_FAQ", CLINICAL_QUALITY_FAQ);
  const clinicalQualityMetrics = useLocalizedContent("CLINICAL_QUALITY_METRICS", CLINICAL_QUALITY_METRICS);
  const clinicalQualitySectionNav = useLocalizedContent("CLINICAL_QUALITY_SECTION_NAV", CLINICAL_QUALITY_SECTION_NAV);
  const clinicalStandardsPoints = useLocalizedContent("CLINICAL_STANDARDS_POINTS", CLINICAL_STANDARDS_POINTS);
  const dataDrivenVisuals = useLocalizedContent("DATA_DRIVEN_VISUALS", DATA_DRIVEN_VISUALS);
  const ethicalCarePoints = useLocalizedContent("ETHICAL_CARE_POINTS", ETHICAL_CARE_POINTS);
  const evidenceBasedPoints = useLocalizedContent("EVIDENCE_BASED_POINTS", EVIDENCE_BASED_POINTS);
  const excellenceFrameworkPillars = useLocalizedContent("EXCELLENCE_FRAMEWORK_PILLARS", EXCELLENCE_FRAMEWORK_PILLARS);
  const familyCenteredPrinciples = useLocalizedContent("FAMILY_CENTERED_PRINCIPLES", FAMILY_CENTERED_PRINCIPLES);
  const supervisionStructure = useLocalizedContent("SUPERVISION_STRUCTURE", SUPERVISION_STRUCTURE);
  const reduceMotion = useReducedMotion();

  return (
    <AboutPremiumLayout>
      <section
        className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 px-4 py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 lg:px-8 lg:py-24"
        aria-labelledby="clinical-quality-heading"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fadeUp} className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-400">
            About Eden
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            id="clinical-quality-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Clinical Quality
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
          >
            Evidence-based ABA care, BCBA-led supervision, and transparent quality assurance—built to earn trust from
            families, physicians, schools, and payors across Virginia.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link href="/intake" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              Start Intake
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/about/our-approach" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Our Approach
            </Link>
          </motion.div>
        </div>
      </section>

      <AboutSectionNav items={[...clinicalQualitySectionNav]} ariaLabel="Clinical Quality sections" />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20">
        <section id="clinical-standards" className={FRAME} aria-labelledby="standards-heading">
          <SectionEyebrow>Our Clinical Standards</SectionEyebrow>
          <h2 id="standards-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Standards Families &amp; Partners Can Trust
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Eden&apos;s clinical standards align with BACB ethical guidelines, Virginia regulatory requirements, and
            enterprise healthcare quality expectations—so every child receives safe, individualized, measurable care.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {clinicalStandardsPoints.map((point) => (
              <li key={point} className="flex gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
                <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-700" size={18} aria-hidden="true" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="evidence-based" className={FRAME} aria-labelledby="evidence-heading">
          <SectionEyebrow>Evidence-Based ABA Care</SectionEyebrow>
          <h2 id="evidence-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Research-Aligned Treatment That Works
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Programs are grounded in peer-reviewed ABA literature and adjusted through ongoing data analysis—not
            one-size-fits-all templates.
          </p>
          <ul className="mt-8 space-y-3">
            {evidenceBasedPoints.map((point) => (
              <li key={point} className="flex gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <Shield className="mt-0.5 shrink-0 text-emerald-700" size={16} aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="bcba-supervision" className={FRAME} aria-labelledby="supervision-heading">
          <SectionEyebrow>BCBA-Led Supervision</SectionEyebrow>
          <h2 id="supervision-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Structured Clinical Oversight
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Every case is led by a Board Certified Behavior Analyst with defined supervision ratios, coaching, and
            program integrity reviews.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="w-full max-w-md rounded-2xl border-2 border-emerald-700 bg-emerald-700 px-6 py-4 text-center text-white shadow-lg">
              <p className="text-xs font-bold uppercase tracking-wide opacity-90">Clinical Lead</p>
              <p className="mt-1 text-lg font-extrabold">{supervisionStructure.bcba}</p>
            </div>
            <div className="hidden h-8 w-0.5 bg-emerald-300 sm:block" aria-hidden="true" />
            <ul className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supervisionStructure.roles.map((role, index) => (
                <motion.li
                  key={role.title}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-2xl border border-emerald-100 bg-white p-5 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800"
                >
                  <Users className="mx-auto text-emerald-700" size={24} aria-hidden="true" />
                  <p className="mt-3 text-sm font-extrabold text-slate-900 dark:text-white">{role.title}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-300">{role.description}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </section>

        <section id="treatment-planning" className={FRAME} aria-labelledby="planning-heading">
          <SectionEyebrow>Individualized Treatment Planning</SectionEyebrow>
          <h2 id="planning-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Plans Built Around Each Child
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Assessments inform measurable goals across communication, social skills, adaptive behavior, and functional
            independence—with family priorities at the center.
          </p>
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative mt-10 space-y-0 border-l-2 border-emerald-200 pl-8 dark:border-emerald-800"
          >
            {clinicalProcessTimeline.map((item) => (
              <motion.li key={item.step} variants={staggerItem} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.05rem] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold text-white">
                  {item.step}
                </span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </motion.li>
            ))}
          </motion.ol>
        </section>

        <section id="caregiver-collaboration" className={FRAME} aria-labelledby="caregiver-heading">
          <SectionEyebrow>Parent &amp; Caregiver Collaboration</SectionEyebrow>
          <h2 id="caregiver-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Family-Centered Care Principles
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {familyCenteredPrinciples.map((principle) => (
              <li
                key={principle.title}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/40"
              >
                <p className="text-base font-extrabold text-emerald-900 dark:text-emerald-300">{principle.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{principle.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="progress-monitoring" className={FRAME} aria-labelledby="progress-heading">
          <SectionEyebrow>Progress Monitoring &amp; Data Collection</SectionEyebrow>
          <h2 id="progress-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Data-Driven Treatment Visuals
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            Transparent data helps families, clinicians, and partners see what is working—and adjust quickly when needed.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {dataDrivenVisuals.map((visual) => (
              <li
                key={visual.title}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-slate-900 to-emerald-950 p-6 text-white shadow-lg"
              >
                <div className="mb-4 flex h-16 items-end gap-1" aria-hidden="true">
                  {[40, 55, 48, 72, 65, 88].map((height, i) => (
                    <span
                      key={i}
                      className="w-3 rounded-t bg-emerald-400/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <p className="text-base font-extrabold">{visual.title}</p>
                <p className="mt-2 text-sm leading-7 text-emerald-100/90">{visual.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="quality-assurance" className={FRAME} aria-labelledby="qa-heading">
          <SectionEyebrow>Quality Assurance Process</SectionEyebrow>
          <h2 id="qa-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Quality Metrics at a Glance
          </h2>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {clinicalQualityMetrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </motion.ul>
        </section>

        <section id="ethical-care" className={FRAME} aria-labelledby="ethics-heading">
          <SectionEyebrow>Ethical Care Commitment</SectionEyebrow>
          <h2 id="ethics-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Dignity, Safety &amp; Transparency First
          </h2>
          <ul className="mt-8 space-y-3">
            {ethicalCarePoints.map((point) => (
              <li key={point} className="rounded-xl border border-emerald-100 px-4 py-3 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:text-slate-200">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="excellence-framework" className={FRAME} aria-labelledby="framework-heading">
          <SectionEyebrow>Clinical Excellence Framework</SectionEyebrow>
          <h2 id="framework-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Four Pillars of Excellence
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {excellenceFrameworkPillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl border border-emerald-200 bg-emerald-700 p-6 text-white shadow-md"
              >
                <p className="text-lg font-extrabold">{pillar.title}</p>
                <p className="mt-2 text-sm leading-7 text-emerald-50">{pillar.description}</p>
              </motion.li>
            ))}
          </ul>
        </section>

        <section id="faq" className={FRAME} aria-labelledby="clinical-faq-heading">
          <FAQAccordion title="Frequently Asked Questions" items={clinicalQualityFaq} />
        </section>
      </div>
    </AboutPremiumLayout>
  );
}
