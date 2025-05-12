import { getCurrentSession } from "@/actions/auth";
import { prisma } from "@/db/prisma";
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  const { productId, rating, comment } = await req.json()

  if (!productId || !rating) {
    return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
  }
  if (rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'La note doit être entre 1 et 5.' }, { status: 400 })
  }

  const session = await getCurrentSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const review = await prisma.review.create({
    data: {
      productId,
      rating,
      comment,
      userId: session.user.id
    }
  })

  return NextResponse.json(review)
}