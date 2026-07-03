import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"

const sections = [
  {
    title: "Information We Collect",
    body: "We collect information you submit through contact forms, newsletter subscriptions, account registration, chatbot messages, feedback, and inquiries.",
  },
  {
    title: "How We Use Information",
    body: "We use information to respond to inquiries, provide AI and software services, improve website features, manage admin workflows, and communicate service updates.",
  },
  {
    title: "Data Protection",
    body: "We use role-based access, authentication, and reasonable technical controls to protect website data and admin-managed records.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact Nexa AI Systems at contact@nexaai.com.",
  },
]

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="mt-4 text-muted-foreground">
              How Nexa AI Systems handles information submitted through this website.
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
