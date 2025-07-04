import { Brain, Heart, Star, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    "Ages 6-16": "bg-warning",
    Beginner: "bg-success",
    Intermediate: "bg-accent",
    Advanced: "bg-destructive",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-secondary via-background to-muted">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
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
                  <Button className="w-full bg-linear-to-r from-primary to-accent">
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
              <Heart className="h-8 w-8 text-success" />
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
                          <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 mr-2 shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-success text-success hover:bg-success hover:text-success-foreground"
                  >
                    Join Program
                  </Button>
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
              <Star className="h-8 w-8 text-warning" />
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
                  <div className="w-12 h-12 bg-linear-to-r from-warning to-accent rounded-lg flex items-center justify-center mb-4">
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
                          <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 mr-2 shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-warning hover:bg-warning hover:text-warning-foreground group-hover:bg-warning group-hover:text-warning-foreground transition-colors"
                  >
                    Explore Journey
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-primary to-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Book your consultation today and take the first step towards
            transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 bg-background text-foreground hover:bg-background/90"
            >
              <Link href="/contact">Book Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
