"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  compressInsuranceImageIfNeeded,
  INSURANCE_DOCUMENT_OPTIMIZED_MESSAGE,
  INSURANCE_DOCUMENT_OPTIMIZE_FAILED_MESSAGE,
  INSURANCE_DOCUMENT_OPTIMIZING_MESSAGE,
  isCompressibleInsuranceImage,
} from "@/lib/insurance/compress-insurance-image";
import {
  INSURANCE_DOCUMENT_ACCEPT,
  INSURANCE_DOCUMENT_MAX_BYTES,
  INSURANCE_DOCUMENT_TOO_LARGE_ERROR,
  isImageInsuranceDocument,
  validateInsuranceDocumentClient,
  validateInsuranceDocumentTypeClient,
} from "@/lib/insurance/insurance-document-fields";

type InsuranceDocumentUploadFieldProps = {
  label: string;
  required?: boolean;
  file: File | null;
  onFileChange: (file: File | null) => void;
  error?: string;
  optionalLabel?: string;
};

export function InsuranceDocumentUploadField({
  label,
  required = false,
  file,
  onFileChange,
  error,
  optionalLabel = "(optional)",
}: InsuranceDocumentUploadFieldProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!file || !isImageInsuranceDocument(file)) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function handleIncomingFile(nextFile: File | null) {
    setStatusMessage(null);

    if (!nextFile) {
      onFileChange(null);
      return;
    }

    const typeValidationError = validateInsuranceDocumentTypeClient(nextFile);
    if (typeValidationError) {
      onFileChange(null);
      setStatusMessage(typeValidationError);
      return;
    }

    if (!isCompressibleInsuranceImage(nextFile)) {
      const pdfValidationError = validateInsuranceDocumentClient(nextFile);
      if (pdfValidationError) {
        onFileChange(null);
        setStatusMessage(pdfValidationError);
        return;
      }
      onFileChange(nextFile);
      return;
    }

    setProcessing(true);
    setStatusMessage(INSURANCE_DOCUMENT_OPTIMIZING_MESSAGE);

    try {
      const { file: preparedFile, compressed } = await compressInsuranceImageIfNeeded(
        nextFile,
        INSURANCE_DOCUMENT_MAX_BYTES,
      );
      const validationError = validateInsuranceDocumentClient(preparedFile);
      if (validationError) {
        onFileChange(null);
        setStatusMessage(validationError);
        return;
      }

      onFileChange(preparedFile);
      if (compressed) {
        setStatusMessage(INSURANCE_DOCUMENT_OPTIMIZED_MESSAGE);
      } else {
        setStatusMessage(null);
      }
    } catch (error) {
      onFileChange(null);
      setStatusMessage(
        error instanceof Error && error.message === INSURANCE_DOCUMENT_TOO_LARGE_ERROR
          ? error.message
          : INSURANCE_DOCUMENT_OPTIMIZE_FAILED_MESSAGE,
      );
    } finally {
      setProcessing(false);
    }
  }

  function handleReplace() {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.click();
    }
  }

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-black text-slate-700">
        {label}
        {required ? (
          <span className="text-red-600"> *</span>
        ) : (
          <span className="font-semibold text-slate-500"> {optionalLabel}</span>
        )}
      </label>
      <p className="mt-1 text-xs font-semibold text-slate-500">JPG, PNG, or PDF — max 3 MB each</p>

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={INSURANCE_DOCUMENT_ACCEPT}
        className="sr-only"
        disabled={processing}
        onChange={(event) => {
          const selected = event.target.files?.[0] ?? null;
          void handleIncomingFile(selected);
        }}
      />

      {!file ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={processing}
          className="mt-2 inline-flex items-center rounded-2xl border border-[#49b8c8]/25 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm hover:bg-[#ddf4f4]/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {processing ? "Processing..." : "Choose file"}
        </button>
      ) : (
        <div className="mt-2 rounded-2xl border border-[#49b8c8]/25 bg-[#ddf4f4]/30 p-4">
          <div className="flex items-start gap-3">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt={`${label} preview`}
                className="h-16 w-16 shrink-0 rounded border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded border border-gray-200 bg-white text-xs font-semibold text-gray-600">
                PDF
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleReplace}
                  disabled={processing}
                  className="text-sm font-medium text-primary hover:underline disabled:opacity-60"
                >
                  Replace
                </button>
                <button
                  type="button"
                  disabled={processing}
                  onClick={() => {
                    void handleIncomingFile(null);
                    if (inputRef.current) inputRef.current.value = "";
                  }}
                  className="text-sm font-medium text-gray-600 hover:underline disabled:opacity-60"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {processing && statusMessage ? (
        <p className="mt-1 text-sm font-semibold text-[#128c8c]">{statusMessage}</p>
      ) : null}
      {!processing && statusMessage && !error ? (
        <p
          className={`mt-1 text-sm font-semibold ${
            statusMessage === INSURANCE_DOCUMENT_OPTIMIZED_MESSAGE
              ? "text-[#1f7a2e]"
              : statusMessage === INSURANCE_DOCUMENT_TOO_LARGE_ERROR ||
                  statusMessage === INSURANCE_DOCUMENT_OPTIMIZE_FAILED_MESSAGE
                ? "text-red-600"
                : "text-slate-600"
          }`}
        >
          {statusMessage}
        </p>
      ) : null}
      {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
