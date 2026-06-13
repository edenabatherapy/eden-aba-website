type FailureBucket = {
  count: number;
  resetAt: number;
};

const failureBuckets = new Map<string, FailureBucket>();
const hourlyFailureBuckets = new Map<string, FailureBucket>();
const lockUntil = new Map<string, number>();

const isRelaxed =
  process.env.NODE_ENV === "development" ||
  process.env.INSURANCE_PORTAL_VERIFY_RELAXED === "true";

const MAX_ATTEMPTS = Number(
  process.env.INSURANCE_PORTAL_VERIFY_MAX_FAILURES || (isRelaxed ? 100 : 5),
);
const ATTEMPT_WINDOW_MS = Number(
  process.env.INSURANCE_PORTAL_VERIFY_WINDOW_MS || 15 * 60 * 1000,
);
const LOCK_DURATION_MS = Number(
  process.env.INSURANCE_PORTAL_VERIFY_LOCK_MS || (isRelaxed ? 0 : 30 * 60 * 1000),
);
const HOURLY_MAX = Number(
  process.env.INSURANCE_PORTAL_VERIFY_HOURLY_MAX || (isRelaxed ? 500 : 30),
);

function hourlyFailureKey(clientIp: string): string {
  return `hourly-fail:${clientIp}`;
}

function readBucket(
  store: Map<string, FailureBucket>,
  key: string,
  now: number,
): FailureBucket | null {
  const bucket = store.get(key);
  if (!bucket || now >= bucket.resetAt) {
    store.delete(key);
    return null;
  }
  return bucket;
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

export function isPortalVerifyLocked(clientIp: string): {
  locked: boolean;
  retryAfterSeconds?: number;
} {
  if (isRelaxed && LOCK_DURATION_MS <= 0) {
    return { locked: false };
  }

  const until = lockUntil.get(clientIp);
  if (!until) return { locked: false };

  const now = Date.now();
  if (now >= until) {
    lockUntil.delete(clientIp);
    return { locked: false };
  }

  return {
    locked: true,
    retryAfterSeconds: Math.ceil((until - now) / 1000),
  };
}

export function checkPortalVerifyRateLimit(clientIp: string): {
  allowed: boolean;
  retryAfterSeconds?: number;
} {
  const lock = isPortalVerifyLocked(clientIp);
  if (lock.locked) {
    return { allowed: false, retryAfterSeconds: lock.retryAfterSeconds };
  }

  const now = Date.now();
  const hourly = readBucket(hourlyFailureBuckets, hourlyFailureKey(clientIp), now);
  if (hourly && hourly.count >= HOURLY_MAX) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((hourly.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

export function recordPortalVerifyFailure(clientIp: string): void {
  const now = Date.now();

  const hourlyKey = hourlyFailureKey(clientIp);
  const hourly = readBucket(hourlyFailureBuckets, hourlyKey, now);
  if (!hourly) {
    hourlyFailureBuckets.set(hourlyKey, { count: 1, resetAt: now + 60 * 60 * 1000 });
  } else {
    hourly.count += 1;
  }

  const bucket = readBucket(failureBuckets, clientIp, now);
  if (!bucket) {
    failureBuckets.set(clientIp, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
    return;
  }

  bucket.count += 1;
  if (bucket.count >= MAX_ATTEMPTS && LOCK_DURATION_MS > 0) {
    lockUntil.set(clientIp, now + LOCK_DURATION_MS);
    failureBuckets.delete(clientIp);
  }
}

export function resetPortalVerifyFailures(clientIp: string): void {
  failureBuckets.delete(clientIp);
  hourlyFailureBuckets.delete(hourlyFailureKey(clientIp));
  lockUntil.delete(clientIp);
}

/** Clears lockout state for an IP — useful after restarting dev server logic or manual unlock. */
export function clearPortalVerifyLock(clientIp: string): void {
  resetPortalVerifyFailures(clientIp);
}
