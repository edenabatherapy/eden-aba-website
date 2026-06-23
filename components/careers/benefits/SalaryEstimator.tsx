"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Calculator, TrendingUp } from "lucide-react";
import AnimatedStatCounter from "@/components/careers/hub/AnimatedStatCounter";
import BreakdownChart from "@/components/careers/benefits/estimator/BreakdownChart";
import BenefitsDonutChart from "@/components/careers/benefits/estimator/BenefitsDonutChart";
import CareerFitScore from "@/components/careers/benefits/estimator/CareerFitScore";
import CareerPathwayLadder from "@/components/careers/benefits/estimator/CareerPathwayLadder";
import EstimatorTabs from "@/components/careers/benefits/estimator/EstimatorTabs";
import HoursSlider from "@/components/careers/benefits/estimator/HoursSlider";
import SuccessMilestones from "@/components/careers/benefits/estimator/SuccessMilestones";
import TotalRewardsCard from "@/components/careers/benefits/estimator/TotalRewardsCard";
import {
  HoverCard,
  MotionButton,
  PulseBadge,
  ScrollReveal,
} from "@/components/careers/benefits/estimator/EstimatorPrimitives";
import { formatCurrencyValue, useCountUp } from "@/components/careers/benefits/estimator/useCountUp";
import {
  ESTIMATOR_HERO_STATS,
  SALARY_BENEFITS_COMPARISON,
  SALARY_ESTIMATOR_DISCLAIMER,
  SALARY_ESTIMATOR_EMPLOYMENT,
  SALARY_ESTIMATOR_EXPERIENCE,
  SALARY_ESTIMATOR_GEOGRAPHY,
  SALARY_ESTIMATOR_ROLES,
  calculateCareerFitScore,
  calculateSalaryEstimate,
  calculateTotalRewards,
  type SalaryEmploymentType,
  type SalaryExperienceLevel,
  type SalaryGeographicArea,
  type SalaryRoleType,
} from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const selectClass =
  "w-full rounded-xl border border-teal-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

function RatePreview({
  min,
  max,
  isSalary,
  inverted = false,
}: {
  min: number;
  max: number;
  isSalary: boolean;
  inverted?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const animatedMin = useCountUp(min, { duration: 700, decimals: isSalary ? 0 : 2 });
  const animatedMax = useCountUp(max, { duration: 700, decimals: isSalary ? 0 : 2 });

  return (
    <motion.p
      key={`${min}-${max}`}
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`mt-2 text-sm font-extrabold ${inverted ? "text-teal-50" : "text-teal-800"}`}
    >
      {isSalary ? (
        <>
          {formatCurrencyValue(animatedMin)} – {formatCurrencyValue(animatedMax)}
        </>
      ) : (
        <>
          ${animatedMin.toFixed(2)} – ${animatedMax.toFixed(2)} / hr
        </>
      )}
    </motion.p>
  );
}

function PayRangeCard({ estimate, recalcKey }: { estimate: ReturnType<typeof calculateSalaryEstimate>; recalcKey: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      key={recalcKey}
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-teal-50/60 to-white p-5 shadow-sm"
    >
      <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">Estimated pay range</p>
      <p className="mt-2 text-sm font-semibold text-slate-700">{estimate.roleLabel}</p>
      <p className="mt-3 text-3xl font-extrabold tracking-tight text-teal-900 sm:text-4xl">
        {estimate.isSalary ? (
          <>
            {estimate.displayMin}
            <span className="mx-2 text-xl font-bold text-teal-600">–</span>
            {estimate.displayMax}
          </>
        ) : (
          <>
            {estimate.displayMin}
            <span className="mx-1 text-lg font-bold text-teal-600">–</span>
            {estimate.displayMax}
            <span className="ml-2 text-base font-bold text-teal-700">/ hr</span>
          </>
        )}
      </p>
      {!estimate.isSalary ? (
        <p className="mt-2 text-sm text-slate-600">Midpoint: {estimate.displayMid} / hr</p>
      ) : null}
      {estimate.annualEstimate ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm leading-7 text-slate-700">
          <TrendingUp size={18} className="mt-0.5 shrink-0 text-teal-700" aria-hidden />
          {estimate.annualEstimate}
        </p>
      ) : null}
    </motion.div>
  );
}

