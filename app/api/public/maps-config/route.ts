import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Returns the public Google Maps JavaScript API key at request time.
 * Allows Vercel to use GOOGLE_MAPS_API_KEY without a rebuild when
 * NEXT_PUBLIC_GOOGLE_MAPS_API_KEY was not set at build time.
 */
export async function GET() {
  const apiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    "";

  return NextResponse.json({
    configured: Boolean(apiKey),
    apiKey,
  });
}
