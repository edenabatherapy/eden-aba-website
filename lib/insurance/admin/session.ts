import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { getInsuranceConfig } from "@/lib/insurance/config";

export const SESSION_COOKIE_NAME = "eden_insurance_session";

type SessionPayload = {
  staffName: string;
  exp: number;
  iat: number;
  jti: string;
};

function getSigningSecret(): string | null {
  const { encryptionKey } = getInsuranceConfig();
  return encryptionKey || null;
}

function signPayload(payloadB64: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

export function createAdminSession(staffName: string): string | null {
  const secret = getSigningSecret();
  if (!secret) return null;

  const { sessionTtlSeconds } = getInsuranceConfig();
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    staffName: staffName.trim() || "Staff",
    iat: now,
    exp: now + sessionTtlSeconds,
    jti: randomBytes(16).toString("hex"),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = signPayload(payloadB64, secret);
  return `${payloadB64}.${signature}`;
}

export function verifyAdminSession(token: string): SessionPayload | null {
  const secret = getSigningSecret();
  if (!secret || !token.includes(".")) return null;

  const [payloadB64, signature] = token.split(".");
  if (!payloadB64 || !signature) return null;

  const expected = signPayload(payloadB64, secret);
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function getSessionFromRequest(request: Request): SessionPayload | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE_NAME}=`));

  if (!match) return null;

  const value = decodeURIComponent(match.slice(SESSION_COOKIE_NAME.length + 1));
  return verifyAdminSession(value);
}

export function sessionCookieOptions(maxAgeSeconds: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
