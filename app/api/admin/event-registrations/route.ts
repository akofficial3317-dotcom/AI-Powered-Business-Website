import { NextRequest, NextResponse } from "next/server"

import { getAdminUser } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

const allowedStatuses = ["pending", "confirmed", "attended", "cancelled"]

function toCsvValue(value: unknown) {
  const text = String(value ?? "")
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format")
    const status = searchParams.get("status")?.toLowerCase()
    const search = searchParams.get("search")?.trim()
    const page = Math.max(1, Number(searchParams.get("page") || 1))
    const pageSize = Math.min(100, Math.max(10, Number(searchParams.get("pageSize") || 50)))

    const where = {
      ...(status && allowedStatuses.includes(status) ? { status } : {}),
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { eventTitle: { contains: search, mode: "insensitive" as const } },
              { organization: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    }

    const registrations = await prisma.eventRegistration.findMany({
      where,
      orderBy: { createdAt: "desc" },
      ...(format === "csv" ? {} : { skip: (page - 1) * pageSize, take: pageSize }),
      include: {
        event: {
          select: {
            id: true,
            title: true,
            date: true,
            location: true,
          },
        },
      },
    })

    if (format === "csv") {
      const rows = [
        ["ID", "Event", "Name", "Email", "Phone", "Organization", "Status", "Submitted"],
        ...registrations.map((registration) => [
          registration.id,
          registration.eventTitle,
          registration.name,
          registration.email,
          registration.phone || "",
          registration.organization || "",
          registration.status,
          registration.createdAt.toISOString(),
        ]),
      ]

      return new NextResponse(
        rows.map((row) => row.map(toCsvValue).join(",")).join("\n"),
        {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": "attachment; filename=event-registrations.csv",
          },
        }
      )
    }

    const total = await prisma.eventRegistration.count({ where })

    return NextResponse.json({
      registrations,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    })
  } catch (error) {
    console.error("Failed to fetch event registrations:", error)
    return NextResponse.json(
      { error: "Failed to fetch event registrations" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const id = Number(body.id)
    const status = String(body.status || "").toLowerCase()

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 })
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid registration status" }, { status: 400 })
    }

    const registration = await prisma.eventRegistration.update({
      where: { id },
      data: { status, managedById: admin.id },
    })

    await prisma.auditLog.create({
      data: {
        actorId: admin.id,
        actorEmail: admin.email,
        action: "event_registration_status_updated",
        target: "EventRegistration",
        targetId: registration.id,
        metadata: { status },
      },
    })

    return NextResponse.json({ registration })
  } catch (error) {
    console.error("Failed to update event registration:", error)
    return NextResponse.json(
      { error: "Failed to update event registration" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get("id"))

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid registration ID" }, { status: 400 })
    }

    const registration = await prisma.eventRegistration.delete({ where: { id } })

    await prisma.auditLog.create({
      data: {
        actorId: admin.id,
        actorEmail: admin.email,
        action: "event_registration_deleted",
        target: "EventRegistration",
        targetId: id,
        metadata: {
          eventTitle: registration.eventTitle,
          email: registration.email,
        },
      },
    })

    return NextResponse.json({ message: "Registration deleted" })
  } catch (error) {
    console.error("Failed to delete event registration:", error)
    return NextResponse.json(
      { error: "Failed to delete event registration" },
      { status: 500 }
    )
  }
}
