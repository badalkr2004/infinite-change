'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TestimonialForm, TestimonialFormValues } from '@/components/admin/TestimonialForm';
import { toast } from 'sonner';

export default function NewTestimonialPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: TestimonialFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create testimonial');
      }

      toast.success('Testimonial created successfully');
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      toast.error('Failed to create testimonial. Please try again.');
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
        <h1 className="text-2xl font-bold ml-4">Add New Testimonial</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Testimonial</CardTitle>
          <CardDescription>
            Add a new client testimonial to showcase on your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TestimonialForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}
