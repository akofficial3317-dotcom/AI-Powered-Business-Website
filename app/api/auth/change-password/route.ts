import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import {
  getSession,
  hashPassword,
  verifyPassword,
} from "@/lib/auth"
import {
  getClientKey,
  rateLimit,
  rejectLargeRequest,
  validatePassword,
} from "@/lib/security"

export async function POST(request: Request) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "change-password"), 8, 15 * 60_000)
    if (limited) return limited

    const session = await getSession()

    if (!session) {
      return NextResponse.json(
        { error: "Please login to change your password" },
        { status: 401 }
      )
    }

    if (session.role.toLowerCase() !== "admin") {
      return NextResponse.json(
        { error: "Admin access only" },
        { status: 403 }
      )
    }

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = await request.json()

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All password fields are required" },
        { status: 400 }
      )
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400 }
      )
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password do not match" },
        { status: 400 }
      )
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "New password must be different from current password" },
        { status: 400 }
      )
    }

    const user = await prisma.admin.findUnique({
      where: { id: session.userId },
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    const isCurrentPasswordValid = await verifyPassword(
      currentPassword,
      user.password
    )

    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 }
      )
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.admin.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })

    return NextResponse.json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Change password error:", error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
