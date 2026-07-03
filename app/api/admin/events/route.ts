import {
  NextRequest,
  NextResponse,
} from "next/server"

import { prisma } from "@/lib/prisma"

import { getAdminUser } from "@/lib/admin-auth"
import {
  defaultEvents,
  findDefaultEventById,
  findDefaultEventByTitle,
  HIDDEN_DEFAULT_EVENT_TYPE,
} from "@/lib/default-events"

/* =========================
   GET EVENTS
========================= */

export async function GET() {
  try {
    const events =
      await prisma.event.findMany({
        orderBy: {
          date: "desc",
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
          published: true,
        })),
      ]
    )
  } catch (error) {
    console.error(
      "Error fetching events:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to fetch events",
      },
      {
        status: 500,
      }
    )
  }
}

/* =========================
   CREATE EVENT
========================= */

export async function POST(
  request: NextRequest
) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      )
    }

    const {
      title,
      description,
      date,
      endDate,
      eventType,
      availability,
      registrationEnabled,
      location,
      banner,
      coverImage,
    } = await request.json()

    if (!title || !date) {
      return NextResponse.json(
        {
          error:
            "Title and date are required",
        },
        {
          status: 400,
        }
      )
    }

    const startDate = new Date(
      date
    )

    const finishDate = endDate
      ? new Date(
          endDate
        )
      : null

    if (finishDate && finishDate <= startDate) {
      return NextResponse.json(
        {
          error:
            "End date and time must be after start date and time",
        },
        {
          status: 400,
        }
      )
    }

    const event =
      await prisma.event.create({
        data: {
          title,

          description,

          date: startDate,

          endDate: finishDate,

          eventType: eventType || "Event",

          availability: availability || null,

          registrationEnabled:
            registrationEnabled !== false,

          location,

          banner: banner || coverImage || null,

          managedById: admin.id,
        },
      })

    return NextResponse.json(
      event,
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error(
      "Error creating event:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to create event",
      },
      {
        status: 500,
      }
    )
  }
}

/* =========================
   UPDATE EVENT
========================= */

export async function PUT(
  request: NextRequest
) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      )
    }

    const {
      id,
      title,
      description,
      date,
      endDate,
      eventType,
      availability,
      registrationEnabled,
      location,
      banner,
      coverImage,
    } = await request.json()

    if (!id || !title || !date) {
      return NextResponse.json(
        {
          error:
            "Event ID, title, and date are required",
        },
        {
          status: 400,
        }
      )
    }

    const startDate = new Date(
      date
    )

    const finishDate = endDate
      ? new Date(
          endDate
        )
      : null

    if (finishDate && finishDate <= startDate) {
      return NextResponse.json(
        {
          error:
            "End date and time must be after start date and time",
        },
        {
          status: 400,
        }
      )
    }

    const numericId = Number(id)
    const defaultEvent = numericId < 0 ? findDefaultEventById(numericId) : null

    if (numericId < 0 && !defaultEvent) {
      return NextResponse.json(
        {
          error:
            "Default event not found",
        },
        {
          status: 404,
        }
      )
    }

    if (defaultEvent) {
      const existingDefault = await prisma.event.findFirst({
        where: {
          title: defaultEvent.title,
        },
      })
      const data = {
        title: defaultEvent.title,
        description,
        date: startDate,
        endDate: finishDate,
        eventType: eventType || defaultEvent.eventType || "Event",
        availability: availability || null,
        registrationEnabled:
          registrationEnabled !== false,
        managedById: admin.id,
        location,
        banner: banner || coverImage || null,
      }
      const event = existingDefault
        ? await prisma.event.update({
            where: {
              id: existingDefault.id,
            },
            data,
          })
        : await prisma.event.create({
            data,
          })

      return NextResponse.json(event)
    }

    const event =
      await prisma.event.update({
        where: {
          id: Number(id),
        },

        data: {
          title,

          description,

          date: startDate,

          endDate: finishDate,

          eventType: eventType || "Event",

          availability: availability || null,

          registrationEnabled:
            registrationEnabled !== false,

          managedById: admin.id,

          location,

          banner: banner || coverImage || null,
        },
      })

    return NextResponse.json(
      event
    )
  } catch (error) {
    console.error(
      "Error updating event:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to update event",
      },
      {
        status: 500,
      }
    )
  }
}

/* =========================
   DELETE EVENT
========================= */

export async function DELETE(
  request: NextRequest
) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        {
          status: 403,
        }
      )
    }

    const {
      searchParams,
    } = new URL(request.url)

    const id =
      searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          error:
            "Event ID required",
        },
        {
          status: 400,
        }
      )
    }

    const numericId = Number(id)
    const event = numericId > 0
      ? await prisma.event.findUnique({
          where: {
            id: numericId,
          },
        })
      : null
    const defaultEvent =
      numericId < 0
        ? findDefaultEventById(numericId)
        : event
          ? findDefaultEventByTitle(event.title)
          : null

    if (numericId < 0 && !defaultEvent) {
      return NextResponse.json(
        {
          error:
            "Default event not found",
        },
        {
          status: 404,
        }
      )
    }

    if (defaultEvent) {
      const existingDefault = await prisma.event.findFirst({
        where: {
          title: defaultEvent.title,
        },
      })
      const data = {
        title: defaultEvent.title,
        description: defaultEvent.description,
        date: new Date(defaultEvent.date),
        endDate: defaultEvent.endDate ? new Date(defaultEvent.endDate) : null,
        eventType: HIDDEN_DEFAULT_EVENT_TYPE,
        availability: defaultEvent.availability,
        registrationEnabled: false,
        location: defaultEvent.location,
        banner: defaultEvent.coverImage,
        managedById: admin.id,
      }

      if (existingDefault) {
        await prisma.event.update({
          where: {
            id: existingDefault.id,
          },
          data,
        })
      } else {
        await prisma.event.create({
          data,
        })
      }

      return NextResponse.json({
        success: true,

        message:
          "Event deleted successfully",
      })
    }

    await prisma.event.delete({
      where: {
        id: numericId,
      },
    })

    return NextResponse.json({
      success: true,

      message:
        "Event deleted successfully",
    })
  } catch (error) {
    console.error(
      "Error deleting event:",
      error
    )

    return NextResponse.json(
      {
        error:
          "Failed to delete event",
      },
      {
        status: 500,
      }
    )
  }
}
