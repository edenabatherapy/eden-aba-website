import type { Metadata } from "next";
import Link from "next/link";
import { getStripeDonationPublicSummary } from "@/lib/stripe/repository";
import { formatCurrency } from "@/lib/autism-care-fund/formulas";
import { LEGAL_DISCLAIMER } from "@/lib/financial-platform/constants";

export const metadata: Metadata = {
  title: "Donation Successful | Eden ABA Therapy",
  description: "Thank you for supporting Eden ABA Therapy.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function DonationSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = params.session_id?.trim();

  let donation = null;
  if (sessionId) {
    try {
      donation = await getStripeDonationPublicSummary(sessionId);
    } catch {
      donation = null;
    }
  }

  const isCompleted = donation?.status === "completed";
  const isProcessing = donation?.status === "pending";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b4f4f]">Eden ABA Therapy</p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
          Thank you for supporting Eden ABA Therapy
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
          Donation received successfully. Your community support payment helps eligible families access
          medically necessary ABA therapy through the Eden Autism Care Fund.
        </p>

        {donation ? (
          <dl className="mt-8 space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Donation ID</dt>
              <dd className="mt-1 font-mono text-sm text-slate-900 dark:text-white">{donation.id}</dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Amount</dt>
              <dd className="mt-1 text-xl font-extrabold text-[#0b4f4f]">
                {formatCurrency(donation.amountCents)}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Status</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {isCompleted
                  ? "Completed"
                  : isProcessing
                    ? "Processing — your receipt will be confirmed shortly"
                    : donation.status}
              </dd>
            </div>
            {donation.donorEmail ? (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Receipt email</dt>
                <dd className="mt-1 text-sm text-slate-800 dark:text-slate-200">{donation.donorEmail}</dd>
              </div>
            ) : null}
            {donation.paymentIntentId ? (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Payment reference</dt>
                <dd className="mt-1 font-mono text-xs text-slate-700 dark:text-slate-300">
                  {donation.paymentIntentId}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
            Your payment was submitted to Stripe. If you do not see receipt details here, check your email for
            Stripe confirmation.
          </p>
        )}

        <p className="mt-8 text-sm leading-7 text-amber-900 dark:text-amber-100" role="note">
          {LEGAL_DISCLAIMER}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex rounded-full bg-[#0b4f4f] px-6 py-3 text-sm font-extrabold text-white"
          >
            Return Home
          </Link>
          <Link
            href="/resources/financial-assistance#autism-care-fund"
            className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 dark:border-slate-600 dark:text-slate-200"
          >
            Return to Autism Care Fund
          </Link>
        </div>
      </div>
    </main>
  );
}
