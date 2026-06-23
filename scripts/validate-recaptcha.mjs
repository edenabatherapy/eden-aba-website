#!/usr/bin/env node

/**
 * reCAPTCHA production validation checklist.
 * Run: node scripts/validate-recaptcha.mjs
 */

const checks = [
  {
    id: "site-key",
    label: "NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set",
    pass: Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()),
  },
  {
    id: "secret-key",
    label: "RECAPTCHA_SECRET_KEY is set (server-only)",
    pass: Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim()),
  },
  {
    id: "both-keys",
    label: "Both keys configured for production",
    pass:
      Boolean(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()) &&
      Boolean(process.env.RECAPTCHA_SECRET_KEY?.trim()),
  },
];

const manual = [
  "Widget loads on a protected form",
  "Token generated after checkbox completion",
  "Backend validation succeeds on submit",
  "Form rejects submission without token",
  "Expired token shows retry message",
  "Keyboard tab reaches reCAPTCHA iframe",
  "Mobile checkbox works",
  "Desktop checkbox works",
];

let failed = 0;

console.log("reCAPTCHA validation checklist\n");

for (const check of checks) {
  const mark = check.pass ? "✓" : "✗";
  if (!check.pass) failed += 1;
  console.log(`${mark} ${check.label}`);
}

console.log("\nManual checks (browser):\n");
for (const item of manual) {
  console.log(`• ${item}`);
}

if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim()) {
  console.log(
    "\nConfigure NEXT_PUBLIC_RECAPTCHA_SITE_KEY in .env.local (client widget).",
  );
}

if (!process.env.RECAPTCHA_SECRET_KEY?.trim()) {
  console.log("Configure RECAPTCHA_SECRET_KEY in .env.local (server verification).");
}

console.log(
  "\nReferenced in: lib/recaptcha/env.js, hooks/useReCaptchaV2.ts, components/security/ReCaptchaVerification.tsx, lib/recaptcha/verify-v2.ts",
);

process.exit(failed > 0 ? 1 : 0);
