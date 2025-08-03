'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Types
export type User = {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  image?: string;
};

export type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

// Login function
export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Login failed' };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: 'An unexpected error occurred'+error };
  }
}

// Logout function
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });
    window.location.replace('/admin/login');
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout error silently, still redirect
    window.location.replace('/admin/login');
  }
}

// Get current user function
export async function getCurrentUser(): Promise<User | null> {
  try {
    const response = await fetch('/api/auth/me', {
      credentials: 'include'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

// Custom hook for authentication
export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user');
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, []);
  
  const redirectToLogin = () => {
    router.push('/admin/login');
  };
  
  const redirectToDashboard = () => {
    router.push('/admin/dashboard');
  };
  
  return {
    user,
    loading,
    error,
    login,
    logout,
    getCurrentUser,
    redirectToLogin,
    redirectToDashboard,
  };
}
