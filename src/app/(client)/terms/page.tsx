"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Users, FileText, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        'By accessing or using infinitechange.life ("the Website"), you agree to be bound by these Terms and Conditions ("Terms") and our Privacy Policy. If you disagree, do not use the Website.',
      icon: FileText,
    },
    {
      title: "2. Definitions",
      content:
        '"We," "Us," "Our": Refers to InfiniteChange.life (operating in Hong Kong SAR).\n"User," "You": Any person accessing the Website.\n"Content": Text, images, software, and data on the Website.',
      icon: Users,
    },
    {
      title: "3. Eligibility",
      content:
        "You must be at least 18 years old or have parental consent to use the Website. By using the Website, you warrant legal capacity under Hong Kong law.",
      icon: Shield,
    },
    {
      title: "4. Account Registration",
      content:
        "Provide accurate, current information during registration.\nSafeguard your account credentials.\nNotify us immediately of unauthorized use.",
      icon: Lock,
    },
    {
      title: "5. Services",
      content:
        "We provide:\nDigital content (e-books, courses).\nCoaching/consulting services (if applicable).\nE-commerce transactions (if applicable).\nServices are subject to change without notice.",
      icon: Eye,
    },
  ];

  const userResponsibilities = [
    "Use the Website for illegal purposes under Hong Kong law.",
    "Post harmful, defamatory, or infringing content.",
    "Reverse-engineer or disrupt Website functionality.",
    "Impersonate others or collect user data unlawfully.",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 sm:px-6 lg:px-8  "
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              For InfiniteChange.life
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last Updated: [Insert Date]
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-4xl">
          {/* First 5 sections */}
          <div className="space-y-8 mb-16">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                          <section.icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                          {section.title}
                        </h3>
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* User Responsibilities Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  6. User Responsibilities
                </h3>
                <p className="text-muted-foreground mb-4">You agree NOT to:</p>
                <ul className="space-y-3">
                  {userResponsibilities.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Remaining Sections */}
          <div className="space-y-8">
            {[
              {
                title: "7. Payment & Refunds",
                content:
                  "Fees: Prices are in HKD (Hong Kong Dollars) unless stated.\nTaxes: You are responsible for applicable Hong Kong taxes (e.g., GST).\nRefunds: Subject to our [Refund Policy]. Digital products may be non-refundable.\nPayment Processors: Third-party gateways (e.g., Stripe, PayPal) handle transactions.",
              },
              {
                title: "8. Intellectual Property",
                content:
                  "Ownership: All Content (logos, text, graphics) is owned by us or licensed to us.\nLimited License: We grant you a non-exclusive, revocable license to access Content for personal use.\nCopyright Complaints: Report infringement to [Your Email] per Hong Kong Copyright Ordinance (Cap. 528).",
              },
              {
                title: "9. Third-Party Links",
                content:
                  "We are not responsible for content, privacy practices, or damages caused by third-party websites linked on our platform.",
              },
              {
                title: "10. Disclaimers",
                content:
                  '"As Is" Basis: The Website is provided without warranties (express or implied).\nNo Guarantees: Outcomes from services/content are not guaranteed.\nLimitation of Liability:\nUnder Hong Kong\'s Control of Exemption Clauses Ordinance (Cap. 71), our liability for death/personal injury caused by negligence is not excluded. Otherwise, we shall not be liable for indirect, consequential, or incidental damages. Maximum liability capped at HKD 1,000 or fees paid (whichever is lower).',
              },
              {
                title: "11. Termination",
                content:
                  "We may suspend/terminate your access for:\nBreach of these Terms.\nFraudulent or illegal activity.\nNon-payment (if applicable).",
              },
              {
                title: "12. Indemnification",
                content:
                  "You agree to indemnify us against claims/losses arising from your:\nMisuse of the Website.\nViolation of laws or third-party rights.",
              },
              {
                title: "13. Governing Law & Dispute Resolution",
                content:
                  "Governing Law: Hong Kong SAR law.\nDisputes: First attempt mediation through the Hong Kong International Arbitration Centre (HKIAC). Unresolved disputes may proceed to Hong Kong courts.",
              },
              {
                title: "14. Amendments",
                content:
                  "We reserve the right to update these Terms. Continued use after changes constitutes acceptance.",
              },
              {
                title: "15. Force Majeure",
                content:
                  "Not liable for delays/failures due to events beyond our control (e.g., natural disasters, government actions).",
              },
              {
                title: "16. Severability",
                content:
                  "If any clause is invalid under Hong Kong law, the rest remain enforceable.",
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-border hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      {section.title}
                    </h3>
                    <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-16">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  17. Contact Us
                </h3>
                <p className="text-muted-foreground mb-6">For questions:</p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Email: [Your Contact Email]
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">
                      Address: [Your Registered Hong Kong Address]
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
