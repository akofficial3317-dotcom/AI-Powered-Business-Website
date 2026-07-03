"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Activity,
  Bot,
  Calendar,
  ClipboardList,
  FileText,
  Image,
  MessageSquare,
  Mail,
  Star,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
} from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import AdminLayout from "@/components/admin/admin-layout"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface DashboardStats {
  stats: {
    totalUsers: number
    totalBlogs: number
    totalInquiries: number
    totalEvents: number
    totalFeedback: number
    totalSubscribers: number
    totalEventRegistrations: number
    pendingInquiries: number
    resolvedInquiries: number
    averageFeedbackRating: number
  }
  recentUsers: Array<{
    id: number
    name: string
    email: string
    createdAt: string
  }>
  recentInquiries: Array<{
    id: number
    name: string
    subject: string
    status: string
    createdAt: string
  }>
  monthlyStats: Array<{
    key: string
    month: string
    users: number
    inquiries: number
    blogs: number
    registrations: number
    subscribers: number
  }>
  registrationStatusCounts: Array<{
    status: string
    count: number
  }>
  recentAuditLogs: Array<{
    id: number
    actorEmail: string | null
    action: string
    target: string
    targetId: number | null
    createdAt: string
  }>
}

const statCards = [
  {
    label: "Blogs",
    key: "totalBlogs",
    icon: FileText,
  },
  {
    label: "Inquiries",
    key: "totalInquiries",
    icon: MessageSquare,
  },
  {
    label: "Events",
    key: "totalEvents",
    icon: Calendar,
  },
  {
    label: "Feedback",
    key: "totalFeedback",
    icon: Star,
  },
  {
    label: "Subscribers",
    key: "totalSubscribers",
    icon: Mail,
  },
  {
    label: "Registrations",
    key: "totalEventRegistrations",
    icon: ClipboardList,
  },
] as const

const sectionCards = [
  {
    title: "Blogs",
    description: "Create and edit blog content",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Inquiries",
    description: "Review contact messages",
    href: "/admin/inquiries",
    icon: MessageSquare,
  },
  {
    title: "Events",
    description: "Manage website events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    title: "Event Registrations",
    description: "Confirm attendees and export reports",
    href: "/admin/event-registrations",
    icon: ClipboardList,
  },
  {
    title: "Gallery",
    description: "Add and update gallery images",
    href: "/admin/gallery",
    icon: Image,
  },
  {
    title: "Feedback",
    description: "View customer ratings",
    href: "/admin/feedback",
    icon: Star,
  },
  {
    title: "Chat History",
    description: "Read saved chatbot conversations",
    href: "/admin/chat-history",
    icon: Bot,
  },
  {
    title: "Subscribers",
    description: "View newsletter emails",
    href: "/admin/subscribers",
    icon: Mail,
  },
]

const activityChartConfig = {
  inquiries: {
    label: "Inquiries",
    color: "#f97316",
  },
  registrations: {
    label: "Registrations",
    color: "#2563eb",
  },
  subscribers: {
    label: "Subscribers",
    color: "#16a34a",
  },
} satisfies ChartConfig

const forecastChartConfig = {
  current: {
    label: "Current",
    color: "#14b8a6",
  },
  forecast: {
    label: "Forecast",
    color: "#8b5cf6",
  },
} satisfies ChartConfig

function getWeightedForecast(values: number[]) {
  if (!values.length) return 0

  const recentValues = values.slice(-3)
  const weights = [1, 2, 3].slice(-recentValues.length)
  const weightedTotal = recentValues.reduce(
    (total, value, index) => total + value * weights[index],
    0
  )
  const weightTotal = weights.reduce((total, value) => total + value, 0)

  return Math.round(weightedTotal / weightTotal)
}

function getTrendPercent(values: number[]) {
  if (values.length < 2) return 0

  const previous = values[values.length - 2]
  const current = values[values.length - 1]

  if (previous === 0) return current > 0 ? 100 : 0

  return Math.round(((current - previous) / previous) * 100)
}

