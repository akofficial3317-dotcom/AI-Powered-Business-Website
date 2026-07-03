"use client"

import { useState, useEffect } from "react"
import { Bot, Search, Trash2, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface ChatMessage {
  id: string
  userMessage: string
  botResponse: string
  createdAt: string
  user?: { name: string; email: string }
}

export default function ChatHistoryPage() {
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      const res = await fetch("/api/admin/chat-history")
      if (res.ok) {
        const data = await res.json()
        setChats(data)
      }
    } catch (error) {
      console.error("Failed to fetch chat history:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      const res = await fetch(`/api/admin/chat-history?id=${deleteId}`, { method: "DELETE" })
      if (res.ok) {
        setChats(chats.filter((c) => c.id !== deleteId))
      }
    } catch (error) {
      console.error("Failed to delete chat:", error)
    } finally {
      setDeleteId(null)
    }
  }

  const filteredChats = chats.filter(
    (c) =>
      c.userMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.botResponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.user?.name && c.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
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
            <h1 className="text-3xl font-bold tracking-tight">Chat History</h1>
            <p className="text-muted-foreground">View AI chatbot conversation history</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold">{chats.length}</p>
                  <p className="text-sm text-muted-foreground">Total Conversations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-green-500/10 p-3">
                  <User className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    {new Set(chats.filter((c) => c.user).map((c) => c.user?.email)).size}
                  </p>
                  <p className="text-sm text-muted-foreground">Unique Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Conversation History ({filteredChats.length})
            </CardTitle>
            <CardDescription>All chatbot conversations</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredChats.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No chat history found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="rounded-lg border bg-card p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">
                              {chat.user ? chat.user.name : "Anonymous"} -{" "}
                              {new Date(chat.createdAt).toLocaleString()}
                            </p>
                            <p className="text-sm">{chat.userMessage}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Bot className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-muted-foreground mb-1">Nexa AI</p>
                            <p className="text-sm">{chat.botResponse}</p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(chat.id)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
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
