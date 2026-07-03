import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import {
  defaultEvents,
  HIDDEN_DEFAULT_EVENT_TYPE,
} from "@/lib/default-events"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    })
    const visibleEvents = events.filter(
      (event) => event.eventType !== HIDDEN_DEFAULT_EVENT_TYPE
    )
    const customTitles = new Set(
      events.map((event) => event.title.toLowerCase())
    )
    const builtInEvents = defaultEvents.filter(
      (event) => !customTitles.has(event.title.toLowerCase())
    )

    return NextResponse.json(
      [
        ...builtInEvents,
        ...visibleEvents.map((event) => ({
          ...event,
          coverImage: event.banner,
          endDate: event.endDate,
          eventType: event.eventType,
          availability: event.availability,
          registrationEnabled: event.registrationEnabled,
        })),
      ]
    )
  } catch (error) {
    console.error("Error fetching events:", error)

    return NextResponse.json(defaultEvents)
  }
}
