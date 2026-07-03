"use client"

import { Suspense, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { readJsonResponse } from "@/lib/api-response"

function ForgotPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams.get("token") || "", [searchParams])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [devResetUrl, setDevResetUrl] = useState("")

  const requestReset = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setMessage("")
    setDevResetUrl("")
    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "request", email }),
      })
      const data = await readJsonResponse<{
        error?: string
        message?: string
        devResetUrl?: string
      }>(response)

      if (!response.ok) {
        setError(data.error || "Unable to create reset link")
        return
      }

      setMessage(data.message || "Reset link generated.")
      setDevResetUrl(data.devResetUrl || "")
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const confirmReset = async (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    setMessage("")

    if (password !== confirmPassword) {
      setError("New password and confirm password do not match")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "confirm", token, password }),
      })
      const data = await readJsonResponse(response)

      if (!response.ok) {
        setError(data.error || "Password reset failed")
        return
      }

      setMessage("Password reset successfully. Redirecting to login...")
      setTimeout(() => router.push("/login"), 900)
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to login
            </Link>
          </Button>

          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <CardTitle>{token ? "Set New Password" : "Reset Password"}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {token
                  ? "Use your secure reset token to update the admin password."
                  : "Enter the admin email to generate a single-use reset link."}
              </p>
            </CardHeader>

            <CardContent>
              {token ? (
                <form onSubmit={confirmReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      required
                      minLength={8}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  {error && (
                    <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  {message && (
                    <p className="flex items-center gap-2 rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4" />
                      {message}
                    </p>
                  )}
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Password
                  </Button>
                </form>
              ) : (
                <form onSubmit={requestReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="admin@example.com"
                    />
                  </div>
                  {error && (
                    <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  {message && (
                    <p className="rounded-md border border-green-500/30 bg-green-500/10 px-3 py-2 text-sm text-green-700">
                      {message}
                    </p>
                  )}
                  {devResetUrl && (
                    <div className="rounded-md border bg-muted p-3 text-sm">
                      <p className="mb-2 font-medium">Demo reset link</p>
                      <Link href={devResetUrl} className="break-all text-primary underline">
                        {devResetUrl}
                      </Link>
                    </div>
                  )}
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Generate Reset Link
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <ForgotPasswordForm />
    </Suspense>
  )
}
