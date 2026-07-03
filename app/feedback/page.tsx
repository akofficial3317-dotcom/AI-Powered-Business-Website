"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, Send, Star } from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { readJsonResponse } from "@/lib/api-response"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function FeedbackPage() {
  const [rating, setRating] = useState(5)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setLoading(true)
    setSuccess("")
    setError("")

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          message,
          userName,
          userRole,
        }),
      })

      const data = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit feedback")
      }

      setRating(5)
      setUserName("")
      setUserRole("")
      setMessage("")
      setSuccess(
        "\uD83C\uDF89 Thank You for Your Feedback!\n\nWe sincerely appreciate your valuable feedback. Your opinion helps us improve our services and provide a better user experience.\n\nOur team will review your suggestions and continue working to enhance our platform.\n\nThank you for trusting us! \uD83D\uDE0A"
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Feedback
              </span>
              <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                Share Your Experience
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Tell us how Nexa AI Systems can improve our service, support, and digital experience.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="mx-auto max-w-2xl">
              <CardContent className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <Label>Rating</Label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const value = index + 1

                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setRating(value)}
                            className="rounded-md p-1 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-label={`Rate ${value} out of 5`}
                          >
                            <Star
                              className={`h-8 w-8 ${
                                value <= rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userName">Name</Label>
                    <Input
                      id="userName"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userRole">Position</Label>
                    <Input
                      id="userRole"
                      value={userRole}
                      onChange={(event) => setUserRole(event.target.value)}
                      placeholder="Client, Professor, CTO, InnovateLab"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Feedback *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      required
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Write your feedback..."
                    />
                  </div>

                  {success && (
                    <p className="whitespace-pre-line rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
                      {success}
                    </p>
                  )}

                  {error && (
                    <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
