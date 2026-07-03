"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  Code2,
  Mail,
  Sparkles,
  Workflow,
} from "lucide-react"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const openings = [
  {
    title: "AI / Machine Learning Engineer",
    type: "Full-time",
    location: "Kathmandu / Hybrid",
    icon: Brain,
    summary:
      "Build intelligent models, AI assistants, and workflow tools for real business use cases.",
    skills: ["Python", "LLMs", "ML pipelines", "APIs"],
  },
  {
    title: "Chatbot & NLP Developer",
    type: "Full-time",
    location: "Kathmandu / Remote",
    icon: Bot,
    summary:
      "Design conversational systems for customer support, lead capture, and knowledge automation.",
    skills: ["NLP", "Prompting", "Integrations", "Analytics"],
  },
  {
    title: "Data Analyst",
    type: "Internship / Junior",
    location: "Kathmandu",
    icon: BarChart3,
    summary:
      "Turn client data into dashboards, reports, and insights that support better decisions.",
    skills: ["SQL", "Dashboards", "Excel", "Visualization"],
  },
  {
    title: "Full Stack Developer",
    type: "Full-time",
    location: "Hybrid",
    icon: Code2,
    summary:
      "Create fast, polished web apps, admin dashboards, and APIs for AI-powered platforms.",
    skills: ["React", "Next.js", "Prisma", "PostgreSQL"],
  },
  {
    title: "Business Automation Specialist",
    type: "Project-based",
    location: "Remote / Hybrid",
    icon: Workflow,
    summary:
      "Automate repetitive work across documents, email, reporting, and internal operations.",
    skills: ["Workflows", "APIs", "No-code tools", "Process design"],
  },
]

const values = [
  "Practical AI that solves business problems",
  "Small team, real ownership, visible impact",
  "Learning culture around modern AI tools",
  "Flexible work with Kathmandu-based collaboration",
]

export default function CareersPage() {
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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Careers
              </span>
              <h1 className="mt-2 mb-6 text-4xl font-bold text-foreground sm:text-5xl">
                Build AI Solutions With Nexa AI Systems
              </h1>
              <p className="text-lg text-muted-foreground">
                Join a team working on AI chatbots, data analytics, automation,
                and digital transformation tools for growing businesses.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Open Roles
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Roles that fit the services and products we build.
                </p>
              </div>
              <Button asChild>
                <Link href="mailto:contact@nexaai.com?subject=Career Application - Nexa AI Systems">
                  Apply by Email
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {openings.map((role, index) => (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                            <role.icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {role.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {role.location}
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">{role.type}</Badge>
                      </div>

                      <p className="mb-4 text-sm text-muted-foreground">
                        {role.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Why Join Us
                </span>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Work On Useful AI, Not Just Demos
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Our projects focus on practical systems: customer support
                  assistants, inquiry management, reporting dashboards, and
                  automation that saves real time for clients.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((value) => (
                  <Card key={value}>
                    <CardContent className="flex items-start gap-3 p-5">
                      <Sparkles className="mt-0.5 h-5 w-5 text-primary" />
                      <p className="text-sm font-medium text-foreground">
                        {value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <Mail className="mx-auto mb-4 h-8 w-8 text-primary" />
            <h2 className="mb-4 text-2xl font-bold text-foreground">
              Do Not See Your Role?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Send your CV, portfolio, or GitHub profile. We are open to
              interns, junior developers, AI enthusiasts, and project-based
              collaborators.
            </p>
            <Button asChild size="lg">
              <Link href="mailto:contact@nexaai.com?subject=Career Interest - Nexa AI Systems">
                contact@nexaai.com
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}
