"use client"

import { useState, useEffect } from "react"

import {
  Calendar,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Loader2,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"

import { Badge } from "@/components/ui/badge"

import { Label } from "@/components/ui/label"

import { Switch } from "@/components/ui/switch"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import AdminLayout from "@/components/admin/admin-layout"

interface Event {
  id: string | number
  title: string
  description?: string
  date: string
  endDate?: string
  location?: string
  coverImage?: string
  published: boolean
  createdAt: string
  eventType?: string
  availability?: string
  registrationEnabled?: boolean
  isDefault?: boolean
}

const eventTypeOptions = [
  "Conference",
  "Workshop",
  "Seminar",
  "Bootcamp",
  "Webinar",
  "Meetup",
  "Training",
  "Event",
]

const emptyForm = {
  id: "" as string | number,
  isDefault: false,
  title: "",
  description: "",
  date: "",
  endDate: "",
  eventType: "Event",
  availability: "",
  registrationEnabled: true,
  location: "",
  coverImage: "",
  published: true,
}

export default function EventsPage() {
  const [events, setEvents] =
    useState<Event[]>([])

  const [loading, setLoading] =
    useState(true)

  const [searchQuery, setSearchQuery] =
    useState("")

  const [dialogOpen, setDialogOpen] =
    useState(false)

  const [deleteId, setDeleteId] =
    useState<string | number | null>(null)

  const [form, setForm] =
    useState(emptyForm)

  const [saving, setSaving] =
    useState(false)

  const [saveError, setSaveError] =
    useState("")

  /* =========================
     FETCH EVENTS
  ========================= */

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents =
    async () => {
      try {
        const res =
          await fetch(
            "/api/admin/events"
          )

        if (res.ok) {
          const data =
            await res.json()

          setEvents(data)
        }
      } catch (error) {
        console.error(
          "Failed to fetch events:",
          error
        )
      } finally {
        setLoading(false)
      }
    }

  /* =========================
     SAVE EVENT
  ========================= */

  const handleSubmit =
    async () => {
      setSaving(true)
      setSaveError("")

      if (
        form.endDate &&
        new Date(form.endDate) <=
          new Date(form.date)
      ) {
        setSaveError(
          "End time start time bhanda pachhi hunu parcha."
        )
        setSaving(false)
        return
      }

      try {
        const method =
          form.id
            ? "PUT"
            : "POST"

        const res =
          await fetch(
            "/api/admin/events",
            {
              method,

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify(
                form
              ),
            }
          )

        if (res.ok) {
          await fetchEvents()

          setDialogOpen(
            false
          )

          setForm(
            emptyForm
          )
        } else {
          const data =
            await res.json()

          setSaveError(
            data.error ||
              "Failed to save event"
          )
        }
      } catch (error) {
        console.error(
          "Failed to save event:",
          error
        )

        setSaveError(
          "Failed to save event"
        )
      } finally {
        setSaving(false)
      }
    }

  /* =========================
     EDIT EVENT
  ========================= */

  const handleEdit = (
    event: Event
  ) => {
    setForm({
      id: event.id,
      isDefault: Boolean(event.isDefault),

      title: event.title,

      description:
        event.description ||
        "",

      date: new Date(
        event.date
      )
        .toISOString()
        .slice(0, 16),

      endDate: event.endDate
        ? new Date(
            event.endDate
          )
            .toISOString()
            .slice(0, 16)
        : "",

      eventType:
        event.eventType ||
        "Event",

      availability:
        event.availability ||
        "",

      registrationEnabled:
        event.registrationEnabled !==
        false,

      location:
        event.location ||
        "",

      coverImage:
        event.coverImage ||
        "",

      published:
        event.published,
    })

    setDialogOpen(true)
  }

  /* =========================
     DELETE EVENT
  ========================= */

  const handleDelete =
    async () => {
      if (!deleteId) return

      try {
        const res =
          await fetch(
            `/api/admin/events?id=${deleteId}`,
            {
              method:
                "DELETE",
            }
          )

        if (res.ok) {
          setEvents(
            events.filter(
              (e) =>
                e.id !==
                deleteId
            )
          )
        }
      } catch (error) {
        console.error(
          "Failed to delete event:",
          error
        )
      } finally {
        setDeleteId(null)
      }
    }

  /* =========================
     FILTER
  ========================= */

  const filteredEvents =
    events.filter((e) =>
      e.title
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )
    )

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[500px] items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* HEADER */}

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Events
            </h1>

            <p className="text-muted-foreground">
              Create and
              manage events
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* SEARCH */}

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                placeholder="Search events..."
                value={
                  searchQuery
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target
                      .value
                  )
                }
                className="pl-9"
              />
            </div>

            {/* BUTTON */}

            <Button
              onClick={() => {
                setForm(
                  emptyForm
                )

                setSaveError(
                  ""
                )

                setDialogOpen(
                  true
                )
              }}
            >
              <Plus className="mr-2 h-4 w-4" />

              New Event
            </Button>
          </div>
        </div>

        {/* TABLE */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />

              All Events (
              {
                filteredEvents.length
              }
              )
            </CardTitle>

            <CardDescription>
              Manage your
              events and
              webinars
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4 font-medium">
                      Event
                    </th>

                    <th className="pb-4 font-medium">
                      Time to Time
                    </th>

                    <th className="pb-4 font-medium">
                      Location
                    </th>

                    <th className="pb-4 font-medium">
                      Status
                    </th>

                    <th className="pb-4 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEvents.length ===
                  0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-muted-foreground"
                      >
                        No events
                        found
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map(
                      (
                        event
                      ) => (
                        <tr
                          key={
                            event.id
                          }
                          className="border-b last:border-0"
                        >
                          <td className="py-4">
                            <p className="font-medium">
                              {
                                event.title
                              }
                            </p>
                            {event.isDefault && (
                              <p className="mt-1 text-xs text-muted-foreground">
                                Default public event
                              </p>
                            )}
                            <div className="mt-2 flex flex-wrap gap-2">
                              <Badge variant="secondary">
                                {event.eventType ||
                                  "Event"}
                              </Badge>

                              {event.availability && (
                                <Badge variant="outline">
                                  {
                                    event.availability
                                  }
                                </Badge>
                              )}
                            </div>
                          </td>

                          <td className="py-4 text-muted-foreground">
                            <div>
                              {new Date(
                                event.date
                              ).toLocaleDateString(
                                "en-US",
                                {
                                  weekday:
                                    "short",

                                  year: "numeric",

                                  month:
                                    "short",

                                  day: "numeric",
                                }
                              )}
                            </div>
                            <div className="mt-1 text-xs">
                              {new Date(
                                event.date
                              ).toLocaleTimeString(
                                "en-US",
                                {
                                  hour:
                                    "numeric",
                                  minute:
                                    "2-digit",
                                }
                              )}
                              {event.endDate
                                ? ` - ${new Date(
                                    event.endDate
                                  ).toLocaleTimeString(
                                    "en-US",
                                    {
                                      hour:
                                        "numeric",
                                      minute:
                                        "2-digit",
                                    }
                                  )}`
                                : ""}
                            </div>
                          </td>

                          <td className="py-4">
                            {event.location && (
                              <span className="flex items-center gap-1 text-muted-foreground">
                                <MapPin className="h-3 w-3" />

                                {
                                  event.location
                                }
                              </span>
                            )}
                          </td>

                          <td className="py-4">
                            <Badge
                              variant={
                                event.published
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {event.published
                                ? "Published"
                                : "Draft"}
                            </Badge>
                            <div className="mt-2">
                              <Badge
                                variant={
                                  event.registrationEnabled ===
                                  false
                                    ? "secondary"
                                    : "outline"
                                }
                              >
                                {event.registrationEnabled ===
                                false
                                  ? "Registration Off"
                                  : "Registration On"}
                              </Badge>
                            </div>
                          </td>

                          <td className="py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleEdit(
                                      event
                                    )
                                  }
                                >
                                  <Edit className="mr-2 h-4 w-4" />

                                  Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    setDeleteId(
                                      event.id
                                    )
                                  }
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />

                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DIALOG */}

      <Dialog
        open={dialogOpen}
        onOpenChange={
          setDialogOpen
        }
      >
        <DialogContent className="grid max-h-[90vh] max-w-xl grid-rows-[auto_1fr_auto] overflow-hidden p-0">
          <DialogHeader>
            <DialogTitle className="px-6 pt-6">
              {form.id
                ? "Edit Event"
                : "Create Event"}
            </DialogTitle>

            <DialogDescription className="px-6">
              {form.id
                ? "Update event details"
                : "Create a new event"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 overflow-y-auto px-6 py-4 scroll-smooth">
            {/* TITLE */}

            <div className="space-y-2">
              <Label>
                Title
              </Label>

              <Input
                value={
                  form.title
                }
                disabled={form.isDefault}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title:
                      e.target
                        .value,
                  })
                }
                placeholder="Event title"
              />
            </div>

            {/* DATE */}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Event Type
                </Label>

                <Select
                  value={
                    form.eventType
                  }
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      eventType:
                        value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypeOptions.map(
                      (type) => (
                        <SelectItem
                          key={type}
                          value={type}
                        >
                          {type}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Seats / Spots
                </Label>

                <Input
                  value={
                    form.availability
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      availability:
                        e.target
                          .value,
                    })
                  }
                  placeholder="50 spots remaining"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Time to Time -
                Start
              </Label>

              <Input
                type="datetime-local"
                value={
                  form.date
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    date: e
                      .target
                      .value,
                  })
                }
              />
            </div>

            {/* END DATE */}

            <div className="space-y-2">
              <Label>
                Time to Time -
                End
              </Label>

              <Input
                type="datetime-local"
                value={
                  form.endDate
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    endDate: e
                      .target
                      .value,
                  })
                }
              />
            </div>

            {/* LOCATION */}

            <div className="space-y-2">
              <Label>
                Location
              </Label>

              <Input
                value={
                  form.location
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    location:
                      e.target
                        .value,
                  })
                }
                placeholder="Kathmandu, Nepal"
              />
            </div>

            {/* DESCRIPTION */}

            <div className="space-y-2">
              <Label>
                Description
              </Label>

              <Textarea
                rows={5}
                value={
                  form.description
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target
                        .value,
                  })
                }
                placeholder="Event description..."
              />
            </div>

            {/* STATUS */}

            <div className="flex items-center gap-3">
              <Switch
                checked={
                  form.published
                }
                onCheckedChange={(
                  checked
                ) =>
                  setForm({
                    ...form,
                    published:
                      checked,
                  })
                }
              />

              <Label className="flex items-center gap-2 cursor-pointer">
                {form.published ? (
                  <>
                    <Eye className="h-4 w-4" />

                    Published
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />

                    Draft
                  </>
                )}
              </Label>
            </div>

            {/* REGISTRATION */}

            <div className="flex items-center gap-3">
              <Switch
                checked={
                  form.registrationEnabled
                }
                onCheckedChange={(
                  checked
                ) =>
                  setForm({
                    ...form,
                    registrationEnabled:
                      checked,
                  })
                }
              />

              <Label className="cursor-pointer">
                Registration Button
                {form.registrationEnabled
                  ? " On"
                  : " Off"}
              </Label>
            </div>

            {saveError && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {saveError}
              </p>
            )}
          </div>

          {/* FOOTER */}

          <DialogFooter className="border-t bg-background px-6 py-4">
            <Button
              variant="outline"
              onClick={() =>
                setDialogOpen(
                  false
                )
              }
            >
              Cancel
            </Button>

            <Button
              onClick={
                handleSubmit
              }
              disabled={
                saving ||
                !form.title ||
                !form.date
              }
            >
              {saving
                ? "Saving..."
                : form.id
                ? "Update Event"
                : "Create Event"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DELETE ALERT */}

      <AlertDialog
        open={!!deleteId}
        onOpenChange={() =>
          setDeleteId(null)
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Event
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you
              want to delete
              this event? This
              action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={
                handleDelete
              }
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
