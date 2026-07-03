"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { TopicPhoto } from "@/components/topic-photo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { 
  Brain, 
  MessageSquareText, 
  BarChart3, 
  Cog, 
  Shield, 
  Code2,
  ArrowRight,
  CheckCircle2,
  Zap
} from "lucide-react"

const services = [
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions",
    shortDesc: "Custom artificial intelligence models tailored to your needs.",
    description: "Our AI solutions leverage the latest in machine learning and deep learning to solve complex business challenges. From predictive analytics to intelligent automation, we build custom AI models that drive real results.",
    features: [
      "Custom ML model development",
      "Predictive analytics systems",
      "Natural language processing",
      "Computer vision solutions",
      "AI strategy consulting",
      "Model optimization & deployment",
    ],
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    id: "chatbot",
    icon: MessageSquareText,
    title: "AI Chatbot Systems",
    shortDesc: "Intelligent conversational AI for 24/7 customer engagement.",
    description: "Our AI chatbots provide instant, accurate responses to customer queries around the clock. Built with advanced NLP, they understand context, handle complex conversations, and seamlessly integrate with your existing systems.",
    features: [
      "24/7 automated support",
      "Multi-language capabilities",
      "CRM & helpdesk integration",
      "Sentiment analysis",
      "Conversation analytics",
      "Human handoff workflows",
    ],
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Data Analytics",
    shortDesc: "Transform raw data into actionable business insights.",
    description: "Turn your data into your competitive advantage. Our analytics solutions help you understand customer behavior, optimize operations, and make data-driven decisions with confidence.",
    features: [
      "Real-time dashboards",
      "Business intelligence tools",
      "Customer behavior analytics",
      "Predictive forecasting",
      "Data visualization",
      "Custom reporting systems",
    ],
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    id: "automation",
    icon: Cog,
    title: "Business Automation",
    shortDesc: "Streamline operations with intelligent process automation.",
    description: "Eliminate manual tasks and reduce errors with our intelligent automation solutions. We help you identify automation opportunities and implement solutions that save time and reduce costs.",
    features: [
      "Workflow automation",
      "Document processing",
      "Email & communication automation",
      "Data entry automation",
      "Integration solutions",
      "Process optimization",
    ],
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    id: "development",
    icon: Code2,
    title: "Web & Software Development",
    shortDesc: "Full-stack development for modern digital solutions.",
    description: "From web applications to enterprise software, our development team builds scalable, secure, and user-friendly solutions. We use modern technologies and best practices to deliver exceptional digital experiences.",
    features: [
      "Custom web applications",
      "Mobile app development",
      "API development & integration",
      "Cloud-native solutions",
      "Legacy system modernization",
      "UI/UX design",
    ],
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    id: "security",
    icon: Shield,
    title: "Secure Digital Management",
    shortDesc: "Enterprise-grade security for your digital assets.",
    description: "Protect your business with our comprehensive security solutions. We implement robust security measures, ensure compliance, and help you manage digital assets with confidence.",
    features: [
      "Security assessments",
      "Data encryption solutions",
      "Access management",
      "Compliance consulting",
      "Security monitoring",
      "Incident response planning",
    ],
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const process = [
  { step: "01", title: "Discovery", description: "We analyze your business needs and identify opportunities for AI implementation." },
  { step: "02", title: "Strategy", description: "We create a customized roadmap aligned with your goals and timeline." },
  { step: "03", title: "Development", description: "Our experts build and rigorously test your solution using agile methodologies." },
  { step: "04", title: "Deployment", description: "We launch your solution with comprehensive training and support." },
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Comprehensive AI Solutions for Every Business Need
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                From intelligent chatbots to advanced analytics, we provide end-to-end AI services 
                that transform how you operate and engage with customers.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Detail */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div className={`inline-flex p-3 rounded-xl ${service.bgColor} mb-4`}>
                      <service.icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6">{service.description}</p>
                    <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-foreground">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild>
                      <Link href="/contact">
                        Contact Us
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <Card className="overflow-hidden">
                      <TopicPhoto topic={service.title} alt={`${service.title} service photo`} />
                    </Card>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Process</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground">How We Work</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Our proven methodology ensures successful project delivery every time.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full relative overflow-hidden">
                    <CardContent className="p-6">
                      <span className="text-6xl font-bold text-primary/10 absolute -top-2 -right-2">
                        {item.step}
                      </span>
                      <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Zap className="h-12 w-12 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">Ready to Build Smarter?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Schedule a free consultation to discuss your project and discover how our AI solutions 
                can transform your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
                  <Link href="/contact">
                    Schedule Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white/30 text-white hover:bg-white/10">
                  <Link href="/gallery">
                    View Case Studies
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
