"use client";

const inputClass =
  "w-full rounded-lg border border-[#cfd8d3] bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[#0E6B4F] focus:ring-[3px] focus:ring-[#0E6B4F]/10 field-invalid:border-red-500 field-invalid:ring-red-100";

/**
 * @param {{
 *   field: import("@/lib/intake/step-config").FieldDef,
 *   value: unknown,
 *   onChange: (name: string, value: unknown) => void,
 *   fileMeta?: { name?: string },
 * }} props
 */
export default function IntakeField({ field, value, onChange, fileMeta }) {
  const label = (
    <label htmlFor={field.name} className="mb-2 block text-sm font-extrabold text-[#111827]">
      {field.label}
      {field.required ? " *" : ""}
    </label>
  );

  if (field.type === "note") {
    return (
      <div className="md:col-span-2 rounded-lg border border-[#b9dfc1] bg-[#f1faf3] p-3 text-sm font-semibold text-[#075d21]">
        {field.note || field.label}
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={field.cols === 3 ? "" : ""}>
        {label}
        <select
          id={field.name}
          name={field.name}
          required={field.required}
          value={String(value ?? "")}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={inputClass}
        >
          <option value="">Select option</option>
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
    return (
      <div className="md:col-span-2">
        {label}
        <textarea
          id={field.name}
          name={field.name}
          required={field.required}
          value={String(value ?? "")}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${inputClass} min-h-[72px] resize-y`}
        />
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className="md:col-span-2">
        <div className="mb-2 text-sm font-extrabold text-[#111827]">
          {field.label}
          {field.required ? " *" : ""}
        </div>
        <div className="flex flex-wrap gap-4">
          {(field.options || []).map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2 text-sm">
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
    return (
      <div className="md:col-span-2">
        <div className="mb-2 text-sm font-extrabold text-[#111827]">
          {field.label}
          {field.required ? " *" : ""}
        </div>
        <div className="flex flex-wrap gap-4">
          {(field.options || []).map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name={field.name}
                value={opt}
                checked={selected.includes(opt)}
                onChange={(e) => {
                  const next = e.target.checked
                    ? [...selected, opt]
                    : selected.filter((v) => v !== opt);
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
    return (
      <div className="rounded-2xl border border-[#dfe8e2] bg-white p-4 text-center">
        <b className="block text-sm font-extrabold text-[#06461f]">{field.label}</b>
        <div className="mt-3 rounded-lg border border-dashed border-[#9bd0a2] bg-[#fbfefc] p-4">
          <input
            id={field.name}
            name={field.name}
            type="file"
            accept={field.accept}
            onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
            className="w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#0E6B4F] file:px-4 file:py-2 file:font-bold file:text-white"
          />
          <p className="mt-2 text-xs text-[#667085]">PDF, JPG, PNG — max 10MB. Selected locally; upload on submit requires backend integration.</p>
          {fileMeta?.name && (
            <p className="mt-2 text-xs font-bold text-[#0E6B4F]">Selected: {fileMeta.name}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        id={field.name}
        name={field.name}
        type={field.type === "email" || field.type === "tel" || field.type === "date" ? field.type : "text"}
        required={field.required}
        value={String(value ?? "")}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={inputClass}
      />
    </div>
  );
}
