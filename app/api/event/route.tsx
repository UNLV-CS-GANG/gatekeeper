import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/server/db'

export async function GET(request: NextRequest) {
	try {
		const events = await prisma.event.findMany();

		console.log('Success:', events);
		return NextResponse.json({ events }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}
