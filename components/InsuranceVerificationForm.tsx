"use client";
// @ts-nocheck

import { type ButtonHTMLAttributes, useState } from "react";
import { CheckCircle2, ExternalLink } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

function Button({ children, variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold transition-all disabled:cursor-not-allowed disabled:opacity-60";
  const styles = {
    primary: "bg-[#1f7a2e] text-white shadow-lg shadow-[#128c8c]/20 hover:-translate-y-0.5 hover:bg-[#166326]",
    secondary: "border border-[#49b8c8]/30 bg-white/90 text-[#0b4f4f] hover:bg-[#49b8c8]/10",
  }[variant];

  return (
    <button type={type} {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}

function InsuranceVerificationForm({ onSchedule, onHome }) {
  const VIRGINIA_MEDICAID = "Virginia Medicaid / Cardinal Care";
  const VIRGINIA_MANAGED_CARE_URL = "https://www.virginiamanagedcare.com/en/login";

  const [form, setForm] = useState({
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    childFullName: "",
    childDob: "",
    zipCode: "",
    insuranceProvider: "",
    medicaidId: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState("");

  const isVirginiaMedicaid = form.insuranceProvider === VIRGINIA_MEDICAID;

  const emailValid = form.email.includes("@") && form.email.includes(".");
  const dobValid =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(
      form.childDob
    );

  const complete =
    form.parentFirstName.trim() &&
    form.parentLastName.trim() &&
    emailValid &&
    form.phone.trim() &&
    form.childFullName.trim() &&
    dobValid &&
    form.zipCode.trim() &&
    form.insuranceProvider.trim() &&
    (!isVirginiaMedicaid || form.medicaidId.trim()) &&
    form.consent;

  const fieldClass =
    "w-full rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#128c8c] focus:ring-4 focus:ring-[#49b8c8]/20";

  const update = (key, value) => {
    if (key === "phone") {
      const digits = value.replace(/[^0-9]/g, "").slice(0, 10);
      const formatted =
        digits.length > 6
          ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
          : digits.length > 3
            ? `(${digits.slice(0, 3)}) ${digits.slice(3)}`
            : digits;

      setForm((old) => ({ ...old, phone: formatted }));
      return;
    }

    setForm((old) => ({ ...old, [key]: value }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setTouched(true);
    setError("");

    if (!complete) {
      setError("Please complete all required fields before submitting.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/insurance-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(result.message || "Unable to submit insurance request.");
        return;
      }

      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Unable to submit insurance request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-[3rem] border border-[#49b8c8]/20 bg-white p-8 text-center shadow-2xl shadow-[#128c8c]/10 md:p-12">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#1f7a2e] text-white shadow-xl">
          <CheckCircle2 size={42} />
        </div>

        <h2 className="mt-6 text-4xl font-black leading-tight text-[#0b4f4f] md:text-5xl">
          Insurance request submitted
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold leading-8 text-slate-700">
          Thank you. Eden ABA Therapy has received your insurance verification
          request and will review benefits, authorization requirements, and next
          steps.
        </p>

        {isVirginiaMedicaid && (
          <a
            href={VIRGINIA_MANAGED_CARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#1f7a2e] px-7 py-4 text-base font-black text-white shadow-lg transition hover:bg-[#ff8a1f]"
          >
            Continue to Virginia Managed Care Verification <ExternalLink size={18} />
          </a>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button onClick={onSchedule}>Schedule Appointment</Button>
          <Button variant="secondary" onClick={onHome}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[3rem] border border-[#49b8c8]/20 bg-white p-8 shadow-2xl shadow-[#128c8c]/10 md:p-12">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-[#128c8c]">
        Secure insurance request
      </p>

      <h2 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">
        Prepare for a brighter future with ABA therapy
      </h2>

      <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
        Complete the secure form below and our team will contact you about
        insurance benefits and next steps.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <input
          className={fieldClass}
          value={form.parentFirstName}
          onChange={(e) => update("parentFirstName", e.target.value)}
          placeholder="Parent/Guardian First Name *"
          required
        />

        <input
          className={fieldClass}
          value={form.parentLastName}
          onChange={(e) => update("parentLastName", e.target.value)}
          placeholder="Parent/Guardian Last Name *"
          required
        />

        <input
          className={fieldClass}
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          placeholder="Email *"
          required
        />

        <input
          className={fieldClass}
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="Phone Number *"
          required
        />

        <input
          className={fieldClass}
          value={form.childFullName}
          onChange={(e) => update("childFullName", e.target.value)}
          placeholder="Child’s Full Name *"
          required
        />

        <input
          className={fieldClass}
          value={form.childDob}
          onChange={(e) => update("childDob", e.target.value)}
          placeholder="Child Date of Birth MM/DD/YYYY *"
          required
        />

        <input
          className={fieldClass}
          value={form.zipCode}
          onChange={(e) => update("zipCode", e.target.value)}
          placeholder="ZIP Code *"
          required
        />

        <select
          className={fieldClass}
          value={form.insuranceProvider}
          onChange={(e) => update("insuranceProvider", e.target.value)}
          required
        >
          <option value="">Insurance Provider *</option>
          <option value={VIRGINIA_MEDICAID}>Virginia Medicaid / Cardinal Care</option>
          <option value="Private Insurance">Private Insurance</option>
          <option value="TRICARE">TRICARE</option>
          <option value="Other">Other</option>
        </select>

        <input
          className={`${fieldClass} md:col-span-2`}
          value={form.medicaidId}
          onChange={(e) => update("medicaidId", e.target.value)}
          placeholder={
            isVirginiaMedicaid
              ? "Medicaid ID *"
              : "Medicaid ID, if applicable"
          }
          required={isVirginiaMedicaid}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm font-bold leading-6 text-slate-700">
        SSN is intentionally not collected here. Add SSN only if legally and
        compliance approved.
      </div>

      <label className="mt-6 flex gap-3 rounded-2xl bg-[#ddf4f4]/60 p-4 text-sm font-bold leading-6 text-slate-700">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => update("consent", e.target.checked)}
          className="mt-1 h-5 w-5 accent-[#1f7a2e]"
          required
        />
        <span>
          I agree to be contacted by Eden ABA Therapy about insurance
          verification and services.
        </span>
      </label>

      {touched && error && (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-black text-red-700">
          {error}
        </p>
      )}

      <Button type="submit" disabled={!complete || loading} className="mt-6 w-full">
        {loading ? "Submitting your insurance request..." : "Submit Insurance Request"}
      </Button>
    </form>
  );
}

export default InsuranceVerificationForm;
