"use client"

import { use, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Loader2,
  Share2,
  Twitter,
} from "lucide-react"

import { ChatWidget } from "@/components/chatbot/chat-widget"
import { Footer } from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { TopicPhoto } from "@/components/topic-photo"
import { Button } from "@/components/ui/button"

interface BlogPost {
  id: number
  title: string
  description: string
  content: string
  image: string | null
  category: string
  slug: string
  createdAt: string
  readTime?: string
  author?: {
    name: string
    role: string
  }
}

const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))

  return `${minutes} min read`
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")

const formatContent = (content: string) => {
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content
  }

  return content
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("")
}

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${slug}`)

        if (res.status === 404) {
          setError("Article not found.")
          return
        }

        if (!res.ok) {
          throw new Error("Failed to fetch blog")
        }

        setPost(await res.json())
      } catch (error) {
        console.error("Failed to fetch blog:", error)
        setError("Could not load this article right now.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [slug])

  const readTime = useMemo(
    () => (post ? post.readTime || estimateReadTime(post.content) : "1 min read"),
    [post]
  )
  const articleHtml = useMemo(
    () => (post ? formatContent(post.content) : ""),
    [post]
  )

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Link>

              {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading article...
                </div>
              ) : error || !post ? (
                <>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    Blog
                  </span>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                    Article Not Found
                  </h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    {error || "The requested article could not be found."}
                  </p>
                </>
              ) : (
                <>
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    {post.category}
                  </span>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                    {post.title}
                  </h1>

                  <p className="text-lg text-muted-foreground mb-6">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {(post.author?.name || "Admin").charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {post.author?.name || "Admin"}
                        </p>
                        <p className="text-xs">
                          {post.author?.role || "Content Team"}
                        </p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {readTime}
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </section>

        {post && (
          <>
            <section className="py-8">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <TopicPhoto
                    topic={post.category}
                    alt={`${post.title} article photo`}
                    className="rounded-md"
                  />
                </div>
              </div>
            </section>

            <section className="py-12">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-foreground prose-headings:font-bold
                      prose-p:text-muted-foreground prose-p:leading-relaxed
                      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                      prose-strong:text-foreground
                      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    "
                    dangerouslySetInnerHTML={{ __html: articleHtml }}
                  />

                  <div className="mt-12 pt-8 border-t border-border">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <span className="font-medium text-foreground">
                        Share this article:
                      </span>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <Twitter className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Facebook className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Want to learn more about our AI solutions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Schedule a free consultation with our experts today.
            </p>
            <Button asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
