import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  try {
    // Get current user from token
    const user = await getCurrentUser(req);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Return user data
    return NextResponse.json(
      { 
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get current user error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
