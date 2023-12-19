import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const query = {
    verifierCode: req.nextUrl.searchParams.get('verifierCode'),
    eventId: req.nextUrl.searchParams.get('id'),
  }
  console.log('query:', query)

  if (query.verifierCode) {
    console.log('/api/public/event GET:', query.verifierCode)

    const event = await prisma.event.findUnique({
      where: {
        verifierCode: query.verifierCode,
      },
      select: {
        id: true,
      },
    })

    if (!event) return NextResponse.json(null, { status: 404 })

    console.log('event:', event)
    return NextResponse.json(event, { status: 200 })
  }

  if (query.eventId) {
    console.log('/api/public/event GET:', query.eventId)

    const event = await prisma.event.findUnique({
      where: {
        id: query.eventId,
      },
      select: {
        accessStart: true,
        accessEnd: true,
        description: true,
        location: true,
        title: true,
      },
    })

    if (!event) return NextResponse.json(null, { status: 404 })

    console.log('event:', event)
    return NextResponse.json(event, { status: 200 })
  }
}
