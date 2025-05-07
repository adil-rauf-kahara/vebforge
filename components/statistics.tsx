"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import FadingBorder from "./neon-border";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const statsData = [
    {
      title: "Projects completed",
      value: "93+",
      description: "We've successfully completed 93 top-tier projects.",
    },
    {
      title: "Satisfied customers",
      value: "100%",
      description: "We ensure a 100% satisfaction level for our clients.",
    },
    {
      title: "Hours saved per day",
      value: "3h",
      description:
        "Our solutions save our clients an average of 3 hours of work per day.",
    },
    {
      title: "Cost saved per month",
      value: "80k",
      description:
        "Our solutions save our clients an average of $80,000 per month.",
    },
  ];

  return (
    <div id="statistics" className="min-h-[80vh] bg-[#0a0a0a] text-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-24"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1
            className="text-6xl md:text-[100px] md:leading-[120px]  mb-16"
            variants={item}
          >
            <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
              Our statistics
            </span>
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statsData.map((data, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative"
                initial="hidden"
                whileInView="visible"
                style={{
                  background: `radial-gradient(50% 80% at 0% 50%, 
                    rgba(80, 176, 250, 0.1) 0%, 
                    rgba(64, 140, 199, 0.05) 36.5%, 
                    rgb(13, 13, 13) 100%)`,
                }}
                custom={index}
              >
                <Card
                  className="relative p-6 py-10 bg-transparent text-white border-gray-800 rounded-2xl shadow-lg"
                  style={{
                    borderColor: "rgb(34, 34, 34)",
                    borderWidth: "2px",
                    borderStyle: "solid",
                  }}
                >
                  <FadingBorder side="left" />
                  <CardContent className="space-y-5">
                    <div>
                      <h3 className="text-4xl text-white">{data.title}</h3>
                    </div>
                    <h2
                      className={cn(
                        "text-7xl font-medium bg-clip-text text-transparent",
                        "bg-gradient-to-r from-white to-blue-400"
                      )}
                    >
                      {data.value}
                    </h2>
                    <div className="w-full h-[1px] bg-slate-500" />
                    <p className="text-sm text-gray-300">{data.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
