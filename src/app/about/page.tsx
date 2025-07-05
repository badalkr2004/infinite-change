"use client";
import { CheckCircle, Target, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const values = [
    {
      title: "Transformation",
      description:
        "We believe in the power of change to unlock human potential and create lasting impact.",
    },
    {
      title: "Excellence",
      description:
        "We are committed to delivering the highest quality coaching and training experiences.",
    },
    {
      title: "Empowerment",
      description:
        "We empower individuals and teams to take ownership of their growth and development.",
    },
    {
      title: "Inclusivity",
      description:
        "We create safe, inclusive spaces where everyone can thrive and reach their full potential.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-35 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#ffffff] to-[#ffffff]">
        <motion.div
          className="container mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About{" "}
            <span className="bg-[#2C3746] from-primary to-accent bg-clip-text text-transparent">
              Infinite Change
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We are dedicated to creating transformative experiences that elevate
            individuals and organizations to new heights of success and
            fulfillment.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="border-border hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-8 space-y-6">
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-[#2C3746] from-primary to-accent p-3 rounded-full">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Our Mission
                    </h2>
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    To empower individuals and organizations through
                    transformative coaching, comprehensive training, and
                    strategic development programs that unlock potential, drive
                    meaningful change, and create lasting impact in both
                    personal and professional spheres.
                  </motion.p>
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Personalized coaching approaches
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Evidence-based methodologies
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Sustainable transformation
                      </span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card className="border-border hover:shadow-lg transition-shadow duration-300 h-full">
                <CardContent className="p-8 space-y-6">
                  <motion.div
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-[#2C3746] from-accent to-warning p-3 rounded-full">
                      <Eye className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Our Vision
                    </h2>
                  </motion.div>
                  <motion.p
                    className="text-muted-foreground leading-relaxed text-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    To be the catalyst for infinite change, creating a world
                    where every individual and organization has the tools,
                    mindset, and support needed to continuously evolve, thrive,
                    and make a positive impact on their communities and beyond.
                  </motion.p>
                  <motion.div
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Global impact and reach
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Continuous innovation
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Community transformation
                      </span>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our approach
              to transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="bg-background border-border hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div
                      className="w-16 h-16 bg-[#2C3746] from-primary to-accent rounded-full mx-auto flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-8 h-8 bg-primary-foreground rounded-full"></div>
                    </motion.div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Story
            </h2>
            <p className="text-xl text-muted-foreground">
              From humble beginnings to transformative impact
            </p>
          </motion.div>

          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              {[
                "Infinite Change was born from a simple yet powerful belief: that every person and organization has untapped potential waiting to be unlocked. Founded by a team of passionate coaches and development experts, we set out to create a different kind of coaching experience.",
                "Over the years, we've had the privilege of working with hundreds of individuals and organizations, witnessing incredible transformations that have not only changed lives but also created ripple effects throughout communities and industries.",
                "Our approach combines cutting-edge research in psychology, neuroscience, and organizational development with time-tested coaching methodologies. We believe in creating safe, supportive environments where authentic growth can flourish.",
                "Today, Infinite Change continues to evolve, always staying true to our core mission of empowering others to reach their highest potential. Because we believe that when individuals transform, organizations transform, and when organizations transform, the world becomes a better place.",
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
