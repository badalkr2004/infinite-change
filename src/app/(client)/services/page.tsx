"use client";
import { Brain, Heart, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CalendlyCustomPopup } from "@/components/calendly";
import { useEffect, useState } from "react";

interface MindfulnessService {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  features: string[];
  serviceLink?: string | null;
}

interface CounsellingService {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  features: string[];
  serviceLink?: string | null;
}

interface BeyondWordsService {
  id: string;
  title: string;
  description: string;
  features: string[];
  serviceLink?: string | null;
}

const Services = () => {
  const [mindfulnessServices, setMindfulnessServices] = useState<
    MindfulnessService[]
  >([]);
  const [counsellingServices, setCounsellingServices] = useState<
    CounsellingService[]
  >([]);
  const [beyondWordsServices, setBeyondWordsServices] = useState<
    BeyondWordsService[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);

        // Fetch all services in parallel
        const [mindfulnessRes, counsellingRes, beyondWordsRes] =
          await Promise.all([
            fetch("/api/mindfulness-services"),
            fetch("/api/counselling-services"),
            fetch("/api/beyond-words-services"),
          ]);

        if (!mindfulnessRes.ok || !counsellingRes.ok || !beyondWordsRes.ok) {
          throw new Error("Failed to fetch services");
        }

        const mindfulnessData = await mindfulnessRes.json();
        const counsellingData = await counsellingRes.json();
        const beyondWordsData = await beyondWordsRes.json();

        setMindfulnessServices(mindfulnessData);
        setCounsellingServices(counsellingData);
        setBeyondWordsServices(beyondWordsData);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

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

  const levelColors = {
    "All levels": "bg-primary",
    "Ages 6-16": "bg-[#DC842E]",
    Beginner: "bg-[#DC842E]",
    Intermediate: "bg-accent",
    Advanced: "bg-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 md:pt-20  md:pb-16 px-4 sm:px-6 lg:px-8 bg-[#ffffff] from-secondary via-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-[#2C3746] from-primary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Discover our comprehensive range of mindfulness, counselling, and
            personal development services designed to support your journey of
            growth and transformation.
          </p>
        </div>
      </section>

      {/* Mindfulness Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="h-8 w-8 text-naples-yellow" />
              <h2 className="text-3xl md:text-4xl font-bold text-naples-yellow">
                Mindfulness
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Develop mindful awareness and reduce stress through our
              evidence-based programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mindfulnessServices.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl text-foreground">
                      {service.title}
                    </CardTitle>
                    <Badge
                      className={`${
                        levelColors[service.level as keyof typeof levelColors]
                      } text-white`}
                    >
                      {service.level}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {service.duration}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      What you&apos;ll learn:
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

                  {service.serviceLink?.startsWith("https://") ? (
                    <CalendlyCustomPopup
                      url={service?.serviceLink}
                      className="mr-4 bg-mantis"
                    >
                      Enroll Now
                    </CalendlyCustomPopup>
                  ) : (
                    <Button asChild className="w-full bg-mantis">
                      <Link
                        href={service.serviceLink || ""}
                        className="no-underline"
                      >
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Counselling Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Heart className="h-8 w-8 text-[#DC842E]" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Counselling
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mindfulness-Based Stress Reduction (MBSR) programs for all
              experience levels
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {counsellingServices.map((service, index) => (
              <Card
                key={index}
                className="bg-background border-border hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-foreground">
                      {service.title}
                    </CardTitle>
                    <Badge
                      className={`${
                        levelColors[service.level as keyof typeof levelColors]
                      } text-white`}
                    >
                      {service.level}
                    </Badge>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {service.duration}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground text-sm">
                      Program includes:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <div className="w-1.5 h-1.5 bg-[#DC842E] rounded-full mt-2 mr-2 shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {service.serviceLink &&
                  service.serviceLink.startsWith("https://") ? (
                    <CalendlyCustomPopup
                      url={service?.serviceLink}
                      className="mr-4 bg-mantis"
                    >
                      Join Program <ArrowRight className="ml-2 h-4 w-4" />
                    </CalendlyCustomPopup>
                  ) : (
                    <Button className="w-full bg-mantis text-white hover:bg-[#DC842E] hover:text-white group-hover:bg-[#DC842E] group-hover:text-white transition-colors">
                      <Link
                        href={service.serviceLink || ""}
                        className="no-underline text-white  flex"
                      >
                        Join Program <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Beyond Words Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Star className="h-8 w-8 text-[#DC842E]" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Beyond Words
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transformational coaching services that go beyond traditional
              approaches
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {beyondWordsServices.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:shadow-lg transition-all duration-300 group"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cinnabar to-naples-yellow rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-white" />
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
                      Key areas:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <div className="w-1.5 h-1.5 bg-[#DC842E] rounded-full mt-2 mr-2 shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {service.serviceLink?.startsWith("https://") ? (
                    <CalendlyCustomPopup
                      url={service?.serviceLink}
                      className="mr-4 bg-mantis"
                    >
                      Enroll Now
                    </CalendlyCustomPopup>
                  ) : (
                    <Button asChild className="w-full bg-mantis">
                      <Link
                        href={service.serviceLink || ""}
                        className="no-underline"
                      >
                        Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
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
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Button asChild size="lg" className="bg-mantis">
              <Link href="/contact" className="no-underline">
                Book Now
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-mantis">
              <Link href="/about" className="no-underline">
                Learn More About Us
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
