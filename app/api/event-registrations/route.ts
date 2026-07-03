import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import {
  cleanEmail,
  cleanText,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
} from "@/lib/security"

export async function POST(request: NextRequest) {
  try {
    const oversized = rejectLargeRequest(request, 16_384)
    if (oversized) return oversized

    const limited = rateLimit(
      getClientKey(request, "event-registration"),
      6,
      10 * 60_000
    )
    if (limited) return limited

    const body = await request.json()
    const eventId = Number(body.eventId)
    const eventTitle = cleanText(body.eventTitle, 160)
    const name = cleanText(body.name, 80)
    const email = cleanEmail(body.email)
    const phone = cleanText(body.phone, 40)
    const organization = cleanText(body.organization, 120)
    const message = cleanText(body.message, 600)

    if (!eventTitle || !name || !email) {
      return NextResponse.json(
        { error: "Event, name, and email are required." },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      )
    }

    let linkedEventId: number | null = null

    if (Number.isInteger(eventId) && eventId > 0) {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { id: true, registrationEnabled: true },
      })

      if (!event) {
        return NextResponse.json({ error: "Event not found." }, { status: 404 })
      }

      if (!event.registrationEnabled) {
        return NextResponse.json(
          { error: "Registration is closed for this event." },
          { status: 400 }
        )
      }

      linkedEventId = event.id
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId: linkedEventId,
        eventTitle,
        name,
        email,
        phone: phone || null,
        organization: organization || null,
        message: message || null,
        status: "pending",
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: "Registration submitted successfully.",
        registrationId: registration.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Event registration failed:", error)
    return NextResponse.json(
      { error: "Failed to submit event registration." },
      { status: 500 }
    )
  }
}
