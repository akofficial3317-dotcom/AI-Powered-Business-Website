import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminUser } from "@/lib/admin-auth"

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(inquiries)
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id, status } = await request.json()

    const inquiry = await prisma.inquiry.update({
      where: { id: Number(id) },
      data: { status, managedById: admin.id },
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 })
    }

    await prisma.inquiry.delete({ where: { id: Number(id) } })

    return NextResponse.json({ message: "Inquiry deleted" })
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 })
  }
}
