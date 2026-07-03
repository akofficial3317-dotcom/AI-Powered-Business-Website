"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TopicPhoto } from "@/components/topic-photo"
import { 
  Brain, 
  MessageSquareText, 
  BarChart3, 
  Cog, 
  Shield, 
  Code2,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Custom artificial intelligence models and machine learning solutions tailored to your business needs.",
    href: "/services#ai",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    icon: MessageSquareText,
    title: "AI Chatbot Systems",
    description: "Intelligent conversational AI that provides 24/7 customer support and engagement.",
    href: "/services#chatbot",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description: "Transform raw data into actionable insights with advanced analytics and visualization.",
    href: "/services#analytics",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    icon: Cog,
    title: "Business Automation",
    description: "Streamline operations and reduce manual tasks with intelligent process automation.",
    href: "/services#automation",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    icon: Code2,
    title: "Web & Software Development",
    description: "Full-stack development services to build scalable and modern digital solutions.",
    href: "/services#development",
    color: "text-chart-5",
    bgColor: "bg-chart-5/10",
  },
  {
    icon: Shield,
    title: "Secure Digital Management",
    description: "Enterprise-grade security solutions to protect your digital assets and data.",
    href: "/services#security",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export function ServicesGrid() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground text-balance">
            Comprehensive AI Solutions for Your Business
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            From intelligent chatbots to advanced analytics, we provide end-to-end AI services 
            that drive innovation and efficiency.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link href={service.href}>
                <Card className="h-full group hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <TopicPhoto topic={service.title} alt={`${service.title} real photo`} compact className="mb-4" />
                    <div className={`inline-flex p-2 rounded-lg ${service.bgColor} mb-3`}>
                      <service.icon className={`h-5 w-5 ${service.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-primary">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
