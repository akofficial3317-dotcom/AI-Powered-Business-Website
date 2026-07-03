"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@nexaai.com",
    href: "mailto:contact@nexaai.com",
  },

  {
    icon: Phone,
    title: "Phone",
    value: "+977 980123456",
    href: "tel:+977980123456",
  },

  {
    icon: MapPin,
    title: "Address",
    value: "The London College, Tinkune, Kathmandu, Nepal",
    href: "https://www.google.com/maps/search/?api=1&query=The%20London%20College%2C%20Tinkune%2C%20Kathmandu%2C%20Nepal",
  },

  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri: 9:00 AM - 6:00 PM",
    href: "#",
  },
]

export default function ContactPage() {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    })

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [isSubmitted, setIsSubmitted] =
    useState(false)

  const [error, setError] =
    useState("")

  /* =========================
     FORM SUBMIT
  ========================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    setIsSubmitting(true)

    setError("")

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            formData
          ),
        }
      )

      if (!response.ok) {
        throw new Error(
          "Failed to submit"
        )
      }

      setIsSubmitted(true)

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch {
      setError(
        "Something went wrong. Please try again later."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />

      <main className="pt-16">
        {/* HERO SECTION */}

        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Contact Us
              </span>

              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Let&apos;s Start a
                Conversation
              </h1>

              <p className="text-lg text-muted-foreground">
                Have a project in
                mind? Want to learn
                more about our AI
                services? We&apos;d
                love to hear from
                you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CONTACT SECTION */}

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* CONTACT FORM */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <Card>
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Send us a
                      Message
                    </h2>

                    {isSubmitted ? (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="text-center py-12"
                      >
                        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>

                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          Message Sent!
                        </h3>

                        <p className="text-muted-foreground mb-6">
                          Thank you
                          for reaching
                          out.
                          We&apos;ll
                          get back to
                          you soon.
                        </p>

                        <Button
                          onClick={() =>
                            setIsSubmitted(
                              false
                            )
                          }
                        >
                          Send Another
                          Message
                        </Button>
                      </motion.div>
                    ) : (
                      <form
                        onSubmit={
                          handleSubmit
                        }
                        className="space-y-6"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* NAME */}

                          <div className="space-y-2">
                            <Label htmlFor="name">
                              Full Name *
                            </Label>

                            <Input
                              id="name"
                              placeholder="John Doe"
                              value={
                                formData.name
                              }
                              onChange={(
                                e
                              ) =>
                                setFormData(
                                  {
                                    ...formData,
                                    name: e
                                      .target
                                      .value,
                                  }
                                )
                              }
                              required
                            />
                          </div>

                          {/* EMAIL */}

                          <div className="space-y-2">
                            <Label htmlFor="email">
                              Email *
                            </Label>

                            <Input
                              id="email"
                              type="email"
                              placeholder="john@example.com"
                              value={
                                formData.email
                              }
                              onChange={(
                                e
                              ) =>
                                setFormData(
                                  {
                                    ...formData,
                                    email:
                                      e
                                        .target
                                        .value,
                                  }
                                )
                              }
                              required
                            />
                          </div>
                        </div>

                        {/* SUBJECT */}

                        <div className="space-y-2">
                          <Label htmlFor="subject">
                            Subject *
                          </Label>

                          <Input
                            id="subject"
                            placeholder="How can we help you?"
                            value={
                              formData.subject
                            }
                            onChange={(e) =>
                              setFormData(
                                {
                                  ...formData,
                                  subject:
                                    e
                                      .target
                                      .value,
                                }
                              )
                            }
                            required
                          />
                        </div>

                        {/* MESSAGE */}

                        <div className="space-y-2">
                          <Label htmlFor="message">
                            Message *
                          </Label>

                          <Textarea
                            id="message"
                            rows={5}
                            placeholder="Tell us about your project..."
                            value={
                              formData.message
                            }
                            onChange={(e) =>
                              setFormData(
                                {
                                  ...formData,
                                  message:
                                    e
                                      .target
                                      .value,
                                }
                              )
                            }
                            required
                          />
                        </div>

                        {/* ERROR */}

                        {error && (
                          <p className="text-sm text-red-500">
                            {error}
                          </p>
                        )}

                        {/* BUTTON */}

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={
                            isSubmitting
                          }
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send
                              Message
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* CONTACT INFO */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Get in Touch
                </h2>

                <p className="text-muted-foreground mb-8">
                  Reach out to us for
                  AI solutions, web
                  development,
                  analytics, and
                  business automation
                  services.
                </p>

                {/* CONTACT ITEMS */}

                <div className="space-y-6">
                  {contactInfo.map(
                    (
                      item,
                      index
                    ) => (
                      <motion.div
                        key={
                          item.title
                        }
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.5,
                          delay:
                            index *
                            0.1,
                        }}
                      >
                        <a
                          href={
                            item.href
                          }
                          className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <item.icon className="h-5 w-5 text-primary" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {
                                item.title
                              }
                            </h3>

                            <p className="text-muted-foreground">
                              {
                                item.value
                              }
                            </p>
                          </div>
                        </a>
                      </motion.div>
                    )
                  )}
                </div>

                {/* GOOGLE MAP */}

                <div className="mt-8 rounded-xl overflow-hidden border border-border shadow-md">
                  <iframe
                    title="The London College, Tinkune, Kathmandu, Nepal map"
                    src="https://www.google.com/maps?q=The%20London%20College%2C%20Tinkune%2C%20Kathmandu%2C%20Nepal&output=embed"
                    width="100%"
                    height="400"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[300px] sm:h-[400px]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Frequently Asked
              Questions
            </h2>

            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can&apos;t find what
              you&apos;re looking
              for? Our AI assistant
              is available 24/7.
            </p>

            <p className="text-sm text-muted-foreground">
              Click the chat icon in
              the bottom right to
              start chatting.
            </p>
          </div>
        </section>
      </main>

      <Footer />

      <ChatWidget />
    </>
  )
}
