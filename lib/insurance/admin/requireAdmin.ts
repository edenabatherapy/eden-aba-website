import { NextResponse } from "next/server";
import { getInsuranceConfig, validateAdminToken } from "@/lib/insurance/config";
import { logAdminAudit } from "@/lib/insurance/admin/auditLog";
import { checkRateLimit, getClientIp } from "@/lib/insurance/admin/rateLimit";
import {
  createAdminSession,
  getSessionFromRequest,
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  verifyAdminSession,
} from "@/lib/insurance/admin/session";

const LOGIN_MAX_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const API_MAX_REQUESTS = 120;
const API_WINDOW_MS = 60 * 1000;

export type AdminAuthContext = {
  staffName: string;
  sessionId: string;
  clientIp: string;
};

export function staffUnauthorizedResponse(retryAfterSeconds?: number) {
  const headers: Record<string, string> = {};
  if (retryAfterSeconds) {
    headers["Retry-After"] = String(retryAfterSeconds);
  }
  return NextResponse.json({ error: "Unauthorized." }, { status: 401, headers });
}

export function staffRateLimitedResponse(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}

function verifyLegacyBearerToken(request: Request): boolean {
  const { staffAdminToken } = getInsuranceConfig();
  if (!staffAdminToken) return false;

  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice(7) === staffAdminToken;
  }

  return request.headers.get("x-staff-token") === staffAdminToken;
}

/**
 * Validates signed admin session cookie (preferred) or legacy bearer token.
 * Applies per-IP rate limiting on admin API routes.
 */
export async function requireAdminAuth(
  request: Request,
  options?: { skipRateLimit?: boolean },
): Promise<{ ok: true; context: AdminAuthContext } | { ok: false; response: NextResponse }> {
  const clientIp = getClientIp(request);

  if (!options?.skipRateLimit) {
    const apiLimit = checkRateLimit(`admin-api:${clientIp}`, API_MAX_REQUESTS, API_WINDOW_MS);
    if (!apiLimit.allowed) {
      return {
        ok: false,
        response: staffRateLimitedResponse(apiLimit.retryAfterSeconds || 60),
      };
    }
  }

  const session = getSessionFromRequest(request);
  if (session) {
    return {
      ok: true,
      context: {
        staffName: session.staffName,
        sessionId: session.jti,
        clientIp,
      },
    };
  }

  if (verifyLegacyBearerToken(request)) {
    return {
      ok: true,
      context: {
        staffName: "Legacy token",
        sessionId: "legacy-bearer",
        clientIp,
      },
    };
  }

  return { ok: false, response: staffUnauthorizedResponse() };
}

export function validateLoginAttempt(request: Request): {
  allowed: boolean;
  retryAfterSeconds?: number;
  clientIp: string;
} {
  const clientIp = getClientIp(request);
  const limit = checkRateLimit(`admin-login:${clientIp}`, LOGIN_MAX_ATTEMPTS, LOGIN_WINDOW_MS);
  return {
    allowed: limit.allowed,
    retryAfterSeconds: limit.retryAfterSeconds,
    clientIp,
  };
}

export function authenticateAdminCredentials(token: string): boolean {
  const { staffAdminToken } = getInsuranceConfig();
  const tokenCheck = validateAdminToken(staffAdminToken);
  if (!tokenCheck.valid) return false;
  return token === staffAdminToken;
}

export function createSessionResponse(staffName: string) {
  const { sessionTtlSeconds } = getInsuranceConfig();
  const sessionToken = createAdminSession(staffName);

  if (!sessionToken) {
    return NextResponse.json(
      { error: "Session could not be created. Encryption key is not configured." },
      { status: 500 },
    );
  }

  const payload = verifyAdminSession(sessionToken);
  const response = NextResponse.json({
    ok: true,
    staffName: payload?.staffName || staffName,
    expiresAt: payload ? new Date(payload.exp * 1000).toISOString() : null,
  });

  response.cookies.set(SESSION_COOKIE_NAME, sessionToken, sessionCookieOptions(sessionTtlSeconds));
  return response;
}

export function createLogoutResponse(staffName?: string) {
  const response = NextResponse.json({ ok: true, staffName: staffName || null });
  response.cookies.set(SESSION_COOKIE_NAME, "", {
    ...sessionCookieOptions(0),
    maxAge: 0,
  });
  return response;
}

/** @deprecated Use requireAdminAuth instead */
export function verifyStaffToken(request: Request): boolean {
  const session = getSessionFromRequest(request);
  if (session) return true;
  return verifyLegacyBearerToken(request);
}
