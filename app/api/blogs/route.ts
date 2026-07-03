import { NextResponse } from "next/server"

import { defaultBlogPosts, HIDDEN_DEFAULT_BLOG_CATEGORY } from "@/lib/default-blogs"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const allBlogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })
    const blogs = allBlogs.filter(
      (blog) => blog.published && blog.category !== HIDDEN_DEFAULT_BLOG_CATEGORY
    )
    const customSlugs = new Set(allBlogs.map((blog) => blog.slug))
    const builtInBlogs = defaultBlogPosts.filter(
      (blog) => !customSlugs.has(blog.slug)
    )

    return NextResponse.json([...builtInBlogs, ...blogs])
  } catch (error) {
    console.error("Error fetching public blogs:", error)

    return NextResponse.json(defaultBlogPosts)
  }
}
