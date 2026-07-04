import type { Metadata } from "next";
import Link from "next/link";
import { capturePayPalDonation } from "@/lib/autism-care-fund/payments/paypal";
import { getDonationPublicSummary } from "@/lib/autism-care-fund/payments/donations";
import { formatCurrency } from "@/lib/autism-care-fund/formulas";
import { LEGAL_DISCLAIMER } from "@/lib/financial-platform/constants";

export const metadata: Metadata = {
  title: "Thank You | Eden Autism Care Fund",
  description: "Thank you for your Autism Care Fund contribution.",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{
    donation_id?: string;
    provider?: string;
    token?: string;
    session_id?: string;
  }>;
};

const PROVIDER_LABELS: Record<string, string> = {
  stripe: "Stripe card payment",
  paypal: "PayPal",
};

export default async function AutismCareFundThankYouPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const donationId = params.donation_id?.trim();
  const provider = params.provider?.trim().toLowerCase();
  const paypalOrderId = params.token?.trim();

  if (provider === "paypal" && paypalOrderId && donationId) {
    try {
      await capturePayPalDonation({ orderId: paypalOrderId, donationId });
    } catch {
      /* summary below will reflect current status */
    }
  }

  let donation = null;
  if (donationId) {
    try {
      donation = await getDonationPublicSummary(donationId);
    } catch {
      donation = null;
    }
  }
  const isCompleted = donation?.status === "completed";
  const isProcessing = donation?.status === "pending";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 dark:bg-slate-950 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#0b4f4f]">
          Eden Autism Care Fund
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white">
          Thank you for supporting the Eden Autism Care Fund
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
          Your community support payment helps eligible families access medically necessary ABA therapy
          when other resources leave gaps.
        </p>

        {donation ? (
          <dl className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-950">
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
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Payment provider</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {donation.paymentProvider
                  ? PROVIDER_LABELS[donation.paymentProvider] ?? donation.paymentProvider
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">Status</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                {isCompleted
                  ? "Completed"
                  : isProcessing
                    ? "Processing — confirmation may take a moment for card payments"
                    : donation.status}
              </dd>
            </div>
          </dl>
        ) : (
          <p className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
            We could not locate your contribution details. If you completed a payment, please contact
            Eden ABA Therapy with your confirmation email.
          </p>
        )}

        <p className="mt-8 text-sm leading-7 text-amber-900 dark:text-amber-100" role="note">
          {LEGAL_DISCLAIMER}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/resources/financial-assistance#autism-care-fund"
            className="inline-flex rounded-full bg-[#0b4f4f] px-6 py-3 text-sm font-extrabold text-white"
          >
            Return to Autism Care Fund
          </Link>
          <Link
            href="/resources/financial-assistance#assistance-application"
            className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-sm font-bold text-slate-700 dark:border-slate-600 dark:text-slate-200"
          >
            Request financial assistance
          </Link>
        </div>
      </div>
    </main>
  );
}
