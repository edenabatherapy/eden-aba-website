import type { InsuranceVerificationRecord } from "@/lib/insurance/db/model";
import { listVerificationRecordsRaw } from "@/lib/insurance/db/repository";

export type InsuranceMetrics = {
  totalRequests: number;
  pendingReviews: number;
  activeCoverage: number;
  unableToVerify: number;
  inactiveCoverage: number;
  averageReviewTimeHours: number | null;
  trendByDay: Array<{
    date: string;
    submitted: number;
    completed: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
  }>;
};

function averageReviewHours(records: InsuranceVerificationRecord[]): number | null {
  const completed = records.filter(
    (r) =>
      r.verifiedAt &&
      r.status !== "Pending Staff Review" &&
      r.submittedAt,
  );

  if (completed.length === 0) return null;

  const totalMs = completed.reduce((sum, record) => {
    const start = new Date(record.submittedAt).getTime();
    const end = new Date(record.verifiedAt!).getTime();
    return sum + Math.max(0, end - start);
  }, 0);

  return Math.round((totalMs / completed.length / (1000 * 60 * 60)) * 10) / 10;
}

function buildTrend(records: InsuranceVerificationRecord[], days = 14) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const buckets: Array<{ date: string; submitted: number; completed: number }> = [];

  for (let i = days - 1; i >= 0; i -= 1) {
    const day = new Date(today);
    day.setDate(day.getDate() - i);
    const key = day.toISOString().slice(0, 10);
    buckets.push({ date: key, submitted: 0, completed: 0 });
  }

  const bucketMap = new Map(buckets.map((b) => [b.date, b]));

  for (const record of records) {
    const submittedKey = record.submittedAt.slice(0, 10);
    const submittedBucket = bucketMap.get(submittedKey);
    if (submittedBucket) submittedBucket.submitted += 1;

    if (record.verifiedAt) {
      const verifiedKey = record.verifiedAt.slice(0, 10);
      const verifiedBucket = bucketMap.get(verifiedKey);
      if (verifiedBucket) verifiedBucket.completed += 1;
    }
  }

  return buckets;
}

export async function computeInsuranceMetrics(): Promise<InsuranceMetrics> {
  const records = await listVerificationRecordsRaw();

  const statusCounts = {
    "Pending Staff Review": 0,
    Active: 0,
    Inactive: 0,
    "Unable To Verify": 0,
  };

  for (const record of records) {
    statusCounts[record.status] += 1;
  }

  return {
    totalRequests: records.length,
    pendingReviews: statusCounts["Pending Staff Review"],
    activeCoverage: statusCounts.Active,
    unableToVerify: statusCounts["Unable To Verify"],
    inactiveCoverage: statusCounts.Inactive,
    averageReviewTimeHours: averageReviewHours(records),
    trendByDay: buildTrend(records),
    statusBreakdown: Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    })),
  };
}
