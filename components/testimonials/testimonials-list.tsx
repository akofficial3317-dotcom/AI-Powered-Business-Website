"use client"

import { MessageSquareQuote, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type TestimonialCardItem = {
  id: number
  name: string
  role: string
  rating: number
  content: string
  dateLabel: string
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
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={
            index < rating
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400"
              : "h-3.5 w-3.5 text-muted-foreground/30"
          }
        />
      ))}
    </div>
  )
}

export function TestimonialsList({
  testimonials,
}: {
  testimonials: TestimonialCardItem[]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((testimonial) => {
        const shouldTruncate = testimonial.content.length > 155

        return (
          <Dialog key={testimonial.id}>
            <Card className="h-full transition-all hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-md">
              <CardContent className="flex h-full flex-col p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold leading-tight text-foreground">
                        {testimonial.name}
                      </h3>
                      <p className="truncate text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <MessageSquareQuote className="h-4 w-4 shrink-0 text-primary/50" />
                </div>

                <div className="mt-4">
                  <Stars rating={testimonial.rating} />
                </div>

                <p className="mt-3 flex-1 text-xs leading-6 text-muted-foreground">
                  {shouldTruncate
                    ? `${testimonial.content.slice(0, 155).trim()}...`
                    : testimonial.content}
                </p>

                <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3">
                  <p className="text-[11px] font-medium text-muted-foreground">
                    {testimonial.dateLabel}
                  </p>
                  {shouldTruncate ? (
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="shrink-0 text-xs font-semibold text-primary underline-offset-4 hover:underline"
                      >
                        Read more
                      </button>
                    </DialogTrigger>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>{testimonial.name}</DialogTitle>
                <DialogDescription>{testimonial.role}</DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <Stars rating={testimonial.rating} />
                <p className="text-sm leading-7 text-muted-foreground">
                  {testimonial.content}
                </p>
                <p className="border-t pt-4 text-xs font-medium text-muted-foreground">
                  {testimonial.dateLabel}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}
