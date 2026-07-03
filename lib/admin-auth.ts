import { cookies } from "next/headers"

import { verifyToken } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getAdminUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  const payload = verifyToken(token)

  if (!payload) return null

  const adminCount = await prisma.admin.count({
    where: {
      role: {
        in: ["admin", "ADMIN"],
      },
    },
  })

  const user = await prisma.admin.findUnique({
    where: {
      id: payload.userId,
    },
  })

  if (!user) return null

  if (adminCount === 0) {
    return prisma.admin.update({
      where: {
        id: user.id,
      },
      data: {
        role: "admin",
      },
    })
  }

  if (user.role.toLowerCase() !== "admin") {
    return null
  }

  return user
}
