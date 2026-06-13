import { NextResponse } from "next/server";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";
import { logPortalAudit } from "@/lib/insurance/portal/auditLog";
import {
  checkPortalVerifyRateLimit,
  getClientIp,
  isPortalVerifyLocked,
  recordPortalVerifyFailure,
  resetPortalVerifyFailures,
} from "@/lib/insurance/portal/rateLimit";
import {
  createPortalSessionToken,
  getPortalSessionMaxAgeSeconds,
  portalSessionCookieOptions,
} from "@/lib/insurance/portal/session";
import { PORTAL_VERIFY_FAILURE_MESSAGE } from "@/lib/insurance/portal/messages";
import { resolvePortalEligibility } from "@/lib/insurance/eligibility/liveEligibilityService";
import { findRecordForPortalVerification } from "@/lib/insurance/portal/verifyIdentity";

export const dynamic = "force-dynamic";

const LOCKED_FAILURE =
  "Too many attempts. Please wait and try again, or contact Eden ABA Therapy for help.";

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const timestamp = new Date().toISOString();

  const lock = isPortalVerifyLocked(clientIp);
  if (lock.locked) {
    await logPortalAudit({
      action: "portal_verify_locked",
      timestamp,
      clientIp,
      reason: "lockout_active",
    });
    return NextResponse.json(
      { error: LOCKED_FAILURE },
      {
        status: 429,
        headers: { "Retry-After": String(lock.retryAfterSeconds || 1800) },
      },
    );
  }

  const rate = checkPortalVerifyRateLimit(clientIp);
  if (!rate.allowed) {
    await logPortalAudit({
      action: "portal_verify_rate_limited",
      timestamp,
      clientIp,
      reason: "hourly_limit",
    });
    return NextResponse.json(
      { error: LOCKED_FAILURE },
      {
        status: 429,
        headers: rate.retryAfterSeconds
          ? { "Retry-After": String(rate.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  let body: {
    requestId?: string;
    dateOfBirth?: string;
    lastFour?: string;
    emailOrPhone?: string;
    recaptchaToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: PORTAL_VERIFY_FAILURE_MESSAGE }, { status: 400 });
  }

  const recaptcha = await verifyRecaptchaV2Token(body.recaptchaToken ?? null);
  if (recaptcha.ok === false) {
    return recaptchaV2FailureResponse(recaptcha);
  }

  const dateOfBirth = body.dateOfBirth?.trim() || "";
  const lastFour = body.lastFour?.trim() || "";
  const emailOrPhone = body.emailOrPhone?.trim() || "";
  const requestId = body.requestId?.trim();

  if (!dateOfBirth || !lastFour || !emailOrPhone) {
    recordPortalVerifyFailure(clientIp);
    if (process.env.NODE_ENV === "development") {
      console.log("Portal verify failed:", {
        dob: false,
        last4: false,
        contact: false,
        ref: Boolean(requestId),
      });
    }
    await logPortalAudit({
      action: "portal_verify_failed",
      timestamp,
      clientIp,
      requestId,
      reason: "missing_fields",
    });
    return NextResponse.json({ error: PORTAL_VERIFY_FAILURE_MESSAGE }, { status: 403 });
  }

  const lookup = await findRecordForPortalVerification({
    requestId,
    dateOfBirth,
    lastFour,
    emailOrPhone,
  });

  if (lookup.ok === false) {
    recordPortalVerifyFailure(clientIp);
    if (process.env.NODE_ENV === "development") {
      console.log("Portal verify failed:", {
        dob: lookup.matchFlags.dobMatches,
        last4: lookup.matchFlags.last4Matches,
        contact: lookup.matchFlags.contactMatches,
        ref: lookup.matchFlags.refMatches,
      });
    }
    await logPortalAudit({
      action: "portal_verify_failed",
      timestamp,
      clientIp,
      requestId,
      reason: lookup.failedFields.join(","),
    });
    return NextResponse.json({ error: PORTAL_VERIFY_FAILURE_MESSAGE }, { status: 403 });
  }

  resetPortalVerifyFailures(clientIp);

  const eligibility = await resolvePortalEligibility(lookup.record);

  if (process.env.NODE_ENV === "development") {
    console.log("Portal eligibility result", {
      live: eligibility.live,
      source: eligibility.source,
      status: eligibility.status,
      fallbackReason: eligibility.fallbackReason ?? null,
      requestId: lookup.record.id,
    });
  }

  await logPortalAudit({
    action: "portal_verify_success",
    timestamp,
    clientIp,
    requestId: lookup.record.id,
  });

  const token = createPortalSessionToken({
    requestId: lookup.record.id,
    email: lookup.record.email.trim().toLowerCase(),
  });
  const cookie = portalSessionCookieOptions(token);

  const response = NextResponse.json({
    ok: true,
    live: eligibility.live,
    source: eligibility.source,
    requestId: lookup.record.id,
    status: eligibility.status,
    statusLabel: eligibility.statusLabel,
    statusMessage: eligibility.statusMessage,
    checkedAt: eligibility.checkedAt,
    fallbackReason: eligibility.fallbackReason ?? null,
    redirectTo: `/insurance/portal/${lookup.record.id}`,
    sessionExpiresInSeconds: getPortalSessionMaxAgeSeconds(),
  });
  response.cookies.set(cookie);

  return response;
}
