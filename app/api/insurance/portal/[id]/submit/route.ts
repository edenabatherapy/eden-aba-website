import { NextResponse } from "next/server";
import { submitFamilyPortalForReview } from "@/lib/insurance/db/repository";
import { notifyStaffOfInsuranceSubmission } from "@/lib/insurance/notifications/notifyStaffOfInsuranceSubmission";
import { toFamilyPortalStatus } from "@/lib/insurance/publicStatus";
import { getPortalSessionFromCookies } from "@/lib/insurance/portal/session";
import { recaptchaV2FailureResponse, verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await getPortalSessionFromCookies();

  if (!session || session.requestId !== id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { email?: string; phone?: string; zipCode?: string; recaptchaToken?: string } = {};
  try {
    body = await request.json();
  } catch {
    // Contact fields are optional in body — record may already have them saved.
  }

  const recaptcha = await verifyRecaptchaV2Token(body.recaptchaToken ?? null);
  if (recaptcha.ok === false) {
    return recaptchaV2FailureResponse(recaptcha);
  }

  const result = await submitFamilyPortalForReview(id, {
    email: body.email,
    phone: body.phone,
    zipCode: body.zipCode,
  });

  if (result.ok === false) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await notifyStaffOfInsuranceSubmission(id);

  return NextResponse.json(toFamilyPortalStatus(result.record), {
    headers: { "Cache-Control": "no-store" },
  });
}
