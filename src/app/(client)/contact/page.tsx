"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { sendContactEmails } from "@/lib/send-mail";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Please Enter Your Name" }),
  email: z.string().email({ message: "Please Enter a Valid Email Address" }),
  phone: z.string().min(10, { message: "Please Enter a Valid Phone Number" }),
  message: z.string().min(10, {
    message: "Please make sure your message is at least 10 characters long.",
  }),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      const response = await sendContactEmails({
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
      });

      if (response.success) {
        toast.success(
          "Thank you for contacting us! We'll get back to you within 24 hours."
        );
        reset(); // Clear the form
      } else {
        console.error("Failed to send emails:", response.error);
        toast.error(
          "Failed to send message. Please try again or contact us directly."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "info@infinitechange.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Call us during business hours",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "New York, NY",
      description: "Visit our main office",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#ffffff]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Get in{" "}
            <span className="bg-[#2C3746] bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ready to start your transformation journey? We&apos;d love to hear
            from you. Reach out to discuss how we can help you achieve your
            goals.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="w-full border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Send us a Message
              </CardTitle>
              <p className="text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      className="border-border focus:border-primary"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-border focus:border-primary"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-foreground"
                  >
                    Phone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="border-border focus:border-primary"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your goals and how we can help..."
                    rows={6}
                    className="border-border focus:border-primary resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">
                      {errors.message.message}
                    </p>
                  )}
                </div>
                <div className="w-[205px] ">
                  <Button
                    type="submit"
                    className="w-[220px] sm:w-auto bg-[#2C3746] hover:opacity-90"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Let&apos;s Connect
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re an individual looking for personal growth or
                an organization seeking transformation, we&apos;re here to
                support your journey. Choose the best way to reach us.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="w-full border-border hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#2C3746] p-3 rounded-lg">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-lg text-foreground mb-1">
                          {info.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-[#2C3746] border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary-foreground mb-2">
                  Free Consultation
                </h3>
                <p className="text-primary-foreground/90 mb-4">
                  Schedule a complimentary 30-minute consultation to discuss
                  your goals and how we can help you achieve them.
                </p>
                <Button
                  variant="secondary"
                  className="bg-background text-foreground hover:bg-background/90"
                >
                  Book Free Session
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How do I know which service is right for me?",
                answer:
                  "We offer a free consultation to discuss your goals and recommend the best approach for your needs.",
              },
              {
                question: "Do you offer virtual sessions?",
                answer:
                  "Yes, we provide both in-person and virtual coaching sessions to accommodate your preferences and schedule.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "We require 24 hours notice for cancellations. Please contact us as soon as possible if you need to reschedule.",
              },
              {
                question: "How long does a typical coaching program last?",
                answer:
                  "Program duration varies based on your goals, ranging from 4-week workshops to 6-month comprehensive programs.",
              },
            ].map((faq, index) => (
              <Card key={index} className="bg-background border-border">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
