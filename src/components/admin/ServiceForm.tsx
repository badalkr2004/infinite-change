'use client';

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus } from 'lucide-react';

// Schema for form validation based on service type
const baseServiceSchema = {
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()),
  calendlyLink: z.string().optional(),
};

const mindfulnessServiceSchema = z.object({
  ...baseServiceSchema,
  duration: z.string().min(1, 'Duration is required'),
  level: z.string().min(1, 'Level is required'),
});

const counsellingServiceSchema = z.object({
  ...baseServiceSchema,
  duration: z.string().min(1, 'Duration is required'),
  level: z.string().min(1, 'Level is required'),
});

const beyondWordsServiceSchema = z.object({
  ...baseServiceSchema,
});

const corporateServiceSchema = z.object({
  ...baseServiceSchema,
  icon: z.string().min(1, 'Icon is required'),
  category: z.string().min(1, 'Category is required'),
});

export type MindfulnessServiceValues = z.infer<typeof mindfulnessServiceSchema>;
export type CounsellingServiceValues = z.infer<typeof counsellingServiceSchema>;
export type BeyondWordsServiceValues = z.infer<typeof beyondWordsServiceSchema>;
export type CorporateServiceValues = z.infer<typeof corporateServiceSchema>;

export type ServiceFormValues = 
  | MindfulnessServiceValues
  | CounsellingServiceValues
  | BeyondWordsServiceValues
  | CorporateServiceValues;

type ServiceTypeMap = {
  mindfulness: MindfulnessServiceValues;
  counselling: CounsellingServiceValues;
  beyondWords: BeyondWordsServiceValues;
  corporate: CorporateServiceValues;
};

interface ServiceFormProps {
  initialData?: ServiceFormValues;
  onSubmit: (data: ServiceFormValues) => void;
  isLoading: boolean;
  serviceType: keyof ServiceTypeMap;
}

export function ServiceForm({
  initialData,
  onSubmit,
  isLoading,
  serviceType,
}: ServiceFormProps) {
  const [featureInput, setFeatureInput] = useState('');
  
  // Select the appropriate schema based on service type
  const getServiceSchema = () => {
    switch (serviceType) {
      case 'mindfulness':
        return mindfulnessServiceSchema;
      case 'counselling':
        return counsellingServiceSchema;
      case 'beyondWords':
        return beyondWordsServiceSchema;
      case 'corporate':
        return corporateServiceSchema;
      default:
        return mindfulnessServiceSchema;
    }
  };

  // Generate default values based on service type
  const getDefaultValues = (): ServiceFormValues => {
    const baseDefaults = {
      title: initialData?.title || '',
      description: initialData?.description || '',
      features: initialData?.features || [],
      calendlyLink: initialData?.calendlyLink || '',
    };

    switch (serviceType) {
      case 'mindfulness':
        return {
          ...baseDefaults,
          duration: (initialData as MindfulnessServiceValues)?.duration || '',
          level: (initialData as MindfulnessServiceValues)?.level || '',
        } as MindfulnessServiceValues;
      case 'counselling':
        return {
          ...baseDefaults,
          duration: (initialData as CounsellingServiceValues)?.duration || '',
          level: (initialData as CounsellingServiceValues)?.level || '',
        } as CounsellingServiceValues;
      case 'beyondWords':
        return baseDefaults as BeyondWordsServiceValues;
      case 'corporate':
        return {
          ...baseDefaults,
          icon: (initialData as CorporateServiceValues)?.icon || '',
          category: (initialData as CorporateServiceValues)?.category || '',
        } as CorporateServiceValues;
      default:
        return baseDefaults as BeyondWordsServiceValues;
    }
  };
  
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(getServiceSchema()),
    defaultValues: getDefaultValues(),
  });

  const features = form.watch('features');

  const handleAddFeature = () => {
    if (featureInput.trim() !== '') {
      form.setValue('features', [...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    form.setValue(
      'features',
      features.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Service title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {(serviceType === 'mindfulness' || serviceType === 'counselling') && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 60 minutes" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Beginner" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          
          {serviceType === 'corporate' && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. MeditationIcon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Workshops" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description of the service" 
                  className="min-h-32" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="features"
          render={() => (
            <FormItem>
              <FormLabel>Features</FormLabel>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Add a feature"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddFeature}
                    className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {features.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No features added. Add features to highlight this service.
                    </p>
                  ) : (
                    features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md border p-2"
                      >
                        <span className="text-sm">{feature}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFeature(index)}
                          className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="calendlyLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Calendly Link</FormLabel>
              <FormControl>
                <Input placeholder="https://calendly.com/your-link" {...field} />
              </FormControl>
              <FormDescription>
                Enter your Calendly link to allow users to schedule sessions.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>
                {initialData ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>{initialData ? 'Update Service' : 'Create Service'}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
