export interface DefaultEvent {
  id: number
  title: string
  description: string
  date: string
  endDate: string
  location: string
  coverImage: string | null
  published: boolean
  createdAt: string
  eventType: string
  availability: string
  registrationEnabled: boolean
  isDefault: true
}

export const HIDDEN_DEFAULT_EVENT_TYPE = "__hidden_default_event__"

export const defaultEvents: DefaultEvent[] = [
  {
    id: -1001,
    title: "AI Innovation Summit 2026",
    description:
      "Join industry leaders for a day of insights on the latest AI trends, practical workshops, and networking opportunities.",
    date: "2026-08-15T09:00:00",
    endDate: "2026-08-15T17:00:00",
    location: "Kathmandu Convention Center",
    coverImage: null,
    published: true,
    createdAt: "2026-08-15T09:00:00",
    eventType: "Conference",
    availability: "Limited seats available",
    registrationEnabled: true,
    isDefault: true,
  },
  {
    id: -1002,
    title: "Machine Learning Masterclass",
    description:
      "A hands-on workshop covering advanced ML techniques, model optimization, and deployment strategies.",
    date: "2026-08-22T10:00:00",
    endDate: "2026-08-22T16:00:00",
    location: "Biratnagar Tech Park",
    coverImage: null,
    published: true,
    createdAt: "2026-08-22T10:00:00",
    eventType: "Workshop",
    availability: "50 spots remaining",
    registrationEnabled: true,
    isDefault: true,
  },
]

export const findDefaultEventById = (id: number) =>
  defaultEvents.find((event) => event.id === id)

export const findDefaultEventByTitle = (title: string) =>
  defaultEvents.find(
    (event) => event.title.toLowerCase() === title.toLowerCase()
  )
