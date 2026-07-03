import { NextResponse } from "next/server"
import { generateChatResponse } from "@/lib/openai"
import { prisma } from "@/lib/prisma"
import {
  cleanText,
  getClientKey,
  rateLimit,
  rejectLargeRequest,
} from "@/lib/security"

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function POST(request: Request) {
  let lastUserMessage = ""
  let sessionId = "anonymous"

  try {
    const oversized = rejectLargeRequest(request, 64_000)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "chat"), 20, 10 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const { messages } = body
    sessionId = cleanText(body.sessionId, 120) || sessionId

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      )
    }

    // Filter to only include user and assistant messages
    const validMessages: ChatMessage[] = messages
      .map((m: { role: string; content: string }) => {
        const role = m.role === "assistant" ? "assistant" : m.role === "user" ? "user" : null

        return {
          role,
          content: cleanText(m.content, 2_000),
        }
      })
      .filter((m): m is ChatMessage => Boolean(m.role && m.content))
      .slice(-10) // Keep last 10 messages for context

    lastUserMessage =
      [...validMessages]
        .reverse()
        .find((message) => message.role === "user")
        ?.content || ""

    const response = await generateChatResponse(validMessages)

    if (lastUserMessage) {
      await prisma.chatHistory.create({
        data: {
          sessionId,
          userMessage: lastUserMessage,
          aiResponse: response,
        },
      })
    }

    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Chat API error:", error)

    const fallbackMessage =
      "Thank you for your message! Our AI assistant is currently experiencing high demand. For immediate assistance, please contact us at contact@nexaai.com or call +977 980-1234567. We'd be happy to help you with information about our AI solutions, chatbot systems, data analytics, and business automation services."

    if (lastUserMessage) {
      try {
        await prisma.chatHistory.create({
          data: {
            sessionId,
            userMessage: lastUserMessage,
            aiResponse: fallbackMessage,
          },
        })
      } catch (saveError) {
        console.error("Chat history save error:", saveError)
      }
    }
    
    // Return a friendly fallback response if OpenAI fails
    return NextResponse.json({
      message: fallbackMessage,
    })
  }
}
