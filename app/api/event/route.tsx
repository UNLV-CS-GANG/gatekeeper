import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/server/db'

export async function GET() {
	try {
		const events = await prisma.event.findMany();

		console.log('Success:', events);
		return NextResponse.json({ events }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}

export async function POST(req: NextRequest) {
	try {
		// console.log('req:', req)
		const data = req.json();
		console.log('event from req json:', data);

		const event = await prisma.event.create({
			data: data, 
		})
		
		return NextResponse.json({ event }, { status: 200 })
	}
	catch(error) {
		console.error('Error:', error);
	}
}

