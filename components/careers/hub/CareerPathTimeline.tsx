import type { CareerPathStep } from "@/lib/careers/career-path-data";

type CareerPathTimelineProps = {
  title: string;
  intro?: string;
  steps: CareerPathStep[];
};

export default function CareerPathTimeline({ title, intro, steps }: CareerPathTimelineProps) {
  return (
    <section aria-labelledby="career-path-heading">
      <h2 id="career-path-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</p>}
      <ol className="relative mt-8 space-y-6 border-l-2 border-emerald-200 pl-6 dark:border-emerald-800">
        {steps.map((step, index) => (
          <li key={step.title} className="relative">
            <span
              className="absolute -left-[1.6rem] top-1 grid h-8 w-8 place-items-center rounded-full bg-emerald-700 text-xs font-black text-white"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <article className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.roleDescription}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                    Skills learned
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-slate-700 dark:text-slate-300">
                    {step.skillsLearned.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                    Typical next step
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{step.nextStep}</p>
                  <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">{step.credentialNote}</p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
