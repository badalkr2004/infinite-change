'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TestimonialForm, TestimonialFormValues } from '@/components/admin/TestimonialForm';
import { toast } from 'sonner';

interface Testimonial {
  id: string;
  name: string;
  role?: string | null;
  company?: string | null;
  content: string;
  rating: number;
  image?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setResolvedParams);
  }, [params]);

  useEffect(() => {
    if (resolvedParams?.id) {
      fetchTestimonial(resolvedParams.id);
    }
  }, [resolvedParams]);

  const fetchTestimonial = async (id: string) => {
    try {
      setIsLoadingData(true);
      const response = await fetch(`/api/admin/testimonials/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch testimonial');
      }
      
      const data = await response.json();
      setTestimonial(data);
    } catch (error) {
      console.error('Error fetching testimonial:', error);
      setError('Failed to load testimonial. Please try again.');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleSubmit = async (data: TestimonialFormValues) => {
    if (!resolvedParams?.id) return;

    try {
      setIsLoading(true);
      
      const response = await fetch(`/api/admin/testimonials/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update testimonial');
      }

      toast.success('Testimonial updated successfully');
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      console.error('Error updating testimonial:', error);
      toast.error('Failed to update testimonial. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }

  if (error || !testimonial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold ml-4">Edit Testimonial</h1>
        </div>
        <div className="p-4 bg-destructive/15 text-destructive rounded-md">
          {error || 'Testimonial not found'}
        </div>
      </div>
    );
  }

  const initialData: TestimonialFormValues = {
    name: testimonial.name,
    role: testimonial.role || '',
    company: testimonial.company || '',
    content: testimonial.content,
    rating: testimonial.rating,
    image: testimonial.image || '',
    isActive: testimonial.isActive,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold ml-4">Edit Testimonial</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Testimonial</CardTitle>
          <CardDescription>
            Update the testimonial information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
