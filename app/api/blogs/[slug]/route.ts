import { NextRequest, NextResponse } from "next/server"

import { findDefaultBlogBySlug, HIDDEN_DEFAULT_BLOG_CATEGORY } from "@/lib/default-blogs"
import { prisma } from "@/lib/prisma"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const blog = await prisma.blog.findFirst({
      where: {
        slug,
      },
    })

    if (blog) {
      if (!blog.published || blog.category === HIDDEN_DEFAULT_BLOG_CATEGORY) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 })
      }

      return NextResponse.json(blog)
    }

    const defaultBlog = findDefaultBlogBySlug(slug)

    if (!defaultBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 })
    }

    return NextResponse.json(defaultBlog)
  } catch (error) {
    console.error("Error fetching public blog:", error)

    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    )
  }
}
