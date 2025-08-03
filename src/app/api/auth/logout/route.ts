import { NextResponse } from 'next/server';
import { removeAuthCookie } from '@/lib/jwt';

export async function POST() {
  try {
    // Remove the auth cookie
    await removeAuthCookie();
    
    // Return success response
    return NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Logout failed:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
