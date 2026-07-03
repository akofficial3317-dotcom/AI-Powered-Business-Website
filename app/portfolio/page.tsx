"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Workflow,
} from "lucide-react"

import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { TopicPhoto } from "@/components/topic-photo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const projects = [
  {
    title: "AI Support Assistant",
    category: "Chatbot System",
    icon: Bot,
    imageTopic: "AI Chatbot Systems",
    summary:
      "A customer support assistant that answers service questions, stores chat history, and helps teams review visitor needs from the admin panel.",
    results: ["24/7 support flow", "Saved chat history", "Admin review tools"],
  },
  {
    title: "Business Analytics Dashboard",
    category: "Data Analytics",
    icon: BarChart3,
    imageTopic: "Data Analytics",
    summary:
      "A dashboard experience for tracking users, inquiries, content, events, and monthly activity through clean admin metrics.",
    results: ["Live database stats", "Monthly activity view", "Fast admin navigation"],
  },
  {
    title: "AI Business Website",
    category: "Web Development",
    icon: Code2,
    imageTopic: "Web & Software Development",
    summary:
      "A responsive public website with services, events, gallery, feedback, contact forms, newsletter capture, and secure admin management.",
    results: ["Responsive pages", "Content management", "Secure admin access"],
  },
  {
    title: "Workflow Automation Platform",
    category: "Automation",
    icon: Workflow,
    imageTopic: "Business Automation",
    summary:
      "A business operations concept focused on reducing manual follow-up by connecting inquiry, feedback, and content management workflows.",
    results: ["Centralized records", "Reduced manual tasks", "Role-based controls"],
  },
]

const capabilities = [
  "AI strategy and implementation",
  "Chatbot systems and knowledge support",
  "Admin dashboards and CRUD systems",
  "Analytics, reports, and activity tracking",
  "Responsive website and software delivery",
  "Secure authentication and role-based access",
]

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="bg-gradient-to-b from-primary/5 to-background py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-3xl text-center"
            >
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                Portfolio
              </span>
              <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-5xl">
                Practical AI and web systems built for business work
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Explore selected Nexa AI Systems work across chatbots,
                dashboards, automation, and secure website management.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full overflow-hidden">
                    <TopicPhoto
                      topic={project.imageTopic}
                      alt={`${project.title} project image`}
                      compact
                    />
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-start gap-3">
                        <span className="rounded-md bg-primary/10 p-2 text-primary">
                          <project.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-primary">
                            {project.category}
                          </p>
                          <h2 className="text-xl font-bold leading-tight text-foreground">
                            {project.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {project.summary}
                      </p>
                      <div className="grid gap-2">
                        {project.results.map((result) => (
                          <div
                            key={result}
                            className="flex items-center gap-2 text-sm text-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            <span>{result}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-20">
          <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
            <div>
              <span className="inline-flex rounded-md bg-primary/10 p-3 text-primary">
                <BrainCircuit className="h-7 w-7" />
              </span>
              <h2 className="mt-5 text-3xl font-bold text-foreground">
                What we can deliver
              </h2>
              <p className="mt-4 text-muted-foreground">
                Our portfolio focuses on useful systems: tools that capture
                data, support customers, help admins work faster, and make
                business information easier to act on.
              </p>
              <Button asChild className="mt-8">
                <Link href="/contact">
                  Discuss a Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {capabilities.map((capability) => (
                <div
                  key={capability}
                  className="flex items-center gap-3 rounded-lg border bg-background p-4"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium text-foreground">
                    {capability}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
