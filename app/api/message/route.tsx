import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    console.log('messages:', messages)
    return NextResponse.json(messages, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const message = await prisma.message.create({ data: body })

    console.log('Success:', message)
    return NextResponse.json(message, { status: 200 })
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
