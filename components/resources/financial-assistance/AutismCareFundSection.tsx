"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CreditCard,
  Heart,
  Loader2,
  PiggyBank,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ALLOCATION_TARGETS, DONATION_AMOUNTS_PRESET } from "@/lib/autism-care-fund/constants";
import {
  computeEstimatedHoursSupported,
  computeProgressPercent,
  formatCurrency,
} from "@/lib/autism-care-fund/formulas";
import type { DonorWallEntry, MonthlyReport, PublicFundStats } from "@/lib/autism-care-fund/types";
import type { PlatformDashboard, TransparencyDonationRow } from "@/lib/financial-platform/types";
import { DONATION_TYPE_LABELS, LEGAL_DISCLAIMER } from "@/lib/financial-platform/constants";
import { STRIPE_DONATION_PRESETS_CENTS } from "@/lib/stripe/schema";
import type { DonationType } from "@/lib/financial-platform/types";

const EMPTY_STATS: PublicFundStats = {
  campaignName: "Autism Care Fund",
  goalAmountCents: 0,
  raisedAmountCents: 0,
  familiesHelped: 0,
  donorCount: 0,
  averageGiftCents: 0,
  allocationPercent: { therapy: 55, assessment: 15, emergency: 20, operating: 10 },
  lastUpdated: new Date().toISOString(),
  source: "supabase",
};

const EMPTY_DASHBOARD: PlatformDashboard = {
  configured: false,
  campaignName: "",
  campaignSlug: "autism-care-fund-2026",
  goalAmountCents: 0,
  monthlyGoalCents: 0,
  annualGoalCents: 0,
  raisedAmountCents: 0,
  totalDonationsCents: 0,
  reservedFundsCents: 0,
  distributedFundsCents: 0,
  availableBalanceCents: 0,
  familiesSupported: 0,
  childrenSponsored: 0,
  therapyHoursFunded: 0,
  assessmentsSponsored: 0,
  parentTrainings: 0,
  transportationAssistance: 0,
  equipmentPurchased: 0,
  donorCount: 0,
  returningDonors: 0,
  averageDonationCents: 0,
  largestDonationCents: 0,
  applicationsPending: 0,
  familiesWaiting: 0,
  lastUpdated: new Date().toISOString(),
};

function AnimatedCounter({
  value,
  format,
  reduceMotion,
}: {
  value: number;
  format: (n: number) => string;
  reduceMotion: boolean | null;
}) {
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 900;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * progress));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, reduceMotion]);

  return <span>{format(display)}</span>;
}

