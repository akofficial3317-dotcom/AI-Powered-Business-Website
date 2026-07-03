import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"

const sections = [
  {
    title: "Essential Cookies",
    body: "The website may use essential cookies or local browser storage for authentication, sessions, theme preferences, and secure admin access.",
  },
  {
    title: "Analytics",
    body: "In production, analytics may be used to understand page performance and improve website experience.",
  },
  {
    title: "Third-Party Services",
    body: "Some features, such as maps, newsletter email delivery, or AI services, may interact with third-party providers.",
  },
  {
    title: "Managing Cookies",
    body: "You can control cookies from your browser settings. Disabling some cookies may affect login or admin functionality.",
  },
]

export default function CookiesPage() {
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
              Cookie Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              How cookies and similar browser technologies may be used on this website.
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
