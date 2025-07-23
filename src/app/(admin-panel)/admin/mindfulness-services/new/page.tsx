'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ServiceForm, ServiceFormValues } from '@/components/admin/ServiceForm';
import { toast } from 'sonner';

export default function NewMindfulnessServicePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: ServiceFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/admin/mindfulness-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create service');
      }

      toast.success('Mindfulness service created successfully');
      router.push('/admin/mindfulness-services');
      router.refresh();
    } catch (error) {
      console.error('Error creating mindfulness service:', error);
      toast.error('Failed to create service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold ml-4">Add New Mindfulness Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Create a new mindfulness service to display on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            serviceType="mindfulness"
          />
        </CardContent>
      </Card>
    </div>
  );
}