function getTotalActivity(month: DashboardStats["monthlyStats"][number]) {
  return (
    month.users +
    month.inquiries +
    month.blogs +
    month.registrations +
    month.subscribers
  )
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  const analytics = useMemo(() => {
    const monthlyStats = data?.monthlyStats ?? []
    const totals = monthlyStats.map(getTotalActivity)
    const latestTotal = totals.at(-1) ?? 0
    const forecastTotal = getWeightedForecast(totals)
    const inquiryForecast = getWeightedForecast(
      monthlyStats.map((month) => month.inquiries)
    )
    const registrationForecast = getWeightedForecast(
      monthlyStats.map((month) => month.registrations)
    )
    const subscriberForecast = getWeightedForecast(
      monthlyStats.map((month) => month.subscribers)
    )
    const trendPercent = getTrendPercent(totals)
    const pending = data?.stats.pendingInquiries ?? 0
    const resolved = data?.stats.resolvedInquiries ?? 0
    const responseRate =
      pending + resolved > 0
        ? Math.round((resolved / (pending + resolved)) * 100)
        : 0

    return {
      activityChartData: monthlyStats,
      forecastChartData: monthlyStats.map((month, index) => ({
        month: month.month,
        current: totals[index],
        forecast: index === monthlyStats.length - 1 ? forecastTotal : null,
      })),
      latestTotal,
      forecastTotal,
      inquiryForecast,
      registrationForecast,
      subscriberForecast,
      trendPercent,
      responseRate,
      engagementScore: Math.min(
        100,
        Math.round(
          responseRate * 0.45 +
            Math.min(100, (data?.stats.averageFeedbackRating ?? 0) * 20) *
              0.35 +
            Math.min(100, registrationForecast * 10) * 0.2
        )
      ),
    }
  }, [data])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats")

      if (res.ok) {
        setData(await res.json())
      }
    } catch (error) {
      console.error("Failed to fetch admin stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteAuditLog = async (id: number) => {
    const confirmed = window.confirm("Delete this audit activity?")
    if (!confirmed) return

    try {
      const response = await fetch(`/api/admin/audit-logs?id=${id}`, {
        method: "DELETE",
      })

      if (!response.ok) return

      setData((current) =>
        current
          ? {
              ...current,
              recentAuditLogs: current.recentAuditLogs.filter(
                (log) => log.id !== id
              ),
            }
          : current
      )
    } catch (error) {
      console.error("Failed to delete audit log:", error)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage real website content, inquiries, events, gallery, feedback, and chat history.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          {statCards.map((stat) => (
            <Card key={stat.key}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold">
                    {data?.stats[stat.key] ?? 0}
                  </p>
                </div>
                <div className="rounded-md bg-primary/10 p-3 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Predictive Analytics
              </CardTitle>
              <CardDescription>
                Six-month activity trends with next-month signal forecast
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.activityChartData.length ? (
                <div className="space-y-6">
                  <ChartContainer
                    config={activityChartConfig}
                    className="h-[300px] w-full"
                  >
                    <BarChart
                      accessibilityLayer
                      data={analytics.activityChartData}
                      margin={{ left: -12, right: 12, top: 12 }}
                    >
                      <CartesianGrid vertical={false} />
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                      />
                      <YAxis tickLine={false} axisLine={false} width={34} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar
                        dataKey="inquiries"
                        fill="var(--color-inquiries)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="registrations"
                        fill="var(--color-registrations)"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="subscribers"
                        fill="var(--color-subscribers)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ChartContainer>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg border bg-orange-500/5 p-4">
                      <p className="text-xs font-medium uppercase text-muted-foreground">
                        Next inquiries
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {analytics.inquiryForecast}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-blue-500/5 p-4">
                      <p className="text-xs font-medium uppercase text-muted-foreground">
                        Next registrations
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {analytics.registrationForecast}
                      </p>
                    </div>
                    <div className="rounded-lg border bg-green-500/5 p-4">
                      <p className="text-xs font-medium uppercase text-muted-foreground">
                        Next subscribers
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {analytics.subscriberForecast}
                      </p>
                    </div>
                  </div>
                </div>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">
                    No analytics data found
                  </p>
                )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Section Controls</CardTitle>
              <CardDescription>
                Open every admin section directly from dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {sectionCards.map((section) => (
                  <Button
                    key={section.href}
                    asChild
                    variant="outline"
                    className="h-auto justify-between gap-3 p-4"
                  >
                    <Link href={section.href}>
                      <span className="flex items-center gap-3 text-left">
                        <span className="rounded-md bg-primary/10 p-2 text-primary">
                          <section.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block font-medium">
                            {section.title}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {section.description}
                          </span>
                        </span>
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <Card className="overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Forecast Snapshot
              </CardTitle>
              <CardDescription>
                Lightweight prediction from recent dashboard activity
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Activity forecast
                  </p>
                  <p className="mt-1 text-3xl font-bold">
                    {analytics.forecastTotal}
                  </p>
                </div>
                <Badge
                  variant={analytics.trendPercent >= 0 ? "default" : "secondary"}
                  className="text-sm"
                >
                  {analytics.trendPercent >= 0 ? "+" : ""}
                  {analytics.trendPercent}%
                </Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Target className="h-4 w-4" />
                    Engagement score
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {analytics.engagementScore}/100
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="h-4 w-4" />
                    Response rate
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {analytics.responseRate}%
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Latest month has {analytics.latestTotal} tracked actions. The
                forecast favors the most recent three months, so changes in
                inquiries, subscribers, and registrations surface quickly.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current vs Forecast</CardTitle>
              <CardDescription>
                Total monthly actions compared with the next expected pace
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analytics.forecastChartData.length ? (
                <ChartContainer
                  config={forecastChartConfig}
                  className="h-[260px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={analytics.forecastChartData}
                    margin={{ left: -12, right: 12, top: 12 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis tickLine={false} axisLine={false} width={34} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="current"
                      fill="var(--color-current)"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="forecast"
                      fill="var(--color-forecast)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  No forecast data found
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
              <CardDescription>Current inquiry, feedback, and event engagement signals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Pending inquiries</p>
                  <p className="mt-1 text-2xl font-bold">{data?.stats.pendingInquiries ?? 0}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Resolved inquiries</p>
                  <p className="mt-1 text-2xl font-bold">{data?.stats.resolvedInquiries ?? 0}</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Average rating</p>
                  <p className="mt-1 text-2xl font-bold">{data?.stats.averageFeedbackRating ?? 0}/5</p>
                </div>
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Event registrations</p>
                  <p className="mt-1 text-2xl font-bold">{data?.stats.totalEventRegistrations ?? 0}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {data?.registrationStatusCounts.map((item) => (
                  <Badge key={item.status} variant="secondary">
                    {item.status}: {item.count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Audit Activity
              </CardTitle>
              <CardDescription>Recent security and admin actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-72 space-y-3 overflow-y-auto scroll-smooth pr-2">
                {data?.recentAuditLogs.length ? (
                  data.recentAuditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start justify-between gap-3 rounded-lg border p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {log.action.replaceAll("_", " ")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {log.target}
                          {log.targetId ? ` #${log.targetId}` : ""} by{" "}
                          {log.actorEmail || "system"} on{" "}
                          {new Date(log.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => deleteAuditLog(log.id)}
                        aria-label="Delete audit activity"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-muted-foreground">
                    No audit activity yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Inquiries</CardTitle>
              <CardDescription>Latest contact messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-h-80 space-y-4 overflow-y-auto scroll-smooth pr-2">
                {data?.recentInquiries.length ? (
                  data.recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {inquiry.subject}
                        </p>
                        <p className="truncate text-sm text-muted-foreground">
                          From {inquiry.name}
                        </p>
                      </div>
                      <Badge variant="secondary">{inquiry.status}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="py-8 text-center text-muted-foreground">
                    No inquiries found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
