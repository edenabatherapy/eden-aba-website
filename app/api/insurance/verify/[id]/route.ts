import { NextResponse } from "next/server";
import { getVerificationRecord } from "@/lib/insurance/db/repository";
import { toPublicVerificationStatus } from "@/lib/insurance/publicStatus";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const record = await getVerificationRecord(id);

  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json(toPublicVerificationStatus(record), {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}
