import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  const query = { memberId: req.nextUrl.searchParams.get('id') }
  console.log('/api/member DELETE:', query)

  try {
    const member = await prisma.member.delete({
      where: { id: String(query.memberId) },
    })

    console.log('delete:', member)
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
