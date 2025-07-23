import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.beyondWordsService.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching beyond words services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beyond words services' },
      { status: 500 }
    );
  }
}
