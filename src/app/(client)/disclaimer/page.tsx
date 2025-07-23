"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Shield,
  AlertTriangle,
  FileText,
  Lock,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EmailDisclaimer = () => {
  const sections = [
    {
      icon: Shield,
      title: "CONFIDENTIALITY NOTICE",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This email and any attachments are confidential and intended solely
            for the named recipient(s). If you are not the intended recipient,
            please:
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex items-start space-x-3">
              <span className="text-primary font-semibold">①</span>
              <span>Delete this email immediately;</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary font-semibold">②</span>
              <span>
                Notify the sender at{" "}
                <a
                  href="mailto:support@infinitechange.life"
                  className="text-primary hover:underline"
                >
                  support@infinitechange.life
                </a>
                ; and
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary font-semibold">③</span>
              <span>Do not copy, forward, or disclose its contents.</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Unauthorized use or disclosure may violate Hong Kong&apos;s Personal
            Data (Privacy) Ordinance (Cap. 486).
          </p>
        </div>
      ),
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "LEGAL STATUS",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          This email constitutes an electronic record under Hong Kong&apos;s
          Electronic Transactions Ordinance (Cap. 553). It is legally binding
          only if explicitly confirmed via signed agreement.
        </p>
      ),
      color: "text-success",
    },
    {
      icon: AlertTriangle,
      title: "LIABILITY DISCLAIMER",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            While we take precautions to ensure this email is virus-free,
            InfiniteChange.life accepts no liability for:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start space-x-2">
              <span className="text-warning">•</span>
              <span>
                Loss/damage caused by viruses, corruption, or unauthorized
                access;
              </span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-warning">•</span>
              <span>Errors or omissions in content;</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-warning">•</span>
              <span>
                Consequences of recipient actions based on this email.
              </span>
            </li>
          </ul>
        </div>
      ),
      color: "text-warning",
    },
    {
      icon: Lock,
      title: "DATA PRIVACY",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            We process your contact details in compliance with Hong Kong&apos;s
            PDPO. To:
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Access, correct, or delete your data;</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-primary">•</span>
              <span>Unsubscribe from communications,</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            contact{" "}
            <a
              href="mailto:privacy@infinitechange.life"
              className="text-primary hover:underline"
            >
              privacy@infinitechange.life
            </a>
            .
          </p>
          <p className="text-sm text-muted-foreground">
            Full details:{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ),
      color: "text-primary",
    },
    {
      icon: FileText,
      title: "NO BINDING AGREEMENT",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          Proposals, quotes, or terms in this email are not binding until
          formalized in a written contract signed by authorized representatives
          of InfiniteChange.life.
        </p>
      ),
      color: "text-success",
    },
    {
      icon: Mail,
      title: "ANTI-SPAM COMPLIANCE (HONG KONG)",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            This email is sent per Hong Kong&apos;s Unsolicited Electronic
            Messages Ordinance (Cap. 593). You are receiving it because:
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex items-start space-x-3">
              <span className="text-success">☑</span>
              <span>You opted in via our website; or</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-success">☑</span>
              <span>We have a prior business relationship.</span>
            </div>
          </div>
          <p className="text-muted-foreground">
            To unsubscribe:{" "}
            <button className="text-primary hover:underline">
              Unsubscribe Link
            </button>{" "}
            or reply with &quot;UNSUBSCRIBE&quot;.
          </p>
        </div>
      ),
      color: "text-success",
    },
    {
      icon: Globe,
      title: "REGULATORY DISCLOSURES",
      content: (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            InfiniteChange.life is a Hong Kong-registered entity.
          </p>
          <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
            <div className="flex items-start space-x-3">
              <span className="font-semibold text-foreground">
                Business Address:
              </span>
              <span className="text-muted-foreground">
                [Your Registered Address in Hong Kong]
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="font-semibold text-foreground">Website:</span>
              <span className="text-muted-foreground">
                www.infinitechange.life
              </span>
            </div>
          </div>
        </div>
      ),
      color: "text-primary",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="py-20 px-4 sm:px-6 lg:px-8 "
      >
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex p-4 rounded-full  mb-6"
          >
            <Mail className="h-12 w-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Email Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            For Official Communications of InfiniteChange.life
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="w-[220px] mx-auto">
              <Button asChild variant="outline" size="lg">
                <Link href="/" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Disclaimer Sections */}
      <section className=" px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <motion.div
                        className={`flex-shrink-0 p-3 rounded-full bg-gradient-to-br from-primary to-secondary ${section.color}`}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <section.icon className="h-6 w-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-4">
                          {section.title}
                        </h3>
                        <div className="prose prose-sm max-w-none">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-foreground text-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex p-3 rounded-full bg-primary/20 mb-6"
          >
            <AlertTriangle className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Important Notice
          </h2>
          <p className="text-lg opacity-90 leading-relaxed">
            This disclaimer applies to all electronic communications from
            InfiniteChange.life. By receiving and reading our emails, you
            acknowledge and agree to these terms. If you have any questions
            about this disclaimer, please contact us at{" "}
            <a
              href="mailto:support@infinitechange.life"
              className="text-primary hover:underline"
            >
              support@infinitechange.life
            </a>
            .
          </p>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default EmailDisclaimer;
