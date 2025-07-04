"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        {/* Outer rotating gradient circle */}
        <motion.div
          className="w-32 h-32 rounded-full bg-linear-to-r from-primary via-accent to-primary opacity-20"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* Middle rotating gradient circle */}
        <motion.div
          className="absolute inset-4 rounded-full bg-linear-to-l from-accent via-primary to-accent opacity-40"
          animate={{
            rotate: -360,
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{
            rotate: {
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* Inner rotating gradient circle */}
        <motion.div
          className="absolute inset-8 rounded-full bg-linear-to-br from-primary to-accent opacity-60"
          animate={{
            rotate: 360,
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            rotate: {
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />

        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-accent flex items-center justify-center"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px hsl(var(--primary) / 0.3)",
                "0 0 30px hsl(var(--primary) / 0.6)",
                "0 0 20px hsl(var(--primary) / 0.3)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="text-primary-foreground font-bold text-lg">
              IC
            </span>
          </motion.div>
        </div>

        {/* Outer glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-accent opacity-10 blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading text */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
          INFINITE CHANGE
        </h2>
        <motion.div
          className="text-sm text-muted-foreground mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Coaching • Training • Development
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Preloader;
