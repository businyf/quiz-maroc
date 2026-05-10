import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || ""
  const response = NextResponse.next()

  if (
    userAgent.includes("facebookexternalhit") ||
    userAgent.includes("Facebot") ||
    userAgent.includes("FacebookBot")
  ) {
    response.headers.set("X-Robots-Tag", "all")
    response.headers.set("Cache-Control", "public, max-age=3600")
  }

  return response
}

export const config = {
  matcher: "/(.*)",
}