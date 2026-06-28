import type { Metadata } from "next";
import CareersSubpageShell from "@/components/careers/CareersSubpageShell";

export const metadata: Metadata = {
  title: "Compensation Estimator | Eden ABA Therapy Careers",
  description:
    "Estimate weekly, monthly, and annual compensation based on role, schedule, and expected hours at Eden ABA Therapy.",
  alternates: { canonical: "/careers/compensation-estimator" },
};

export default function CompensationEstimatorPage() {
  return (
    <CareersSubpageShell>
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8 lg:py-24">
        <h1 className="text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">Compensation Estimator</h1>
        <p className="mt-6 text-lg font-medium leading-8 text-slate-700">
          Estimate weekly, monthly, and annual compensation based on role, schedule, and expected hours. Estimates are
          for planning only and do not guarantee compensation.
        </p>
      </section>
    </CareersSubpageShell>
  );
}
