import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const GENERIC_FAILURE =
  "We could not verify your information. Please check your details or contact Eden ABA Therapy.";

/** @deprecated Use POST /api/insurance/portal/verify with identity verification. */
export async function POST() {
  return NextResponse.json({ error: GENERIC_FAILURE }, { status: 410 });
}
