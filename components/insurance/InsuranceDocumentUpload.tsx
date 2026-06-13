"use client";

import { useCallback, useRef, useState } from "react";
import { CheckCircle2, Loader2, Trash2, Upload } from "lucide-react";
import { formatFileSize } from "@/components/insurance/PortalSubmitSection";

type DocumentCategory = "insurance_card" | "medicaid_document" | "referral";

type PortalDocument = {
  id: string;
  category: string;
  safeName: string;
  size: number;
  uploadedAt: string;
};

type Props = {
  requestId: string;
  category: DocumentCategory;
  label: string;
  description?: string;
  existingDocuments?: PortalDocument[];
  onChange?: () => void;
  disabled?: boolean;
};

const ACCEPT = ".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf";

export default function InsuranceDocumentUpload({
  requestId,
  category,
  label,
  description,
  existingDocuments = [],
  onChange,
  disabled = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const categoryDocs = existingDocuments.filter((doc) => doc.category === category);
  const latestDoc = categoryDocs[categoryDocs.length - 1];

  const uploadFile = useCallback(
    async (file: File, replace = false) => {
      setError("");
      setBusy(true);
      setProgress(5);

      const formData = new FormData();
      formData.append("category", category);
      formData.append("file", file);
      if (replace) formData.append("replace", "true");

      try {
        setProgress(35);
        const response = await fetch(`/api/insurance/portal/${requestId}/documents`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        setProgress(85);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Upload failed.");
        }

        setProgress(100);
        onChange?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
        setProgress(null);
      } finally {
        setBusy(false);
        setTimeout(() => setProgress(null), 1200);
      }
    },
    [category, onChange, requestId],
  );

  const removeDocument = async (documentId: string) => {
    setError("");
    setBusy(true);
    try {
      const response = await fetch(
        `/api/insurance/portal/${requestId}/documents?documentId=${encodeURIComponent(documentId)}`,
        { method: "DELETE", credentials: "include" },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Unable to remove file.");
      }
      onChange?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to remove file.");
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = (files: FileList | null, replace = false) => {
    const file = files?.[0];
    if (file) void uploadFile(file, replace);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <p className="text-sm font-extrabold text-slate-900">{label}</p>
      {description ? (
        <p className="mt-1 text-xs font-semibold leading-5 text-slate-500 sm:text-sm">
          {description}
        </p>
      ) : null}

      {latestDoc ? (
        <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-extrabold text-white">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Uploaded successfully
              </div>
              <p className="mt-2 truncate text-sm font-bold text-slate-900">{latestDoc.safeName}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {formatFileSize(latestDoc.size)} ·{" "}
                {new Date(latestDoc.uploadedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <button
                type="button"
                disabled={busy || disabled}
                onClick={() => inputRef.current?.click()}
                className="rounded-full border border-[#128c8c] px-4 py-2 text-xs font-extrabold text-[#128c8c] disabled:opacity-50"
              >
                Replace
              </button>
              <button
                type="button"
                disabled={busy || disabled}
                onClick={() => void removeDocument(latestDoc.id)}
                className="inline-flex items-center gap-1 rounded-full border border-red-200 px-4 py-2 text-xs font-extrabold text-red-700 disabled:opacity-50"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                Remove
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!latestDoc || busy ? (
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(event) => {
            if (!disabled && (event.key === "Enter" || event.key === " ")) {
              inputRef.current?.click();
            }
          }}
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={(event) => {
            if (disabled) return;
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            if (disabled) return;
            event.preventDefault();
            setDragging(false);
            handleFiles(event.dataTransfer.files, Boolean(latestDoc));
          }}
          className={`mt-3 flex min-h-[120px] flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition sm:min-h-[140px] ${
            disabled
              ? "cursor-not-allowed border-slate-100 bg-slate-50 opacity-60"
              : dragging
                ? "cursor-pointer border-[#128c8c] bg-[#ddf4f4]/50"
                : "cursor-pointer border-slate-200 bg-slate-50 hover:border-[#49b8c8]/50"
          }`}
        >
          {busy && progress !== null ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-[#128c8c]" aria-hidden />
              <p className="mt-2 text-sm font-bold text-slate-700">Uploading securely…</p>
            </>
          ) : (
            <>
              <Upload className="h-8 w-8 text-[#128c8c]" aria-hidden />
              <p className="mt-2 text-sm font-bold text-slate-700">
                Drag & drop or tap to upload
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                JPG, PNG, or PDF · Max 10MB
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            className="hidden"
            disabled={disabled || busy}
            onChange={(event) => {
              handleFiles(event.target.files, Boolean(latestDoc));
              event.target.value = "";
            }}
          />
        </div>
      ) : null}

      {progress !== null && latestDoc ? (
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-[#128c8c] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : null}

      {error ? (
        <p className="mt-2 text-xs font-bold text-red-600 sm:text-sm">{error}</p>
      ) : null}
    </div>
  );
}
