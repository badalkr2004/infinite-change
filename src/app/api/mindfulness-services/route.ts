import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.mindfulnessService.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching mindfulness services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mindfulness services' },
      { status: 500 }
    );
  }
}
