"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Loader from "./loader";
import { usePathname } from "next/navigation";
import Link from "next/link"; // <-- Import Link here

export default function Hero() {
  const ref = useRef(null);
  const featureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(2);
  const [activePillStyle, setActivePillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hoveredIndex !== null) {
        const hoveredElement = featureRefs.current[hoveredIndex];
        if (hoveredElement) {
          const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
            hoveredElement;
          setActivePillStyle({
            opacity: 1,
            top: offsetTop - 1,
            left: offsetLeft - 1,
            height: offsetHeight + 2,
            width: offsetWidth + 1,
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [hoveredIndex, featureRefs.current]);

  const handleMouseLeave = () => {
    setHoveredIndex(2);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    if (!loading && pathname.includes("#")) {
      const id = pathname.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [loading, pathname]);

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };

  return (
    <section
      id="home"
      ref={ref}
      style={gradientStyle}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden bg-cover bg-center"
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            className="relative z-10 max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-2 font-medium text-[60px] leading-[50px] sm:text-[60px] sm:leading-[70px] md:text-[100px] md:leading-[120px] lg:text-[100px] lg:leading-[180px] tracking-[-1px] md:tracking-[-2px] lg:tracking-[-3px] bg-gradient-to-r from-white to-[#7EB6FF] bg-clip-text text-transparent"
              variants={itemVariants}
            >
AI Agency Template</motion.h1>
<motion.p
  className="text-white max-w-2xl mx-auto mb-[30px]"
  variants={itemVariants}
>
  Built with Next.js and Tailwind,<br />VebForge is designed for AI startups, chatbot services, and smart tech platforms.
</motion.p>

            <motion.div
              className="inline-flex relative z-10 sm:flex-row items-center space-x-1 bg-[#0f0f0f] border-[1px] border-[#222222] backdrop-blur-sm px-1 py-1 rounded-[10px] w-fit"
              variants={itemVariants}
            >
              <motion.div
                className="absolute border border-blue-400 rounded-md z-0 shadow-[0_0_3px_0_#70BEFA] cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activePillStyle.opacity,
                  top: activePillStyle.top,
                  left: activePillStyle.left,
                  width: activePillStyle.width,
                  height: activePillStyle.height,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
              />
              <Button
                className="bg-transparent group hover:bg-[#111111]/80 text-gray-400 rounded-md z-10"
                ref={(el) => {
                  if (featureRefs.current) {
                    featureRefs.current[1] = el;
                  }
                }}
                onMouseEnter={() => {
                  setHoveredIndex(1);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="#services"
                  className="text-sm hover:font-medium group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 group-hover:bg-clip-text group-hover:text-transparent"
                >
                  Our Services
                </Link>
              </Button>

              <Button
                className={`bg-transparent hover:bg-[#111111]/80 rounded-md z-10 ${
                  activePillStyle.opacity ? "" : "border border-blue-400"
                }`}
                ref={(el) => {
                  if (featureRefs.current) {
                    featureRefs.current[2] = el;
                  }
                }}
                onMouseEnter={() => {
                  setHoveredIndex(2);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href="#schedule"
                  className={`text-sm text-gray-400  hover:font-medium ${
                    hoveredIndex == 2
                      ? "bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
                      : ""
                  } `}
                >
                  Schedule a Session
                </Link>
                <ArrowRight
                  className={`text-md ${
                    hoveredIndex == 2 ? "text-blue-400" : "text-white"
                  }`}
                />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
