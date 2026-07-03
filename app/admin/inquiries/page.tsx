"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Search, MoreVertical, Trash2, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

interface Inquiry {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "PENDING" | "IN_PROGRESS" | "RESOLVED"
  createdAt: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/admin/inquiries")
      if (res.ok) {
        const data = await res.json()
        setInquiries(data)
      }
    } catch (error) {
      console.error("Failed to fetch inquiries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (res.ok) {
        setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status: status as Inquiry["status"] } : i)))
        if (selectedInquiry?.id === id) {
          setSelectedInquiry({ ...selectedInquiry, status: status as Inquiry["status"] })
        }
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/inquiries?id=${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        setInquiries(inquiries.filter((i) => i.id !== deleteId))
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error)
    } finally {
      setDeleteId(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary"><Clock className="mr-1 h-3 w-3" />Pending</Badge>
      case "IN_PROGRESS":
        return <Badge variant="default"><Clock className="mr-1 h-3 w-3" />In Progress</Badge>
      case "RESOLVED":
        return <Badge variant="outline"><CheckCircle className="mr-1 h-3 w-3" />Resolved</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredInquiries = inquiries.filter(
    (i) =>
      i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inquiries</h1>
            <p className="text-muted-foreground">Manage customer inquiries and support requests</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              All Inquiries ({filteredInquiries.length})
            </CardTitle>
            <CardDescription>View and respond to customer inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 font-medium">From</th>
                    <th className="pb-3 font-medium">Subject</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No inquiries found
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr
                        key={inquiry.id}
                        className="border-b last:border-0 cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        <td className="py-4">
                          <div>
                            <p className="font-medium">{inquiry.name}</p>
                            <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="max-w-[200px] truncate">{inquiry.subject}</p>
                        </td>
                        <td className="py-4">{getStatusBadge(inquiry.status)}</td>
                        <td className="py-4 text-muted-foreground">
                          {new Date(inquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "PENDING")}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark Pending
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "IN_PROGRESS")}>
                                <Clock className="mr-2 h-4 w-4" />
                                Mark In Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(inquiry.id, "RESOLVED")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark Resolved
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setDeleteId(inquiry.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedInquiry?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedInquiry?.name} ({selectedInquiry?.email})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {selectedInquiry && getStatusBadge(selectedInquiry.status)}
              <p className="text-sm text-muted-foreground">
                {selectedInquiry && new Date(selectedInquiry.createdAt).toLocaleString()}
              </p>
            </div>
            {selectedInquiry?.phone && (
              <p className="text-sm">
                <span className="font-medium">Phone:</span> {selectedInquiry.phone}
              </p>
            )}
            <div className="rounded-lg bg-muted p-4">
              <p className="whitespace-pre-wrap">{selectedInquiry?.message}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedInquiry && handleStatusChange(selectedInquiry.id, "IN_PROGRESS")}
              >
                <Clock className="mr-2 h-4 w-4" />
                In Progress
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => selectedInquiry && handleStatusChange(selectedInquiry.id, "RESOLVED")}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Resolved
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this inquiry? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  )
}
