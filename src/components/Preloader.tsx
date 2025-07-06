"use client";
import { motion } from "framer-motion";
import Image from "next/image";
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
      className="fixed inset-0 z-9999 flex items-center justify-center"
      style={{ backgroundColor: "#172636" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Center logo with subtle glowing effect */}
        <div className="flex items-center justify-center relative">
          {/* Subtle Glowing effect */}
          <motion.div
            className="absolute w-48 h-48 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #4fa3c7 0%, #e89b6c 40%, transparent 100%)",
              filter: "blur(16px)",
              zIndex: 0,
              opacity: 0.3,
            }}
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Image
            src="/logo-new copy.png"
            alt="Infinite Change Logo"
            className="w-44 h-44 object-contain relative z-10"
            style={{ borderRadius: "50%" }}
            width={"176"}
            height={"176"}
          />
        </div>
        {/* Animated falling leaf (spring effect) */}
        {/* <motion.img
          src="/leaf.png.png"
          alt="Falling Leaf"
          className="absolute left-1/2"
          style={{
            top: 0,
            width: "48px",
            height: "48px",
            zIndex: 20,
            marginLeft: "-24px",
          }}
          initial={{ y: -60, x: 0, rotate: -20, opacity: 0 }}
          animate={{
            y: [0, 200, 400, 600],
            x: [0, -30, 30, 0],
            rotate: [-20, 10, -10, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        /> */}
        {/* Animated bar loader below logo */}
        <div
          className="absolute left-1/2"
          style={{
            top: "calc(100% + 24px)",
            width: "160px",
            marginLeft: "-80px",
            zIndex: 10,
          }}
        >
          <div className="w-full h-3 bg-[#22344a] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #4fa3c7 0%, #e89b6c 100%)",
              }}
              initial={{ x: "-100%" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />
          </div>
        </div>
        {/* Loading text */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-xl font-bold" style={{ color: "#4fa3c7" }}>
            INFINITE <span style={{ color: "#e89b6c" }}>CHANGE</span>
          </h2>
          <motion.div
            className="text-sm mt-2"
            style={{ color: "#b0b8c1" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Coaching • Training • Development
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;
