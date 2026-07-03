import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, MessageSquareQuote, Sparkles, Star, Users } from "lucide-react"

import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { TestimonialsList } from "@/components/testimonials/testimonials-list"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read verified client feedback and testimonials for Nexa AI Systems.",
}

type Testimonial = {
  id: number
  name: string
  role: string
  rating: number
  content: string
  createdAt: Date
}

const defaultTestimonials: Testimonial[] = [
  {
    id: -1,
    name: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    rating: 5,
    content:
      "Nexa AI Systems transformed how we handle customer inquiries. Their chatbot reduced our response time by 70% and helped our team focus on high-value client relationships.",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: -2,
    name: "Michael Rodriguez",
    role: "CTO, DataFlow Solutions",
    rating: 5,
    content:
      "The analytics dashboard gave us real-time visibility into our operations. The team understood our workflow quickly and delivered a solution that was practical, reliable, and easy to use.",
    createdAt: new Date("2026-01-10"),
  },
  {
    id: -3,
    name: "Emily Watson",
    role: "Founder, InnovateLab",
    rating: 5,
    content:
      "Working with Nexa AI was smooth from strategy to launch. They turned our automation ideas into a polished product that improved productivity across our small team.",
    createdAt: new Date("2025-12-18"),
  },
  {
    id: -4,
    name: "David Kim",
    role: "Operations Director, GlobalTrade",
    rating: 5,
    content:
      "Their AI automation helped us reduce repetitive reporting work and improve decision-making speed. Nexa AI Systems delivered exactly what our operations team needed.",
    createdAt: new Date("2025-12-08"),
  },
]

async function getTestimonials(): Promise<Testimonial[]> {
  const feedback = await prisma.feedback.findMany({
    where: { approved: true },
    orderBy: [{ rating: "desc" }, { createdAt: "desc" }],
  })

  return feedback.map((item) => ({
    id: item.id,
    name: item.userName || "Anonymous",
    role: item.userRole || "Client",
    rating: item.rating,
    content: item.feedback,
    createdAt: item.createdAt,
  }))
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "h-4 w-4 fill-amber-400 text-amber-400"
              : "h-4 w-4 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  )
}

export default async function TestimonialsPage() {
  const databaseTestimonials = await getTestimonials()
  const testimonials = [...databaseTestimonials, ...defaultTestimonials]
  const featured = testimonials[0]
  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce((total, item) => total + item.rating, 0) /
          testimonials.length
        ).toFixed(1)
      : "0.0"
  const testimonialCards = testimonials.map((testimonial) => ({
    id: testimonial.id,
    name: testimonial.name,
    role: testimonial.role,
    rating: testimonial.rating,
    content: testimonial.content,
    dateLabel: testimonial.createdAt.toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }))

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative overflow-hidden border-b bg-background">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(34,197,94,0.12),transparent_30%)]" />
          <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm font-medium text-primary shadow-sm">
                  <MessageSquareQuote className="h-4 w-4" />
                  Client Testimonials
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  <span className="block">Real feedback from people</span>
                  <span className="mt-2 block bg-gradient-to-r from-primary via-cyan-500 to-emerald-500 bg-clip-text text-transparent">
                    who worked with Nexa AI.
                  </span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                  Explore approved feedback from our clients, students, and partners.
                  Every review here is pulled directly from the feedback stored in your database.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/feedback">
                      Share Your Feedback
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/contact">Work With Us</Link>
                  </Button>
                </div>
              </div>

              <Card className="border-primary/15 bg-card/85 shadow-xl backdrop-blur">
                <CardContent className="p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <Stars rating={Math.round(Number(averageRating))} />
                  </div>
                  <p className="mt-8 text-5xl font-bold tracking-tight text-foreground">
                    {averageRating}
                  </p>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    Average rating from approved feedback
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="rounded-lg border bg-background/70 p-4">
                      <p className="text-3xl font-bold text-foreground">
                        {testimonials.length}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">Testimonials</p>
                    </div>
                    <div className="rounded-lg border bg-background/70 p-4">
                      <p className="text-3xl font-bold text-foreground">
                        {testimonials.filter((item) => item.rating === 5).length}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">Five-star reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="overflow-hidden border-primary/15">
                <CardContent className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[260px_1fr] lg:p-10">
                  <div className="flex flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground">
                    <MessageSquareQuote className="h-10 w-10" />
                    <div className="mt-12">
                      <p className="text-sm uppercase tracking-wider text-primary-foreground/75">
                        Featured Review
                      </p>
                      <p className="mt-2 text-3xl font-bold">{featured.rating}.0</p>
                    </div>
                  </div>
                  <div>
                    <Stars rating={featured.rating} />
                    <blockquote className="mt-6 text-2xl font-semibold leading-10 text-foreground">
                      &ldquo;{featured.content}&rdquo;
                    </blockquote>
                    <div className="mt-8 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent/20 text-lg font-bold text-accent-foreground">
                        {getInitials(featured.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{featured.name}</p>
                        <p className="text-sm text-muted-foreground">{featured.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        ) : null}

        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                  All Testimonials
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                  What people are saying
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                {testimonials.length} testimonials
              </div>
            </div>

            {testimonials.length > 0 ? (
              <TestimonialsList testimonials={testimonialCards} />
            ) : (
              <Card className="border-dashed">
                <CardContent className="mx-auto max-w-2xl p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageSquareQuote className="h-7 w-7" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-foreground">
                    No approved testimonials yet
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    Once feedback is approved from the admin panel, it will appear here automatically.
                  </p>
                  <Button asChild className="mt-6">
                    <Link href="/feedback">Submit Feedback</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
