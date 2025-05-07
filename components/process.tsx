"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { useState } from "react";
import { Box, Mail, Ship, Snowflake, Workflow } from "lucide-react";
import { Card } from "./ui/card";
import BorderButton from "./gradientButton";
import FadingBorder from "./neon-border";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const steps = [
    {
      number: "01",
      title: "Analyze",
      description:
        "We start with a thorough analysis of your current workflows to see how AI could improve your processes.",
      demo: <AnalyzeDemo />,
    },
    {
      number: "02",
      title: "Build & Implement",
      description:
        "Then, our developers will start crafting custom AI-solutions for your company, continuously prioritising quality and safety.",
      demo: <BuildDemo />,
    },
    {
      number: "03",
      title: "Maintain & improve",
      description:
        "After deployment, our team will keep working hard by providing support and continuously improving the implemented solutions.",
      demo: <MaintainDemo />,
    },
  ];

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };
  return (
    <section id="process" className="py-24 px-6 relative" style={gradientStyle}>
      <div className=" mx-auto">
        <motion.h1 className="text-5xl md:text-[100px] md:leading-[120px]  mb-24">
          <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
            The process
          </span>
        </motion.h1>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="process-card h-[471px] w-full relative "
              style={{
                background: `radial-gradient(100% 25% at 50% 0%, 
                  rgba(80, 176, 250, 0.15) 0%, 
                  rgba(64, 140, 199, 0.05) 36.5%, 
                  rgb(13, 13, 13) 100%)`,
              }}
              variants={itemVariants}
            >
              <FadingBorder side="top" />

              <div className="h-[301px] flex justify-center items-center">
                {step.demo}
              </div>
              <h3 className="text-[35px] leading-[42px] font-medium mb-2">
                <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent mr-4">
                  {step.number}
                </span>
                {step.title}
              </h3>
              <p className="text-gray-400 text-[15px] leading-[21px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ReviewCard({
  icon,
  isActive = false,
}: {
  icon: React.ReactNode;
  isActive?: boolean;
}) {
  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };
  return (
    <div
      style={isActive ? gradientStyle : {}}
      className={`bg-transparent  hover:opacity-100 ${
        isActive
          ? "border-blue-300 border-[1px]"
          : "border-gray-600/15 opacity-25 border-[3px]"
      } backdrop-blur-lg rounded-sm flex items-center justify-center w-16 h-16 shadow-md transition-all duration-300 group-hover:opacity-80 group-hover-shadow-[inset_0_0_6px_rgba(59,130,246,0.7)] group-hover-border-0`}
    >
      {icon}
    </div>
  );
}
function AnalyzeDemo() {
  const [activeIndex, setActiveIndex] = useState(12);

  const icons = [
    <Mail key="mail" className="w-8 h-8 text-gray-400" />,
    null,
    <Box key="box" className="w-8 h-8 text-gray-400" />,
    null,
    <Workflow key="workflow" className="w-8 h-8 text-gray-400" />,
    null,
    <Mail key="mail" className="w-8 h-8 text-gray-400" />,
    null,
    <Box key="box" className="w-8 h-8 text-gray-400" />,
    null,
    <Workflow key="workflow" className="w-8 h-8 text-gray-400" />,
    null,
    <img
      key="starlogo"
      src="/starlogo.png"
      alt="Logo"
      width={22}
      height={22}
    />,
    null,
    <Ship key="ship" className="w-8 h-8 text-gray-400" />,
    null,
    <Snowflake key="snowflake" className="w-8 h-8 text-gray-400" />,
    null,
    <Box key="notion" className="w-8 h-8 text-gray-400" />,
    null,
    <Ship key="ship" className="w-8 h-8 text-gray-400" />,
    null,
    <Snowflake key="snowflake" className="w-8 h-8 text-gray-400" />,
    null,
    <Box key="notion" className="w-8 h-8 text-gray-400" />,
  ];

  return (
    <div className="h-[221px] cursor-pointer group relative overflow-hidden w-full items-center  justify-center md:w-[357px] mx-auto border border-gray-700/50 rounded-xl p-4  gap-0 bg-black/30 shadow-lg backdrop-blur-md ">
      <div className=" mt-[-70px]  grid grid-cols-5">
        {icons.map((icon, index) => (
          <div key={index} className="flex items-center justify-center">
            {icon && (
              <div
                onClick={() => setActiveIndex(index)}
                className="cursor-pointer"
              >
                <ReviewCard icon={icon} isActive={index === activeIndex} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BuildDemo() {
  const [activeTab, setActiveTab] = useState("html");

  return (
    <div className="w-full max-w-4xl mx-auto group cursor-pointer">
      <Card className="relative border w-full md:w-[357px] mx-auto border-[#222222] bg-[#0d0d0d] rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2 border-b border-[#222222] bg-[#0f0f0f]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full border border-[#222222] bg-gradient-to-b from-[#70befa] to-white shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
            <div className="w-3 h-3 rounded-full border border-[#222222] bg-gradient-to-b from-[#70befa] to-white shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
            <div className="w-3 h-3 rounded-md border border-[#222222] bg-gradient-to-b from-[#70befa] to-white shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
          </div>
          <Tabs
            defaultValue="html"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-auto"
          >
            <TabsList className="h-8 bg-[#0f0f0f] border border-[#222222] rounded-lg">
              <TabsTrigger
                value="html"
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === "html"
                    ? "!bg-[#161616] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"
                    : ""
                }`}
              >
                <span
                  className={
                    activeTab === "html"
                      ? "bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent"
                      : ""
                  }
                >
                  HTML
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="react"
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === "react"
                    ? "!bg-[#161616] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"
                    : ""
                }`}
              >
                <span
                  className={
                    activeTab === "react"
                      ? "bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent"
                      : ""
                  }
                >
                  React
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="css"
                className={`px-3 py-1 rounded-md text-sm ${
                  activeTab === "css"
                    ? "!bg-[#161616] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"
                    : ""
                }`}
              >
                <span
                  className={
                    activeTab === "css"
                      ? "bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent"
                      : ""
                  }
                >
                  CSS
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="relative min-h-[100px] p-4">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsContent
              value="html"
              className="mt-0 data-[state=active]:block data-[state=inactive]:hidden"
            >
              <div className="font-mono text-[15px] text-[#9c9c9c80] leading-[1.4em] flex h-[160px] opacity-70 overflow-hidden">
                <div className="text-right pr-4 select-none">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="leading-[1.4em]">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="flex-1 ">
                  <div className="group-hover:text-[#cdc8c8] transition-all duration-700">
                    &lt;html lang=&quot;en&quot;&gt;
                  </div>
                  <div>&lt;head&gt;</div>
                  <div className="ms-10">
                    <span>&lt;meta </span>
                    <span className="text-[#cdc8c8] transition-all duration-700 group-hover:text-[#9c9c9c80]">
                      charset=&quot;UTF-8&quot;&gt;
                    </span>
                  </div>
                  <div className="ms-10">
                    &lt;meta name=&quot;viewport&quot;{" "}
                  </div>
                  <div className="ms-10">
                    {" "}
                    content=&quot;width=device&quot;{" "}
                  </div>
                  <div className="ms-10"> width, initial-</div>
                  <div className="ms-10">&quot;scale=1.0&quot;&gt;</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="react"
              className="mt-0 data-[state=active]:block data-[state=inactive]:hidden"
            >
              <div className="font-mono text-[15px] text-[#9c9c9c80] leading-[1.4em] flex h-[160px] opacity-70 overflow-hidden">
                <div className="text-right pr-4 select-none">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="leading-[1.4em]">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="font-mono flex-1 text-[15px] text-[#9c9c9c80] leading-[1.4em]">
                  <p className="group-hover:text-[#cdc8c8] transition-all duration-700">
                    import React,
                  </p>
                  <p>
                    {"{"} useState {"}"} from &apos;react&apos;;
                  </p>
                  <p className="ms-10 text-[#cdc8c8] group-hover:text-[#9c9c9c80] transition-all duration-700">
                    {" "}
                    import haloItem
                  </p>
                  <p className="ms-10"> from &apos;./HaloItem&apos;;</p>
                  <p className="ms-10"> import &apos;./App.css&apos;;</p>
                  <p> </p>
                  <p className="ms-10"> {"const HaloApp = () => {"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="css"
              className="mt-0 data-[state=active]:block data-[state=inactive]:hidden"
            >
              <div className="font-mono text-[15px] text-[#9c9c9c80] leading-[1.4em] flex h-[160px] opacity-70 overflow-hidden">
                <div className="text-right pr-4 select-none">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div key={i} className="leading-[1.4em]">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="font-mono text-[15px] text-[#9c9c9c80] leading-[1.4em] flex-1">
                  <p>body {"{"}</p>
                  <p className=" group-hover:text-[#cdc8c8] transition-all duration-700">
                    {" "}
                    margin: 0;
                  </p>
                  <p className="ms-14 text-[#cdc8c8] group-hover:text-[#9c9c9c80] transition-all duration-700">
                    {" "}
                    font-family: &apos;Arial&apos;,{" "}
                  </p>
                  <p className="ms-14">sans-serif;</p>
                  <p className="ms-14"> background-color: #f4f4f9;</p>
                  <p className="ms-14"> color: #333;</p>
                  <p className="ms-14">{"}"}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          {activeTab === "html" && (
            <div className="absolute top-[60px] left-[126px] group-hover:top-[18px] group-hover:left-[38px] transition-all duration-700 w-[140px] h-[20px] border border-blue-400 bg-transparent rounded-[2px] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
          )}

          {activeTab === "react" && (
            <div className="absolute top-[60px] left-[74px] w-[140px] h-[20px] group-hover:top-[16px] group-hover:left-[34px] transition-all duration-700 border border-blue-400 bg-transparent rounded-[2px] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
          )}

          {activeTab === "css" && (
            <div className="absolute top-[58px] left-[90px] w-[180px] h-[22px] group-hover:top-[36px] group-hover:left-[34px] group-hover:w-[100px] border border-blue-400 transition-all duration-700 bg-transparent rounded-[2px] shadow-[0px_0px_2px_0.5px_rgba(112,190,250,0.75)]"></div>
          )}
        </div>
      </Card>
    </div>
  );
}

function MaintainDemo() {
  return (
    <div className="h-[221px] w-full md:w-[357px] p-4 flex flex-col justify-between gap-2 ">
      <Card className="flex justify-between items-center p-3 bg-transparent border opacity-30 border-gray-800 rounded-lg">
        <div className="text-sm text-gray-400">Software speed</div>
        <div className="text-sm text-gray-400">+38%</div>
      </Card>

      <Card className="flex justify-between items-center p-3 bg-transparent border opacity-70 border-gray-800 rounded-lg">
        <div className="text-sm text-gray-400">Workflow efficiency</div>
        <div className="text-sm text-gray-400">+25%</div>
      </Card>

      <Card className="flex justify-between items-center p-3 bg-transparent border border-gray-800 rounded-lg">
        <div className="text-sm text-gray-400">Operational cost</div>
        <div className="text-sm text-gray-400">-11%</div>
      </Card>

      <Card className="flex justify-between items-center p-3 bg-transparent border border-gray-800 rounded-lg">
        <div className="text-sm text-gray-400">Update available</div>
        <BorderButton
          borderWidth={0.6}
          borderSegmentSize={70}
          borderRadius={12}
          size="sm"
          className="box-border text-sm !border !border-gray-900  bg-black"
        >
          <span className=" py-0 text-sm font-medium  bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent flex">
            <span className="pr-3 py-0">Update</span>{" "}
            <ArrowUp className="text-white py-0 " />
          </span>
        </BorderButton>
      </Card>
    </div>
  );
}
