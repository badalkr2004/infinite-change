import { NextResponse, NextRequest } from 'next/server';
import { getAuthToken, verifyToken } from '@/lib/jwt';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for login page, Next.js internals, and auth API routes
  if (
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth')
  ) {
    return NextResponse.next();
  }

  try {
    // Get and verify token
    const tokenString = await getAuthToken(req);
    
    if (!tokenString) {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    const token = await verifyToken(tokenString);
    
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }
}

export const config = {
  matcher: [
    '/admin/dashboard',
    '/admin/dashboard/(.*)',
    '/admin/mindfulness-services',
    '/admin/mindfulness-services/(.*)',
    '/admin/counselling-services',
    '/admin/counselling-services/(.*)',
    '/admin/beyond-words-services', 
    '/admin/beyond-words-services/(.*)',
    '/admin/corporate-services',
    '/admin/corporate-services/(.*)',
  ]
};
