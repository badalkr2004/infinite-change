"use client";
import Link from "next/link";
import { ArrowRight, Users, Target, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const Index = () => {
  const services = [
    {
      icon: Users,
      title: "Team Coaching",
      description:
        "Transform your team dynamics and unlock collective potential through collaborative coaching sessions.",
      color: "text-success",
    },
    {
      icon: Target,
      title: "Executive Coaching",
      description:
        "Personalized leadership development for executives ready to elevate their impact and performance.",
      color: "text-primary",
    },
    {
      icon: Lightbulb,
      title: "Mindfulness Training",
      description:
        "Develop mindful leadership skills and create more conscious,impactful, productive workplace environments.",
      color: "text-warning",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechCorp",
      content:
        "Infinite Change transformed our leadership team. The results were immediate and lasting.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Director, Innovation Lab",
      content:
        "The mindfulness training revolutionized our workplace culture. Highly recommend!",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Clients Transformed" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" },
    { number: "50+", label: "Corporate Partners" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Header: Only on Home Page */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex -mt-1 flex-col items-center px-4 bg-white"
      >
        <Image
          src="/logo-new.png"
          alt="Infinite Change"
          className="object-contain"
          width={400}
          height={400}
          priority
        />
        <div className="-mt-9">
          <Image
            src="/tagline.png"
            alt="Tagline"
            width={400}
            height={70}
            className="object-contain"
            priority
          />
        </div>
        <div className="mb-4 text-center max-w-2xl">
          <p className="text-base md:text-lg text-[#273548] font-avenir-regular">
            Empowering individuals and organisations through transformative
            coaching, comprehensive training and strategic development programs.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <section className="py-16 bg-foreground text-background">
        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base opacity-80">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Core Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed to unlock potential and drive
              meaningful change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 h-full">
                  <CardContent className="p-8 text-center space-y-4">
                    <motion.div
                      className={`inline-flex p-4 rounded-full bg-linear-to-br from-primary to-secondary ${service.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <Button>
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories of transformation and growth
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="bg-background border-border h-full">
                  <CardContent className="p-8 space-y-4">
                    <motion.div
                      className="flex space-x-1"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-warning fill-current"
                        />
                      ))}
                    </motion.div>
                    <p className="text-muted-foreground italic leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
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
              <Link className="no-underline" href="/about">
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

export default Index;
