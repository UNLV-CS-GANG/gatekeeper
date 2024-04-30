import generateInviteLink from '@/lib/generateInviteLink'
import { prisma } from '@/lib/prisma'
import EventExtended from '@/types/Event/EventExtended'
import { EventQueryOptions } from '@/types/Event/EventQueryOptions'
import { EventFilterQuery } from '@/types/enums/EventFilterQuery'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const query: EventQueryOptions = {
    eventId: req.nextUrl.searchParams.get('id'),
    userId: req.nextUrl.searchParams.get('userId'),
    guestId: req.nextUrl.searchParams.get('guestId'),
    search: req.nextUrl.searchParams.get('search'),
    filter: req.nextUrl.searchParams.get('filter') as EventFilterQuery,
    skip: req.nextUrl.searchParams.get('skip'),
    take: req.nextUrl.searchParams.get('take'),
  }
  console.log('query:', query)

  const whereEventsInvitedTo: Prisma.EventWhereInput = {
    invites: { some: { userId: String(query.guestId) } },
  }
  const whereMyEvents: Prisma.EventWhereInput = {
    userId: String(query.userId),
  }

  const includeExtended: Prisma.EventInclude = {
    invites: { orderBy: { acceptedAt: 'desc' } },
  }

  const skipAndTake: Prisma.EventFindManyArgs = {
    skip: query.skip ? Number(query.skip) : 0,
    take: Number(query.take),
    orderBy: { createdAt: 'desc' },
  }

  const today = new Date()

  try {
    // get event by id
    if (query.eventId) {
      const event = await prisma.event.findUnique({
        where: { id: query.eventId },
        include: includeExtended,
      })
      return NextResponse.json(event as EventExtended, { status: 200 })
    }

    // get by filter or search
    if (query.filter || query.search) {
      const where: Prisma.EventWhereInput = query.userId ? whereMyEvents : whereEventsInvitedTo

      if (query.filter === EventFilterQuery.UPCOMING) {
        where.accessStart = { gt: today }
      } else if (query.filter === EventFilterQuery.ACTIVE) {
        where.AND = [{ accessStart: { lte: today } }, { accessEnd: { gte: today } }]
      } else if (query.filter === EventFilterQuery.COMPLETE) {
        where.accessEnd = { lt: today }
      }

      if (query.search) {
        where.title = { contains: query.search }
      }

      const events = await prisma.event.findMany({
        where,
        include: includeExtended,
        ...skipAndTake,
      })

      const allEventsCount = await prisma.event.count({ where })
      return NextResponse.json({ events, allEventsCount }, { status: 200 })
    }

    // get all events
    else {
      const events = await prisma.event.findMany({
        where: query.userId ? whereMyEvents : whereEventsInvitedTo,
        include: includeExtended,
        ...skipAndTake,
      })

      const allEventsCount = await prisma.event.count()
      return NextResponse.json({ events, allEventsCount }, { status: 200 })
    }
  } catch (error) {
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
