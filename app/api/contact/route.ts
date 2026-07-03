import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  cleanEmail,
  cleanText,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
} from "@/lib/security"

export async function POST(request: Request) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "contact"), 5, 10 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const name = cleanText(body.name, 80)
    const email = cleanEmail(body.email)
    const subject = cleanText(body.subject, 120)
    const message = cleanText(body.message, 2_000)

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Save inquiry to database
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        subject,
        message,
        status: "pending",
      },
    })

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      id: inquiry.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    )
  }
}
