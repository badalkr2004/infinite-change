import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

// Types
export type JWTPayload = {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  image?: string;
};

// Constants
const TOKEN_SECRET = process.env.JWT_SECRET || 'fallback-secret-do-not-use-in-production';
const COOKIE_NAME = 'auth-token';

// Validate JWT secret in production
if (process.env.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required in production');
}

// Convert secret to Uint8Array for jose
const getSecretKey = () => new TextEncoder().encode(TOKEN_SECRET);

// Generate JWT token
export async function generateToken(payload: JWTPayload): Promise<string> {
  const secret = getSecretKey();
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(secret);
  return jwt;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const secret = getSecretKey();
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}

// Set JWT token in cookies (server-side)
export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, { 
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60,
    sameSite: 'lax',
  });
}

// Remove JWT token from cookies (server-side)
export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

// Get JWT token from cookies or authorization header
export async function getAuthToken(req?: NextRequest): Promise<string> {
  if (req) {
    // For middleware - get token from request cookies
    const token = req.cookies.get(COOKIE_NAME)?.value;
    if (token) return token;
    
    // Try Authorization header as fallback
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }
    return "";
  } else {
    // For server components - get token from cookies API
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get(COOKIE_NAME)?.value;
      return token || "";
    } catch (error) {
      console.error('Error getting auth token:', error);
      return "";
    }
  }
}

// Get current user from token
export async function getCurrentUser(req?: NextRequest): Promise<JWTPayload | null> {
  const token = await getAuthToken(req);
  if (!token) return null;
  
  return verifyToken(token);
}
