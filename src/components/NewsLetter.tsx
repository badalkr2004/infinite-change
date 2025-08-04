import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";
import { CheckCircle, Send } from "lucide-react";

const newsletterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const NewsLetter = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubscribed(true);
        toast.success("Successfully subscribed to our newsletter!");
        reset();
      } else {
        toast.error(result.error || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (isSubscribed) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Thank You!
          </h3>
          <p className="text-muted-foreground">
            You&apos;ve successfully subscribed to our newsletter. We&apos;ll
            keep you updated with our latest content and insights.
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Newsletter</h4>
      <p className="text-sm opacity-80">
        Subscribe to get updates on our latest programs and insights.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Your name"
            className=" text-background ring ring-mantis"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-900 text-xs">{errors.name.message}</p>
          )}
          <Input
            type="email"
            placeholder="Your email"
            className="  text-background ring ring-mantis"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-900 text-xs">{errors.email.message}</p>
          )}
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 cursor-pointer"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewsLetter;
