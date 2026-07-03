"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TopicPhoto } from "@/components/topic-photo"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const highlights = [
  "Industry-leading AI expertise",
  "Tailored solutions for your business",
  "24/7 dedicated support",
  "Proven track record of success",
]

export function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <TopicPhoto topic="AI team human innovation" alt="AI team working in an office" className="aspect-square lg:aspect-[4/3] rounded-md" />
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-card border border-border rounded-xl p-6 shadow-lg"
            >
              <div className="text-4xl font-bold text-primary mb-1">10+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Pioneering AI Solutions for Tomorrow&apos;s Challenges
            </h2>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              At Nexa AI Systems, we believe in the transformative power of artificial intelligence. 
              Founded by industry veterans with decades of combined experience, we&apos;re dedicated to 
              making advanced AI accessible to businesses of all sizes.
            </p>
            <p className="text-muted-foreground mb-8">
              Our team of data scientists, engineers, and business strategists work together to 
              deliver solutions that don&apos;t just meet expectations—they exceed them.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <Button asChild className="group">
              <Link href="/about">
                Learn More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
