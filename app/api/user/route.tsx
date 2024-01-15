import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const query = { id: req.nextUrl.searchParams.get('id') }
  console.log('api/user GET:', query)

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: String(query.id) },
    })

    console.log('user:', user)

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  console.log('api/user/ POST')
  const body = await req.json()

  try {
    const user = await prisma.user.create({ data: body })

    console.log('user:', user)

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.error()
    return NextResponse.json(null, { status: 500 })
  }
}
