import { NextResponse } from "next/server"

import { getAdminUser } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        subscribedEmail: true,
        createdAt: true,
      },
    })

    return NextResponse.json({ subscribers })
  } catch (error) {
    console.error("Failed to fetch newsletter subscribers:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    )
  }
}
