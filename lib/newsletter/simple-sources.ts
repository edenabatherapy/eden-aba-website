/** Newsletter sources that use the simple name + email form without reCAPTCHA. */
export const SIMPLE_NEWSLETTER_SOURCES = new Set([
  "family-newsletter",
  "homepage-banner",
  "privacy-policy-newsletter",
  "admissions-newsletter",
]);

export function isSimpleNewsletterSource(source: string) {
  return SIMPLE_NEWSLETTER_SOURCES.has(source);
}
