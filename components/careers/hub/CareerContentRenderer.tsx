import type { CareerPageData } from "@/lib/careers/career-pages-data";
import BenefitGrid from "@/components/careers/hub/BenefitGrid";
import CareerCTA from "@/components/careers/hub/CareerCTA";
import CareerPathTimeline from "@/components/careers/hub/CareerPathTimeline";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import FutureLocationsGrid from "@/components/careers/hub/FutureLocationsGrid";
import TalentNetworkForm from "@/components/careers/hub/TalentNetworkForm";

type CareerContentRendererProps = {
  page: CareerPageData;
};

export default function CareerContentRenderer({ page }: CareerContentRendererProps) {
  return (
    <div className="mx-auto max-w-5xl space-y-14 px-4 py-12 lg:px-8 lg:py-16">
      {page.sections.map((section, index) => {
        const key = `${section.type}-${index}`;

        switch (section.type) {
          case "prose":
            return (
              <section key={key} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-base leading-8 text-slate-600 dark:text-slate-300">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            );
          case "list":
            return (
              <section key={key} id={section.id} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            );
          case "cards":
            return (
              <section key={key} id={section.id} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {section.cards.map((card) => (
                    <li
                      key={card.title}
                      className="rounded-[1.5rem] border border-emerald-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                    >
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{card.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.description}</p>
                      {card.bullets && (
                        <ul className="mt-3 list-disc space-y-1 pl-4 text-sm text-slate-600 dark:text-slate-400">
                          {card.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "timeline":
            return (
              <section key={key} id={section.id} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <ol className="mt-6 space-y-4">
                  {section.steps.map((step) => (
                    <li
                      key={step.title}
                      className="rounded-[1.25rem] border border-emerald-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.description}</p>
                      {step.timeframe && (
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                          {step.timeframe}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "hiring-timeline":
            return (
              <section key={key} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <ol className="mt-6 space-y-4">
                  {section.stages.map((stage, stageIndex) => (
                    <li
                      key={stage.stage}
                      className="flex gap-4 rounded-[1.25rem] border border-emerald-100 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-700 text-sm font-black text-white">
                        {stageIndex + 1}
                      </span>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{stage.stage}</h3>
                        <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{stage.description}</p>
                        <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                          {stage.typicalTiming}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "faq":
            return <FAQAccordion key={key} title={section.title} intro={section.intro} items={section.items} />;
          case "benefits":
            return (
              <BenefitGrid
                key={key}
                title={section.title}
                intro={section.intro}
                items={section.items}
                disclaimer={section.disclaimer}
              />
            );
          case "path-timeline":
            return (
              <CareerPathTimeline key={key} title={section.title} intro={section.intro} steps={section.steps} />
            );
          case "disclaimer":
            return (
              <section
                key={key}
                id={section.title.toLowerCase().replace(/\s+/g, "-")}
                className="rounded-[1.25rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/60"
              >
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{section.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{section.body}</p>
              </section>
            );
          case "story-cards":
            return (
              <section key={key} aria-labelledby={`${key}-heading`}>
                <h2 id={`${key}-heading`} className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                  {section.title}
                </h2>
                <ul className="mt-6 grid gap-4 md:grid-cols-2">
                  {section.stories.map((story) => (
                    <li
                      key={story.name}
                      className="rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
                    >
                      <p className="text-sm font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                        {story.role}
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{story.name}</h3>
                      <blockquote className="mt-4 border-l-4 border-emerald-200 pl-4 text-base italic leading-7 text-slate-700 dark:border-emerald-800 dark:text-slate-300">
                        “{story.quote}”
                      </blockquote>
                      <p className="mt-4 text-sm font-semibold text-slate-500 dark:text-slate-400">{story.pathway}</p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          case "cta":
            return (
              <CareerCTA
                key={key}
                title={section.title}
                description={section.description}
                primaryLabel={section.primaryCta.label}
                primaryHref={section.primaryCta.href}
                secondaryLabel={section.secondaryCta?.label}
                secondaryHref={section.secondaryCta?.href}
              />
            );
          default:
            return null;
        }
      })}

      {page.slug === "talent-network" && (
        <section aria-labelledby="talent-network-form-heading">
          <h2 id="talent-network-form-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Join the talent network
          </h2>
          <div className="mt-6">
            <TalentNetworkForm />
          </div>
        </section>
      )}

      {page.slug === "virginia-aba-careers" && <FutureLocationsGrid />}
    </div>
  );
}
