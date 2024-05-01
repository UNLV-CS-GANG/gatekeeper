import generateCode from '@/lib/generateCode'
import { prisma } from '@/lib/prisma'
import { CreateOrganizationBody } from '@/types/Organization/CreateOrganizationBody'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { OrganizaitonQueryOptions } from '@/types/Organization/OrganizationQueryOptions'
import { OrganizationExtended } from '@/types/Organization/OrganizationExtended'

interface RequiredOrganizationData extends Prisma.OrganizationUncheckedCreateWithoutOwnerInput {
  ownerId: string
}

interface FindManyRequiredWhere extends Prisma.OrganizationFindManyArgs {
  where: Prisma.OrganizationWhereInput
}

// to send response as type: OrganizationExtended
const includeExtended: Prisma.OrganizationInclude = {
  owner: true,
  members: true,
  admins: true,
}

export async function GET(req: NextRequest) {
  const query: OrganizaitonQueryOptions = {
    organizationId: req.nextUrl.searchParams.get('id'),
    userId: req.nextUrl.searchParams.get('userId'),
    isPublic: req.nextUrl.searchParams.get('isPublic'),
    skip: req.nextUrl.searchParams.get('skip'),
    take: req.nextUrl.searchParams.get('take'),
  }
  console.log('organizations query: ', query)

  // to apply skip/take
  const skipAndTake: Prisma.OrganizationFindManyArgs = {
    skip: query.skip ? Number(query.skip) : 0,
    take: Number(query.take),
  }

  /* ------------------------------------------------------------- */

  try {
    // get organization by id
    if (query.organizationId) {
      const org = await prisma.organization.findUnique({
        where: { id: query.organizationId },
        include: includeExtended,
      })
      return NextResponse.json(org as OrganizationExtended, { status: 200 })
    }

    let findMany: FindManyRequiredWhere = { where: {}, include: includeExtended }

    // apply optional queries
    if (query.userId) findMany.where.ownerId = query.userId
    if (query.isPublic === 'true') findMany.where.joinCode = null
    if (query.skip && query.take) findMany = { ...findMany, ...skipAndTake }

    // get organizations and return response
    const orgs = await prisma.organization.findMany(findMany)
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
