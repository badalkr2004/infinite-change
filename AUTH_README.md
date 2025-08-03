# JWT Authentication System

This project uses a custom JWT-based authentication system for secure admin access.

## Environment Variables

Add the following to your `.env` file:

```
JWT_SECRET=your_secure_random_string_here
```

## Authentication Flow

1. User submits login credentials on `/admin/login`
2. Server validates credentials and issues a JWT token stored in an HTTP-only cookie
3. Middleware validates the token for protected routes
4. Admin layout provides additional security by checking authentication status

## API Routes

- `/api/auth/login` - Authenticates user and issues JWT token
- `/api/auth/logout` - Clears authentication cookie
- `/api/auth/me` - Returns current user information

## Security Features

- HTTP-only cookies for token storage
- Secure cookie settings in production
- Token expiration (30 days by default)
- Role-based access control
- Multiple layers of protection (middleware + layout component)

## Implementation Details

The authentication system is implemented across several files:

- `src/lib/jwt.ts` - Core JWT utilities for token generation and verification
- `src/lib/auth-client.ts` - Client-side authentication utilities
- `src/app/api/auth/*` - Authentication API routes
- `src/middleware.ts` - Route protection middleware
- `src/app/(admin-panel)/admin/login/page.tsx` - Login page
- `src/app/(admin-panel)/admin/layout.tsx` - Admin layout with authentication check

## Production Considerations

The system is designed to work reliably in both development and production environments, with special attention to avoiding redirect loops that can occur in production deployments.
