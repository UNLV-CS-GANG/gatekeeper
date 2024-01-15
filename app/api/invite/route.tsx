import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const query = {
    id: req.nextUrl.searchParams.get('id'),
  }
  console.log('query:', query)

  try {
    if (query.id) {
      const invite = await prisma.invite.findUnique({
        where: { id: query.id },
      })

      console.log('Success:', invite)
      return NextResponse.json(invite, { status: 200 })
    } else {
      const invites = await prisma.invite.findMany()

      console.log('Success:', invites)
      return NextResponse.json(invites, { status: 200 })
    }
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 200 })
  }
}

export async function DELETE(req: NextRequest) {
  const query = { inviteId: req.nextUrl.searchParams.get('id') }
  console.log('/api/invite DELETE:', query)

  try {
    const invite = await prisma.invite.delete({
      where: { id: String(query.inviteId) },
    })

    console.log('delete:', invite)
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
