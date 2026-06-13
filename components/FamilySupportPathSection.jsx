"use client";

import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Search,
  ShieldCheck,
} from "lucide-react";

const STEP_ICONS = [Search, ClipboardList, CalendarDays, ShieldCheck];

const EDEN_FLOW_GRADIENT =
  "linear-gradient(120deg, #2D8A43, #66B34E, #A8D86A, #6EC6C4, #2D9C9C, #F4B54A, #2D8A43)";

const BUTTON_STYLES = [
  "bg-[#F4B54A] text-[#173B2F] hover:bg-[#FFD86A] shadow-[0_12px_30px_-10px_rgba(244,181,74,0.65)]",
  "bg-[#2D8A43] text-white hover:bg-[#66B34E] shadow-[0_12px_30px_-10px_rgba(45,138,67,0.55)]",
  "bg-[#2D9C9C] text-white hover:bg-[#6EC6C4] shadow-[0_12px_30px_-10px_rgba(45,156,156,0.55)]",
  "bg-[#173B2F] text-white hover:bg-[#2D8A43] shadow-[0_12px_30px_-10px_rgba(23,59,47,0.45)]",
];

const ICON_STYLES = [
  "from-[#A8D86A]/30 to-[#66B34E]/20 text-[#2D8A43]",
  "from-[#A9DDE7]/40 to-[#6EC6C4]/20 text-[#2D9C9C]",
  "from-[#FFD86A]/40 to-[#F4B54A]/20 text-[#F4B54A]",
  "from-[#66B34E]/25 to-[#2D8A43]/15 text-[#2D8A43]",
];

function PathStepCard({
  stepLabel,
  title,
  description,
  benefitsLabel,
  benefits,
  buttonLabel,
  iconIndex,
  onClick,
  actions,
}) {
  const Icon = STEP_ICONS[iconIndex] ?? Search;

  return (
    <article className="group relative flex h-full flex-col">
      <div
        aria-hidden="true"
        className="eden-flow-border pointer-events-none absolute -inset-[2px] rounded-[2rem] opacity-70 transition-all duration-500 group-hover:opacity-100 group-hover:blur-[0.5px]"
        style={{ background: EDEN_FLOW_GRADIENT }}
      />

      <div className="relative flex h-full min-h-[32rem] flex-col overflow-hidden rounded-[1.925rem] bg-[#FFFDF6] p-8 shadow-[0_22px_55px_-28px_rgba(23,59,47,0.28)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_36px_70px_-30px_rgba(45,138,67,0.38)] md:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-[#A8D86A]/20 to-[#6EC6C4]/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-gradient-to-tr from-[#A9DDE7]/25 to-transparent blur-2xl"
        />

        <div className="relative flex flex-1 flex-col">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#2D9C9C]">
            {stepLabel}
          </p>

          <div
            className={`mt-5 grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${ICON_STYLES[iconIndex]} shadow-inner ring-1 ring-white/60`}
          >
            <Icon size={30} strokeWidth={2.25} />
          </div>

          <h3 className="mt-6 text-2xl font-black leading-tight tracking-tight text-[#173B2F] md:text-[1.65rem] xl:text-[1.75rem]">
            {title}
          </h3>

          <p className="mt-4 text-base font-medium leading-7 text-[#173B2F]/80">
            {description}
          </p>

          <div className="mt-6">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#66B34E]">
              {benefitsLabel}
            </p>
            <ul className="mt-3 space-y-2.5">
              {benefits.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm font-semibold leading-6 text-[#173B2F]/85"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#66B34E]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`relative mt-8 pt-2${actions?.length > 1 ? " space-y-3" : ""}`}>
          {actions?.length ? (
            actions.map(({ label, onClick: actionClick }) => (
              <button
                key={label}
                type="button"
                onClick={actionClick}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black transition-all duration-300 md:text-base ${BUTTON_STYLES[iconIndex]}`}
              >
                {label}
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            ))
          ) : (
            <button
              type="button"
              onClick={onClick}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-black transition-all duration-300 md:text-base ${BUTTON_STYLES[iconIndex]}`}
            >
              {buttonLabel}
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export default function FamilySupportPathSection({
  t,
  onMchat,
  onCast,
  onDiagnosticSupport,
  onScheduleConsultation,
  onStartIntake,
}) {
  const content = t.familySupportPath || {};
  const steps = content.steps || [];
  const handlers = [
    onMchat,
    onDiagnosticSupport,
    onScheduleConsultation,
    onStartIntake,
  ];

  return (
    <section
      id="getting-started"
      className="scroll-mt-28 relative overflow-hidden bg-[#FFFDF6] px-4 py-24 lg:px-8"
    >
      <style>{`
        @keyframes edenFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .eden-flow-border {
          background-size: 300% 300%;
          animation: edenFlow 8s ease infinite;
        }
        @keyframes edenWave {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.45; }
          50% { transform: translateY(-8px) scale(1.03); opacity: 0.7; }
        }
        .eden-wave-blob {
          animation: edenWave 10s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .eden-flow-border,
          .eden-wave-blob {
            animation: none;
          }
        }
      `}</style>

      <div
        aria-hidden="true"
        className="eden-wave-blob pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-gradient-to-br from-[#A8D86A]/30 to-[#6EC6C4]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="eden-wave-blob pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-gradient-to-tr from-[#A9DDE7]/35 to-[#FFD86A]/15 blur-3xl"
        style={{ animationDelay: "2s" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#66B34E]/40 to-transparent"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#2D9C9C]">
            {content.eyebrow || "Your family's journey"}
          </p>
          <h2 className="mt-4 text-4xl font-black leading-[1.1] tracking-tight text-[#173B2F] md:text-5xl lg:text-[3.35rem]">
            {content.title}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg font-medium leading-8 text-[#173B2F]/75 md:text-xl md:leading-9">
            {content.subtitle}
          </p>
        </div>

        <div className="relative mt-16 lg:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[3.25rem] hidden xl:block"
          >
            <div className="relative h-1 overflow-hidden rounded-full bg-[#A8D86A]/25">
              <div
                className="eden-flow-border h-full w-full rounded-full opacity-80"
                style={{ background: EDEN_FLOW_GRADIENT }}
              />
            </div>
            <div className="absolute inset-x-0 -top-1 flex justify-between px-[2%]">
              {steps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center">
                  <div className="grid h-7 w-7 place-items-center rounded-full bg-[#FFFDF6] ring-2 ring-[#66B34E]/50">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#2D8A43]" />
                  </div>
                  {index < steps.length - 1 && (
                    <span className="mt-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#2D9C9C]/70">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mb-8 hidden text-center text-xs font-black uppercase tracking-[0.22em] text-[#2D9C9C]/80 xl:block">
            {content.journeyLabel}
          </p>

          <div className="grid items-stretch gap-8 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {steps.map((step, index) => (
              <PathStepCard
                key={step.step}
                stepLabel={step.step}
                title={step.title}
                description={step.description}
                benefitsLabel={content.benefitsLabel}
                benefits={step.benefits}
                buttonLabel={step.button}
                iconIndex={index}
                onClick={handlers[index]}
                actions={
                  index === 0 && step.buttons?.length
                    ? step.buttons.map((label, buttonIndex) => ({
                        label,
                        onClick: buttonIndex === 0 ? onMchat : onCast,
                      }))
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
