import { NextResponse } from "next/server"
import crypto from "crypto"

import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import {
  cleanEmail,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
  validatePassword,
} from "@/lib/security"

function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex")
}

export async function POST(
  request: Request
) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "forgot-password"), 5, 15 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const action = String(body.action || "request")
    const email = cleanEmail(body.email)
    const password = body.password
    const token = typeof body.token === "string" ? body.token.trim() : ""

    if (action === "confirm") {
      if (!token || !password) {
        return NextResponse.json(
          { error: "Reset token and new password are required" },
          { status: 400 }
        )
      }

      const passwordError = validatePassword(password)
      if (passwordError) {
        return NextResponse.json({ error: passwordError }, { status: 400 })
      }

      const resetToken = await prisma.passwordResetToken.findUnique({
        where: { tokenHash: hashResetToken(token) },
        include: { user: true },
      })

      if (
        !resetToken ||
        resetToken.usedAt ||
        resetToken.expiresAt.getTime() <= Date.now()
      ) {
        return NextResponse.json(
          { error: "Reset link is invalid or expired" },
          { status: 400 }
        )
      }

      const hashedPassword = await hashPassword(password)

      await prisma.$transaction([
        prisma.admin.update({
          where: { id: resetToken.userId },
          data: { password: hashedPassword },
        }),
        prisma.passwordResetToken.update({
          where: { id: resetToken.id },
          data: { usedAt: new Date() },
        }),
        prisma.auditLog.create({
          data: {
            actorId: resetToken.userId,
            actorEmail: resetToken.user.email,
            action: "password_reset_completed",
            target: "User",
            targetId: resetToken.userId,
          },
        }),
      ])

      return NextResponse.json({
        success: true,
        message: "Password reset successfully",
      })
    }

    if (!email) {
      return NextResponse.json(
        {
          error:
            "Email is required",
        },
        {
          status: 400,
        }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid email address",
        },
        {
          status: 400,
        }
      )
    }

    const user =
      await prisma.admin.findUnique(
        {
          where: {
            email,
          },
        }
      )

    let devResetUrl: string | undefined

    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex")
      const expiresAt = new Date(Date.now() + 30 * 60_000)

      await prisma.$transaction([
        prisma.passwordResetToken.updateMany({
          where: {
            userId: user.id,
            usedAt: null,
            expiresAt: { gt: new Date() },
          },
          data: { usedAt: new Date() },
        }),
        prisma.passwordResetToken.create({
          data: {
            userId: user.id,
            tokenHash: hashResetToken(rawToken),
            expiresAt,
          },
        }),
        prisma.auditLog.create({
          data: {
            actorId: user.id,
            actorEmail: user.email,
            action: "password_reset_requested",
            target: "User",
            targetId: user.id,
            metadata: { expiresAt: expiresAt.toISOString() },
          },
        }),
      ])

      const url = new URL(request.url)
      devResetUrl = `${url.origin}/forgot-password?token=${rawToken}`

      // In production, connect this token to an email provider before exposing the reset flow.
      console.info(`Password reset link for ${user.email}: ${devResetUrl}`)
    }

    return NextResponse.json({
      success: true,
      message:
        "If an admin account exists for this email, a reset link has been generated.",
      ...(process.env.NODE_ENV !== "production" && devResetUrl ? { devResetUrl } : {}),
    })
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}
