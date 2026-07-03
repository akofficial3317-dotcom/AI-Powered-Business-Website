import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyTokenAtEdge } from "@/lib/edge-auth"

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  // Check if accessing admin routes
  const isAdminRoute = pathname.startsWith("/admin")
  const isChangePasswordRoute = pathname === "/change-password"

  if (isAdminRoute || isChangePasswordRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyTokenAtEdge(token)
    if (!payload || payload.role.toLowerCase() !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Check if accessing dashboard routes
  const isDashboardRoute = pathname.startsWith("/dashboard")

  if (isDashboardRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const payload = await verifyTokenAtEdge(token)
    if (!payload) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // For admin-only routes
    const adminOnlyRoutes = ["/dashboard/users"]
    if (
      adminOnlyRoutes.some((route) => pathname.startsWith(route)) &&
      payload.role.toLowerCase() !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  const response = NextResponse.next()

  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
  response.headers.set("X-DNS-Prefetch-Control", "on")

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  }

  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://images.unsplash.com https://images.*.unsplash.com https://*.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.openai.com https://api.resend.com",
      "frame-src 'self' https://www.google.com",
    ].join("; ")
  )

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
