import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const query = {
    userId: req.nextUrl.searchParams.get('userId'),
  }
  console.log('api/notification GET:', query)

  try {
    if (!query.userId) return NextResponse.json(null, { status: 500 })

    const notis = await prisma.notification.findMany({
      where: { userId: query.userId },
      orderBy: {
        notifiedAt: 'desc',
      },
    })

    console.log('Success:', notis)
    return NextResponse.json(notis, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
    userId: req.nextUrl.searchParams.get('userId'),
  }
  console.log('api/notification DELETE:', query)

  try {
    if (query.id) {
      await prisma.notification.delete({
        where: { id: String(query.id) },
      })

      return NextResponse.json(null, { status: 200 })
    }

    if (query.userId) {
      await prisma.notification.deleteMany({
        where: { userId: String(query.userId) },
      })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
