import { NextResponse } from "next/server";
import { getVerificationRecord, updateFamilyContact } from "@/lib/insurance/db/repository";
import { toFamilyPortalStatus } from "@/lib/insurance/publicStatus";
import {
  getPortalSessionFromCookies,
} from "@/lib/insurance/portal/session";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function authorizePortal(requestId: string) {
  const session = await getPortalSessionFromCookies();
  if (!session || session.requestId !== requestId) {
    return null;
  }
  return session;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await authorizePortal(id);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const record = await getVerificationRecord(id);
  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json(toFamilyPortalStatus(record), {
    headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await authorizePortal(id);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { email?: string; phone?: string; zipCode?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const updated = await updateFamilyContact(id, {
    email: body.email,
    phone: body.phone,
    zipCode: body.zipCode,
  });

  if (!updated) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json(toFamilyPortalStatus(updated), {
    headers: { "Cache-Control": "no-store" },
  });
}
