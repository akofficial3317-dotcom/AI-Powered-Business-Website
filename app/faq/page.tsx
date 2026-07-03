"use client"

import Link from "next/link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    category: "Services",
    questions: [
      {
        question: "What services does Nexa AI Systems provide?",
        answer:
          "Nexa AI Systems provides AI Solutions, AI Chatbot Systems, Data Analytics, Business Automation, Web and Software Development, and Secure Digital Management.",
      },
      {
        question: "Can Nexa AI build a chatbot for my business?",
        answer:
          "Yes. We build website-specific AI chatbots that answer customer questions, provide 24/7 support, save conversation history, and can be integrated with CRM or helpdesk systems.",
      },
      {
        question: "Do you provide web and software development?",
        answer:
          "Yes. We build custom web applications, mobile apps, APIs, dashboards, cloud-native systems, and user-friendly software solutions.",
      },
      {
        question: "Can you automate business processes?",
        answer:
          "Yes. We help automate workflows, document processing, email communication, data entry, reporting, and repetitive operations.",
      },
    ],
  },
  {
    category: "Analytics & AI",
    questions: [
      {
        question: "What is predictive analytics?",
        answer:
          "Predictive analytics uses historical data and AI models to forecast future behavior, trends, risks, and opportunities for better business decisions.",
      },
      {
        question: "Can you create dashboards and reports?",
        answer:
          "Yes. We create real-time dashboards, business intelligence tools, customer behavior reports, custom analytics views, and visual reports.",
      },
      {
        question: "Can AI help small businesses?",
        answer:
          "Yes. AI can help small businesses reduce manual work, respond to customers faster, understand data, improve marketing, and make better decisions.",
      },
    ],
  },
  {
    category: "Website & Admin",
    questions: [
      {
        question: "Is the admin panel role-based?",
        answer:
          "Yes. The admin panel is role-based. Only users with the admin role can access admin routes and perform CRUD operations.",
      },
      {
        question: "What can admins manage?",
        answer:
          "Admins can manage dashboard analytics, users, blogs, inquiries, events, gallery images, feedback, chat history, and settings.",
      },
      {
        question: "Does the chatbot save chat history?",
        answer:
          "Yes. Chatbot conversations are saved in the database and can be reviewed from the admin Chat History section.",
      },
      {
        question: "Can customers submit inquiries and feedback?",
        answer:
          "Yes. Customers can submit inquiries through the Contact page and feedback through the feedback system. Admins can review them from the admin panel.",
      },
    ],
  },
  {
    category: "Pricing & Contact",
    questions: [
      {
        question: "How much does a project cost?",
        answer:
          "Pricing depends on project scope, features, timeline, data requirements, and integrations. Please contact Nexa AI Systems for a consultation.",
      },
      {
        question: "How can I contact Nexa AI Systems?",
        answer:
          "You can contact us by email at contact@nexaai.com, phone at +977 980123456, or through the Contact page.",
      },
      {
        question: "Where is Nexa AI Systems located?",
        answer:
          "Nexa AI Systems is located in Tinkune, Kathmandu, Nepal.",
      },
      {
        question: "Do you provide consultation before starting a project?",
        answer:
          "Yes. We start with discovery and consultation to understand your business needs before recommending a solution.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="border-b bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Resources
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Find answers about Nexa AI Systems services, AI chatbot,
                analytics, automation, admin panel, pricing, and contact
                details.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside className="space-y-3">
                <Card>
                  <CardContent className="p-5">
                    <h2 className="font-semibold text-foreground">
                      FAQ Categories
                    </h2>
                    <div className="mt-4 space-y-2">
                      {faqs.map((group) => (
                        <a
                          key={group.category}
                          href={`#${group.category
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")}`}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                        >
                          {group.category}
                        </a>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </aside>

              <div className="space-y-8">
                {faqs.map((group) => (
                  <section
                    key={group.category}
                    id={group.category
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, "-")}
                    className="scroll-mt-24"
                  >
                    <h2 className="mb-4 text-2xl font-bold text-foreground">
                      {group.category}
                    </h2>
                    <Card>
                      <CardContent className="p-2">
                        <Accordion type="single" collapsible>
                          {group.questions.map((item, index) => (
                            <AccordionItem
                              key={item.question}
                              value={`${group.category}-${index}`}
                            >
                              <AccordionTrigger className="px-4 text-left">
                                {item.question}
                              </AccordionTrigger>
                              <AccordionContent className="px-4 text-muted-foreground">
                                {item.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </CardContent>
                    </Card>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t py-12">
          <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-4 sm:px-6 md:flex-row md:items-center lg:px-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Still have questions?
              </h2>
              <p className="mt-1 text-muted-foreground">
                Contact us or ask the Nexa AI Assistant from the chat widget.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Read Documentation</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatWidget />
    </>
  )
}