export default function SalaryEstimator() {
  const reduceMotion = useReducedMotion();
  const [role, setRole] = useState<SalaryRoleType>("rbt");
  const [employment, setEmployment] = useState<SalaryEmploymentType>("full-time");
  const [experience, setExperience] = useState<SalaryExperienceLevel>("entry");
  const [geography, setGeography] = useState<SalaryGeographicArea>("annandale-nova");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [sliderDragging, setSliderDragging] = useState(false);

  const hoursMin = employment === "full-time" ? 32 : 12;
  const hoursMax = employment === "full-time" ? 40 : 30;

  useEffect(() => {
    setHoursPerWeek((current) => Math.min(hoursMax, Math.max(hoursMin, current)));
  }, [hoursMin, hoursMax]);

  const estimate = useMemo(
    () => calculateSalaryEstimate({ role, employment, experience, geography }),
    [role, employment, experience, geography],
  );

  const breakdown = useMemo(
    () => calculateTotalRewards(estimate, hoursPerWeek, employment),
    [estimate, hoursPerWeek, employment],
  );

  const careerFitScore = useMemo(
    () => calculateCareerFitScore({ role, employment, experience, geography }),
    [role, employment, experience, geography],
  );

  const recalcKey = `${role}-${employment}-${experience}-${geography}-${hoursPerWeek}`;

  const rolePreviews = useMemo(
    () =>
      SALARY_ESTIMATOR_ROLES.map((r) => {
        const preview = calculateSalaryEstimate({
          role: r.id,
          employment,
          experience,
          geography,
        });
        return { ...r, preview };
      }),
    [employment, experience, geography],
  );

  const heroStagger = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE_OUT, delay },
        };

  return (
    <div className="space-y-12">
      <section aria-labelledby="estimator-hero-heading" className="rounded-[1.75rem] border border-teal-100 bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] p-6 shadow-sm sm:p-8">
        <motion.p {...heroStagger(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
          Salary &amp; Benefits Estimator
        </motion.p>
        <motion.h3
          {...heroStagger(0.08)}
          id="estimator-hero-heading"
          className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
        >
          Explore total rewards with confidence
        </motion.h3>
        <motion.p {...heroStagger(0.16)} className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          Adjust role, schedule, and experience to see illustrative compensation ranges and total rewards for Northern
          Virginia clinical careers.
        </motion.p>
        <motion.div {...heroStagger(0.24)}>
          <AnimatedStatCounter stats={[...ESTIMATOR_HERO_STATS]} className="mt-8" scaleReveal />
        </motion.div>
      </section>

      <ScrollReveal>
        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <HoverCard className="rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <motion.span
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white"
              >
                <Calculator size={20} aria-hidden />
              </motion.span>
              <h3 className="text-lg font-extrabold text-slate-900">Calculator inputs</h3>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Select a role and adjust filters. Values update smoothly as you explore scenarios.
            </p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-bold uppercase tracking-wide text-teal-800">Role type</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {rolePreviews.map((r) => {
                    const selected = role === r.id;
                    return (
                      <MotionButton
                        key={r.id}
                        onClick={() => setRole(r.id)}
                        aria-pressed={selected}
                        className={`rounded-xl border p-4 text-left transition ${
                          selected
                            ? "border-teal-500 bg-teal-700 text-white shadow-md"
                            : "border-teal-100 bg-white text-slate-800 hover:border-teal-200"
                        }`}
                      >
                        <span className="text-sm font-extrabold leading-snug">{r.label}</span>
                        <RatePreview
                          min={r.preview.min}
                          max={r.preview.max}
                          isSalary={r.preview.isSalary}
                          inverted={selected}
                        />
                      </MotionButton>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-teal-800">
                  Employment type
                </span>
                <select
                  className={selectClass}
                  value={employment}
                  onChange={(e) => setEmployment(e.target.value as SalaryEmploymentType)}
                >
                  {SALARY_ESTIMATOR_EMPLOYMENT.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-teal-800">
                  Experience level
                </span>
                <select
                  className={selectClass}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as SalaryExperienceLevel)}
                >
                  {SALARY_ESTIMATOR_EXPERIENCE.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-teal-800">
                  Geographic area
                </span>
                <select
                  className={selectClass}
                  value={geography}
                  onChange={(e) => setGeography(e.target.value as SalaryGeographicArea)}
                >
                  {SALARY_ESTIMATOR_GEOGRAPHY.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {!estimate.isSalary ? (
              <div className="mt-6">
                <HoursSlider
                  value={hoursPerWeek}
                  min={hoursMin}
                  max={hoursMax}
                  onChange={setHoursPerWeek}
                  dragging={sliderDragging}
                  onDragStart={() => setSliderDragging(true)}
                  onDragEnd={() => setSliderDragging(false)}
                  hourlyMidpoint={estimate.midpoint}
                />
              </div>
            ) : null}

            <div className="mt-6">
              <CareerFitScore score={careerFitScore} />
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {estimate.factors.map((factor) => (
                <PulseBadge
                  key={factor}
                  className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-900"
                >
                  {factor}
                </PulseBadge>
              ))}
            </ul>
          </HoverCard>

          <div className="space-y-5">
            <TotalRewardsCard total={breakdown.total} roleLabel={estimate.roleLabel} recalcKey={recalcKey} />
            <PayRangeCard estimate={estimate} recalcKey={recalcKey} />
            <HoverCard className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm sm:p-6">
              <h4 className="text-sm font-extrabold text-slate-900">Benefits value mix</h4>
              <div className="mt-4">
                <BenefitsDonutChart breakdown={breakdown} recalcKey={recalcKey} />
              </div>
            </HoverCard>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <HoverCard className="rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-lg font-extrabold text-slate-900">Total rewards breakdown</h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Illustrative annual components that may contribute to your total rewards package.
          </p>
          <div className="mt-6">
            <BreakdownChart breakdown={breakdown} recalcKey={recalcKey} />
          </div>
        </HoverCard>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <EstimatorTabs />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="grid gap-6 lg:grid-cols-2">
          <CareerPathwayLadder activeRole={role} />
          <SuccessMilestones />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.12}>
        <div>
          <h3 className="text-lg font-extrabold text-slate-900">Benefits comparison by employment type</h3>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
            Total rewards include pay and role-eligible support. Eligibility varies—confirm details during recruiting.
          </p>
          <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-teal-100 shadow-sm">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="border-b border-teal-100 bg-teal-50/60">
                  <th scope="col" className="px-4 py-3 font-extrabold text-slate-900">
                    Benefit area
                  </th>
                  <th scope="col" className="px-4 py-3 font-extrabold text-teal-900">
                    Full-time
                  </th>
                  <th scope="col" className="px-4 py-3 font-extrabold text-teal-900">
                    Part-time
                  </th>
                </tr>
              </thead>
              <tbody>
                {SALARY_BENEFITS_COMPARISON.map((row, index) => (
                  <motion.tr
                    key={row.benefit}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.35, ease: EASE_OUT }}
                    className="border-b border-teal-50 last:border-0"
                  >
                    <th scope="row" className="px-4 py-3 font-bold text-slate-800">
                      {row.benefit}
                    </th>
                    <td className="px-4 py-3 text-slate-600">{row.fullTime}</td>
                    <td className="px-4 py-3 text-slate-600">{row.partTime}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <p className="rounded-xl border border-amber-200/80 bg-amber-50/80 px-4 py-3 text-sm leading-7 text-slate-700">
          {SALARY_ESTIMATOR_DISCLAIMER}
        </p>
      </ScrollReveal>
    </div>
  );
}
