'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ServiceForm, ServiceFormValues } from '@/components/admin/ServiceForm';
import { toast } from 'sonner';

interface MindfulnessService {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  features: string[];
  calendlyLink: string | null;
}

export default function EditMindfulnessServicePage() {
  const params = useParams()
  const [service, setService] = useState<MindfulnessService | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsFetching(true);
        const response = await fetch(`/api/admin/mindfulness-services/${id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Service not found');
          }
          throw new Error('Failed to fetch service details');
        }
        
        const data = await response.json();
        setService(data);
      } catch (error) {
        console.error('Error fetching service details:', error);
        setError('Failed to load service details. Please try again.');
      } finally {
        setIsFetching(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSubmit = async (data: ServiceFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/mindfulness-services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update service');
      }

      toast.success('Mindfulness service updated successfully');
      router.push('/admin/mindfulness-services');
      router.refresh();
    } catch (error) {
      console.error('Error updating mindfulness service:', error);
      toast.error('Failed to update service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <div className="p-4 bg-destructive/15 text-destructive rounded-md">
              {error || 'Service not found'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()} className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold ml-4">Edit Mindfulness Service</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service Information</CardTitle>
          <CardDescription>
            Update details for &quot;{service.title}&quot;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceForm
            initialData={{
              ...service,
              calendlyLink: service.calendlyLink || undefined
            }}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            serviceType="mindfulness"
          />
        </CardContent>
      </Card>
    </div>
  );
}
