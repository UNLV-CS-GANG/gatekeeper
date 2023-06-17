import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const query = {
		id: req.nextUrl.searchParams.get('id'),
	};
	console.log('query:', query);

	try {
		// get event by id
		if(query.id) {
			const event = await prisma.event.findUnique({
				where: { id: query.id }
			})

			console.log('Success:', event);
			return NextResponse.json({ event }, { status: 200 });
		}

		// get all events
		else {
			const events = await prisma.event.findMany();
	
			console.log('Success:', events);
			return NextResponse.json({ events }, { status: 200 });
		}

	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
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
		return NextResponse.json(null, { status: 500 });
	}
}

