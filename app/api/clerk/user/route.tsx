import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { Guest } from '@/types/Guest'
import { User } from '@clerk/nextjs/dist/types/server'

export async function GET(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
    eventId: req.nextUrl.searchParams.get('eventId'),
    organizationId: req.nextUrl.searchParams.get('organizationId'),
  }
  console.log('api/clerk/user GET:', query)

  try {
    // get user by userId
    if (query.id) {
      const user = await clerkClient.users.getUser(query.id)
      console.log('clerk user:', user)
      return NextResponse.json(user as User, { status: 200 })
    }

    // get users associated by event id
    if (query.eventId) {
      const invites = await prisma.invite.findMany({
        where: { eventId: String(query.eventId) },
      })

      const userIds = invites.map((invite) => invite.userId) // convert into arr of just user ids

      if (userIds.length > 0) {
        const users = await clerkClient.users.getUserList({
          userId: userIds,
        })

        const combineData = users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
          ...invites.find((inv) => inv.userId === user.id),
        }))

        return NextResponse.json(combineData as Guest[], { status: 200 })
      } else {
        return NextResponse.json([], { status: 200 })
      }
    }

    // get users by organization id
    if (query.organizationId) {
      const members = await prisma.member.findMany({
        where: { organizationId: query.organizationId },
      })

      const userIds = members.map((member) => member.userId)

      if (userIds.length > 0) {
        const users = await clerkClient.users.getUserList({
          userId: userIds,
        })

        const combineData = users.map((user) => ({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
          ...members.find((member) => member.userId === user.id),
        }))

        return NextResponse.json(combineData, { status: 200 })
      } else {
        return NextResponse.json([], { status: 200 })
      }
    } else {
      throw new Error('Missing "userIds" in body')
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}
