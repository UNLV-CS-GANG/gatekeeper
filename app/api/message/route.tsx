import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { pusher } from '@/lib/pusher/server/pusher'
import { clerkClient } from '@clerk/nextjs'
import { GuestMessage } from '@/types/GuestMessage'

export async function GET(req: NextRequest) {
  const query = {
    eventId: req.nextUrl.searchParams.get('eventId'),
  }
  console.log('/api/message GET:', query)

  try {
    const messages = await prisma.message.findMany({
      where: {
        eventId: String(query.eventId),
      },
    })

    const userIds = messages.map((msg) => msg.userId) // convert into arr of just user ids

    if (userIds.length > 0) {
      const users = await clerkClient.users.getUserList({
        userId: userIds,
      })

      const combineData = messages.map((msg) => {
        const matchingUser = users.find((user) => user.id === msg.userId)

        if (matchingUser) {
          return {
            ...msg,
            firstName: matchingUser.firstName,
            lastName: matchingUser.lastName,
            username: matchingUser.username,
            email: matchingUser.emailAddresses[0].emailAddress,
            imageUrl: matchingUser.imageUrl,
          } as GuestMessage
        } else {
          return msg
        }
      })

      console.log('data:', combineData)
      return NextResponse.json(combineData as GuestMessage[], { status: 200 })
    } else {
      console.log('user ids:', userIds)
      return NextResponse.json([], { status: 200 })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = await prisma.message.create({ data: body })
    const user = await clerkClient.users.getUser(message.userId)
    const combineData = {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      ...message,
    } as GuestMessage

    pusher.trigger('group-chat', 'message-sent', combineData)
    return NextResponse.json(combineData as GuestMessage, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const query = { messageId: req.nextUrl.searchParams.get('id') }
  const body = await req.json()
  console.log('/api/message PUT:', query)

  try {
    const message = await prisma.message.update({
      where: {
        id: String(query.messageId),
      },
      data: body,
    })

    console.log('Success:', message)
    return NextResponse.json(message, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const query = { messageId: req.nextUrl.searchParams.get('id') }
  console.log('/api/message DELETE:', query)

  try {
    const message = await prisma.message.delete({
      where: { id: String(query.messageId) },
    })

    console.log('delete:', message)
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
