import { checkRateLimit, getClientIp } from "@/lib/insurance/admin/rateLimit";

const DONATION_LIMIT = 10;
const DONATION_WINDOW_MS = 60 * 60 * 1000;

const APPLICATION_LIMIT = 5;
const APPLICATION_WINDOW_MS = 60 * 60 * 1000;

export function checkDonationRateLimit(request: Request) {
  const ip = getClientIp(request);
  return checkRateLimit(`fp-donation:${ip}`, DONATION_LIMIT, DONATION_WINDOW_MS);
}

export function checkApplicationRateLimit(request: Request) {
  const ip = getClientIp(request);
  return checkRateLimit(`fp-application:${ip}`, APPLICATION_LIMIT, APPLICATION_WINDOW_MS);
}

export function verifyCaptchaToken(token: string | undefined): boolean {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim() || process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) return true;
  return Boolean(token?.trim());
}