export default function AutismCareFundSection() {
  const reduceMotion = useReducedMotion();
  const [stats, setStats] = useState<PublicFundStats>(EMPTY_STATS);
  const [platform, setPlatform] = useState<PlatformDashboard>(EMPTY_DASHBOARD);
  const [transparencyDonations, setTransparencyDonations] = useState<TransparencyDonationRow[]>([]);
  const [donorWall, setDonorWall] = useState<DonorWallEntry[]>([]);
  const [monthlyReports, setMonthlyReports] = useState<MonthlyReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(false);

  const [donationAmount, setDonationAmount] = useState(5000);
  const [donationType, setDonationType] = useState<DonationType>("one_time");
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  const [submitting, setSubmitting] = useState(false);
  const [stripeRedirecting, setStripeRedirecting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/financial-platform/stats");
      if (!res.ok) throw new Error("stats unavailable");
      const data = await res.json();
      if (data.ok) {
        setConfigured(Boolean(data.configured));
        if (data.dashboard) {
          setPlatform(data.dashboard);
          setStats({
            campaignName: data.dashboard.campaignName || "Autism Care Fund",
            goalAmountCents: data.dashboard.goalAmountCents,
            raisedAmountCents: data.dashboard.raisedAmountCents,
            familiesHelped: data.dashboard.familiesSupported,
            donorCount: data.dashboard.donorCount,
            averageGiftCents: data.dashboard.averageDonationCents,
            allocationPercent: { ...ALLOCATION_TARGETS },
            lastUpdated: data.dashboard.lastUpdated,
            source: "supabase",
          });
        }
        setTransparencyDonations(data.transparency ?? []);
        setDonorWall(data.donorWall ?? []);
        setMonthlyReports(data.monthlyReports ?? []);
      }
    } catch {
      /* show zeros — no seed fallback */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 60_000);
    return () => clearInterval(interval);
  }, [loadDashboard]);

  const progress = computeProgressPercent(stats.raisedAmountCents, stats.goalAmountCents);
  const estimatedHours = computeEstimatedHoursSupported(donationAmount);

  const handleContribute = useCallback(async () => {
    if (donationAmount < 500) {
      setSubmitError("Minimum community support payment is $5.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const payload = {
      amountCents: donationAmount,
      donationType,
      anonymous,
      email: email.trim() || undefined,
      message: message.trim() || undefined,
    };

    try {
      if (paymentMethod === "stripe") {
        setStripeRedirecting(true);
        const res = await fetch("/api/stripe/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amountCents: donationAmount,
            donorName: donorName.trim() || undefined,
            email: email.trim() || undefined,
            anonymous,
            message: message.trim() || undefined,
          }),
        });
        const data = await res.json();
        if (!data.ok || !data.checkoutUrl) {
          setStripeRedirecting(false);
          setSubmitError(data.message ?? "Unable to start Stripe Checkout. Please try again.");
          return;
        }
        window.location.href = data.checkoutUrl;
        return;
      }

      const res = await fetch("/api/autism-care-fund/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.ok || !data.approvalUrl) {
        setSubmitError(data.message ?? "Unable to start PayPal checkout. Please try again.");
        return;
      }
      window.location.href = data.approvalUrl;
    } catch {
      setSubmitError(
        "We could not start your Autism Care Fund contribution right now. Please contact Eden ABA Therapy.",
      );
    } finally {
      setSubmitting(false);
    }
  }, [anonymous, donationAmount, donorName, email, message, paymentMethod]);

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
      };

  return (
    <section
      id="autism-care-fund"
      className="scroll-mt-28 border-t border-emerald-100 bg-slate-950 px-4 py-16 text-white lg:px-8 lg:py-24"
      aria-labelledby="acf-heading"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...reveal} className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-emerald-400">
            <Heart size={14} aria-hidden />
            Community Initiative
          </p>
          <h2 id="acf-heading" className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Autism Care Fund
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            A transparency-focused community fund helping eligible families bridge gaps when insurance, Medicaid, or other
            programs do not fully cover medically necessary ABA therapy.
          </p>
        </motion.div>

        <div
          className="mt-6 flex gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4"
          role="note"
        >
          <AlertCircle className="mt-0.5 shrink-0 text-amber-400" size={20} aria-hidden />
          <p className="text-sm leading-7 text-amber-100">{LEGAL_DISCLAIMER}</p>
        </div>

        {/* Dashboard counters */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: PiggyBank,
              label: "Total raised",
              value: platform.raisedAmountCents,
              format: (n: number) => formatCurrency(n),
            },
            {
              icon: TrendingUp,
              label: "Annual goal",
              value: platform.annualGoalCents || stats.goalAmountCents,
              format: (n: number) => formatCurrency(n),
            },
            {
              icon: Users,
              label: "Families supported",
              value: platform.familiesSupported,
              format: (n: number) => String(n),
            },
            {
              icon: Heart,
              label: "Therapy hours funded",
              value: Math.round(platform.therapyHoursFunded),
              format: (n: number) => String(n),
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
              >
                <Icon className="text-emerald-400" size={22} aria-hidden />
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</p>
                <p className="mt-1 text-2xl font-extrabold text-white">
                  {loading ? "…" : (
                    <AnimatedCounter value={item.value} format={item.format} reduceMotion={reduceMotion} />
                  )}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="text-sm font-extrabold text-emerald-300">Campaign progress</p>
            <p className="text-2xl font-extrabold">{progress}%</p>
          </div>
          <div
            className="mt-4 h-4 overflow-hidden rounded-full bg-white/10"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Autism Care Fund progress toward goal"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-amber-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Data source: {configured ? "Live database records" : "Awaiting platform configuration"} · Updated{" "}
            {new Date(stats.lastUpdated).toLocaleDateString()}
          </p>
        </div>

        {/* Available balance formula */}
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-6 backdrop-blur-md">
          <h3 className="text-lg font-extrabold text-emerald-300">Autism Care Fund allocation formula</h3>
          <p className="mt-2 font-mono text-sm text-slate-200">
            Available Balance = Total Donations − Reserved Funds − Distributed Funds
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total donations", value: platform.totalDonationsCents },
              { label: "Reserved", value: platform.reservedFundsCents },
              { label: "Distributed", value: platform.distributedFundsCents },
              { label: "Available balance", value: platform.availableBalanceCents },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</dt>
                <dd className="mt-1 text-xl font-extrabold text-white">
                  {loading ? "…" : (
                    <AnimatedCounter value={item.value} format={formatCurrency} reduceMotion={reduceMotion} />
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Extended KPI row */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { label: "Children sponsored", value: platform.childrenSponsored },
            { label: "Donors", value: platform.donorCount },
            { label: "Applications pending", value: platform.applicationsPending },
            { label: "Families waiting", value: platform.familiesWaiting },
            { label: "Monthly goal", value: platform.monthlyGoalCents, currency: true },
            { label: "Largest gift", value: platform.largestDonationCents, currency: true },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm">
              <p className="text-xs text-slate-400">{kpi.label}</p>
              <p className="mt-1 font-extrabold">
                {loading
                  ? "…"
                  : kpi.currency
                    ? formatCurrency(kpi.value)
                    : kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Allocation visualization */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-extrabold">Planned allocation formula</h3>
            <p className="mt-2 text-sm text-slate-400">
              Published targets for how each donated dollar is directed when disbursed to families.
            </p>
            <ul className="mt-6 space-y-4">
              {(Object.entries(ALLOCATION_TARGETS) as [keyof typeof ALLOCATION_TARGETS, number][]).map(
                ([key, percent]) => (
                  <li key={key}>
                    <div className="flex justify-between text-sm font-semibold capitalize">
                      <span>{key.replace("_", " ")}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-emerald-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Impact calculator */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-extrabold">Donation impact calculator</h3>
            <p className="mt-2 text-sm text-slate-400">
              Conservative planning estimate—not a guarantee of specific clinical hours or outcomes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DONATION_AMOUNTS_PRESET.map((cents) => (
                <button
                  key={cents}
                  type="button"
                  aria-pressed={donationAmount === cents}
                  onClick={() => {
                    setDonationAmount(cents);
                    setCustomAmount("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                    donationAmount === cents
                      ? "bg-emerald-500 text-white"
                      : "border border-white/20 text-slate-200 hover:bg-white/10"
                  }`}
                >
                  {formatCurrency(cents)}
                </button>
              ))}
            </div>
            <label htmlFor="acf-custom-amount" className="mt-4 block text-xs font-bold uppercase text-slate-400">
              Custom amount (USD)
            </label>
            <input
              id="acf-custom-amount"
              type="number"
              min={5}
              max={50000}
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                const dollars = Number(e.target.value);
                if (Number.isFinite(dollars) && dollars >= 5) {
                  setDonationAmount(Math.round(dollars * 100));
                }
              }}
              placeholder="e.g. 75"
              className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
            />
            <p className="mt-4 text-sm text-slate-300">
              A {formatCurrency(donationAmount)} contribution could support approximately{" "}
              <strong className="text-emerald-300">{estimatedHours} therapy hours</strong> under current planning
              assumptions.
            </p>
          </div>
        </div>

        {/* Transparency center */}
        {transparencyDonations.length > 0 ? (
          <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="w-full min-w-[720px] text-left text-sm">
              <caption className="px-6 py-4 text-left text-lg font-extrabold">
                Transparency Center — completed donations
              </caption>
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-slate-400">
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Date</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Allocation</th>
                  <th scope="col" className="px-6 py-3">Donor</th>
                </tr>
              </thead>
              <tbody>
                {transparencyDonations.map((row) => (
                  <tr key={row.id} className="border-b border-white/5">
                    <td className="px-6 py-3 font-mono text-xs">{row.id.slice(0, 8)}…</td>
                    <td className="px-6 py-3">{new Date(row.donatedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-3">{DONATION_TYPE_LABELS[row.donationType] ?? row.donationType}</td>
                    <td className="px-6 py-3 font-extrabold text-emerald-300">{formatCurrency(row.amountCents)}</td>
                    <td className="px-6 py-3 capitalize">{row.allocationStatus}</td>
                    <td className="px-6 py-3">{row.isAnonymous ? "Anonymous" : row.donorDisplayName ?? "Public"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {/* Legacy transparency table removed — use transparency center above */}

        {/* Monthly reports */}
        {monthlyReports.length > 0 ? (
          <div className="mt-8">
            <h3 className="text-lg font-extrabold">Monthly reports</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {monthlyReports.map((report) => (
                <li
                  key={report.id}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm backdrop-blur-md"
                >
                  <p className="font-extrabold text-emerald-300">{report.month}</p>
                  <p className="mt-2 text-slate-300">
                    Raised {formatCurrency(report.raisedCents)} · Disbursed {formatCurrency(report.disbursedCents)}
                  </p>
                  <p className="mt-1 text-slate-400">{report.familiesServed} families served</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Donor wall + donate UI */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h3 className="text-lg font-extrabold">Community donor wall</h3>
            <p className="mt-2 text-sm text-slate-400">Anonymous by default to protect donor privacy.</p>
            <ul className="mt-4 space-y-3">
              {donorWall.map((donor) => (
                <li
                  key={donor.id}
                  className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{donor.displayName}</span>
                  <span className="text-slate-400">
                    {donor.amountCents ? formatCurrency(donor.amountCents) : "—"} ·{" "}
                    {new Date(donor.donatedAt).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/80 to-slate-900 p-6">
            <h3 className="flex items-center gap-2 text-lg font-extrabold">
              <CreditCard size={20} aria-hidden />
              Make an Autism Care Fund contribution
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Submit a community support payment by card or PayPal. Contributions support eligible families
              through the Eden Autism Care Fund.
            </p>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase text-slate-400">Contribution amount</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {STRIPE_DONATION_PRESETS_CENTS.map((cents) => (
                    <button
                      key={`donate-${cents}`}
                      type="button"
                      aria-pressed={donationAmount === cents && !customAmount}
                      onClick={() => {
                        setDonationAmount(cents);
                        setCustomAmount("");
                      }}
                      className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                        donationAmount === cents && !customAmount
                          ? "bg-emerald-500 text-white"
                          : "border border-white/20 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {formatCurrency(cents)}
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-pressed={Boolean(customAmount)}
                    onClick={() => {
                      if (!customAmount) setCustomAmount(String(donationAmount / 100));
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                      customAmount
                        ? "bg-emerald-500 text-white"
                        : "border border-white/20 text-slate-200 hover:bg-white/10"
                    }`}
                  >
                    Custom
                  </button>
                </div>
                {customAmount ? (
                  <label htmlFor="acf-donate-custom-amount" className="mt-3 block text-xs font-bold uppercase text-slate-400">
                    Custom amount (USD, minimum $5)
                  </label>
                ) : null}
                {customAmount ? (
                  <input
                    id="acf-donate-custom-amount"
                    type="number"
                    min={5}
                    max={50000}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      const dollars = Number(e.target.value);
                      if (Number.isFinite(dollars) && dollars >= 5) {
                        setDonationAmount(Math.round(dollars * 100));
                      }
                    }}
                    placeholder="e.g. 75"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
                  />
                ) : null}
              </div>

              <fieldset>
                <legend className="text-xs font-bold uppercase text-slate-400">Payment method</legend>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {[
                    { id: "stripe" as const, label: "Stripe card payment" },
                    { id: "paypal" as const, label: "PayPal" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={paymentMethod === option.id}
                      onClick={() => setPaymentMethod(option.id)}
                      className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                        paymentMethod === option.id
                          ? "bg-emerald-500 text-white"
                          : "border border-white/20 text-slate-200 hover:bg-white/10"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div>
                <label htmlFor="acf-donation-type" className="text-xs font-bold uppercase text-slate-400">
                  Contribution type
                </label>
                <select
                  id="acf-donation-type"
                  value={donationType}
                  onChange={(e) => setDonationType(e.target.value as DonationType)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
                >
                  {Object.entries(DONATION_TYPE_LABELS).map(([value, label]) => (
                    <option key={value} value={value} className="text-slate-900">
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-white/30"
                />
                List this contribution anonymously on the donor wall
              </label>

              {!anonymous ? (
                <div>
                  <label htmlFor="acf-donor-name" className="text-xs font-bold uppercase text-slate-400">
                    Donor name
                  </label>
                  <input
                    id="acf-donor-name"
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
                    autoComplete="name"
                  />
                </div>
              ) : null}

              <div>
                <label htmlFor="acf-email" className="text-xs font-bold uppercase text-slate-400">
                  Email (optional — for payment confirmation)
                </label>
                <input
                  id="acf-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
                  autoComplete="email"
                />
              </div>

              <div>
                <label htmlFor="acf-message" className="text-xs font-bold uppercase text-slate-400">
                  Message (optional)
                </label>
                <textarea
                  id="acf-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-emerald-400"
                />
              </div>

              <button
                type="button"
                disabled={submitting || stripeRedirecting || donationAmount < 500}
                onClick={handleContribute}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-emerald-400 disabled:opacity-60"
              >
                {stripeRedirecting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Redirecting to Stripe Checkout…
                  </>
                ) : submitting ? (
                  "Starting secure checkout…"
                ) : paymentMethod === "stripe" ? (
                  `Donate with Stripe — ${formatCurrency(donationAmount)}`
                ) : (
                  `Contribute ${formatCurrency(donationAmount)} via PayPal`
                )}
              </button>

              {submitError ? (
                <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
                  {submitError}
                </p>
              ) : null}

              <p className="text-xs leading-6 text-slate-400">
                Payments are processed securely by {paymentMethod === "stripe" ? "Stripe" : "PayPal"}. Eden ABA
                Therapy does not store card numbers on this website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
