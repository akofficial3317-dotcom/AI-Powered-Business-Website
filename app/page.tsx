import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero"
import { ServicesGrid } from "@/components/sections/services-grid"
import { StatsCounter } from "@/components/sections/stats-counter"
import { AboutPreview } from "@/components/sections/about-preview"
import { Testimonials } from "@/components/sections/testimonials"
import { CTASection } from "@/components/sections/cta-section"
import { ChatWidget } from "@/components/chatbot/chat-widget"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesGrid />
        <StatsCounter />
        <AboutPreview />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
