"use client"

import Link from "next/link"
import {
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  Cog,
  FileText,
  Lock,
  Mail,
  MessageSquare,
  Shield,
} from "lucide-react"

import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { TopicPhoto } from "@/components/topic-photo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const serviceDocs = [
  {
    title: "AI Solutions",
    icon: Brain,
    items: [
      "Custom machine learning model development",
      "Predictive analytics and forecasting",
      "Natural language processing systems",
      "Computer vision and AI strategy consulting",
    ],
  },
  {
    title: "AI Chatbot Systems",
    icon: Bot,
    items: [
      "24/7 automated customer support",
      "Website-specific response training",
      "Conversation history and analytics",
      "CRM, helpdesk, and human handoff integration",
    ],
  },
  {
    title: "Data Analytics",
    icon: BarChart3,
    items: [
      "Real-time dashboards",
      "Business intelligence reports",
      "Customer behavior analytics",
      "Custom data visualization",
    ],
  },
  {
    title: "Business Automation",
    icon: Cog,
    items: [
      "Workflow automation",
      "Document and data entry automation",
      "Email and communication automation",
      "Process optimization and integrations",
    ],
  },
  {
    title: "Web & Software Development",
    icon: Code2,
    items: [
      "Custom web applications",
      "Mobile app development",
      "API development and integration",
      "UI/UX design and cloud-native solutions",
    ],
  },
  {
    title: "Secure Digital Management",
    icon: Shield,
    items: [
      "Role-based admin access",
      "Authentication and access control",
      "Data protection and security monitoring",
      "Compliance and incident response planning",
    ],
  },
]

// const adminFeatures = [
//   "Dashboard analytics for users, blogs, inquiries, events, feedback, and chat history",
//   "Role-based admin access so normal users cannot manage website data",
//   "CRUD management for blogs, events, gallery images, users, and inquiries",
//   "Feedback monitoring and deletion",
//   "Chatbot conversation history review",
//   "Settings page for website and chatbot configuration",
// ]

const processSteps = [
  {
    title: "Discovery",
    description:
      "We understand your business, existing process, website needs, users, and automation opportunities.",
  },
  {
    title: "Strategy",
    description:
      "We prepare a solution roadmap, required features, estimated timeline, and integration plan.",
  },
  {
    title: "Development",
    description:
      "We build, test, and refine the AI, web, analytics, automation, or chatbot solution.",
  },
  {
    title: "Deployment",
    description:
      "We launch the solution, train your team, and provide support for improvements.",
  },
]

export default function DocumentationPage() {
  return (
    <>
      <Header />

      <main className="pt-16">
        <section className="border-b bg-muted/30 py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">
                Resources
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Documentation
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Learn how Nexa AI Systems helps businesses use AI chatbots,
                analytics, automation, web development, and secure admin
                management.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Request Consultation
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Service Documentation
              </h2>
              <p className="mt-2 text-muted-foreground">
                Main services available on the Nexa AI Systems website.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {serviceDocs.map((service) => (
                <Card key={service.title}>
                  <CardHeader>
                    <TopicPhoto topic={service.title} alt={`${service.title} documentation photo`} compact className="mb-4" />
                    <CardTitle className="flex items-center gap-3">
                      <span className="rounded-md bg-primary/10 p-2 text-primary">
                        <service.icon className="h-5 w-5" />
                      </span>
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {service.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/30 py-16">
          <div className="container mx-auto grid gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Admin Panel Guide
                </CardTitle>
                <CardDescription>
                  Website management features available to admin users.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {adminFeatures.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card> */}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chatbot Guide
                </CardTitle>
                <CardDescription>
                  How the Nexa AI website assistant works.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  The chatbot answers questions about Nexa AI services, contact
                  details, pricing guidance, admin features, analytics,
                  automation, and web development.
                </p>
                <p>
                  Visitor conversations are saved as chat history so admins can
                  review common questions and improve customer support.
                </p>
                <p>
                  If OpenAI is unavailable, the assistant still provides helpful
                  website-specific fallback answers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground">
                Project Process
              </h2>
              <p className="mt-2 text-muted-foreground">
                How Nexa AI Systems works from idea to launch.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((step, index) => (
                <Card key={step.title}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                        {index + 1}
                      </span>
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-12">
          <div className="container mx-auto flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Need help choosing a solution?
              </h2>
              <p className="mt-1 text-muted-foreground">
                Contact Nexa AI Systems for a project consultation.
              </p>
            </div>
            <Button asChild>
              <Link href="/contact">
                <FileText className="mr-2 h-4 w-4" />
                Contact Us
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
