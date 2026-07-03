"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CalendarCheck,
  CheckCircle,
  Download,
  Clock,
  Mail,
  MoreVertical,
  Search,
  Trash2,
  Users,
  XCircle,
} from "lucide-react"

import AdminLayout from "@/components/admin/admin-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface EventRegistration {
  id: number
  eventId?: number | null
  eventTitle: string
  name: string
  email: string
  phone?: string | null
  organization?: string | null
  message?: string | null
  status: "pending" | "confirmed" | "attended" | "cancelled"
  createdAt: string
  event?: {
    id: number
    title: string
    date: string
    location: string
  } | null
}

const statusOptions = [
  { label: "Pending", value: "pending", icon: Clock },
  { label: "Confirmed", value: "confirmed", icon: CheckCircle },
  { label: "Attended", value: "attended", icon: CalendarCheck },
  { label: "Cancelled", value: "cancelled", icon: XCircle },
] as const

function StatusBadge({ status }: { status: EventRegistration["status"] }) {
  const option = statusOptions.find((item) => item.value === status) ?? statusOptions[0]
  const Icon = option.icon

  return (
    <Badge variant={status === "cancelled" ? "secondary" : status === "pending" ? "outline" : "default"}>
      <Icon className="mr-1 h-3 w-3" />
      {option.label}
    </Badge>
  )
}

export default function EventRegistrationsPage() {
  const [registrations, setRegistrations] = useState<EventRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/admin/event-registrations")
      if (response.ok) {
        const data = await response.json()
        setRegistrations(data.registrations ?? [])
      }
    } catch (error) {
      console.error("Failed to fetch event registrations:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: EventRegistration["status"]) => {
    const response = await fetch("/api/admin/event-registrations", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })

    if (response.ok) {
      setRegistrations((items) =>
        items.map((item) => (item.id === id ? { ...item, status } : item))
      )
    }
  }

  const deleteRegistration = async (id: number) => {
    const response = await fetch(`/api/admin/event-registrations?id=${id}`, {
      method: "DELETE",
    })

    if (response.ok) {
      setRegistrations((items) => items.filter((item) => item.id !== id))
    }
  }

  const exportCsv = () => {
    const params = new URLSearchParams()
    if (searchQuery) params.set("search", searchQuery)
    params.set("format", "csv")
    window.location.href = `/api/admin/event-registrations?${params.toString()}`
  }

  const filteredRegistrations = useMemo(() => {
    const query = searchQuery.toLowerCase()

    return registrations.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.eventTitle.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    )
  }, [registrations, searchQuery])

  const confirmedCount = registrations.filter(
    (item) => item.status === "confirmed" || item.status === "attended"
  ).length

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Event Registrations</h1>
            <p className="text-muted-foreground">
              Track visitors who register for conferences, workshops, and seminars.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search registrations..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-9"
              />
            </div>
            <Button type="button" variant="outline" onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Total Registrations</p>
                <p className="mt-1 text-3xl font-bold">{registrations.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed / Attended</p>
                <p className="mt-1 text-3xl font-bold">{confirmedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">Pending Follow-up</p>
                <p className="mt-1 text-3xl font-bold">
                  {registrations.filter((item) => item.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Registrations ({filteredRegistrations.length})
            </CardTitle>
            <CardDescription>
              Confirm attendance, track follow-up status, and remove invalid registrations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex min-h-[260px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : filteredRegistrations.length ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Registrant</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell>
                          <div className="font-medium">{registration.name}</div>
                          <a
                            href={`mailto:${registration.email}`}
                            className="mt-1 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
                          >
                            <Mail className="h-3 w-3" />
                            {registration.email}
                          </a>
                          {registration.organization && (
                            <div className="text-xs text-muted-foreground">
                              {registration.organization}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{registration.eventTitle}</div>
                          {registration.event && (
                            <div className="text-xs text-muted-foreground">
                              {new Date(registration.event.date).toLocaleString()} -{" "}
                              {registration.event.location}
                            </div>
                          )}
                          {registration.message && (
                            <div className="mt-1 max-w-xs truncate text-xs text-muted-foreground">
                              {registration.message}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={registration.status} />
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(registration.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {statusOptions.map((option) => (
                                <DropdownMenuItem
                                  key={option.value}
                                  onClick={() => updateStatus(registration.id, option.value)}
                                >
                                  <option.icon className="mr-2 h-4 w-4" />
                                  Mark {option.label}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuItem
                                onClick={() => deleteRegistration(registration.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="py-10 text-center text-muted-foreground">
                No event registrations found.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
