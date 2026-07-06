import type { Metadata } from "next";
import Link from "next/link";
import EdenLogo from "@/components/EdenLogo";
import { getButtonClasses } from "@/lib/button-styles";

export const metadata: Metadata = {
  title: "Insurance Verification Request Received | Eden ABA Therapy",
  description:
    "Your insurance verification request has been submitted to Eden ABA Therapy.",
  robots: { index: false, follow: false },
};

const REQUEST_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type PageProps = {
  searchParams: Promise<{ ref?: string; submitted?: string }>;
};

function formatSubmittedDate(value: string | undefined): string {
  if (!value?.trim()) {
    return new Date().toLocaleString("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    });
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.trim();
  }

  return parsed.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export default async function InsuranceVerificationReceivedPage({ searchParams }: PageProps) {
  const { ref, submitted } = await searchParams;
  const requestId = ref?.trim() ?? "";
  const hasValidRequestId = REQUEST_ID_PATTERN.test(requestId);
  const submittedDate = formatSubmittedDate(submitted);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ddf4f4]/40 to-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#49b8c8]/20 bg-white p-6 shadow-2xl shadow-[#128c8c]/10 sm:rounded-[3rem] sm:p-10">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <EdenLogo size="auth" />
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">
              Insurance Verification
            </p>
            <h1 className="mt-2 text-2xl font-black text-[#0b4f4f] sm:text-3xl md:text-4xl">
              Insurance Verification Request Received
            </h1>
          </div>
        </div>

        <p className="mt-6 text-lg font-semibold leading-8 text-slate-700">
          Thank you. Your insurance verification request has been submitted successfully. Our Intake
          Team will review your information and contact you with next steps.
        </p>

        {hasValidRequestId ? (
          <dl className="mt-8 space-y-4 rounded-2xl border border-emerald-100 bg-[#ddf4f4]/40 p-6">
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-[#128c8c]">
                Request ID
              </dt>
              <dd className="mt-2 break-all font-mono text-sm font-bold text-slate-900">
                {requestId}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-[#128c8c]">
                Submitted
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">{submittedDate}</dd>
            </div>
            <div>
              <dt className="text-xs font-extrabold uppercase tracking-widest text-[#128c8c]">
                Estimated response time
              </dt>
              <dd className="mt-2 text-sm font-bold text-slate-900">1–2 business days</dd>
            </div>
          </dl>
        ) : (
          <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950">
            Your request was received. If you need your request ID, please contact our Intake Team.
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className={getButtonClasses("primarySite", "w-full sm:w-auto text-center")}>
            Return to Home
          </Link>
          <Link
            href="/start-aba-therapy"
            className={getButtonClasses("secondarySite", "w-full sm:w-auto text-center")}
          >
            Start ABA Therapy
          </Link>
          <Link
            href="/about/contact-us"
            className={getButtonClasses("secondarySite", "w-full sm:w-auto text-center")}
          >
            Contact Our Intake Team
          </Link>
        </div>
      </div>
    </main>
  );
}
