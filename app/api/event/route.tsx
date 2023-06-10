import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

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
		const event = await req.json();
		console.log('req:', event);

		const createdEvent = await prisma.event.create({
			data: event, 
		})
		
		return NextResponse.json({ createdEvent }, { status: 200 })
	}
	catch(error) {
		console.error('Error:', error);
	}
}

