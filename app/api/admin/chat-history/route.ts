import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminUser } from "@/lib/admin-auth"

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const chats = await prisma.chatHistory.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(
      chats.map((chat) => ({
        ...chat,
        botResponse: chat.aiResponse,
      }))
    )
  } catch (error) {
    console.error("Error fetching chat history:", error)
    return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 })
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
      return NextResponse.json({ error: "Chat ID required" }, { status: 400 })
    }

    await prisma.chatHistory.delete({ where: { id: Number(id) } })

    return NextResponse.json({ message: "Chat deleted" })
  } catch (error) {
    console.error("Error deleting chat:", error)
    return NextResponse.json({ error: "Failed to delete chat" }, { status: 500 })
  }
}
