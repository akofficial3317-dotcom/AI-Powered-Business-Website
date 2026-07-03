import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getAdminUser } from "@/lib/admin-auth"
import {
  defaultGalleryImages,
  findDefaultGalleryImageById,
  findDefaultGalleryImageByTitle,
  HIDDEN_DEFAULT_GALLERY_CATEGORY,
} from "@/lib/default-gallery"

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: "desc" },
    })
    const visibleImages = images.filter(
      (image) => image.category !== HIDDEN_DEFAULT_GALLERY_CATEGORY
    )
    const customTitles = new Set(
      images.map((image) => image.title.toLowerCase())
    )
    const builtInImages = defaultGalleryImages.filter(
      (image) => !customTitles.has(image.title.toLowerCase())
    )

    return NextResponse.json(
      [
        ...builtInImages,
        ...visibleImages.map((image) => ({
          ...image,
          imageUrl: image.url,
          description: "",
        })),
      ]
    )
  } catch (error) {
    console.error("Error fetching gallery:", error)
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { title, imageUrl, category } = await request.json()

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: "Title and image URL are required" },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.create({
      data: {
        title,
        url: imageUrl,
        category: category || "Other",
        managedById: admin.id,
      },
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error("Error creating gallery image:", error)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { id, title, imageUrl, category } = await request.json()

    if (!id || !title || !imageUrl) {
      return NextResponse.json(
        { error: "Image ID, title, and image URL are required" },
        { status: 400 }
      )
    }

    const numericId = Number(id)
    const defaultImage = numericId < 0 ? findDefaultGalleryImageById(numericId) : null

    if (numericId < 0 && !defaultImage) {
      return NextResponse.json({ error: "Default image not found" }, { status: 404 })
    }

    if (defaultImage) {
      const existingDefault = await prisma.galleryImage.findFirst({
        where: { title: defaultImage.title },
      })
      const data = {
        title: defaultImage.title,
        url: imageUrl,
        category: category || defaultImage.category || "Other",
        managedById: admin.id,
      }
      const image = existingDefault
        ? await prisma.galleryImage.update({
            where: { id: existingDefault.id },
            data,
          })
        : await prisma.galleryImage.create({ data })

      return NextResponse.json(image)
    }

    const image = await prisma.galleryImage.update({
      where: { id: numericId },
      data: {
        title,
        url: imageUrl,
        category: category || "Other",
        managedById: admin.id,
      },
    })

    return NextResponse.json(image)
  } catch (error) {
    console.error("Error updating gallery image:", error)
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
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
      return NextResponse.json({ error: "Image ID required" }, { status: 400 })
    }

    const numericId = Number(id)
    const image = numericId > 0
      ? await prisma.galleryImage.findUnique({ where: { id: numericId } })
      : null
    const defaultImage =
      numericId < 0
        ? findDefaultGalleryImageById(numericId)
        : image
          ? findDefaultGalleryImageByTitle(image.title)
          : null

    if (numericId < 0 && !defaultImage) {
      return NextResponse.json({ error: "Default image not found" }, { status: 404 })
    }

    if (defaultImage) {
      const existingDefault = await prisma.galleryImage.findFirst({
        where: { title: defaultImage.title },
      })
      const data = {
        title: defaultImage.title,
        url: defaultImage.imageUrl,
        category: HIDDEN_DEFAULT_GALLERY_CATEGORY,
        managedById: admin.id,
      }

      if (existingDefault) {
        await prisma.galleryImage.update({
          where: { id: existingDefault.id },
          data,
        })
      } else {
        await prisma.galleryImage.create({ data })
      }

      return NextResponse.json({ message: "Image deleted" })
    }

    await prisma.galleryImage.delete({ where: { id: numericId } })

    return NextResponse.json({ message: "Image deleted" })
  } catch (error) {
    console.error("Error deleting gallery image:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
