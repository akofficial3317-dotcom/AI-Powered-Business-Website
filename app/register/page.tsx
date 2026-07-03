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
  CheckCircle2,
} from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

  const [showPassword, setShowPassword] =
    useState(false)

  const [isLoading, setIsLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  /* =========================
     PASSWORD REQUIREMENTS
  ========================= */

  const passwordRequirements = [
    {
      label:
        "At least 8 characters",
      met:
        formData.password.length >=
        8,
    },

    {
      label:
        "Contains a number",
      met: /\d/.test(
        formData.password
      ),
    },

    {
      label:
        "Contains uppercase",
      met: /[A-Z]/.test(
        formData.password
      ),
    },
  ]

  /* =========================
     REGISTER SUBMIT
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setIsLoading(true)

    setError("")

    /* PASSWORD MATCH */

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match"
      )

      setIsLoading(false)

      return
    }

    /* PASSWORD VALIDATION */

    if (
      !passwordRequirements.every(
        (r) => r.met
      )
    ) {
      setError(
        "Please meet all password requirements"
      )

      setIsLoading(false)

      return
    }

    try {
      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email:
              formData.email,
            password:
              formData.password,
          }),
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
            "Registration failed"
        )
      }

      /* =========================
         SAVE USER
      ========================= */

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      /* =========================
         REDIRECT ADMIN DASHBOARD
      ========================= */

      router.push("/admin")

      router.refresh()
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
              Create Admin Access
            </h1>

            <p className="text-primary-foreground/80 max-w-md">
              Create the first
              admin account to
              manage website
              content, records,
              and dashboard
              settings.
            </p>

            {/* FEATURES */}

            <div className="mt-8 space-y-3 text-left">
              {[
                "Admin dashboard access",
                "Website content management",
                "Subscriber and inquiry records",
                "Analytics and settings",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4" />

                  {feature}
                </div>
              ))}
            </div>
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

          {/* CARD */}

          <Card>
            <CardHeader className="text-center">
              <h2 className="text-2xl font-bold text-foreground">
                Create Admin Account
              </h2>

              <p className="text-muted-foreground">
                First admin setup
              </p>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-4"
              >
                {/* NAME */}

                <div className="space-y-2">
                  <Label htmlFor="name">
                    Full Name
                  </Label>

                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={
                      formData.name
                    }
                    onChange={(e) =>
                      setFormData(
                        {
                          ...formData,
                          name:
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
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Create a strong password"
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

                  {/* PASSWORD REQUIREMENTS */}

                  {formData.password && (
                    <div className="space-y-1 mt-2">
                      {passwordRequirements.map(
                        (req) => (
                          <div
                            key={
                              req.label
                            }
                            className={`text-xs flex items-center gap-1 ${
                              req.met
                                ? "text-green-600 dark:text-green-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            <CheckCircle2
                              className={`h-3 w-3 ${
                                req.met
                                  ? ""
                                  : "opacity-30"
                              }`}
                            />

                            {
                              req.label
                            }
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>

                {/* CONFIRM PASSWORD */}

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password
                  </Label>

                  <Input
                    id="confirmPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={
                      formData.confirmPassword
                    }
                    onChange={(e) =>
                      setFormData(
                        {
                          ...formData,
                          confirmPassword:
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

                {/* ERROR */}

                {error && (
                  <p className="text-sm text-destructive">
                    {error}
                  </p>
                )}

                {/* BUTTON */}

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
                      Creating
                      admin...
                    </>
                  ) : (
                    "Create Admin Account"
                  )}
                </Button>
              </form>
            </CardContent>

            {/* FOOTER */}

            <CardFooter className="flex flex-col gap-4">
              <p className="text-sm text-center text-muted-foreground">
                Already have an
                admin account?{" "}
                <Link
                  href="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>

          {/* TERMS */}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By creating an
            account, you agree
            to our{" "}
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
