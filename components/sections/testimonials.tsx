"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  rating: number
  content: string
}

const defaultTestimonials: Testimonial[] = [
  {
    id: -1,
    name: "Sarah Chen",
    role: "CEO, TechStart Inc.",
    rating: 5,
    content:
      "Nexa AI transformed our customer service with their chatbot solution. Response times dropped by 80% and customer satisfaction increased dramatically. Their team truly understands AI.",
  },
  {
    id: -2,
    name: "Michael Rodriguez",
    role: "CTO, DataFlow Solutions",
    rating: 5,
    content:
      "The analytics dashboard gave us real-time visibility into our operations. The team understood our workflow quickly and delivered a solution that was practical, reliable, and easy to use.",
  },
  {
    id: -3,
    name: "Emily Watson",
    role: "Founder, InnovateLab",
    rating: 5,
    content:
      "Working with Nexa AI was smooth from strategy to launch. They turned our automation ideas into a polished product that improved productivity across our small team.",
  },
  {
    id: -4,
    name: "David Kim",
    role: "Operations Director, GlobalTrade",
    rating: 5,
    content:
      "Their AI automation helped us reduce repetitive reporting work and improve decision-making speed. Nexa AI Systems delivered exactly what our operations team needed.",
  },
]

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/feedback?public=true")

        if (!response.ok) return

        const data = await response.json()
        const approvedTestimonials = data.map((item: Testimonial) => ({
          ...item,
          role: item.role || "Client",
        }))

        setTestimonials([...approvedTestimonials, ...defaultTestimonials])
        setActiveIndex(0)
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [testimonials.length])

  const testimonial = testimonials[activeIndex] || defaultTestimonials[0]

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    )
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <section className="bg-slate-50 py-14 dark:bg-background sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-primary">
            TESTIMONIALS
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-foreground sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600 dark:text-muted-foreground">
            Hear from businesses that have transformed their operations with our AI solutions.
          </p>
        </div>

        <div className="mt-10">
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-slate-200 bg-white/80 shadow-sm dark:border-border dark:bg-card">
              <CardContent className="p-6 sm:p-8 lg:p-10">
                <div className="text-5xl font-bold leading-none text-blue-200 dark:text-primary/30 sm:text-6xl">
                  &rdquo;
                </div>

                <div className="mt-5 flex items-center gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={
                        index < testimonial.rating
                          ? "h-4 w-4 fill-amber-400"
                          : "h-4 w-4 text-slate-300 dark:text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>

                <p className="mt-5 min-h-24 text-base leading-8 text-slate-950 dark:text-foreground sm:text-lg">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                <div className="mt-7 flex items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-border">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-lg font-medium text-blue-700 dark:bg-primary/15 dark:text-primary">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-950 dark:text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="truncate text-sm text-slate-600 dark:text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={goPrevious}
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 rounded-full"
                      onClick={goNext}
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-5 flex justify-center gap-2">
            {testimonials.slice(0, 8).map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={
                  index === activeIndex
                    ? "h-2 w-6 rounded-full bg-blue-700 transition-all dark:bg-primary"
                    : "h-2 w-2 rounded-full bg-slate-300 transition-all hover:bg-slate-400 dark:bg-muted-foreground/30 dark:hover:bg-muted-foreground/50"
                }
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
