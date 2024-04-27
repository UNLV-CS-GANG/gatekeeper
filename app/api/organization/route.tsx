import generateCode from '@/lib/generateCode'
import { prisma } from '@/lib/prisma'
import { CreateOrganizationBody } from '@/types/Organization/CreateOrganizationBody'
import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// get type w/o required "owner" attribute, include as id instead
interface RequiredOrganizationData extends Prisma.OrganizationUncheckedCreateWithoutOwnerInput {
  ownerId: string
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
