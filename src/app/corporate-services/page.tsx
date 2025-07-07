"use client";
import { Users, Building, Brain, Shield, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const CorporateServices = () => {
  const services = [
    {
      icon: Users,
      category: "Coaching",
      title: "Executive Coaching",
      description:
        "One-on-one leadership development for senior executives and high-potential leaders.",
      features: [
        "Personalized development plans",
        "360-degree feedback",
        "Leadership assessment",
        "Strategic thinking enhancement",
      ],
    },
    {
      icon: Target,
      category: "Coaching",
      title: "Career Coaching",
      description:
        "Professional development support for career transitions and advancement.",
      features: [
        "Career pathway planning",
        "Skills assessment",
        "Interview preparation",
        "Personal branding",
      ],
    },
    {
      icon: Users,
      category: "Coaching",
      title: "Team Coaching",
      description:
        "Collaborative coaching to enhance team dynamics and collective performance.",
      features: [
        "Team assessment",
        "Communication improvement",
        "Conflict resolution",
        "Collaboration enhancement",
      ],
    },
    {
      icon: Building,
      category: "DEI",
      title: "Inclusive Leadership Training",
      description:
        "Develop leaders who can create and sustain inclusive work environments.",
      features: [
        "Unconscious bias awareness",
        "Cultural competency",
        "Inclusive decision-making",
        "Equity strategies",
      ],
    },
    {
      icon: Shield,
      category: "DEI",
      title: "Unconscious Bias Workshop",
      description:
        "Interactive sessions to recognize and address unconscious biases in the workplace.",
      features: [
        "Bias identification",
        "Impact assessment",
        "Mitigation strategies",
        "Action planning",
      ],
    },
    {
      icon: Target,
      category: "DEI",
      title: "Psychological Safety & Allyship Training",
      description:
        "Create environments where all team members feel safe to contribute authentically.",
      features: [
        "Safety assessment",
        "Allyship skills",
        "Inclusive communication",
        "Trust building",
      ],
    },
    {
      icon: Brain,
      category: "Workplace Mindfulness",
      title: "Mindfulness Programs",
      description:
        "Comprehensive mindfulness training to reduce stress and improve focus.",
      features: [
        "Meditation techniques",
        "Stress reduction",
        "Focus improvement",
        "Emotional regulation",
      ],
    },
    {
      icon: Users,
      category: "Team Building",
      title: "Team Building Workshops",
      description:
        "Engaging activities designed to strengthen team bonds and collaboration.",
      features: [
        "Trust exercises",
        "Communication games",
        "Problem-solving challenges",
        "Relationship building",
      ],
    },
  ];

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
          <Button
            asChild
            size="sm"
            className="bg-[#2C3746] hover:bg-[#DC842E] text-white px-8 py-3 transition-all duration-300"
            style={{ textDecoration: "none" }}
          >
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
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
                      <service.icon className="h-6 w-6 text-white" />
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
                    <Button
                      variant="ghost"
                      className="w-full text-primary hover:bg-[#DC842E] hover:text-white group-hover:bg-[#DC842E] group-hover:text-white transition-colors"
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
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
                <div className="w-16 h-16 bg-[#2C3746] from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
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
              <Link href="/contact">Get Started Today</Link>
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

export default CorporateServices;
