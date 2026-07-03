"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  motion,
  AnimatePresence,
} from "framer-motion"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

import {
  Menu,
  X,
  Brain,
  LogOut,
  LayoutDashboard,
} from "lucide-react"

import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Gallery", href: "/gallery" },
  { name: "Events", href: "/events" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
]

type HeaderUser = {
  name?: string
  email?: string
  role?: string
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  const [scrolled, setScrolled] =
    useState(false)

  const [user, setUser] =
    useState<HeaderUser | null>(null)

  const pathname = usePathname()

  /* =========================
     LOAD USER
  ========================= */

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response =
          await fetch("/api/auth/me", {
            cache: "no-store",
          })

        if (!response.ok) {
          setUser(null)
          localStorage.removeItem(
            "user"
          )
          return
        }

        const data =
          await response.json()

        const currentUser =
          data.user as HeaderUser

        if (
          currentUser.role?.toLowerCase() ===
          "admin"
        ) {
          setUser(currentUser)
          localStorage.setItem(
            "user",
            JSON.stringify(
              currentUser
            )
          )
        } else {
          setUser(null)
          localStorage.removeItem(
            "user"
          )
        }
      } catch {
        setUser(null)
      }
    }

    fetchUser()

    const handleScroll = () => {
      setScrolled(
        window.scrollY > 20
      )
    }

    window.addEventListener(
      "scroll",
      handleScroll
    )

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      )
  }, [])

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
    } catch (error) {
      console.error("Logout failed:", error)
    }

    localStorage.removeItem(
      "user"
    )

    window.location.reload()
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}

          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/30 transition-colors" />

              <div className="relative bg-primary rounded-lg p-2.5">
                <Brain className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">
                Nexa AI
              </span>

              <span className="text-[11px] text-muted-foreground -mt-1 tracking-wider">
                SYSTEMS
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map(
              (item) => {
                const isActive =
                  pathname ===
                    item.href ||
                  (item.href !==
                    "/" &&
                    pathname.startsWith(
                      item.href
                    ))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-[15px] font-medium rounded-lg transition-colors relative",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {item.name}

                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                )
              }
            )}
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* USER / AUTH */}

            <div className="hidden sm:flex sm:items-center sm:gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  {/* AVATAR */}

                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                    {user.name?.charAt(0)}
                  </div>

                  {/* USER NAME */}

                  <span className="font-medium text-sm text-foreground">
                    {user.name}
                  </span>

                  {/* VISIT ADMIN */}

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <Link href="/admin">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Visit Admin
                    </Link>
                  </Button>

                  {/* LOGOUT */}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={
                      handleLogout
                    }
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              ) : (
                null
              )}
            </div>

            {/* MOBILE MENU BUTTON */}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() =>
                setMobileMenuOpen(
                  !mobileMenuOpen
                )
              }
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAVIGATION */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigation.map(
                (item) => {
                  const isActive =
                    pathname ===
                    item.href

                  return (
                    <Link
                      key={
                        item.name
                      }
                      href={
                        item.href
                      }
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      {item.name}
                    </Link>
                  )
                }
              )}

              {/* MOBILE USER / AUTH */}

              {user ? (
                <div className="pt-4 border-t border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                        {user.name?.charAt(0)}
                      </div>

                      <span className="font-medium text-sm text-foreground">
                        {user.name}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setMobileMenuOpen(
                          false
                        )
                      }
                    >
                      <Link href="/admin">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Visit Admin
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={
                        handleLogout
                      }
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
              ) : (
                null
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
