import { NextRequest, NextResponse } from "next/server"

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function cleanText(value: unknown, maxLength = 500) {
  if (typeof value !== "string") return ""

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength)
}

export function cleanEmail(value: unknown) {
  return cleanText(value, 254).toLowerCase()
}

export function isValidEmail(email: string) {
  return emailRegex.test(email)
}

export function validatePassword(password: unknown) {
  if (typeof password !== "string") {
    return "Password is required"
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }

  if (password.length > 128) {
    return "Password must be 128 characters or fewer"
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
    return "Password must include uppercase, lowercase, and number"
  }

  return null
}

export function getClientKey(request: Request | NextRequest, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = request.headers.get("x-real-ip")
  const ip = forwardedFor || realIp || "local"

  return `${scope}:${ip}`
}

export function rateLimit(key: string, limit = 20, windowMs = 60_000) {
  const now = Date.now()
  const record = rateLimitStore.get(key)

  if (!record || record.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    })

    return null
  }

  if (record.count >= limit) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((record.resetAt - now) / 1000)),
        },
      }
    )
  }

  record.count += 1
  return null
}

export function rejectLargeRequest(request: Request | NextRequest, maxBytes = 32_768) {
  const contentLength = Number(request.headers.get("content-length") || 0)

  if (contentLength > maxBytes) {
    return NextResponse.json(
      { error: "Request body is too large" },
      { status: 413 }
    )
  }

  return null
}
