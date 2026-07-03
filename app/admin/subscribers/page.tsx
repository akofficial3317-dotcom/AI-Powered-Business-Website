"use client"

import { useEffect, useState } from "react"
import { Mail } from "lucide-react"

import AdminLayout from "@/components/admin/admin-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Subscriber {
  id: number
  subscribedEmail: string
  createdAt: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/admin/subscribers")
      if (response.ok) {
        const data = await response.json()
        setSubscribers(data.subscribers ?? [])
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Newsletter Subscribers
          </h1>
          <p className="text-muted-foreground">
            View email addresses collected from the public newsletter form.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Subscribers
            </CardTitle>
            <CardDescription>
              {subscribers.length} subscribed email
              {subscribers.length === 1 ? "" : "s"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex min-h-[240px] items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : subscribers.length ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscribed Email</TableHead>
                      <TableHead>Subscribed Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">
                          {subscriber.subscribedEmail}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(subscriber.createdAt).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="py-10 text-center text-muted-foreground">
                No newsletter subscribers yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
