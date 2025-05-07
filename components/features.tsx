"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Shield, Smartphone, Globe, BarChart, Layers } from "lucide-react";

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Lightning Fast",
      description:
        "Optimized for speed and performance across all devices and platforms.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Secure by Default",
      description:
        "Built with security best practices and regular updates to keep you protected.",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile Responsive",
      description:
        "Fully responsive design that works beautifully on any screen size.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Global CDN",
      description:
        "Content delivered from edge locations worldwide for minimal latency.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Analytics",
      description:
        "Built-in analytics to track performance and user engagement.",
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "Customizable",
      description:
        "Easily customize every aspect to match your brand and requirements.",
    },
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
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="features" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to build modern, high-performance websites and
            applications.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description, variants }: any) {
  return (
    <motion.div
      className="p-6 rounded-xl gradient-border bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-colors"
      variants={variants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="mb-4 text-white/90">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
