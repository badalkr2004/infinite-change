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

const Services = () => {
  const mindfulnessServices = [
    {
      title: "Adult Mindfulness Programs",
      description:
        "Comprehensive mindfulness training for professionals seeking to reduce stress and improve focus.",
      duration: "8-week program",
      level: "All levels",
      features: [
        "Meditation techniques",
        "Stress reduction",
        "Focus improvement",
        "Emotional regulation",
        "Work-life balance",
      ],
    },
    {
      title: "Children's Mindfulness",
      description:
        "Age-appropriate mindfulness practices to help children develop emotional intelligence and coping skills.",
      duration: "6-week program",
      level: "Ages 6-16",
      features: [
        "Age-appropriate techniques",
        "Emotional awareness",
        "Self-regulation",
        "Confidence building",
        "Social skills",
      ],
    },
  ];

  const counsellingServices = [
    {
      title: "Beginner's MBSR Program",
      description:
        "Introduction to Mindfulness-Based Stress Reduction for those new to mindfulness practices.",
      duration: "4-week program",
      level: "Beginner",
      features: [
        "Basic meditation",
        "Breathing techniques",
        "Body awareness",
        "Stress management",
        "Foundation building",
      ],
      calendlyLink:
        "https://calendly.com/infinitecoachingspace/mindfulness-mbsr-for-beginners?month=2025-08&date=2025-08-22",
    },
    {
      title: "Intermediate MBSR Program",
      description:
        "Advanced mindfulness techniques for those with some experience in meditation and stress reduction.",
      duration: "6-week program",
      level: "Intermediate",
      features: [
        "Advanced techniques",
        "Deeper practices",
        "Mindful movement",
        "Cognitive awareness",
        "Integration skills",
      ],
    },
    {
      title: "Advanced MBSR Program",
      description:
        "Comprehensive program for experienced practitioners seeking to deepen their mindfulness journey.",
      duration: "8-week program",
      level: "Advanced",
      features: [
        "Expert guidance",
        "Complex practices",
        "Leadership skills",
        "Teaching preparation",
        "Personal mastery",
      ],
    },
  ];

  const beyondWordsServices = [
    {
      title: "Transformational Coaching",
      description:
        "Deep, holistic coaching that addresses all aspects of personal and professional transformation.",
      features: [
        "Life purpose discovery",
        "Values alignment",
        "Goal achievement",
        "Mindset shifts",
        "Sustainable change",
      ],
    },
    {
      title: "Unlock Your Potential",
      description:
        "Intensive program designed to help you discover and unleash your hidden talents and capabilities.",
      features: [
        "Strength assessment",
        "Talent development",
        "Confidence building",
        "Skill enhancement",
        "Performance optimization",
      ],
    },
    {
      title: "A Journey of Discovery",
      description:
        "Guided exploration of self-awareness, personal growth, and life direction.",
      features: [
        "Self-exploration",
        "Personal insights",
        "Growth planning",
        "Direction finding",
        "Purpose clarification",
      ],
    },
  ];

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
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-[#ffffff] from-secondary via-background to-muted">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
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
                  <Button className="w-full bg-[#2C3746] from-primary to-accent">
                    Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Counselling Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
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
                  {service.calendlyLink ? (
                    <CalendlyCustomPopup
                      url={service?.calendlyLink}
                      className="mr-4"
                    >
                      Join Program
                    </CalendlyCustomPopup>
                  ) : (
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:bg-[#DC842E] hover:text-white group-hover:bg-[#DC842E] group-hover:text-white transition-colors"
                    >
                      Join Program
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
                  <div className="w-12 h-12 bg-[#2C3746] from-[#DC842E] to-accent rounded-lg flex items-center justify-center mb-4">
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
                  <Button
                    variant="ghost"
                    className="w-full text-[#ffffff] hover:bg-[#DC842E] hover:text-[#ffffff]-foreground group-hover:bg-[#DC842E] group-hover:text-[#DC842E]-foreground transition-colors"
                  >
                    Explore Journey
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ background: "#273548", color: "#FFFFCC" }}
      >
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Begin Your Transformation?
          </motion.h2>
          <motion.p
            className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto"
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
            <Button asChild size="lg">
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button asChild size="lg">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
