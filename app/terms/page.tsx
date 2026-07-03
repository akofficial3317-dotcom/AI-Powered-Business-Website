import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"

const sections = [
  {
    title: "Use of Services",
    body: "This website provides information about Nexa AI Systems services, including AI solutions, chatbots, analytics, automation, and software development.",
  },
  {
    title: "Project Engagement",
    body: "Project scope, pricing, delivery timeline, and responsibilities are agreed separately during consultation or proposal approval.",
  },
  {
    title: "Website Content",
    body: "Website content is provided for general information. It should not be treated as a final technical, legal, or financial commitment.",
  },
  {
    title: "Contact",
    body: "For service terms or project questions, contact contact@nexaai.com.",
  },
]

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="border-b bg-muted/30 py-16">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Legal
            </span>
            <h1 className="mt-2 text-4xl font-bold text-foreground">
              Terms of Service
            </h1>
            <p className="mt-4 text-muted-foreground">
              Basic terms for using the Nexa AI Systems website and requesting services.
            </p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto max-w-3xl space-y-8 px-4 sm:px-6 lg:px-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="text-xl font-semibold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
