import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	const query = {
		eventId: req.nextUrl.searchParams.get('id'),
		hostId: req.nextUrl.searchParams.get('hostId'),
	};
	console.log('query:', query);

	try {
		// get event by id
		if(query.eventId) {
			const event = await prisma.event.findUnique({
				where: { id: query.eventId },
				include: { 
					invites: { 
						select: {
							id: true,
							firstName: true,
							lastName: true,
						}
					}
				},
			})

			console.log('Success:', event);
			return NextResponse.json({ event }, { status: 200 });
		}

		// get all events
		else {
			// update to return more properties if needed
			const events = await prisma.event.findMany({
				where: {
					hostId: query.hostId
				},
				select: {
					id: true,
					title: true,
					location: true,
					invites: true,
				}
			});
	
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
		const data = await req.json();
		const tempEvent = await prisma.event.create({ data });

		const eventId = tempEvent.id;
		const event = await prisma.event.update({
			where: { id: eventId },
			data: { inviteLink: `${process.env.BASE_URL}/inviteLink/${eventId}` },
		});

		console.log('Success:', event);
		return NextResponse.json({ event }, { status: 200 })
	}
	catch(error) {
		console.error('Error:', error);
		return NextResponse.json(null, { status: 500 });
	}
}

