"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Users,
  FileText,
  Mail,
  MapPin,
  Database,
  Globe,
  Cookie,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicyPage = () => {
  const informationTypes = [
    {
      category: "Personal Data",
      items: [
        "Name",
        "Email address",
        "Contact number",
        "Billing/shipping address (if applicable)",
        "Payment details (processed securely via third-party providers)",
        "Account credentials (if you create a user account)",
      ],
      icon: Users,
      color: "text-primary",
    },
    {
      category: "Non-Personal Data",
      items: [
        "Browser type & version",
        "IP address",
        "Device information (e.g., OS, hardware model)",
        "Cookies & tracking data (see Section 6)",
      ],
      icon: Database,
      color: "text-secondary",
    },
    {
      category: "Sensitive Data (if applicable)",
      items: [
        "Health-related data (only if explicitly provided by you with consent)",
        "Biometric data (if collected for authentication purposes)",
        "Financial data (securely processed via payment gateways)",
      ],
      icon: Lock,
      color: "text-warning",
    },
  ];

  const usageReasons = [
    "To provide and maintain our services",
    "To process transactions & deliver products/services",
    "To improve website functionality & user experience",
    "To communicate with you (e.g., newsletters, updates)",
    "To comply with legal obligations (under Hong Kong law)",
    "For fraud detection & security purposes",
  ];

  const legalBases = [
    {
      basis: "Your consent",
      description: "(for marketing, sensitive data, etc.)",
    },
    { basis: "Contractual necessity", description: "(to fulfill services)" },
    { basis: "Legal compliance", description: "(tax, fraud prevention, etc.)" },
    {
      basis: "Legitimate interests",
      description: "(website analytics, security)",
    },
  ];

  const userRights = [
    "Access, correct, or delete your data",
    "Withdraw consent (where applicable)",
    "Opt out of marketing communications",
    "Lodge a complaint with the Hong Kong Privacy Commissioner",
  ];

  const securityMeasures = [
    "Encryption (SSL/TLS)",
    "Secure servers & firewalls",
    "Restricted access to personal data",
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
        className="py-20 px-4 sm:px-6 lg:px-8 "
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
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
        className="px-4 sm:px-6 lg:px-8"
      >
        <div className="container mx-auto max-w-4xl">
          {/* Introduction */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <Eye className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      1. Introduction
                    </h3>
                    <div className="text-muted-foreground leading-relaxed space-y-4">
                      <p>
                        Welcome to InfiniteChange.life
                        (&quot;we&quot;,&quot;us&quot;, or &quot;our&quot;). We
                        are committed to protecting your privacy and ensuring
                        the security of your personal data. This Privacy Policy
                        explains how we collect, use, disclose, and safeguard
                        your information when you visit our website.
                      </p>
                      <p>
                        This policy complies with the Hong Kong Personal Data
                        (Privacy) Ordinance (PDPO) and other applicable data
                        protection laws. By using our website, you consent to
                        the practices described in this policy.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Information We Collect */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Database className="h-6 w-6 text-primary mr-3" />
                  2. Information We Collect
                </h3>
                <p className="text-muted-foreground mb-6">
                  We may collect the following types of information:
                </p>

                <div className="space-y-8">
                  {informationTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-l-4 border-primary/20 pl-6"
                    >
                      <h4 className="text-lg font-medium text-foreground mb-3 flex items-center">
                        <type.icon className={`h-5 w-5 ${type.color} mr-2`} />
                        {type.category}
                      </h4>
                      <ul className="space-y-2">
                        {type.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-muted-foreground flex items-start">
                    <AlertCircle className="h-4 w-4 text-warning mr-2 mt-0.5 flex-shrink-0" />
                    We do not intentionally collect sensitive data without your
                    explicit consent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* How We Use Your Information */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  3. How We Use Your Information
                </h3>
                <p className="text-muted-foreground mb-4">
                  We may use your data for the following purposes:
                </p>
                <ul className="space-y-3">
                  {usageReasons.map((reason, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{reason}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Legal Basis */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  4. Legal Basis for Processing (PDPO Compliance)
                </h3>
                <p className="text-muted-foreground mb-4">
                  Under Hong Kong&quot;s PDPO, we process personal data based
                  on:
                </p>
                <div className="space-y-4">
                  {legalBases.map((basis, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">
                        <strong>{basis.basis}</strong> {basis.description}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Sharing & Disclosure */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  5. Data Sharing & Disclosure
                </h3>
                <p className="text-muted-foreground mb-4">
                  We may share your data with:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Service Providers (payment processors, hosting providers)",
                    "Legal Authorities (if required by Hong Kong law)",
                    "Business Partners (only with your consent)",
                  ].map((item, index) => (
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
                <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                  <p className="text-sm text-muted-foreground font-medium">
                    We do not sell your personal data to third parties.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookies & Tracking */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Cookie className="h-6 w-6 text-primary mr-3" />
                  6. Cookies & Tracking Technologies
                </h3>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar tracking technologies to:
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Enhance user experience",
                    "Analyze website traffic",
                    "Personalize content",
                  ].map((item, index) => (
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
                <p className="text-sm text-muted-foreground">
                  You can manage cookie preferences via your browser settings.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Security */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Lock className="h-6 w-6 text-primary mr-3" />
                  7. Data Security
                </h3>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures, including:
                </p>
                <ul className="space-y-3 mb-6">
                  {securityMeasures.map((measure, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{measure}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                  <p className="text-sm text-muted-foreground">
                    However, no online transmission is 100% secure—we cannot
                    guarantee absolute security.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Data Retention */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Database className="h-6 w-6 text-primary mr-3" />
                  8. Data Retention
                </h3>
                <p className="text-muted-foreground mb-4">
                  We retain personal data only as long as necessary for:
                </p>
                <ul className="space-y-3 mb-4">
                  {[
                    "Service fulfillment",
                    "Legal compliance",
                    "Dispute resolution",
                  ].map((item, index) => (
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
                <p className="text-sm text-muted-foreground">
                  You may request deletion (see Section 9).
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Your Rights */}
          <motion.div variants={itemVariants} className="mb-16">
            <Card className="border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  9. Your Rights Under Hong Kong PDPO
                </h3>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="space-y-3 mb-6">
                  {userRights.map((right, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{right}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="text-sm text-muted-foreground">
                  To exercise these rights, contact us at [Your Contact Email].
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Remaining Sections */}
          <div className="space-y-8">
            {[
              {
                title: "10. International Data Transfers",
                content:
                  "If data is transferred outside Hong Kong, we ensure compliance with PDPO requirements (e.g., contractual safeguards).",
                icon: Globe,
              },
              {
                title: "11. Third-Party Links",
                content:
                  "Our website may contain links to third-party sites. We are not responsible for their privacy practices.",
                icon: Globe,
              },
              {
                title: "12. Children's Privacy",
                content:
                  "We do not knowingly collect data from children under 13 without parental consent.",
                icon: Shield,
              },
              {
                title: "13. Changes to This Policy",
                content:
                  'We may update this policy periodically. Check the "Last Updated" date for revisions.',
                icon: FileText,
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
                        <p className="text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div variants={itemVariants} className="mt-16 pb-16">
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  14. Contact Us
                </h3>
                <p className="text-muted-foreground mb-6">
                  For privacy-related inquiries, contact:
                </p>
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
                      Address: [Your Company Address in Hong Kong]
                    </span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    By using InfiniteChange.life, you acknowledge reading and
                    agreeing to this Privacy Policy.
                  </p>
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
