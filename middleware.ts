import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_API_PUBLIC_PATHS = ["/api/admin/auth/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api/admin/")) {
    return NextResponse.next();
  }

  if (ADMIN_API_PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("eden_insurance_session");
  const hasBearer = request.headers.get("authorization")?.startsWith("Bearer ");
  const hasLegacyHeader = Boolean(request.headers.get("x-staff-token"));

  if (!sessionCookie && !hasBearer && !hasLegacyHeader) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/admin/:path*"],
};
