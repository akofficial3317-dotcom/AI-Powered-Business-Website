import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminUser } from "@/lib/admin-auth"
import {
  defaultBlogPosts,
  findDefaultBlogById,
  findDefaultBlogBySlug,
  HIDDEN_DEFAULT_BLOG_CATEGORY,
} from "@/lib/default-blogs"

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })
    const visibleBlogs = blogs.filter(
      (blog) => blog.category !== HIDDEN_DEFAULT_BLOG_CATEGORY
    )
    const customSlugs = new Set(blogs.map((blog) => blog.slug))
    const builtInBlogs = defaultBlogPosts
      .filter((blog) => !customSlugs.has(blog.slug))
      .map((blog) => ({
        ...blog,
        excerpt: blog.description,
        coverImage: blog.image,
        author: {
          name: blog.author.name,
          email: "built-in@nexa.local",
        },
      }))

    return NextResponse.json(
      [
        ...builtInBlogs,
        ...visibleBlogs.map((blog) => ({
          ...blog,
          excerpt: blog.description,
          coverImage: blog.image,
          author: {
            name: "Admin",
            email: "admin@nexa.local",
          },
        })),
      ]
    )
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { title, slug, content, excerpt, coverImage, category, published } = await request.json()

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required" },
        { status: 400 }
      )
    }

    const existingSlug = await prisma.blog.findUnique({ where: { slug } })
    if (existingSlug) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        description: excerpt || content.slice(0, 160),
        content,
        image: coverImage || null,
        category: category || "General",
        published: published ?? false,
        managedById: admin.id,
      },
    })

    return NextResponse.json(blog, { status: 201 })
  } catch (error) {
    console.error("Error creating blog:", error)
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id, title, slug, content, excerpt, coverImage, category, published } = await request.json()

    if (!id || !title || !slug || !content) {
      return NextResponse.json(
        { error: "Blog ID, title, slug, and content are required" },
        { status: 400 }
      )
    }

    const numericId = Number(id)
    const defaultBlog = numericId < 0 ? findDefaultBlogById(numericId) : null

    if (numericId < 0 && !defaultBlog) {
      return NextResponse.json({ error: "Built-in blog not found" }, { status: 404 })
    }

    if (defaultBlog) {
      const blog = await prisma.blog.upsert({
        where: { slug: defaultBlog.slug },
        create: {
          title,
          slug: defaultBlog.slug,
          description: excerpt || content.slice(0, 160),
          content,
          image: coverImage || null,
          category: category || defaultBlog.category || "General",
          published,
          managedById: admin.id,
        },
        update: {
          title,
          description: excerpt || content.slice(0, 160),
          content,
          image: coverImage || null,
          category: category || defaultBlog.category || "General",
          published,
          managedById: admin.id,
        },
      })

      return NextResponse.json(blog)
    }

    const blog = await prisma.blog.update({
      where: { id: numericId },
      data: {
        title,
        slug,
        description: excerpt || content?.slice(0, 160),
        content,
        image: coverImage || null,
        category: category || "General",
        published,
        managedById: admin.id,
      },
    })

    return NextResponse.json(blog)
  } catch (error) {
    console.error("Error updating blog:", error)
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 })
    }

    const numericId = Number(id)
    const defaultBlog =
      numericId < 0
        ? findDefaultBlogById(numericId)
        : await prisma.blog
            .findUnique({ where: { id: numericId } })
            .then((blog) => (blog ? findDefaultBlogBySlug(blog.slug) : null))

    if (numericId < 0 && !defaultBlog) {
      return NextResponse.json({ error: "Built-in blog not found" }, { status: 404 })
    }

    if (defaultBlog) {
      await prisma.blog.upsert({
        where: { slug: defaultBlog.slug },
        create: {
          title: defaultBlog.title,
          slug: defaultBlog.slug,
          description: defaultBlog.description,
          content: defaultBlog.content,
          image: defaultBlog.image,
          category: HIDDEN_DEFAULT_BLOG_CATEGORY,
          published: false,
          managedById: admin.id,
        },
        update: {
          category: HIDDEN_DEFAULT_BLOG_CATEGORY,
          published: false,
          managedById: admin.id,
        },
      })

      return NextResponse.json({ message: "Blog deleted" })
    }

    await prisma.blog.delete({ where: { id: numericId } })

    return NextResponse.json({ message: "Blog deleted" })
  } catch (error) {
    console.error("Error deleting blog:", error)
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 })
  }
}
