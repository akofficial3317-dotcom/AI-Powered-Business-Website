import { NextRequest, NextResponse } from "next/server"

import { getAdminUser } from "@/lib/admin-auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get("id"))

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json({ error: "Invalid audit log ID" }, { status: 400 })
    }

    await prisma.auditLog.delete({
      where: { id },
    })

    return NextResponse.json({ message: "Audit log deleted" })
  } catch (error) {
    console.error("Failed to delete audit log:", error)
    return NextResponse.json(
      { error: "Failed to delete audit log" },
      { status: 500 }
    )
  }
}
