import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
  try {
    const query = {
      inviteId: req.nextUrl.searchParams.get('id'),
      eventId: req.nextUrl.searchParams.get('eventId'),
    }

    if (!query.inviteId || !query.eventId)
      throw new Error('Missing query params')

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
      select: { scannedAt: true, firstName: true, lastName: true },
    })

    return NextResponse.json(invite, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const invite = await prisma.invite.create({ data })

    console.log('Success:', invite)
    return NextResponse.json(invite, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
