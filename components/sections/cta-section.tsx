"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_transparent_20%,_rgba(0,0,0,0.3))]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">
              <Zap className="h-4 w-4" />
              Ready to Build Smarter?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-2xl font-bold text-white text-balance sm:text-3xl lg:text-4xl"
          >
            Transform Your Business with AI Today
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-7 text-base leading-7 text-white/80 text-pretty"
          >
            Schedule a free consultation with our AI experts and discover how we can 
            help automate your processes, enhance customer experiences, and drive growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button 
              size="lg" 
              variant="secondary" 
              asChild 
              className="bg-white px-6 text-sm text-primary hover:bg-white/90 group"
            >
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-white/30 px-6 text-sm text-white hover:bg-white/10 group"
            >
              <Link href="/services">
                <MessageSquare className="mr-2 h-4 w-4 text-black fill-black" />
                  <p className="text-black">Chat with AI Demo</p>
              </Link>
            </Button>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 border-t border-white/20 pt-5"
          >
            <p className="text-white/60 text-sm">
              Or reach out directly: <a href="mailto:contact@nexaai.com" className="text-white hover:underline">contact@nexaai.com</a>
              {" "}&bull;{" "}
              <a href="tel:+977980123456" className="text-white hover:underline">+977 980-123456</a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
