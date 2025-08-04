"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus } from "lucide-react";

// Schema for form validation based on service type
const baseServiceSchema = {
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()),
  serviceLink: z.string().optional(),
  linkType: z.enum(['calendly', 'email']).optional(),
};

const mindfulnessServiceSchema = z.object({
  ...baseServiceSchema,
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
});

const counsellingServiceSchema = z.object({
  ...baseServiceSchema,
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
});

const beyondWordsServiceSchema = z.object({
  ...baseServiceSchema,
});

const corporateServiceSchema = z.object({
  ...baseServiceSchema,
  icon: z.string().min(1, "Icon is required"),
  category: z.string().min(1, "Category is required"),
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
  const [featureInput, setFeatureInput] = useState("");
  const [serviceLinkDisplay, setServiceLinkDisplay] = useState("");

  // Select the appropriate schema based on service type
  const getServiceSchema = () => {
    switch (serviceType) {
      case "mindfulness":
        return mindfulnessServiceSchema;
      case "counselling":
        return counsellingServiceSchema;
      case "beyondWords":
        return beyondWordsServiceSchema;
      case "corporate":
        return corporateServiceSchema;
      default:
        return mindfulnessServiceSchema;
    }
  };

  // Generate default values based on service type
  const getDefaultValues = (): ServiceFormValues => {
    const baseDefaults = {
      title: initialData?.title || "",
      description: initialData?.description || "",
      features: initialData?.features || [],
      serviceLink: initialData?.serviceLink || "",
      linkType: initialData?.linkType || "calendly",
    };

    switch (serviceType) {
      case "mindfulness":
        return {
          ...baseDefaults,
          duration: (initialData as MindfulnessServiceValues)?.duration || "",
          level: (initialData as MindfulnessServiceValues)?.level || "",
        } as MindfulnessServiceValues;
      case "counselling":
        return {
          ...baseDefaults,
          duration: (initialData as CounsellingServiceValues)?.duration || "",
          level: (initialData as CounsellingServiceValues)?.level || "",
        } as CounsellingServiceValues;
      case "beyondWords":
        return baseDefaults as BeyondWordsServiceValues;
      case "corporate":
        return {
          ...baseDefaults,
          icon: (initialData as CorporateServiceValues)?.icon || "",
          category: (initialData as CorporateServiceValues)?.category || "",
        } as CorporateServiceValues;
      default:
        return baseDefaults as BeyondWordsServiceValues;
    }
  };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(getServiceSchema()),
    defaultValues: getDefaultValues(),
  });

  const features = form.watch("features");
  const serviceLink = form.watch("serviceLink");
  const linkType = form.watch("linkType");

  // Initialize and manage display value for service link
  React.useEffect(() => {
    if (!serviceLink) {
      setServiceLinkDisplay("");
      return;
    }

    if (linkType === "email" && serviceLink.startsWith("mailto:")) {
      setServiceLinkDisplay(serviceLink.replace("mailto:", ""));
    } else if (linkType === "calendly" && serviceLink.startsWith("https://")) {
      setServiceLinkDisplay(serviceLink.replace("https://", ""));
    } else if (!linkType || linkType === "calendly" || linkType === "email") {
      // Clear display when switching types and current value doesn't match
      setServiceLinkDisplay("");
    } else {
      setServiceLinkDisplay(serviceLink);
    }
  }, [serviceLink, linkType]);

  const handleAddFeature = () => {
    if (featureInput.trim() !== "") {
      form.setValue("features", [...features, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (indexToRemove: number) => {
    form.setValue(
      "features",
      features.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

          {(serviceType === "mindfulness" || serviceType === "counselling") && (
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

          {serviceType === "corporate" && (
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
          name="linkType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Link Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select link type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="calendly">Calendly Booking</SelectItem>
                  <SelectItem value="email">Email Contact</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose how users will book or contact you for this service.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceLink"
          render={({ field }) => {
            const isEmail = linkType === 'email';
            const isCalendly = linkType === 'calendly';

            const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              let inputValue = e.target.value;
              
              // Clear any previous custom errors
              form.clearErrors('serviceLink');
              
              // Update display value
              setServiceLinkDisplay(inputValue);
              
              if (isEmail) {
                // Remove mailto: if user types it
                if (inputValue.startsWith('mailto:')) {
                  inputValue = inputValue.replace('mailto:', '');
                  setServiceLinkDisplay(inputValue);
                }
                
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (inputValue && !emailRegex.test(inputValue)) {
                  form.setError('serviceLink', {
                    type: 'manual',
                    message: 'Please enter a valid email address'
                  });
                  return; // Don't save invalid data
                }
                
                // Check if user is trying to enter a URL when email is selected
                if (inputValue && (inputValue.includes('calendly.com') || inputValue.includes('http'))) {
                  form.setError('serviceLink', {
                    type: 'manual',
                    message: 'Please enter an email address, not a URL. Change link type to "Calendly Booking" for URLs.'
                  });
                  return; // Don't save invalid data
                }
                
                // Save full mailto URL to database
                const fullUrl = inputValue ? `mailto:${inputValue}` : '';
                field.onChange(fullUrl);
                
              } else if (isCalendly) {
                // Remove https:// if user types it
                if (inputValue.startsWith('https://')) {
                  inputValue = inputValue.replace('https://', '');
                  setServiceLinkDisplay(inputValue);
                }
                
                // Validate Calendly URL format
                if (inputValue && !inputValue.includes('calendly.com')) {
                  form.setError('serviceLink', {
                    type: 'manual',
                    message: 'Please enter a valid Calendly URL (must contain calendly.com)'
                  });
                  return; // Don't save invalid data
                }
                
                // Check if user is trying to enter an email when calendly is selected
                if (inputValue && inputValue.includes('@') && !inputValue.includes('calendly.com')) {
                  form.setError('serviceLink', {
                    type: 'manual',
                    message: 'Please enter a Calendly URL, not an email. Change link type to "Email Contact" for emails.'
                  });
                  return; // Don't save invalid data
                }
                
                // Save full https URL to database
                const fullUrl = inputValue ? `https://${inputValue}` : '';
                field.onChange(fullUrl);
                
              } else {
                field.onChange(inputValue);
              }
            };
            
            return (
              <FormItem>
                <FormLabel>
                  {isEmail ? 'Email Address' : isCalendly ? 'Calendly Link' : 'Service Link'}
                </FormLabel>
                <FormControl>
                  <div className="flex">
                    {isEmail && (
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        mailto:
                      </span>
                    )}
                    {isCalendly && (
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                        https://
                      </span>
                    )}
                    <Input
                      placeholder={
                        isEmail 
                          ? 'your-email@example.com'
                          : isCalendly 
                          ? 'calendly.com/your-link'
                          : 'Enter service link'
                      }
                      value={serviceLinkDisplay}
                      onChange={handleInputChange}
                      className={isEmail || isCalendly ? 'rounded-l-none' : ''}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  {isEmail 
                    ? 'Enter your email address for users to contact you directly.'
                    : isCalendly 
                    ? 'Enter your Calendly link (without https://) to allow users to schedule sessions.'
                    : 'Enter the link for users to book or contact you for this service.'
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-black text-white hover:text-black hover:bg-neutral-300 rounded"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></span>
                {initialData ? "Updating..." : "Creating..."}
              </>
            ) : (
              <>{initialData ? "Update Service" : "Create Service"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
