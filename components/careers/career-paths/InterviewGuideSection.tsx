"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useState } from "react";
import { ChevronDown, ClipboardCheck, MessageCircle, Star } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import {
  INTERVIEW_BCBA_QUESTIONS,
  INTERVIEW_BT_QUESTIONS,
  INTERVIEW_GUIDE_CHECKLIST,
  INTERVIEW_GUIDE_COMMUNICATION,
  INTERVIEW_GUIDE_EXPECT,
  INTERVIEW_GUIDE_PROFESSIONALISM,
  INTERVIEW_GUIDE_STAR,
  INTERVIEW_RBT_QUESTIONS,
} from "@/lib/careers/career-paths-interview-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "scroll-mt-28 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

type InterviewTab = "bt" | "rbt" | "bcba";

export default function InterviewGuideSection() {
  const interviewBcbaQuestions = useLocalizedContent("INTERVIEW_BCBA_QUESTIONS", INTERVIEW_BCBA_QUESTIONS);
  const interviewBtQuestions = useLocalizedContent("INTERVIEW_BT_QUESTIONS", INTERVIEW_BT_QUESTIONS);
  const interviewGuideChecklist = useLocalizedContent("INTERVIEW_GUIDE_CHECKLIST", INTERVIEW_GUIDE_CHECKLIST);
  const interviewGuideCommunication = useLocalizedContent("INTERVIEW_GUIDE_COMMUNICATION", INTERVIEW_GUIDE_COMMUNICATION);
  const interviewGuideExpect = useLocalizedContent("INTERVIEW_GUIDE_EXPECT", INTERVIEW_GUIDE_EXPECT);
  const interviewGuideProfessionalism = useLocalizedContent("INTERVIEW_GUIDE_PROFESSIONALISM", INTERVIEW_GUIDE_PROFESSIONALISM);
  const interviewGuideStar = useLocalizedContent("INTERVIEW_GUIDE_STAR", INTERVIEW_GUIDE_STAR);
  const interviewRbtQuestions = useLocalizedContent("INTERVIEW_RBT_QUESTIONS", INTERVIEW_RBT_QUESTIONS);

  const questionSets: Record<InterviewTab, { label: string; items: typeof interviewBtQuestions }> = {
    bt: { label: "BT questions", items: interviewBtQuestions },
    rbt: { label: "RBT questions", items: interviewRbtQuestions },
    bcba: { label: "BCBA questions", items: interviewBcbaQuestions },
  };

  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<InterviewTab>("bt");
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggleCheck = (index: number) => {
    setChecked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const completedCount = interviewGuideChecklist.filter((_, i) => checked[i]).length;

  return (
    <section id="interview-guide" className={FRAME} aria-labelledby="interview-guide-heading">
      <h2 id="interview-guide-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Interview Guide
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
        Prepare for Eden interviews with role-specific guidance, STAR storytelling, and professional communication tips.
      </p>

      <div className="mt-10">
        <h3 className="text-lg font-extrabold text-slate-900">What to expect</h3>
        <ol className="relative mt-6 space-y-4">
          <div className="absolute bottom-4 left-4 top-4 hidden w-0.5 bg-teal-200 sm:block" aria-hidden="true" />
          {interviewGuideExpect.map((step, index) => (
            <motion.li
              key={step.title}
              initial={reduceMotion ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
              className="relative sm:pl-10"
            >
              <span className="absolute left-0 top-3 hidden h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white sm:flex">
                {index + 1}
              </span>
              <article className="rounded-xl border border-teal-100 bg-gradient-to-r from-white to-teal-50/20 p-5">
                <h4 className="text-base font-extrabold text-slate-900">{step.title}</h4>
                <p className="mt-1 text-sm leading-7 text-slate-600">{step.description}</p>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-12 rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-emerald-50/40 to-teal-50/30 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <Star className="text-teal-700" size={22} aria-hidden="true" />
          <h3 className="text-lg font-extrabold text-slate-900">{interviewGuideStar.title}</h3>
        </div>
        <p className="mt-2 text-sm leading-7 text-slate-600">{interviewGuideStar.summary}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {interviewGuideStar.steps.map((step) => (
            <div key={step.letter} className="rounded-xl border border-teal-100 bg-white p-4 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-black text-white">
                {step.letter}
              </span>
              <p className="mt-3 text-sm font-extrabold text-slate-900">{step.label}</p>
              <p className="mt-1 text-xs leading-6 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <MessageCircle className="text-teal-700" size={18} aria-hidden="true" />
            <h3 className="text-base font-extrabold text-slate-900">Professional communication tips</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {interviewGuideCommunication.map((tip) => (
              <li key={tip} className="flex gap-2 text-sm leading-7 text-slate-600">
                <span className="text-teal-600" aria-hidden="true">
                  ✓
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="text-teal-700" size={18} aria-hidden="true" />
            <h3 className="text-base font-extrabold text-slate-900">Clinical professionalism guidance</h3>
          </div>
          <ul className="mt-4 space-y-2">
            {interviewGuideProfessionalism.map((tip) => (
              <li key={tip} className="flex gap-2 text-sm leading-7 text-slate-600">
                <span className="text-teal-600" aria-hidden="true">
                  ✓
                </span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-extrabold text-slate-900">Common interview questions</h3>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Interview question categories">
          {(Object.keys(questionSets) as InterviewTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                activeTab === tab ? "bg-teal-700 text-white shadow-sm" : "border border-teal-100 bg-white text-slate-700 hover:bg-teal-50"
              }`}
            >
              {questionSets[tab].label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="mt-6"
          >
            <FAQAccordion title={questionSets[activeTab].label} items={questionSets[activeTab].items} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 rounded-[1.25rem] border border-teal-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-extrabold text-slate-900">Interview preparation checklist</h3>
          <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-bold text-teal-800">
            {completedCount} / {interviewGuideChecklist.length} complete
          </span>
        </div>
        <ul className="mt-6 space-y-2">
          {interviewGuideChecklist.map((item, index) => {
            const isChecked = !!checked[index];
            return (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => toggleCheck(index)}
                  className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    isChecked
                      ? "border-teal-200 bg-teal-50/60 text-teal-900"
                      : "border-teal-100 bg-white text-slate-700 hover:bg-teal-50/40"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      isChecked ? "border-teal-700 bg-teal-700 text-white" : "border-teal-300 bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    {isChecked ? "✓" : ""}
                  </span>
                  <span className={isChecked ? "line-through opacity-80" : ""}>{item}</span>
                  <ChevronDown size={16} className="ml-auto shrink-0 opacity-0" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
