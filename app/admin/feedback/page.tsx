"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Search, Star, Trash2, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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

interface Feedback {
  id: number
  rating: number
  message: string
  approved: boolean
  createdAt: string
  user?: { name: string; role: string; email: string }
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const res = await fetch("/api/feedback")
      if (res.ok) {
        const data = await res.json()
        setFeedback(data)
      }
    } catch (error) {
      console.error("Failed to fetch feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/feedback?id=${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        setFeedback(feedback.filter((f) => f.id !== deleteId))
      }
    } catch (error) {
      console.error("Failed to delete feedback:", error)
    } finally {
      setDeleteId(null)
    }
  }

  const handleApproval = async (id: number, approved: boolean) => {
    try {
      const res = await fetch("/api/feedback", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, approved }),
      })

      if (res.ok) {
        const updated = await res.json()
        setFeedback(feedback.map((item) => (item.id === id ? updated : item)))
      }
    } catch (error) {
      console.error("Failed to update feedback:", error)
    }
  }

  const filteredFeedback = feedback.filter(
    (f) =>
      f.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.user?.name && f.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const averageRating =
    feedback.length > 0
      ? (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1)
      : "0"
  const approvedCount = feedback.filter((f) => f.approved).length
  const pendingCount = feedback.length - approvedCount

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
            <h1 className="text-3xl font-bold tracking-tight">Feedback</h1>
            <p className="text-muted-foreground">View customer feedback and ratings</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-yellow-500/10 p-3">
                  <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{averageRating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <Star className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{approvedCount}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{feedback.length}</p>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              All Feedback ({filteredFeedback.length})
            </CardTitle>
            <CardDescription>
              Customer feedback and reviews. Approved items appear in public testimonials.
              {pendingCount > 0 ? ` ${pendingCount} pending approval.` : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFeedback.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No feedback found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedback.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < item.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{item.rating}/5</span>
                          <Badge variant={item.approved ? "default" : "secondary"}>
                            {item.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{item.message}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {item.user ? (
                            <span>
                              {item.user.name} - {item.user.role || "Client"}
                            </span>
                          ) : (
                            <span>Anonymous</span>
                          )}
                          <span>-</span>
                          <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleApproval(item.id, !item.approved)}
                          className={
                            item.approved
                              ? "text-muted-foreground hover:text-orange-600"
                              : "text-muted-foreground hover:text-green-600"
                          }
                          title={item.approved ? "Move to pending" : "Approve feedback"}
                        >
                          {item.approved ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this feedback? This action cannot be undone.
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
