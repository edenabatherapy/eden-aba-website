"use client";

import { motion } from "framer-motion";
import { Check, CreditCard, FileUp, UploadCloud, UserRound } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { SITE_IMAGES } from "@/lib/site-images";

const inputClass =
  "w-full rounded-xl border border-[#cfd8d3] bg-[#fafcfb] px-4 py-3.5 text-sm font-medium text-[#111827] outline-none transition duration-200 focus:border-[#0E6B4F] focus:bg-white focus:ring-[3px] focus:ring-[#0E6B4F]/10 field-invalid:border-red-500 field-invalid:ring-red-100";

/**
 * @param {{
 *   field: import("@/lib/intake/step-config").FieldDef,
 *   value: unknown,
 *   onChange: (name: string, value: unknown) => void,
 *   fileMeta?: { name?: string },
 *   useCardSelect?: boolean,
 *   uploadVariant?: "default" | "card" | "insurance",
 *   animDelay?: number,
 * }} props
 */
export default function IntakeField({
  field,
  value,
  onChange,
  fileMeta,
  useCardSelect = false,
  uploadVariant = "default",
  animDelay = 0,
  selectOptionLabel = "Select option",
}) {
  const label = (
    <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold text-[#06461f]">
      {field.label}
      {field.required ? " *" : ""}
    </label>
  );

  const wrap = (children) => (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: animDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );

  if (field.type === "note") {
    return wrap(
      <div className="sm:col-span-2 xl:col-span-3 rounded-xl border border-[#b9dfc1] bg-gradient-to-r from-[#f1faf3] to-white p-4 text-sm font-semibold leading-7 text-[#075d21]">
        {field.note || field.label}
      </div>
    );
  }

  if (field.type === "select") {
    return wrap(
      <div>
        {label}
        <select
          id={field.name}
          name={field.name}
          required={field.required}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        >
          <option value="">{selectOptionLabel}</option>
          {(field.options || []).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "textarea") {
    return wrap(
      <div className="sm:col-span-2 xl:col-span-3">
        {label}
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${inputClass} min-h-[88px] resize-y`}
        />
      </div>
    );
  }

  if (field.type === "radio") {
    if (useCardSelect) {
      return wrap(
        <div className="sm:col-span-2 xl:col-span-3">
          <div className="mb-3 text-sm font-extrabold text-[#06461f]">
            {field.label}
            {field.required ? " *" : ""}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(field.options || []).map((opt) => {
              const selected = value === opt;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onChange(field.name, opt)}
                  className={`rounded-2xl border-2 px-4 py-4 text-left text-sm font-bold transition-shadow ${
                    selected
                      ? "border-[#08751f] bg-gradient-to-br from-[#edf7ef] to-white text-[#06461f] shadow-md ring-2 ring-[#b8ddbf]/50"
                      : "border-[#dfe8e2] bg-white text-[#243142] shadow-sm hover:border-[#9bd0a2] hover:shadow-md"
                  }`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span>{opt}</span>
                    {selected && (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#08751f] text-white">
                        <Check size={14} />
                      </span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <input type="text" name={field.name} value={String(value ?? "")} readOnly tabIndex={-1} aria-hidden="true" className="sr-only" />
        </div>
      );
    }

    return wrap(
      <div className="sm:col-span-2 xl:col-span-3">
        <div className="mb-3 text-sm font-extrabold text-[#06461f]">
          {field.label}
          {field.required ? " *" : ""}
        </div>
        <div className="flex flex-wrap gap-3">
          {(field.options || []).map((opt) => (
            <label
              key={opt}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                value === opt
                  ? "border-[#08751f] bg-[#edf7ef] text-[#06461f]"
                  : "border-[#dfe8e2] bg-white text-[#374151] hover:border-[#9bd0a2]"
              }`}
            >
              <input
                type="radio"
                name={field.name}
                value={opt}
                required={field.required}
                checked={value === opt}
                onChange={() => onChange(field.name, opt)}
                className="accent-[#0E6B4F]"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "checkbox-group") {
    const selected = Array.isArray(value) ? value : [];

    if (useCardSelect) {
      return wrap(
        <div className="sm:col-span-2 xl:col-span-3">
          <div className="mb-3 text-sm font-extrabold text-[#06461f]">
            {field.label}
            {field.required ? " *" : ""}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(field.options || []).map((opt) => {
              const checked = selected.includes(opt);
              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const next = checked ? selected.filter((v) => v !== opt) : [...selected, opt];
                    onChange(field.name, next);
                  }}
                  className={`rounded-2xl border-2 px-4 py-3.5 text-left text-sm font-bold transition-shadow ${
                    checked
                      ? "border-[#08751f] bg-gradient-to-br from-[#edf7ef] to-white text-[#06461f] shadow-md"
                      : "border-[#dfe8e2] bg-white text-[#243142] shadow-sm hover:border-[#9bd0a2] hover:shadow-md"
                  }`}
                >
                  <span className="flex items-start justify-between gap-2">
                    <span>{opt}</span>
                    {checked && (
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#08751f] text-white">
                        <Check size={14} />
                      </span>
                    )}
                  </span>
                </motion.button>
              );
            })}
          </div>
          <input
            type="text"
            name={field.name}
            value={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
            readOnly
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
          />
        </div>
      );
    }

    return wrap(
      <div className="sm:col-span-2 xl:col-span-3">
        <div className="mb-3 text-sm font-extrabold text-[#06461f]">
          {field.label}
          {field.required ? " *" : ""}
        </div>
        <div className="flex flex-wrap gap-3">
          {(field.options || []).map((opt) => (
            <label
              key={opt}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
                selected.includes(opt)
                  ? "border-[#08751f] bg-[#edf7ef] text-[#06461f]"
                  : "border-[#dfe8e2] bg-white text-[#374151] hover:border-[#9bd0a2]"
              }`}
            >
              <input
                type="checkbox"
                name={field.name}
                value={opt}
                checked={selected.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked ? [...selected, opt] : selected.filter((v) => v !== opt);
                  onChange(field.name, next);
                }}
                className="accent-[#0E6B4F]"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "file") {
    const hasFile = Boolean(fileMeta?.name);

    if (uploadVariant === "insurance") {
      return wrap(
        <div className="sm:col-span-2 xl:col-span-3 overflow-hidden rounded-[1.5rem] border border-[#dfe8e2] bg-gradient-to-br from-white to-[#f6fbf7] p-5 shadow-md">
          <div className="grid gap-5 lg:grid-cols-[1fr_180px] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#fff8df] text-[#ff8a1f]">
                  <CreditCard size={22} />
                </span>
                <div>
                  <b className="block text-base font-black text-[#06461f]">{field.label}</b>
                  <p className="text-xs font-semibold text-[#667085]">Upload front and back when available</p>
                </div>
              </div>
              <FileDropZone field={field} onChange={onChange} fileMeta={fileMeta} hasFile={hasFile} className="mt-4" />
            </div>
            <div className="hidden overflow-hidden rounded-2xl shadow-md ring-1 ring-[#dfe8e2] lg:block">
              {/* TODO: Replace with insurance card illustration if desired. */}
              <img
                src={SITE_IMAGES.insurance.priorAuth}
                alt=""
                aria-hidden
                className="h-32 w-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      );
    }

    if (uploadVariant === "card") {
      return wrap(
        <motion.div
          whileHover={{ y: -3 }}
          className={`group rounded-[1.35rem] border-2 bg-white p-4 text-center shadow-sm transition-shadow ${
            hasFile ? "border-[#08751f] shadow-md ring-2 ring-[#b8ddbf]/40" : "border-[#dfe8e2] hover:border-[#9bd0a2] hover:shadow-lg"
          }`}
        >
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#eef7f0] text-[#08751f] transition group-hover:scale-105">
            {hasFile ? <Check size={22} /> : <FileUp size={22} />}
          </span>
          <b className="mt-3 block text-sm font-extrabold leading-snug text-[#06461f]">{field.label}</b>
          <FileDropZone field={field} onChange={onChange} fileMeta={fileMeta} hasFile={hasFile} compact className="mt-3" />
        </motion.div>
      );
    }

    return wrap(
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-4 text-center shadow-sm">
        <b className="block text-sm font-extrabold text-[#06461f]">{field.label}</b>
        <FileDropZone field={field} onChange={onChange} fileMeta={fileMeta} hasFile={hasFile} className="mt-3" />
      </div>
    );
  }

  const showProfileIcon = ["childFullName", "guardianName", "email", "phone"].includes(field.name);

  return wrap(
    <div>
      {label}
      <div className="relative">
        {showProfileIcon && (
          <UserRound size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#128c8c]/70" />
        )}
        <input
          id={field.name}
          name={field.name}
          type={field.type === "email" || field.type === "tel" || field.type === "date" ? field.type : "text"}
          required={field.required}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${inputClass}${showProfileIcon ? " pl-10" : ""}`}
        />
      </div>
    </div>
  );
}

function FileDropZone({ field, onChange, fileMeta, hasFile, compact = false, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-dashed transition ${hasFile ? "border-[#08751f] bg-[#f1faf3]" : "border-[#9bd0a2] bg-[#fbfefc] hover:border-[#08751f] hover:bg-[#f6fbf7]"} ${compact ? "p-3" : "p-4"} ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        {!compact && !hasFile && <EdenLogo size="intakePanel" className="opacity-80" />}
        {!compact && <UploadCloud size={22} className={hasFile ? "text-[#08751f]" : "text-[#128c8c]"} />}
        <input
          id={field.name}
          name={field.name}
          type="file"
          accept={field.accept}
          onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
          className="w-full text-xs file:mr-2 file:rounded-full file:border-0 file:bg-[#0E6B4F] file:px-4 file:py-2 file:text-xs file:font-bold file:text-white hover:file:bg-[#08751f]"
        />
        <p className="text-[11px] font-medium text-[#667085]">PDF, JPG, PNG — max 10MB</p>
        {fileMeta?.name && (
          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-[#08751f]"
          >
            ✓ {fileMeta.name}
          </motion.p>
        )}
      </div>
    </div>
  );
}
