import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
	try {
		const invites = await prisma.invite.findMany()

		console.log('Success:', invites);
		return NextResponse.json({ invites }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 200 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const data = await req.json();
		const invite = await prisma.invite.create({ data });

		console.log('Success:', invite);
		return NextResponse.json({ invite }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}
