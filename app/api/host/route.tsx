import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
	try {
		const hosts = await prisma.host.findMany();

		console.log('Success:', hosts);
		return NextResponse.json({ hosts }, { status: 200 });
	}
	catch(error) {
		console.error('Error:', error);
	}
}
