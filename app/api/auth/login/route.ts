import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyPassword, generateToken, setAuthCookie } from "@/lib/auth"
import {
  cleanEmail,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
} from "@/lib/security"

export async function POST(request: Request) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "login"), 10, 15 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const email = cleanEmail(body.email)
    const password = body.password

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Find user
    const user = await prisma.admin.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      )
    }

    const adminCount = await prisma.admin.count({
      where: { role: { in: ["admin", "ADMIN"] } },
    })

    const currentUser =
      adminCount === 0
        ? await prisma.admin.update({
            where: { id: user.id },
            data: { role: "admin" },
          })
        : user

    if (currentUser.role.toLowerCase() !== "admin") {
      return NextResponse.json(
        { error: "Admin access only" },
        { status: 403 }
      )
    }

    // Generate token and set cookie
    const token = generateToken({
      userId: currentUser.id,
      email: currentUser.email,
      role: currentUser.role,
    })

    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
