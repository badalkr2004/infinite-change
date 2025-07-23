'use client';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Layers, Users, FileText, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ServiceCount {
  mindfulnessServices: number;
  counsellingServices: number;
  beyondWordsServices: number;
  corporateServices: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [counts, setCounts] = useState<ServiceCount>({
    mindfulnessServices: 0,
    counsellingServices: 0,
    beyondWordsServices: 0,
    corporateServices: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/admin/service-counts');
        const data = await response.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching service counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const chartData = [
    { name: 'Mindfulness', count: counts.mindfulnessServices },
    { name: 'Counselling', count: counts.counsellingServices },
    { name: 'Beyond Words', count: counts.beyondWordsServices },
    { name: 'Corporate', count: counts.corporateServices },
  ];

  const statCards = [
    {
      title: 'Mindfulness Services',
      value: counts.mindfulnessServices,
      description: 'Total services',
      icon: Layers,
      href: '/admin/mindfulness-services',
    },
    {
      title: 'Counselling Services',
      value: counts.counsellingServices,
      description: 'Total services',
      icon: FileText,
      href: '/admin/counselling-services',
    },
    {
      title: 'Beyond Words Services',
      value: counts.beyondWordsServices,
      description: 'Total services',
      icon: Calendar,
      href: '/admin/beyond-words-services',
    },
    {
      title: 'Corporate Services',
      value: counts.corporateServices,
      description: 'Total services',
      icon: Users,
      href: '/admin/corporate-services',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {session?.user?.name || 'Admin'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => (
          <Card key={i} className="overflow-hidden admin-card border border-[#e0e0e0] shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-black">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-[#424242]" />
              </div>
              <CardDescription>{stat.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Button asChild variant="admin-ghost" size="sm" className="bg-black text-white hover:text-black rounded">
                  <Link href={stat.href} className='no-underline'>View all</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="col-span-4 admin-card border border-[#e0e0e0] shadow-sm">
        <CardHeader>
          <CardTitle>Services Overview</CardTitle>
          <CardDescription>
            Distribution of services across different categories
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="admin-card border border-[#e0e0e0] shadow-sm">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button asChild wrapperWidth="full" className="w-full justify-start bg-black text-white hover:text-black rounded" variant="admin-outline">
              <Link href="/admin/mindfulness-services/new" className='no-underline'>
                <Layers className="mr-2 h-4 w-4" />
                Add New Mindfulness Service
              </Link>
            </Button>
            <Button asChild wrapperWidth="full" className="w-full justify-start  bg-black text-white hover:text-black rounded" variant="admin-outline">
              <Link href="/admin/counselling-services/new" className='no-underline'>
                <FileText className="mr-2 h-4 w-4" />
                Add New Counselling Service
              </Link>
            </Button>
            <Button asChild wrapperWidth="full" className="w-full justify-start bg-black text-white hover:text-black rounded" variant="admin-outline">
              <Link href="/admin/beyond-words-services/new" className='no-underline'>
                <Calendar className="mr-2 h-4 w-4" />
                Add New Beyond Words Service
              </Link>
            </Button>
            <Button asChild wrapperWidth="full" className="w-full justify-start  bg-black text-white hover:text-black rounded" variant="admin-outline">
              <Link href="/admin/corporate-services/new" className='no-underline'>
                <Users className="mr-2 h-4 w-4" />
                Add New Corporate Service
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
            <CardDescription>
              Current system status and information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Environment</span>
              <span className="text-sm font-medium">
                {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Updated</span>
              <span className="text-sm font-medium">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">User Role</span>
              <span className="text-sm font-medium">{session?.user?.role}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
