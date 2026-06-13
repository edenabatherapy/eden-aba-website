import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { listVerificationRecords } from "@/lib/insurance/db/repository";

export async function GET(request: Request) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search")?.trim().toLowerCase();
  const sort = url.searchParams.get("sort") || "newest";

  let records = await listVerificationRecords();

  if (status && status !== "all") {
    records = records.filter((record) => record.status === status);
  }

  if (search) {
    records = records.filter((record) => {
      const nameMatch = record.clientName.toLowerCase().includes(search);
      const dateMatch = record.submittedAt.slice(0, 10).includes(search);
      return nameMatch || dateMatch;
    });
  }

  if (sort === "oldest") {
    records.sort(
      (a, b) => new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime(),
    );
  }

  return NextResponse.json({ records });
}
