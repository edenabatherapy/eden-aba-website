"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import BtCareersTabs from "@/components/careers/bt/BtCareersTabs";
import BtGrowthPathSection from "@/components/careers/bt/BtGrowthPathSection";
import BtHeroSection from "@/components/careers/bt/BtHeroSection";
import BtStickyApplyBar from "@/components/careers/bt/BtStickyApplyBar";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import {
  BT_CONFIDENCE_CARDS,
  BT_DAY_TIMELINE,
  BT_DEVELOPMENT_SUPPORTS,
  BT_EDUCATIONAL_NOTICE,
  BT_FOCUS_ITEMS,
  BT_INTERVIEW_PREP_CARDS,
  BT_JOURNEY_TIMELINE,
  BT_LEARNING_PATHWAY,
  BT_MOTIVATION_STATS,
  BT_PHOTO_GALLERY,
  BT_RESPONSIBILITIES_DETAILED,
  BT_ROLE_SNAPSHOT,
  BT_SAMPLE_INTERVIEW_QUESTIONS,
  BT_SKILL_CATEGORIES,
  BT_SUPPORT_CARDS,
  BT_SUPPORT_DISCLAIMER,
} from "@/lib/careers/bt-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "rounded-[2rem] border border-lime-200 bg-white p-8 shadow-sm sm:p-10";

