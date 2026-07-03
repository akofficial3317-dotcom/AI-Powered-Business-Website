import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import {
  cleanEmail,
  getClientKey,
  isValidEmail,
  rateLimit,
  rejectLargeRequest,
} from "@/lib/security"

export async function POST(request: NextRequest) {
  try {
    const oversized = rejectLargeRequest(request, 4_096)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, "newsletter"), 8, 10 * 60_000)
    if (limited) return limited

    const body = await request.json()
    const email = cleanEmail(body.email)

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      )
    }

    await prisma.newsletterSubscriber.upsert({
      where: { subscribedEmail: email },
      update: {},
      create: { subscribedEmail: email },
    })

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL ||
      "Nexa AI Systems <onboarding@resend.dev>"

    let notificationSent = false

    if (apiKey) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: email,
          subject: "Welcome to Nexa AI Systems newsletter",
          html: `
            <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
              <h2>Thanks for subscribing to Nexa AI Systems.</h2>
              <p>You will receive updates about AI solutions, chatbot systems, data analytics, business automation, events, and company news.</p>
              <p>If you have a project in mind, you can reach us at contact@nexaai.com.</p>
            </div>
          `,
        }),
      })

      notificationSent = response.ok

      if (!response.ok) {
        console.error("Newsletter notification failed:", await response.text())
      }
    } else {
      console.warn("Newsletter email provider not configured. Set RESEND_API_KEY to send notifications.")
    }

    return NextResponse.json({
      success: true,
      notificationSent,
    })
  } catch (error) {
    console.error("Newsletter subscription failed:", error)

    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again later.",
      },
      {
        status: 500,
      }
    )
  }
}
