import { prisma } from "@/db/prisma"

export const getReviewStats = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: { productId },
    select: { rating: true },
  })

  const reviewCount = reviews.length
  const averageRating =
    reviewCount > 0
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount) * 10) / 10
      : 0

  return { averageRating, reviewCount }
}

export const getReviewsForProduct = async (productId: string) => {
  return prisma.review.findMany({
    where: { productId },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      user: {
        select: { email: true },
      },
    },
  })
}
