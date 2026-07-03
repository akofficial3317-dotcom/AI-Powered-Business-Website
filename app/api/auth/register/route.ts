import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, generateToken, setAuthCookie } from "@/lib/auth"
import {
  cleanEmail,
  cleanText,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
  validatePassword,
} from "@/lib/security"

export async function POST(request: Request) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "register"), 5, 15 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const name = cleanText(body.name, 80)
    const email = cleanEmail(body.email)
    const password = body.password

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      )
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      return NextResponse.json(
        { error: passwordError },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.admin.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    const adminCount = await prisma.admin.count({
      where: { role: { in: ["admin", "ADMIN"] } },
    })

    if (adminCount > 0) {
      return NextResponse.json(
        { error: "Admin registration is closed" },
        { status: 403 }
      )
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
    })

    // Generate token and set cookie
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
