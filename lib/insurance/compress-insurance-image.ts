export const INSURANCE_IMAGE_COMPRESS_THRESHOLD_BYTES = 2 * 1024 * 1024;
export const INSURANCE_IMAGE_MAX_DIMENSION_PX = 1600;
export const INSURANCE_IMAGE_COMPRESS_QUALITY = 0.78;
export const INSURANCE_IMAGE_COMPRESS_QUALITY_FALLBACK = 0.75;
export const INSURANCE_IMAGE_FALLBACK_MAX_DIMENSION_PX = 1200;

export const INSURANCE_DOCUMENT_OPTIMIZING_MESSAGE =
  "Optimizing image for secure upload...";
export const INSURANCE_DOCUMENT_OPTIMIZED_MESSAGE = "Image optimized successfully.";
export const INSURANCE_DOCUMENT_OPTIMIZE_FAILED_MESSAGE =
  "We could not optimize this image. Please choose a smaller file.";
export const INSURANCE_DOCUMENT_STILL_TOO_LARGE_MESSAGE =
  "This file is still too large after optimization. Please upload a smaller image or PDF.";

const COMPRESSIBLE_MIME = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export function isCompressibleInsuranceImage(file: File): boolean {
  const mime = (file.type || "").toLowerCase();
  if (COMPRESSIBLE_MIME.has(mime)) {
    return true;
  }

  const name = file.name.toLowerCase();
  return (
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".png") ||
    name.endsWith(".webp")
  );
}

export function scaleImageDimensions(
  width: number,
  height: number,
  maxDimension: number,
): { width: number; height: number } {
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }

  if (width >= height) {
    const nextWidth = maxDimension;
    return {
      width: nextWidth,
      height: Math.max(1, Math.round((height / width) * nextWidth)),
    };
  }

  const nextHeight = maxDimension;
  return {
    width: Math.max(1, Math.round((width / height) * nextHeight)),
    height: nextHeight,
  };
}

export function buildOptimizedInsuranceImageName(originalName: string, mimeType: string): string {
  const trimmed = String(originalName || "document").trim() || "document";
  const lower = trimmed.toLowerCase();
  const ext =
    mimeType === "image/png"
      ? ".png"
      : mimeType === "image/webp"
        ? ".webp"
        : ".jpg";

  if (lower.endsWith("-optimized.jpg") || lower.endsWith("-optimized.jpeg") || lower.endsWith("-optimized.png")) {
    return trimmed;
  }

  const withoutExt = trimmed.replace(/\.[^.]+$/, "");
  return `${withoutExt}-optimized${ext}`;
}

function resolveOutputMimeType(file: File): string {
  const mime = (file.type || "").toLowerCase();
  if (mime === "image/png") {
    return "image/jpeg";
  }
  if (mime === "image/webp") {
    return "image/jpeg";
  }
  if (mime === "image/jpeg" || mime === "image/jpg") {
    return "image/jpeg";
  }

  const name = file.name.toLowerCase();
  if (name.endsWith(".png") || name.endsWith(".webp")) {
    return "image/jpeg";
  }

  return "image/jpeg";
}

async function loadImageElement(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Unable to read image."));
      image.src = url;
    });
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function renderCompressedBlob(
  file: File,
  maxDimension: number,
  quality: number,
): Promise<Blob> {
  const image = await loadImageElement(file);
  const { width, height } = scaleImageDimensions(image.naturalWidth, image.naturalHeight, maxDimension);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Canvas is not available.");
  }

  context.drawImage(image, 0, 0, width, height);

  const outputMime = resolveOutputMimeType(file);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Compression failed."));
          return;
        }
        resolve(result);
      },
      outputMime,
      quality,
    );
  });

  return blob;
}

export type CompressInsuranceImageResult = {
  file: File;
  compressed: boolean;
};

export async function compressInsuranceImageIfNeeded(
  file: File,
  maxBytes: number,
): Promise<CompressInsuranceImageResult> {
  if (!isCompressibleInsuranceImage(file)) {
    return { file, compressed: false };
  }

  if (file.size <= INSURANCE_IMAGE_COMPRESS_THRESHOLD_BYTES) {
    return { file, compressed: false };
  }

  let blob = await renderCompressedBlob(
    file,
    INSURANCE_IMAGE_MAX_DIMENSION_PX,
    INSURANCE_IMAGE_COMPRESS_QUALITY,
  );

  if (blob.size > maxBytes) {
    blob = await renderCompressedBlob(
      file,
      INSURANCE_IMAGE_FALLBACK_MAX_DIMENSION_PX,
      INSURANCE_IMAGE_COMPRESS_QUALITY_FALLBACK,
    );
  }

  if (blob.size > maxBytes) {
    throw new Error(INSURANCE_DOCUMENT_STILL_TOO_LARGE_MESSAGE);
  }

  const outputMime = blob.type || resolveOutputMimeType(file);
  const optimizedFile = new File([blob], buildOptimizedInsuranceImageName(file.name, outputMime), {
    type: outputMime,
    lastModified: Date.now(),
  });

  return { file: optimizedFile, compressed: true };
}
