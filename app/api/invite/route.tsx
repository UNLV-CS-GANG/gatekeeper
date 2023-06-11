import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const invites = await prisma.invite.findMany()

		console.log('Success:', invites);
		return NextResponse.json({ invites }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}
