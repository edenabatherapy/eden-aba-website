import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

const ref = process.argv[2] || "e2ac0b2b-bdd8-451a-8a40-85264b0ae88b";
const { getVerificationRecord } = await import("../lib/insurance/db/repository.ts");
const { normalizeDOB, formatDOBForDisplay } = await import("../lib/insurance/dates.ts");
const { normalizeLast4 } = await import("../lib/insurance/portal/normalizeLast4.ts");
const { decryptPhiField } = await import("../lib/insurance/encryptField.ts");
const { identifierMatches, contactMatches } = await import(
  "../lib/insurance/portal/verifyIdentity.ts"
);

const record = await getVerificationRecord(ref);
if (!record) {
  console.log(JSON.stringify({ error: "record_not_found" }));
  process.exit(1);
}

const medicaidPlain = decryptPhiField(record.medicaidIdEncrypted || "");
const expectedLast4 = medicaidPlain ? normalizeLast4(medicaidPlain) : null;

const testCases = [
  { label: "demo_dob_wrong", dob: "01/01/1900", last4: "C123", contact: record.email },
  { label: "correct_dob", dob: formatDOBForDisplay(record.dateOfBirth), last4: expectedLast4, contact: record.email },
  { label: "correct_phone", dob: formatDOBForDisplay(record.dateOfBirth), last4: expectedLast4, contact: record.phone },
];

const results = testCases.map((tc) => {
  const normalizedDob = normalizeDOB(tc.dob);
  return {
    label: tc.label,
    dobMatches: record.dateOfBirth === normalizedDob,
    last4Matches: expectedLast4 ? identifierMatches(record, tc.last4 || "") : false,
    contactMatches: contactMatches(record, tc.contact),
    normalizedDobOk: Boolean(normalizedDob),
  };
});

console.log(
  JSON.stringify(
    {
      ref,
      storedDob: record.dateOfBirth,
      expectedDobInput: formatDOBForDisplay(record.dateOfBirth),
      medicaidIdEncryptedExists: Boolean(record.medicaidIdEncrypted),
      medicaidDecryptOk: Boolean(medicaidPlain),
      last4CharTypes: expectedLast4
        ? { hasLetter: /[A-Z]/i.test(expectedLast4), hasDigit: /\d/.test(expectedLast4) }
        : null,
      testCases: results,
    },
    null,
    2,
  ),
);