export default function BtCareersPage() {
  const reduceMotion = useReducedMotion();

  return (
    <CareerPageShell>
      <BtStickyApplyBar />
      <CareerBreadcrumbs
        items={[
          { label: "Careers", href: "/careers" },
          { label: "Behavior Technician (BT) Careers" },
        ]}
      />

      <BtHeroSection />

      {/* Motivation banner */}
      <section className="border-y border-lime-200 bg-gradient-to-r from-lime-50/80 via-white to-emerald-50/60 px-4 py-14 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <RbtScrollReveal>
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl lg:text-4xl">
              You can begin a career where small moments create real progress.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              As a Behavior Technician, your consistency, patience, and compassion can help children practice meaningful
              skills in everyday environments. At Eden ABA Therapy, BTs are supported with supervision, feedback, team
              communication, and a clear pathway toward continued growth in ABA care.
            </p>
          </RbtScrollReveal>
          <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-3">
            {BT_MOTIVATION_STATS.map((stat) => (
              <RbtStaggerItem key={stat.title}>
                <div className="h-full rounded-[1.5rem] border border-lime-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="h-1 w-10 rounded-full bg-emerald-600" aria-hidden="true" />
                  <h3 className="mt-4 text-lg font-extrabold text-slate-900">{stat.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{stat.description}</p>
                </div>
              </RbtStaggerItem>
            ))}
          </RbtStaggerGrid>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        {/* Journey timeline */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bt-journey-heading">
            <h2 id="bt-journey-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Your BT journey at Eden
            </h2>
            <ol className="relative mt-10 space-y-0">
              {BT_JOURNEY_TIMELINE.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.07, ease: EASE_OUT }}
                  className="relative flex gap-5 pb-10 last:pb-0"
                >
                  {index < BT_JOURNEY_TIMELINE.length - 1 && (
                    <span className="absolute left-4 top-10 h-[calc(100%-0.5rem)] w-0.5 bg-lime-200" aria-hidden="true" />
                  )}
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        </RbtScrollReveal>

        {/* Preserved: What you'll focus on */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-focus-heading">
            <h2 id="bt-focus-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What you&apos;ll focus on
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {BT_FOCUS_ITEMS.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 rounded-xl border border-lime-200 bg-lime-50/50 px-4 py-3 text-sm font-semibold leading-7 text-slate-700"
                >
                  <span className="text-emerald-600" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Preserved: BT development supports */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-dev-support-heading">
            <h2 id="bt-dev-support-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BT development supports
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-3">
              {BT_DEVELOPMENT_SUPPORTS.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.5rem] border border-lime-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* Role snapshot */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-white to-lime-50/30`} aria-labelledby="bt-snapshot-heading">
            <h2 id="bt-snapshot-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BT Role Snapshot
            </h2>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Role Type", BT_ROLE_SNAPSHOT.roleType],
                ["Supervision", BT_ROLE_SNAPSHOT.supervision],
                ["Service Setting", BT_ROLE_SNAPSHOT.serviceSetting],
                ["Focus Areas", BT_ROLE_SNAPSHOT.focusAreas],
                ["Growth Path", BT_ROLE_SNAPSHOT.growthPath],
                ["Best Fit", BT_ROLE_SNAPSHOT.bestFit],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-lime-200 bg-white px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-[0.12em] text-emerald-700">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold leading-7 text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </RbtScrollReveal>

        {/* Skill areas */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-skills-heading">
            <h2 id="bt-skills-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Skill areas that matter
            </h2>
            <RbtStaggerGrid className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BT_SKILL_CATEGORIES.map((cat) => (
                <RbtStaggerItem key={cat.title}>
                  <div className="h-full rounded-[1.5rem] border border-lime-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <h3 className="text-lg font-extrabold text-emerald-800">{cat.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {cat.skills.map((skill) => (
                        <li key={skill} className="flex gap-2 text-sm text-slate-600">
                          <span className="text-emerald-600" aria-hidden="true">
                            ✓
                          </span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        {/* What you'll learn */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bt-learn-heading">
            <h2 id="bt-learn-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What you&apos;ll learn at Eden
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600">You&apos;ll build confidence in:</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BT_LEARNING_PATHWAY.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-lime-50/70 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-lime-100/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Responsibilities */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-responsibilities-heading">
            <h2 id="bt-responsibilities-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              What BTs do
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BT_RESPONSIBILITIES_DETAILED.map((item, index) => (
                <motion.li
                  key={item.title}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.25rem] border border-lime-200 bg-white p-5 shadow-sm hover:border-emerald-200 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-black text-white">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="text-sm font-extrabold text-slate-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                      <p className="mt-3 text-xs font-bold uppercase tracking-[0.1em] text-emerald-700">Why it matters</p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">{item.whyItMatters}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Confidence */}
        <RbtScrollReveal>
          <section className={`${FRAME} bg-gradient-to-br from-lime-50/50 to-white`} aria-labelledby="bt-confidence-heading">
            <h2 id="bt-confidence-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              You do not need to be an expert to start.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
              Eden looks for people who are dependable, compassionate, willing to learn, and ready to receive coaching.
              Strong Behavior Technicians grow through consistency, practice, feedback, and teamwork.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BT_CONFIDENCE_CARDS.map((card) => (
                <li key={card.title} className="rounded-xl border border-lime-200 bg-white p-5 shadow-sm">
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {BT_EDUCATIONAL_NOTICE}
          </p>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <BtCareersTabs />
        </RbtScrollReveal>

        <BtGrowthPathSection />

        {/* Interview prep */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-interview-prep-heading">
            <h2 id="bt-interview-prep-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              How to stand out in your BT interview
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {BT_INTERVIEW_PREP_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-lime-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <FAQAccordion title="Sample interview questions to prepare for" items={BT_SAMPLE_INTERVIEW_QUESTIONS} />
            </div>
          </section>
        </RbtScrollReveal>

        {/* Day in the life */}
        <RbtScrollReveal>
          <section className={FRAME} aria-labelledby="bt-day-heading">
            <h2 id="bt-day-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              A day in the life
            </h2>
            <ol className="relative mt-10 space-y-0 border-l-2 border-lime-200 pl-8">
              {BT_DAY_TIMELINE.map((item, index) => (
                <li key={item.step} className="relative pb-8 last:pb-0">
                  <span
                    className="absolute -left-[2.35rem] flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-900">{item.step}</h3>
                  <p className="mt-1 text-sm leading-7 text-slate-600">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        </RbtScrollReveal>

        {/* Photos */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-photos-heading">
            <h2 id="bt-photos-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              BT care in action
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {BT_PHOTO_GALLERY.map((photo) => (
                <li
                  key={photo.src}
                  className="overflow-hidden rounded-[1.5rem] border border-lime-200 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] bg-lime-50">
                    <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <p className="px-4 py-3 text-sm font-semibold text-slate-700">{photo.caption}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        {/* Training and support */}
        <RbtScrollReveal>
          <section aria-labelledby="bt-support-heading">
            <h2 id="bt-support-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Support designed for new ABA professionals
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BT_SUPPORT_CARDS.map((card) => (
                <li
                  key={card.title}
                  className="rounded-[1.25rem] border border-lime-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">{BT_SUPPORT_DISCLAIMER}</p>
          </section>
        </RbtScrollReveal>

        {/* Apply with confidence */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-emerald-200 bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 p-8 text-white shadow-lg sm:p-10"
            aria-labelledby="bt-apply-heading"
          >
            <h2 id="bt-apply-heading" className="text-2xl font-extrabold sm:text-3xl">
              Ready to begin your ABA career with Eden?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-emerald-50">
              If you are dependable, compassionate, and ready to learn, Eden ABA Therapy wants to hear from you. You do
              not need to have every skill on day one. Bring reliability, care, and a growth mindset.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                View BT Openings
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/careers/talent-network"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Join Talent Network
              </Link>
              <Link
                href="/careers/rbt"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Learn About RBT Pathway
              </Link>
            </div>
            <p className="mt-6 text-sm text-emerald-100">
              Not sure if you qualify? Submit your interest and Eden&apos;s recruiting team can review potential fit.
            </p>
          </section>
        </RbtScrollReveal>

        {/* Preserved original CTA */}
        <RbtScrollReveal>
          <section
            className="rounded-[2rem] border border-lime-200 bg-gradient-to-br from-lime-50 via-white to-emerald-50 p-8 sm:p-10"
            aria-labelledby="bt-cta-heading"
          >
            <h2 id="bt-cta-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Apply for BT opportunities
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              Explore current openings in Annandale and nearby Northern Virginia communities.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
                View BT Roles
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link href="/careers/rbt" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Learn About RBT Pathway
              </Link>
              <Link href="/careers/career-paths" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                Learn About Career Paths
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
