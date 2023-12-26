import { NextRequest, NextResponse } from 'next/server'
import { Prisma, PrismaClient } from '@prisma/client'
import generateInviteLink from '@/lib/generateInviteLink'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  const query = {
    eventId: req.nextUrl.searchParams.get('id'),
    hostId: req.nextUrl.searchParams.get('hostId'),
    tab: req.nextUrl.searchParams.get('tab'),
    search: req.nextUrl.searchParams.get('search'),
    skip: req.nextUrl.searchParams.get('skip'),
    take: req.nextUrl.searchParams.get('take'),
  }
  console.log('query:', query)

  const today = new Date()

  try {
    // get event by id
    if (query.eventId) {
      const event = await prisma.event.findUnique({
        where: { id: query.eventId },
        include: {
          invites: {
            orderBy: {
              acceptedAt: 'desc',
            },
          },
        },
      })

      console.log('event:', event)
      return NextResponse.json(event, { status: 200 })
    }

    // get by filter
    if (query.tab || query.search) {
      const where: Prisma.EventWhereInput = {
        hostId: query.hostId,
      }

      if (query.tab === 'upcoming') {
        where.accessStart = {
          gt: today,
        }
      } else if (query.tab === 'active') {
        where.AND = [
          {
            accessStart: {
              lte: today,
            },
          },
          {
            accessEnd: {
              gte: today,
            },
          },
        ]
      } else if (query.tab === 'complete') {
        where.accessEnd = {
          lt: today,
        }
      }

      if (query.search) {
        where.OR = [
          {
            title: {
              contains: query.search,
            },
          },
          {
            location: {
              contains: query.search,
            },
          },
        ]
      }

      const events = await prisma.event.findMany({
        where,
        include: {
          invites: {
            orderBy: {
              acceptedAt: 'desc',
            },
          },
        },
        skip: query.skip ? Number(query.skip) : 0,
        take: Number(query.take),
        orderBy: { createdAt: 'desc' },
      })

      console.log('events:', events)

      const allEventsCount = await prisma.event.count({ where })

      return NextResponse.json({ events, allEventsCount }, { status: 200 })
    }

    // get all events
    else {
      // update to return more properties if needed
      const events = await prisma.event.findMany({
        where: { hostId: query.hostId },
        include: {
          invites: {
            orderBy: {
              acceptedAt: 'desc',
            },
          },
        },
        skip: query.skip ? Number(query.skip) : 0,
        take: Number(query.take),
        orderBy: { createdAt: 'desc' },
      })

      const allEventsCount = await prisma.event.count()

      console.log('events:', events)
      return NextResponse.json({ events, allEventsCount }, { status: 200 })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const tempEvent = await prisma.event.create({ data: body })

    const eventId = tempEvent.id
    const event = await prisma.event.update({
      where: { id: eventId },
      data: { inviteLink: generateInviteLink(eventId) },
    })

    console.log('Success:', event)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const query = { eventId: req.nextUrl.searchParams.get('id') }
  console.log('/api/event PUT:', query)
  const body = await req.json()
  console.log('body:', body)

  try {
    const event = await prisma.event.update({
      where: {
        id: String(query.eventId),
      },
      data: body,
    })

    console.log('Success:', event)
    return NextResponse.json(event, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const query = { eventId: req.nextUrl.searchParams.get('id') }
  console.log('/api/event DELETE:', query)

  try {
    const event = await prisma.event.delete({
      where: { id: String(query.eventId) },
    })

    console.log('delete:', event)
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
