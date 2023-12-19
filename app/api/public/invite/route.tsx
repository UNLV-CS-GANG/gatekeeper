import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()
    const tempInvite = await prisma.invite.create({ data })

    const invite = await prisma.invite.update({
      where: { id: tempInvite.id },
      data: { qr: tempInvite.eventId + tempInvite.id },
    })

    console.log('Success:', invite)
    return NextResponse.json(invite, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
