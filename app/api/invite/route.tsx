import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/server/db'

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
