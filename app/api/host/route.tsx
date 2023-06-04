import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/server/db';

export async function GET(request: NextRequest) {
	try {
		console.log('test')
		const hosts = await prisma.host.findMany();

		console.log('Success:', hosts);
		return NextResponse.json({ hosts }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}
