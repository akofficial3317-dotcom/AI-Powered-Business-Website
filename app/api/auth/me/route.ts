import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    /* =========================
       CHECK SESSION
    ========================= */

    const session =
      await getSession()

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Not authenticated",
        },
        {
          status: 401,
        }
      )
    }

    /* =========================
       FIND USER
    ========================= */

    let user =
      await prisma.admin.findUnique(
        {
          where: {
            id: session.userId,
          },

          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        }
      )

    /* =========================
       USER NOT FOUND
    ========================= */

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "User not found",
        },
        {
          status: 404,
        }
      )
    }

    const adminCount =
      await prisma.admin.count({
        where: {
          role: {
            in: ["admin", "ADMIN"],
          },
        },
      })

    if (adminCount === 0) {
      user =
        await prisma.admin.update({
          where: {
            id: user.id,
          },

          data: {
            role: "admin",
          },

          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
          },
        })
    }

    /* =========================
       RETURN USER
    ========================= */

    return NextResponse.json({
      success: true,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt:
          user.createdAt,
      },
    })
  } catch (error) {
    console.error(
      "Get user error:",
      error
    )

    return NextResponse.json(
      {
        success: false,
        error:
          "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}
