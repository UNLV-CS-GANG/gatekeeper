import generateInviteLink from '@/lib/generateInviteLink'
import { prisma } from '@/lib/prisma'
import EventExtended from '@/types/Event/EventExtended'
import { EventQueryOptions } from '@/types/Event/EventQueryOptions'
import { EventsPreviewResponse } from '@/types/Event/EventsPreviewResponse'
import { EventFilterQuery } from '@/types/Event/EventFilterQuery'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// to send response as type: EventExtended
const includeExtended: Prisma.EventInclude = {
  invites: { orderBy: { acceptedAt: 'desc' } },
}

export async function GET(req: NextRequest) {
  const query: EventQueryOptions = {
    eventId: req.nextUrl.searchParams.get('id'),
    userId: req.nextUrl.searchParams.get('userId'),
    guestId: req.nextUrl.searchParams.get('guestId'),
    organizationId: req.nextUrl.searchParams.get('organizationId'),
    organizationMemberId: req.nextUrl.searchParams.get('organizationMemberId'),
    isPublic: req.nextUrl.searchParams.get('isPublic'),
    search: req.nextUrl.searchParams.get('search'),
    filter: req.nextUrl.searchParams.get('filter') as EventFilterQuery,
    skip: req.nextUrl.searchParams.get('skip'),
    take: req.nextUrl.searchParams.get('take'),
  }
  console.log('event query:', query)

  // to filter by events this user is invited to
  const whereEventsInvitedTo: Prisma.EventWhereInput = {
    invites: { some: { userId: String(query.guestId) } },
  }

  // to filter by events owned by this user
  const whereMyEvents: Prisma.EventWhereInput = {
    userId: String(query.userId),
  }

  // to filter by events this user is a member of
  const whereEventsInMyOrganizations: Prisma.EventWhereInput = {
    Organization: { members: { some: { id: String(query.organizationMemberId) } } },
  }

  // to apply skip/take
  const skipAndTake: Prisma.EventFindManyArgs = {
    skip: query.skip ? Number(query.skip) : 0,
    take: Number(query.take),
    orderBy: { createdAt: 'desc' },
  }

  const today = new Date()

  /* ------------------------------------------------------------- */

  try {
    // get event by id
    if (query.eventId) {
      const event = await prisma.event.findUnique({
        where: { id: query.eventId },
        include: includeExtended,
      })
      return NextResponse.json(event as EventExtended, { status: 200 })
    }

    // if userId in query, get user's owned events; else if guestId, get events user is invited to; else empty
    const where: Prisma.EventWhereInput = query.userId
      ? whereMyEvents
      : query.guestId
      ? whereEventsInvitedTo
      : query.organizationMemberId
      ? whereEventsInMyOrganizations
      : {}

    // get events by filter or search
    if (query.filter || query.search || query.organizationId || query.isPublic) {
      // apply main filter
      if (query.filter === EventFilterQuery.UPCOMING) {
        where.accessStart = { gt: today }
      } else if (query.filter === EventFilterQuery.ACTIVE) {
        where.AND = [{ accessStart: { lte: today } }, { accessEnd: { gte: today } }]
      } else if (query.filter === EventFilterQuery.COMPLETE) {
        where.accessEnd = { lt: today }
      }

      // apply extra conditions
      if (query.search) where.title = { contains: query.search }
      if (query.organizationId) where.organizationId = query.organizationId
      if (query.isPublic && query.isPublic === 'true') where.inviteLink = null

      // get events and count, then send response
      const events = await prisma.event.findMany({ where, include: includeExtended, ...skipAndTake })
      const allEventsCount = await prisma.event.count({ where })
      return NextResponse.json(new EventsPreviewResponse(events as EventExtended[], allEventsCount), { status: 200 })
    }

    // get all events
    else {
      const events = await prisma.event.findMany({ where, include: includeExtended, ...skipAndTake })
      const allEventsCount = await prisma.event.count({ where })
      return NextResponse.json(new EventsPreviewResponse(events as EventExtended[], allEventsCount), { status: 200 })
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
