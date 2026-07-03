import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminUser } from "@/lib/admin-auth"
import { defaultBlogPosts, HIDDEN_DEFAULT_BLOG_CATEGORY } from "@/lib/default-blogs"

export async function GET() {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const [
      totalUsers,
      totalBlogs,
      totalInquiries,
      totalEvents,
      totalFeedback,
      totalSubscribers,
      totalEventRegistrations,
      pendingInquiries,
      resolvedInquiries,
      averageFeedbackRating,
      recentUsers,
      recentInquiries,
      recentAuditLogs,
      registrationStatusCounts,
      monthlyStats,
    ] = await Promise.all([
      prisma.admin.count(),
      getVisibleBlogCount(),
      prisma.inquiry.count(),
      prisma.event.count(),
      prisma.feedback.count(),
      prisma.newsletterSubscriber.count(),
      prisma.eventRegistration.count(),
      prisma.inquiry.count({ where: { status: "pending" } }),
      prisma.inquiry.count({ where: { status: "resolved" } }),
      prisma.feedback.aggregate({ _avg: { rating: true } }),
      prisma.admin.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, createdAt: true },
      }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, subject: true, status: true, createdAt: true },
      }),
      prisma.auditLog.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          actorEmail: true,
          action: true,
          target: true,
          targetId: true,
          createdAt: true,
        },
      }),
      getRegistrationStatusCounts(),
      getMonthlyStats(),
    ])

    return NextResponse.json({
      stats: {
        totalUsers,
        totalBlogs,
        totalInquiries,
        totalEvents,
        totalFeedback,
        totalSubscribers,
        totalEventRegistrations,
        pendingInquiries,
        resolvedInquiries,
        averageFeedbackRating: Number(
          (averageFeedbackRating._avg.rating ?? 0).toFixed(1)
        ),
      },
      recentUsers,
      recentInquiries,
      recentAuditLogs,
      registrationStatusCounts,
      monthlyStats,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    )
  }
}

async function getVisibleBlogCount() {
  const blogs = await prisma.blog.findMany({
    select: {
      slug: true,
      category: true,
    },
  })
  const visibleBlogs = blogs.filter(
    (blog) => blog.category !== HIDDEN_DEFAULT_BLOG_CATEGORY
  )
  const customSlugs = new Set(blogs.map((blog) => blog.slug))
  const builtInBlogs = defaultBlogPosts.filter(
    (blog) => !customSlugs.has(blog.slug)
  )

  return visibleBlogs.length + builtInBlogs.length
}

async function getMonthlyStats() {
  const months = []
  const currentMonth = new Date()
  currentMonth.setDate(1)
  currentMonth.setHours(0, 0, 0, 0)

  for (let i = 5; i >= 0; i--) {
    const date = new Date(currentMonth)
    date.setMonth(date.getMonth() - i)

    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1)

    months.push({
      month: date.toLocaleString("default", { month: "short" }),
      year: date.getFullYear(),
      start,
      end,
    })
  }

  const stats = await Promise.all(
    months.map(async ({ month, year, start, end }) => {
      const [users, inquiries, blogs, registrations, subscribers] = await Promise.all([
        prisma.admin.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
        prisma.inquiry.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
        prisma.blog.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
        prisma.eventRegistration.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
        prisma.newsletterSubscriber.count({
          where: { createdAt: { gte: start, lt: end } },
        }),
      ])
      return {
        key: `${year}-${String(start.getMonth() + 1).padStart(2, "0")}`,
        month,
        users,
        inquiries,
        blogs,
        registrations,
        subscribers,
      }
    })
  )

  return stats
}

async function getRegistrationStatusCounts() {
  const counts = await prisma.eventRegistration.groupBy({
    by: ["status"],
    _count: { status: true },
  })

  return counts.map((item) => ({
    status: item.status,
    count: item._count.status,
  }))
}
