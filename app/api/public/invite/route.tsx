import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'
import { pusher } from '@/lib/pusher/server/pusher'

export async function GET(req: NextRequest) {
  try {
    const query = {
      inviteId: req.nextUrl.searchParams.get('id'),
      eventId: req.nextUrl.searchParams.get('eventId'),
      userId: req.nextUrl.searchParams.get('userId'),
    }

    // checks if invite exists under this event
    if (query.inviteId && query.eventId) {
      const invite = await prisma.invite.findFirst({
        where: {
          id: query.inviteId,
          eventId: query.eventId,
        },
        select: {
          scannedAt: true,
        },
      })

      console.log('invite found?:', invite)

      if (!invite) return NextResponse.json(null, { status: 404 })
      return NextResponse.json(invite, { status: 200 })
    }

    // checks if user accepted invite for this event
    if (query.userId && query.eventId) {
      const invite = await prisma.invite.findFirst({
        where: {
          userId: query.userId,
          eventId: query.eventId,
        },
        select: {
          id: true,
          acceptedAt: true,
        },
      })

      if (!invite) return NextResponse.json(null, { status: 404 })

      console.log('invite already exists:', invite)
      return NextResponse.json(invite, { status: 200 })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const query = {
      inviteId: req.nextUrl.searchParams.get('id'),
    }
    const { scannedAt } = await req.json()

    if (!query.inviteId) throw new Error('Missing query param')
    if (!scannedAt) throw new Error('Missing body')

    const invite = await prisma.invite.update({
      where: { id: query.inviteId },
      data: { scannedAt },
      select: { scannedAt: true, userId: true },
    })

    const user = await clerkClient.users.getUser(invite.userId)

    return NextResponse.json({ invite, user }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    const checkInviteExists = await prisma.invite.findFirst({
      where: {
        userId: data.userId,
      },
    })

    if (checkInviteExists)
      throw new Error('Invite already accepted by this user')

    const invite = await prisma.invite.create({
      data,
      include: {
        Event: {
          select: {
            title: true,
            userId: true,
          },
        },
      },
    })

    const user = await clerkClient.users.getUser(invite.userId)

    const notification = await prisma.notification.create({
      data: {
        text: `${invite.Event?.title}: ${user.firstName} ${user.lastName} accepted your invite`,
        userId: invite.Event?.userId,
      },
    })

    pusher.trigger('notification-bell', 'invite-accepted', notification)

    console.log('Success:', invite)
    return NextResponse.json(invite, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
