import { NextRequest, NextResponse } from 'next/server'
import { clerkClient } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { Guest } from '@/types/Guest'
import { User } from '@clerk/nextjs/dist/types/server'

export async function GET(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
    eventId: req.nextUrl.searchParams.get('eventId'),
  }
  console.log('api/clerk/user GET:', query)

  try {
    // get user by userId
    if (query.id) {
      const user = await clerkClient.users.getUser(query.id)
      console.log('clerk user:', user)
      return NextResponse.json(user as User, { status: 200 })
    }

    // get users associated by eventId
    if (query.eventId) {
      const invites = await prisma.invite.findMany({
        where: {
          eventId: String(query.eventId),
        },
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

        console.log('data:', combineData)
        return NextResponse.json(combineData as Guest[], { status: 200 })
      } else {
        console.log('user ids:', userIds)
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
