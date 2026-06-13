import { NextResponse } from "next/server";
import {
  RECAPTCHA_FAILURE_MESSAGE,
  RECAPTCHA_INCOMPLETE_MESSAGE,
} from "@/lib/recaptcha/messages";
import { verifyRecaptchaV2Token } from "@/lib/recaptcha/verify-v2";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: { token?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: RECAPTCHA_INCOMPLETE_MESSAGE },
      { status: 400 },
    );
  }

  const result = await verifyRecaptchaV2Token(
    typeof body.token === "string" ? body.token : null,
  );

  if (result.ok === false) {
    return NextResponse.json(
      {
        success: false,
        message: result.message || RECAPTCHA_FAILURE_MESSAGE,
      },
      { status: result.status },
    );
  }

  return NextResponse.json({ success: true });
}
