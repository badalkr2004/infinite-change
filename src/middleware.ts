import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Get the token and check if user is authenticated
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If no token or not an admin, redirect to login
  if (!token || token.role !== "ADMIN") {
    // Create a clean redirect URL to avoid callback URL issues
    const loginUrl = new URL("/admin/login", req.url);

    // Add a simple callbackUrl parameter without the complex encoding
    const targetPath = pathname.startsWith("/admin")
      ? pathname
      : "/admin/dashboard";
    loginUrl.searchParams.set("callbackUrl", targetPath);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
