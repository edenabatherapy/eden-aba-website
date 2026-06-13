import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "eden_insurance_portal";

function getPortalSessionTtlSeconds(): number {
  const configured = Number(process.env.INSURANCE_PORTAL_SESSION_TTL_SECONDS);
  if (Number.isFinite(configured) && configured > 0) {
    return configured;
  }
  return 2 * 60 * 60;
}

function getPortalSecret(): string {
  const secret =
    process.env.INSURANCE_PORTAL_SESSION_SECRET?.trim() ||
    process.env.INSURANCE_STAFF_ADMIN_TOKEN?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim();
  if (!secret) {
    throw new Error("Portal session secret not configured.");
  }
  return secret;
}

function signPayload(payload: string): string {
  return createHmac("sha256", getPortalSecret()).update(payload).digest("hex");
}

export type PortalSession = {
  requestId: string;
  email: string;
  expiresAt: number;
};

export function createPortalSessionToken(session: Omit<PortalSession, "expiresAt">): string {
  const expiresAt = Date.now() + getPortalSessionTtlSeconds() * 1000;
  const payload = `${session.requestId}|${session.email.toLowerCase()}|${expiresAt}`;
  const signature = signPayload(payload);
  return Buffer.from(`${payload}|${signature}`).toString("base64url");
}

export function parsePortalSessionToken(token: string): PortalSession | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const parts = decoded.split("|");
    if (parts.length !== 4) return null;

    const [requestId, email, expiresAtRaw, signature] = parts;
    const payload = `${requestId}|${email}|${expiresAtRaw}`;
    const expected = signPayload(payload);

    const sigBuf = Buffer.from(signature, "hex");
    const expectedBuf = Buffer.from(expected, "hex");
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const expiresAt = Number(expiresAtRaw);
    if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
      return null;
    }

    return { requestId, email, expiresAt };
  } catch {
    return null;
  }
}

export async function getPortalSessionFromCookies(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return parsePortalSessionToken(token);
}

export function portalSessionCookieOptions(token: string) {
  const maxAge = getPortalSessionTtlSeconds();
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export function getPortalSessionMaxAgeSeconds(): number {
  return getPortalSessionTtlSeconds();
}
