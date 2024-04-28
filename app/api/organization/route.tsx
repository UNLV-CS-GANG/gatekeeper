import generateCode from '@/lib/generateCode'
import { prisma } from '@/lib/prisma'
import { CreateOrganizationBody } from '@/types/Organization/CreateOrganizationBody'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { OrganizaitonQueryOptions } from '@/types/Organization/OrganizationQueryOptions'

interface RequiredOrganizationData extends Prisma.OrganizationUncheckedCreateWithoutOwnerInput {
  ownerId: string
}

// support OrganizationExtended type
const includeExtended: Prisma.OrganizationInclude = {
  owner: true,
  members: true,
  admins: true,
}

export async function GET(req: NextRequest) {
  try {
    const query: OrganizaitonQueryOptions = {
      isPublic: req.nextUrl.searchParams.get('isPublic'),
      userId: req.nextUrl.searchParams.get('userId'),
      // skip: req.nextUrl.searchParams.get('skip'),
      // take: req.nextUrl.searchParams.get('take'),
    }
    console.log('query: ', query)

    const where: Prisma.OrganizationWhereInput = {}
    if (query.userId) where.ownerId = query.userId
    if (query.isPublic === 'true') where.joinCode = null

    const orgs = await prisma.organization.findMany({ where, include: includeExtended })
    return NextResponse.json(orgs, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateOrganizationBody = await req.json()

    const data: RequiredOrganizationData = {
      name: body.name,
      linkCode: generateCode(),
      ownerId: body.ownerId,
    }

    // apply conditional attributes
    if (body.isPrivate) {
      data.joinCode = generateCode()
    }
    if (body.parentLinkCode) {
      const findOrg = await prisma.organization.findUnique({ where: { linkCode: body.parentLinkCode } })
      if (!findOrg) return NextResponse.json(null, { status: 422 })
      data.parentOrganizationId = findOrg.id
    }

    const org = await prisma.organization.create({ data })

    console.log('Success:', org)
    return NextResponse.json(org, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(null, { status: 500 })
  }
}
