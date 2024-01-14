import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const query = {
    hostId: req.nextUrl.searchParams.get('hostId'),
  }
  console.log('api/notification GET:', query)

  try {
    if (!query.hostId) return NextResponse.json(null, { status: 500 })

    const notis = await prisma.notification.findMany({
      where: { hostId: query.hostId },
      orderBy: {
        notifiedAt: 'desc',
      },
    })

    console.log('Success:', notis)
    return NextResponse.json(notis, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 200 })
  }
}

export async function DELETE(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
    hostId: req.nextUrl.searchParams.get('hostId'),
  }
  console.log('api/notification DELETE:', query)

  try {
    if (query.id) {
      await prisma.notification.delete({
        where: { id: String(query.id) },
      })

      return NextResponse.json(null, { status: 200 })
    }

    if (query.hostId) {
      await prisma.notification.deleteMany({
        where: { hostId: String(query.hostId) },
      })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
