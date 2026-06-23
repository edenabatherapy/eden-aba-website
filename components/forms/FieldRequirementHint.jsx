import { OPTIONAL_LABEL, REQUIRED_LABEL } from "@/lib/intake/required-fields";

/**
 * @param {{ required?: boolean, error?: string, className?: string }} props
 */
export default function FieldRequirementHint({ required = false, error = "", className = "" }) {
  return (
    <div className={className}>
      <p className={`text-xs font-semibold ${required ? "text-red-600" : "text-[#667085]"}`}>
        {required ? REQUIRED_LABEL : OPTIONAL_LABEL}
      </p>
      {error ? (
        <p className="mt-1 text-xs font-semibold text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
