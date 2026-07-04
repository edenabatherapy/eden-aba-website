import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Donation Cancelled | Eden ABA Therapy",
  description: "Your donation was cancelled.",
  robots: { index: false, follow: false },
};

export default function DonationCancelPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b4f4f]">Eden ABA Therapy</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">Donation cancelled</h1>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
          Your Stripe Checkout was cancelled. No payment was processed. You can return to the Autism Care Fund
          page to try again.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/resources/financial-assistance#autism-care-fund"
            className="inline-flex rounded-full bg-[#0b4f4f] px-6 py-3 text-sm font-extrabold text-white"
          >
            Return to Donation page
          </Link>
          <Link
            href="/"
            className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 dark:border-slate-600 dark:text-slate-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
