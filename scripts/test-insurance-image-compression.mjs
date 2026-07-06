import assert from "node:assert/strict";
import {
  buildOptimizedInsuranceImageName,
  isCompressibleInsuranceImage,
  scaleImageDimensions,
  INSURANCE_IMAGE_COMPRESS_THRESHOLD_BYTES,
} from "../lib/insurance/compress-insurance-image.ts";
import {
  INSURANCE_DOCUMENT_MAX_BYTES,
  INSURANCE_DOCUMENT_MAX_TOTAL_BYTES,
  INSURANCE_DOCUMENT_PDF_TOO_LARGE_ERROR,
  INSURANCE_DOCUMENT_TOO_LARGE_ERROR,
  validateInsuranceDocumentClient,
  validateInsuranceDocumentTypeClient,
  validateInsuranceDocumentsTotalClient,
  hasAtLeastOneInsuranceDocument,
  INSURANCE_DOCUMENT_MIN_UPLOAD_ERROR,
} from "../lib/insurance/insurance-document-fields.ts";

function sizedFile(name, type, size) {
  const file = new File([new Uint8Array([0])], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

assert.deepEqual(scaleImageDimensions(3200, 2400, 1600), { width: 1600, height: 1200 });
assert.deepEqual(scaleImageDimensions(800, 600, 1600), { width: 800, height: 600 });

assert.equal(isCompressibleInsuranceImage(sizedFile("card.jpg", "image/jpeg", 100)), true);
assert.equal(isCompressibleInsuranceImage(sizedFile("card.png", "image/png", 100)), true);
assert.equal(isCompressibleInsuranceImage(sizedFile("card.webp", "image/webp", 100)), true);
assert.equal(isCompressibleInsuranceImage(sizedFile("doc.pdf", "application/pdf", 100)), false);

assert.equal(
  buildOptimizedInsuranceImageName("insurance-front.jpg", "image/jpeg"),
  "insurance-front-optimized.jpg",
);

assert.equal(
  validateInsuranceDocumentTypeClient(sizedFile("big.jpg", "image/jpeg", 12 * 1024 * 1024)),
  null,
);

assert.equal(
  validateInsuranceDocumentClient(sizedFile("big.jpg", "image/jpeg", 12 * 1024 * 1024)),
  INSURANCE_DOCUMENT_TOO_LARGE_ERROR,
);

assert.equal(
  validateInsuranceDocumentClient(sizedFile("small.jpg", "image/jpeg", 500_000)),
  null,
);
assert.equal(500_000 <= INSURANCE_IMAGE_COMPRESS_THRESHOLD_BYTES, true);

assert.equal(
  validateInsuranceDocumentClient(sizedFile("big.pdf", "application/pdf", 4 * 1024 * 1024)),
  INSURANCE_DOCUMENT_PDF_TOO_LARGE_ERROR,
);

const oversizedTotal = {
  insurance_front: sizedFile("a.jpg", "image/jpeg", 2 * 1024 * 1024),
  insurance_back: sizedFile("b.jpg", "image/jpeg", 2.5 * 1024 * 1024),
};
assert.equal(validateInsuranceDocumentsTotalClient(oversizedTotal), INSURANCE_DOCUMENT_TOO_LARGE_ERROR);
assert.equal(
  validateInsuranceDocumentsTotalClient({
    insurance_front: sizedFile("a.jpg", "image/jpeg", 2 * 1024 * 1024),
  }),
  null,
);

assert.equal(hasAtLeastOneInsuranceDocument({}), false);
assert.equal(
  hasAtLeastOneInsuranceDocument({
    referral: sizedFile("ref.pdf", "application/pdf", 1000),
  }),
  true,
);

assert.equal(INSURANCE_DOCUMENT_MAX_BYTES, 3 * 1024 * 1024);
assert.equal(INSURANCE_DOCUMENT_MAX_TOTAL_BYTES, 4 * 1024 * 1024);
assert.ok(INSURANCE_DOCUMENT_MIN_UPLOAD_ERROR.includes("at least one document"));

console.log("test-insurance-image-compression: all assertions passed");
