'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LogOut, LayoutDashboard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { logout, getCurrentUser, User } from '@/lib/auth-client';
import '@/styles/admin-theme.css';

// Create a client component that uses our custom auth
function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (pathname !== '/admin/login') {
          const userData = await getCurrentUser();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [pathname]);
  
  // Skip layout rendering for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated after loading is complete
  if (!loading && !user) {
    if (typeof window !== 'undefined') {
      window.location.replace(`/admin/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }
  
  // Navigation links
  const navItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Mindfulness Services',
      href: '/admin/mindfulness-services',
      icon: FileText,
    },
    {
      name: 'Counselling Services',
      href: '/admin/counselling-services',
      icon: FileText,
    },
    {
      name: 'Beyond Words Services',
      href: '/admin/beyond-words-services',
      icon: FileText,
    },
    {
      name: 'Corporate Services',
      href: '/admin/corporate-services',
      icon: FileText,
    },
   
  ];

  return (

    <div className="min-h-screen admin-theme bg-[#f8f9fa]">
      {/* Top Navigation */}
      <header className="admin-header bg-white shadow-sm border-b h-16 fixed w-full top-0 z-10">
        <div className="h-full flex items-center px-4 sm:px-6">
          <div className="flex-1 flex">
            <Link href="/admin/dashboard" className="flex items-center">
              <h1 className="text-lg font-semibold text-black">Infinite Change Admin</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-black text-white">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline-block">
                {user?.name || 'Admin'}
              </span>
            </div>
            <Button
              variant="admin-outline"
              size="icon"
              onClick={() => logout()}
              title="Sign Out"
              className='bg-black text-white hover:text-black rounded w-[100px]'
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar and Main Content */}
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-64 admin-sidebar bg-white border-r shrink-0">
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors no-underline ${
                    isActive ? 'bg-[#f5f5f5] text-black border-l-4 border-black' : 'text-[#424242] hover:bg-[#f5f5f5] hover:text-black'
                  }`}
                >
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-black' : 'text-[#424242]'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="admin-outline"
              size="sm"
              className="w-full flex items-center justify-center bg-black text-white hover:text-black rounded" 
              onClick={() => logout()}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <main className="p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
   
  );
}

// Main layout component
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Skip layout rendering for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  return <AdminLayoutContent>{children}</AdminLayoutContent>;

}
