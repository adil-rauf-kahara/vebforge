"use client";

import { motion } from "framer-motion";
import BorderButton from "./gradientButton";
import Link from "next/link"; // Import Link

export default function HeroSection() {
  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };

  return (
    <div
      style={gradientStyle}
      className="z-20 relative flex h-[90vh] items-center justify-center flex-col bg-black text-center overflow-hidden"
    >
      <motion.h1
        initial={{ opacity: 0.3 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
        className="absolute text-9xl md:text-[300px] md:leading-[600px] font-medium text-white "
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(59,104,134, 0.4) 0%, rgb(112, 190, 250) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        VebForge
      </motion.h1>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 1 }}
  className="relative z-10 lg:w-[70vw]"
>
  <h2 className="text-base md:text-6xl font-medium ">
    <p className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
    Meet VebForge.
    </p>
    <p className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
 A Modern AI Agency Template  </p>
  </h2>
</motion.div>

      <div className="mt-7">
        <Link href="#schedule">
          <BorderButton
            borderWidth={0.6}
            borderSegmentSize={70}
            className="text-sm !border !border-gray-900 bg-[#0f0f0f]"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Schedule a Session
            </span>
          </BorderButton>
        </Link>
      </div>
    </div>
  );
}
