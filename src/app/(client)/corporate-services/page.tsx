"use client";
import { Users, Building, Brain, Shield, Target } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CalendlyCustomPopup } from "@/components/calendly";

interface CorporateService {
  id: string;
  icon: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  calendlyLink?: string | null;
}

const CorporateServices = () => {
  const [services, setServices] = useState<CorporateService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/corporate-services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching corporate services:", error);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Icon mapping function to convert string icon names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Users":
        return Users;
      case "Building":
        return Building;
      case "Brain":
        return Brain;
      case "Shield":
        return Shield;
      case "Target":
        return Target;
      default:
        return Users;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-t-primary border-r-transparent border-l-transparent border-b-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="p-4 bg-destructive/15 text-destructive rounded-md">
          {error}
        </div>
      </div>
    );
  }

  const groupedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof services>);

  const categoryColors = {
    Coaching: "from-primary to-accent",
    DEI: "from-success to-primary",
    "Workplace Mindfulness": "from-warning to-accent",
    "Team Building": "from-accent to-success",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-10 md:pt-20 lg:pt-35 pb-5 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#ffffff] to-[#ffffff]">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-[#2C3746] to-accent bg-clip-text text-transparent">
              Corporate Services
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive corporate solutions designed to transform your
            organization&apos;s culture, leadership, and performance through
            evidence-based coaching and training programs.
          </p>
          <div className="w-[220px] mx-auto">
            <Button
              asChild
              size="sm"
              className=" bg-[#2C3746] hover:bg-[#DC842E] text-white px-8 py-3 transition-all duration-300"
              style={{ textDecoration: "none" }}
            >
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services by Category */}
      {Object.entries(groupedServices).map(([category, categoryServices]) => (
        <section key={category} className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {category}
              </h2>
              <div
                className={`w-24 h-1 bg-[#2C3746] ${
                  categoryColors[category as keyof typeof categoryColors]
                } mx-auto rounded-full`}
              ></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryServices.map((service, index) => (
                <Card
                  key={index}
                  className="border-border hover:shadow-lg transition-all duration-300 group hover:border-[#DC842E] hover:bg-[#DC842E]/10"
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`w-12 h-12 bg-[#2C3746] ${
                        categoryColors[category as keyof typeof categoryColors]
                      } rounded-lg flex items-center justify-center mb-4`}
                    >
                      {React.createElement(getIconComponent(service.icon), {
                        className: "h-6 w-6 text-white",
                      })}
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground text-sm">
                        Key Features:
                      </h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="text-sm text-muted-foreground flex items-start"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {service.calendlyLink ? (
                      <CalendlyCustomPopup
                        url={service?.calendlyLink}
                        className="mr-4"
                      >
                        Book Now
                      </CalendlyCustomPopup>
                    ) : (
                      <Button
                        variant="ghost"
                        className="w-full text-primary hover:bg-[#DC842E] hover:text-white group-hover:bg-[#DC842E] group-hover:text-white transition-colors"
                      >
                        Book Now
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Approach
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A structured, proven methodology for organizational transformation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Assessment",
                description:
                  "Comprehensive evaluation of current state and needs",
              },
              {
                step: "02",
                title: "Planning",
                description: "Custom strategy development based on your goals",
              },
              {
                step: "03",
                title: "Implementation",
                description:
                  "Delivery of tailored coaching and training programs",
              },
              {
                step: "04",
                title: "Evaluation",
                description:
                  "Continuous monitoring and adjustment for optimal results",
              },
            ].map((phase, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-naples-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">
                    {phase.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {phase.title}
                </h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* add divider here  */}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background border border-t-[#fff]">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-moonstone mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Begin Your Transformation?
          </motion.h2>
          <motion.p
            className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Join hundreds of individuals and organizations who have unlocked
            their potential with Infinite Change.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mx-auto lg:w-[440px] justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg">
              <Link
                href="mailto:infinitechange25@gmail.com"
                className="no-underline"
              >
                Get in touch with our advisor
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default CorporateServices;
