type CareerPageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export default function CareerPageHero({ eyebrow, title, subtitle }: CareerPageHeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20 dark:from-emerald-950/30 dark:via-slate-950 dark:to-teal-950/20"
      aria-labelledby="career-page-hero-heading"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-16 top-6 h-56 w-56 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-100/50 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-4xl">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">{eyebrow}</p>
        <h1
          id="career-page-hero-heading"
          className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
    </section>
  );
}
