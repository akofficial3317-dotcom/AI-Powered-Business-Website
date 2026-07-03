"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TopicPhoto } from "@/components/topic-photo"
import Link from "next/link"
import { Calendar, MapPin, Clock, ArrowRight, Users, Loader2 } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  eventType?: string
  availability?: string
  registrationEnabled?: boolean
  isDefault?: boolean
}

const pastEvents = [
  {
    id: 101,
    title: "AI Trends 2025 Recap",
    date: "2025-12-10",
    attendees: "500+",
  },
  {
    id: 102,
    title: "Enterprise Automation Summit",
    date: "2025-11-15",
    attendees: "300+",
  },
  {
    id: 103,
    title: "NLP Deep Dive",
    date: "2025-10-20",
    attendees: "150+",
  },
]

const getEventTypeColor = (type: string) => {
  switch (type) {
    case "Conference":
      return "bg-chart-1/10 text-chart-1"
    case "Workshop":
      return "bg-chart-2/10 text-chart-2"
    case "Seminar":
      return "bg-chart-3/10 text-chart-3"
    case "Bootcamp":
      return "bg-chart-4/10 text-chart-4"
    default:
      return "bg-primary/10 text-primary"
  }
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registrationLoading, setRegistrationLoading] = useState(false)
  const [registrationMessage, setRegistrationMessage] = useState("")
  const [registrationError, setRegistrationError] = useState("")
  const [registrationForm, setRegistrationForm] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events")

        if (res.ok) {
          setEvents(await res.json())
        }
      } catch (error) {
        console.error("Failed to fetch events:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const upcomingEvents = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return events
      .filter((event) => {
        const eventDate = new Date(event.date)
        eventDate.setHours(0, 0, 0, 0)

        return eventDate >= today
      })
      .sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      )
  }, [events])

  const formatEventTime = (date: string) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    })

  const formatEventTimeRange = (event: Event) =>
    event.endDate
      ? `${formatEventTime(event.date)} - ${formatEventTime(event.endDate)}`
      : formatEventTime(event.date)

  const openRegistration = (event: Event) => {
    setSelectedEvent(event)
    setRegistrationMessage("")
    setRegistrationError("")
  }

  const submitRegistration = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!selectedEvent) return

    setRegistrationLoading(true)
    setRegistrationError("")
    setRegistrationMessage("")

    try {
      const response = await fetch("/api/event-registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id > 0 ? selectedEvent.id : undefined,
          eventTitle: selectedEvent.title,
          ...registrationForm,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        setRegistrationError(data.error || "Registration failed")
        return
      }

      setRegistrationMessage("Registration submitted. Our team will follow up soon.")
      setRegistrationForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
      })
    } catch {
      setRegistrationError("Something went wrong")
    } finally {
      setRegistrationLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Events</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Upcoming Events & Workshops
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Join us for conferences, workshops, and seminars designed to help you 
                stay ahead in the rapidly evolving world of AI.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Upcoming Events</h2>
            <div className="space-y-5">
              {loading ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    Loading events...
                  </CardContent>
                </Card>
              ) : upcomingEvents.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No upcoming events found.
                  </CardContent>
                </Card>
              ) : (
              upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden rounded-lg hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="grid gap-0 md:grid-cols-[120px_1fr_auto]">
                        {/* Date Box */}
                        <div className="bg-primary text-primary-foreground p-5 flex min-h-32 flex-col items-center justify-center md:min-h-[170px]">
                          <span className="text-sm font-semibold opacity-80">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </span>
                          <span className="text-4xl font-bold leading-none">
                            {new Date(event.date).getDate()}
                          </span>
                          <span className="text-lg opacity-80">
                            {new Date(event.date).getFullYear()}
                          </span>
                        </div>

                        {/* Event Details */}
                        <div className="p-5 md:px-7 md:py-6">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.eventType || "Event")}`}>
                              {event.eventType || "Event"}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {event.availability || "Registration open"}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            {event.title}
                          </h3>
                          <p className="text-base text-muted-foreground mb-4">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {formatEventTimeRange(event)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {event.location}
                            </span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center px-5 pb-5 md:p-6">
                          {event.registrationEnabled === false ? (
                            <span className="rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                              Registration Closed
                            </span>
                          ) : (
                            <Button
                              type="button"
                              size="sm"
                              className="rounded-md px-4"
                              onClick={() => openRegistration(event)}
                            >
                                Register
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Past Events</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <TopicPhoto topic={`${event.title} event`} alt={`${event.title} past event photo`} compact className="mb-4" />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{event.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.attendees} attendees
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Stay Updated on Our Events
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive early access to event registrations 
              and exclusive content.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Subscribe Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Dialog open={Boolean(selectedEvent)} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Register for {selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitRegistration} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  required
                  value={registrationForm.name}
                  onChange={(event) =>
                    setRegistrationForm((form) => ({ ...form, name: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={registrationForm.email}
                  onChange={(event) =>
                    setRegistrationForm((form) => ({ ...form, email: event.target.value }))
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={registrationForm.phone}
                  onChange={(event) =>
                    setRegistrationForm((form) => ({ ...form, phone: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={registrationForm.organization}
                  onChange={(event) =>
                    setRegistrationForm((form) => ({
                      ...form,
                      organization: event.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={4}
                value={registrationForm.message}
                onChange={(event) =>
                  setRegistrationForm((form) => ({ ...form, message: event.target.value }))
                }
              />
            </div>
            {registrationError && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {registrationError}
              </p>
            )}
            {registrationMessage && (
              <p className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700">
                {registrationMessage}
              </p>
            )}
            <Button type="submit" disabled={registrationLoading} className="w-full">
              {registrationLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Registration
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Footer />
      <ChatWidget />
    </>
  )
}
