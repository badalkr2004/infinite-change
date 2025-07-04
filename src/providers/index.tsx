"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/Preloader";
import { useEffect, useState } from "react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <TooltipProvider>
      {/* <Toaster /> */}
      <Sonner />
      <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence>
      {children}
    </TooltipProvider>
  );
};

export default Providers;
