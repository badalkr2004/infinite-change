import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.counsellingService.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching counselling services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch counselling services' },
      { status: 500 }
    );
  }
}
