"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { readJsonResponse } from "@/lib/api-response"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Brain,
  Loader2,
  Eye,
  EyeOff,
} from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  /* =========================
     LOGIN SUBMIT
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setIsLoading(true)

    setError("")

    try {
      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          credentials: "same-origin",

          body: JSON.stringify(
            formData
          ),
        }
      )

      const data =
        await readJsonResponse<{
          error?: string
          user?: unknown
        }>(response)

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Login failed"
        )
      }

      /* =========================
         SAVE USER
      ========================= */

      try {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )
      } catch {
        // The auth cookie is enough for admin access.
      }

      /* =========================
         REDIRECT ADMIN DASHBOARD
      ========================= */

      router.replace("/admin")

      window.setTimeout(() => {
        window.location.href = "/admin"
      }, 300)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}

      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,_rgba(255,255,255,0.1)_1px,_transparent_1px),linear-gradient(to_bottom,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[size:4rem_4rem]" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-primary-foreground">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="text-center"
          >
            {/* LOGO */}

            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="bg-white/20 rounded-xl p-3">
                <Brain className="h-10 w-10" />
              </div>

              <div className="text-left">
                <span className="text-2xl font-bold block">
                  Nexa AI
                </span>

                <span className="text-xs opacity-70 tracking-wider">
                  SYSTEMS
                </span>
              </div>
            </Link>

            {/* TITLE */}

            <h1 className="text-3xl font-bold mb-4">
              Welcome Back
            </h1>

            <p className="text-primary-foreground/80 max-w-md">
              Admin sign in to manage
              dashboard content,
              website records, and
              AI-powered insights.
            </p>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-background">
        <motion.div
          initial={{
            opacity: 0,
            x: 20,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-md"
        >
          {/* MOBILE LOGO */}

          <div className="lg:hidden text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              <div className="bg-primary rounded-lg p-2">
                <Brain className="h-6 w-6 text-primary-foreground" />
              </div>

              <span className="text-xl font-bold text-foreground">
                Nexa AI
              </span>
            </Link>
          </div>

          {/* LOGIN CARD */}

          <Card>
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Sign In
              </h2>

              <p className="text-muted-foreground">
                Enter your
                admin credentials to
                continue
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-4"
              >
                {/* EMAIL */}

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email
                  </Label>

                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={
                      formData.email
                    }
                    onChange={(e) =>
                      setFormData(
                        {
                          ...formData,
                          email:
                            e.target
                              .value,
                        }
                      )
                    }
                    required
                    disabled={
                      isLoading
                    }
                  />
                </div>

                {/* PASSWORD */}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      Password
                    </Label>

                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot
                      password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={
                        formData.password
                      }
                      onChange={(e) =>
                        setFormData(
                          {
                            ...formData,
                            password:
                              e.target
                                .value,
                          }
                        )
                      }
                      required
                      disabled={
                        isLoading
                      }
                    />

                    {/* SHOW / HIDE */}

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* ERROR */}

                {error && (
                  <p className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                {/* SUBMIT BUTTON */}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    isLoading
                  }
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing
                      in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>

            {/* FOOTER */}

            <CardFooter className="flex flex-col gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Admin access only.
              </p>
            </CardFooter>
          </Card>

          {/* TERMS */}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By signing in,
            you agree to our{" "}
            <Link
              href="/terms"
              className="hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
