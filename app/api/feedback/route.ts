import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { getAdminUser } from '@/lib/admin-auth'
import {
  cleanText,
  getClientKey,
  rateLimit,
  rejectLargeRequest,
} from '@/lib/security'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const publicOnly = searchParams.get('public') === 'true'

    if (publicOnly) {
      const feedback = await prisma.feedback.findMany({
        where: { approved: true },
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(
        feedback.map((item) => ({
          id: item.id,
          name: item.userName,
          role: item.userRole,
          rating: item.rating,
          content: item.feedback,
          createdAt: item.createdAt,
        }))
      )
    }

    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const feedback = await prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(
      feedback.map((item) => ({
        ...item,
        message: item.feedback,
        user: {
          name: item.userName,
          role: item.userRole,
          email: '',
        },
      }))
    )
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const oversized = rejectLargeRequest(request)
    if (oversized) return oversized

    const limited = rateLimit(getClientKey(request, 'feedback'), 10, 10 * 60_000)
    if (limited) return limited

    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value
    const body = await request.json()
    const rating = Number(body.rating)
    const message = cleanText(body.message, 1_000)
    const userName = cleanText(body.userName, 80)
    const userRole = cleanText(body.userRole, 120)

    if (!rating || !message || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating from 1 to 5 and message are required' },
        { status: 400 }
      )
    }

    let resolvedUserName = userName || 'Anonymous'

    if (token) {
      const payload = verifyToken(token)
      if (payload) {
        const user = await prisma.admin.findUnique({
          where: { id: payload.userId },
          select: { name: true },
        })

        resolvedUserName = user?.name || resolvedUserName
      }
    }

    const feedback = await prisma.feedback.create({
      data: {
        rating: Number(rating),
        feedback: message,
        userName: resolvedUserName,
        userRole: userRole || 'Client',
      },
    })

    return NextResponse.json(feedback, { status: 201 })
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const feedbackId = Number(body.id)

    if (!Number.isInteger(feedbackId) || feedbackId <= 0) {
      return NextResponse.json({ error: 'Invalid feedback ID' }, { status: 400 })
    }

    if (typeof body.approved !== 'boolean') {
      return NextResponse.json({ error: 'Approved status required' }, { status: 400 })
    }

    const feedback = await prisma.feedback.update({
      where: { id: feedbackId },
      data: { approved: body.approved, managedById: admin.id },
    })

    return NextResponse.json({
      ...feedback,
      message: feedback.feedback,
      user: {
        name: feedback.userName,
        role: feedback.userRole,
        email: '',
      },
    })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Feedback ID required' }, { status: 400 })
    }

    const feedbackId = Number(id)

    if (!Number.isInteger(feedbackId) || feedbackId <= 0) {
      return NextResponse.json({ error: 'Invalid feedback ID' }, { status: 400 })
    }

    await prisma.feedback.delete({ where: { id: feedbackId } })

    return NextResponse.json({ message: 'Feedback deleted' })
  } catch (error) {
    console.error('Error deleting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to delete feedback' },
      { status: 500 }
    )
  }
}
