"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TopicPhoto } from "@/components/topic-photo"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ZoomIn } from "lucide-react"

// Mock gallery data
const galleryImages = [
  { id: 1, title: "AI Dashboard Project", category: "Web Development", description: "Modern analytics dashboard for enterprise clients" },
  { id: 2, title: "Chatbot Interface", category: "AI Solutions", description: "Conversational AI interface design" },
  { id: 3, title: "Data Visualization", category: "Analytics", description: "Real-time data visualization platform" },
  { id: 4, title: "Mobile App Design", category: "Web Development", description: "Cross-platform mobile application" },
  { id: 5, title: "ML Pipeline", category: "AI Solutions", description: "Machine learning pipeline architecture" },
  { id: 6, title: "Client Portal", category: "Web Development", description: "Secure client management portal" },
  { id: 7, title: "Automation Workflow", category: "Automation", description: "Business process automation system" },
  { id: 8, title: "NLP Engine", category: "AI Solutions", description: "Natural language processing engine" },
  { id: 9, title: "Analytics Suite", category: "Analytics", description: "Comprehensive analytics solution" },
]

const categories = ["All", "AI Solutions", "Web Development", "Analytics", "Automation"]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)

  const filteredImages = selectedCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory)

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
              <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Work</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Project Gallery
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Explore our portfolio of successful AI implementations, web applications, 
                and digital transformation projects.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card
                      className="overflow-hidden group cursor-pointer"
                      onClick={() => setSelectedImage(image)}
                    >
                      <div className="relative">
                        <TopicPhoto topic={image.category} alt={`${image.title} project photo`} />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <ZoomIn className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-primary font-medium">{image.category}</span>
                        <h3 className="font-semibold text-foreground mt-1">{image.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{image.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden">
            {selectedImage && (
              <div>
                <TopicPhoto topic={selectedImage.category} alt={`${selectedImage.title} project preview photo`} className="rounded-none border-0" />
                <div className="p-6">
                  <span className="text-sm text-primary font-medium">{selectedImage.category}</span>
                  <h2 className="text-2xl font-bold text-foreground mt-2">{selectedImage.title}</h2>
                  <p className="text-muted-foreground mt-2">{selectedImage.description}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with cutting-edge AI solutions.
            </p>
            <Button asChild size="lg">
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
