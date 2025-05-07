"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus } from "lucide-react";
import FadingBorder from "./neon-border";
import BorderButton from "./gradientButton";

export default function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const services = [
    {
      title: "Chatbot Development",
      description:
        "We develop intelligent chatbots that leverage advanced NLP to elevate customer interactions and streamline your business processes.",
      demo: <ChatbotDemo />,
    },
    {
      title: "Content Creation",
      description:
        "Our content creation solutions effortlessly generate high-quality, engaging content according to your brand's guidelines to captivate your audience.",
      demo: <ContentCreationDemo />,
    },
    // {
    //   title: "Workflow Automations",
    //   description:
    //     "We automate your workflows to streamline repetitive tasks, enhance efficiency, save time, and eliminate errors.",
    //   demo: <WorkflowDemo />,
    // },
    // {
    //   title: "LLM Development",
    //   description:
    //     "We develop Large Language Models that transform how your company interacts with data and customers.",
    //   demo: <LLMDemo />,
    // },
    // {
    //   title: "AI Consulting",
    //   description:
    //     "Our experts provide strategic guidance, enabling your business to implement AI solutions that drive transformative growth.",
    //   demo: <ConsultingDemo />,
    // },
  ];

  const xservices = [
    {
      title: "Workflow Automations",
      description:
        "We automate your workflows to streamline repetitive tasks, enhance efficiency, save time, and eliminate errors.",
      demo: <WorkflowDemo />,
    },
    {
      title: "LLM Development",
      description:
        "We develop Large Language Models that transform how your company interacts with data and customers.",
      demo: <LLMDemo />,
    },
    {
      title: "AI Consulting",
      description:
        "Our experts provide strategic guidance, enabling your business to implement AI solutions that drive transformative growth.",
      demo: <ConsultingDemo />,
    },
  ];
  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };
  return (
    <section id="services" className=" px-6  relative" style={gradientStyle}>
      <div className="px-2 space-y-3 mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-[100px] md:leading-[120px]  mb-4 blue-gradient-text">
            <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
              What we do
            </span>
          </h2>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-[25px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="gradient-border p-0 md:p-5 relative"
              style={{
                background: `radial-gradient(100% 25% at 50% 0%, 
                    rgba(80, 176, 250, 0.15) 0%, 
                    rgba(64, 140, 199, 0.05) 36.5%, 
                    rgb(13, 13, 13) 100%)`,
              }}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <FadingBorder side="top" />
              <div className=" p-6 h-full flex flex-col">
                <div className="mb-6 flex-grow">{service.demo}</div>
                <h3 className="text-xl md:text-[35px] leading-[42px] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-base md:text-[15px] leading-[21px] ">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          ref={ref}
          className="mt-8 grid grid-cols-1  md:grid-cols-3 gap-8 "
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {xservices.map((service, index) => (
            <motion.div
              key={index}
              className="gradient-border relative py-5"
              style={{
                background: `radial-gradient(100% 25% at 50% 0%, 
                    rgba(80, 176, 250, 0.15) 0%, 
                    rgba(64, 140, 199, 0.05) 36.5%, 
                    rgb(13, 13, 13) 100%)`,
              }}
              variants={itemVariants}
            >
              <FadingBorder side="top" />
              <div className="p-6 h-full flex flex-col">
                <div className="mb-6 flex-grow">{service.demo}</div>
                <h3 className="text-lg md:text-[35px] leading-[42px] mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-base md:text-[15px] leading-[21px] ">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChatbotDemo() {
  return (
    <div className=" flex flex-col gap-5 h-64">
      <div className="overflow-hidden relative p-4 h-44 border-[1px] border-slate-400/50 rounded-md group  cursor-pointer">
        <div className="flex flex-col gap-4 absolute top-5 group-hover:top-[-20px] transition-all duration-500">
          <div className=" w-full flex items-center">
            <div className="w-9 h-9 p-1 me-2 flex items-center justify-center border border-gray-500/50 overflow-hidden">
              <img
                src="/avatar_1.png"
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="chat-content ms-3">
              <div className="chat-header">
                <div className="me-2">
                  <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                    You
                  </span>
                </div>
                <div className="chat-time">8:15 AM</div>
              </div>
              <div className="text-sm text-gray-400">
                Schedule a Google meeting with John for 3:45PM tomorrow!
              </div>
            </div>
          </div>

          <div className=" w-full flex items-center">
            <div className="w-9 h-9 p-1 me-2 flex items-center justify-center border border-gray-500/50 overflow-hidden">
              <span>AI</span>
            </div>
            <div className="chat-content ms-3">
              <div className="chat-header">
                <div className="me-2">
                  <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                    AI Assistent
                  </span>
                </div>{" "}
                <div className="chat-time">8:15 AM</div>
              </div>
              <div className="text-sm text-gray-400">
                I&apos;ve successfully scheduled a Google meeting with John for
                3:45PM tomorrow.
              </div>
            </div>
          </div>

          <div className=" w-full flex items-center">
            <div className="w-9 h-9 p-1 me-2 flex items-center justify-center border-gray-500/50 overflow-hidden"></div>

            <div className="ms-3 rounded-md flex gap-2 items-center w-[80%] border-[1px] p-3 border-slate-400/50">
              <img src="/meet.png" width={30} alt="google meet" />
              <span className="text-sm text-gray-400">
                Google meet with John
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center justify-center border-[1px] border-[#1f1f1f] py-2 px-3 rounded-lg">
        <button className="border-[1px] rounded-lg border-[#1f1f1f] p-2 box-border">
          <Plus size={16} />
        </button>
        <input
          className="flex-1 text-xs md:text-base mx-5 bg-transparent outline-none"
          type="text"
          placeholder="Message AI Assistant..."
        />
        <button className="border-[1px] rounded-lg border-[#1f1f1f] p-2 ">
          <ArrowUp size={16} />
        </button>
      </div>
    </div>
  );
}

function ContentCreationDemo() {
  return (
    <div className=" flex flex-col gap-5 h-64">
      <div
        className="w-full flex h-36 overflow-hidden bg-cover bg-center rounded-lg flex-1 items-center justify-center"
        style={{ backgroundImage: "url('/chat-bg.gif')" }}
      >
        <motion.div
          className="relative md:inline-block p-[1px] text-white rounded-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ backgroundColor: "#222" }}
        >
          <BorderButton
            borderWidth={0.6}
            borderSegmentSize={70}
            className="text-sm !border !border-gray-900  bg-black "
          >
            <span className="text-sm font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Generating image...
            </span>
          </BorderButton>
        </motion.div>
      </div>

      <div className="border-[1px] rounded-lg   border-[#1f1f1f] px-3 py-2 flex justify-between  ">
        <input
          type="text"
          className="bg-transparent text-xs md:text-base flex-1 outline-none"
          placeholder="Generate an image of..."
        />
        <Button
          size="sm"
          variant="outline"
          className="text-sm md:text-base bg-transparent border-blue-300 text-blue-300 font-light hover:bg-black hover:text-blue-400"
        >
          Generate
        </Button>
      </div>
    </div>
  );
}

function WorkflowDemo() {
  return (
    <div className="h-64  flex flex-col items-center justify-center relative overflow-hidden">
      <motion.div className="absolute bg-gradient-to-r shadow-[#70BEFA]/75 from-white to-[#70BEFA]  z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border-2 border-blue-400 flex items-center justify-center text-center">
        <div className="w-[10.5rem] h-[10.5rem] bg-[#0f0f0f] rounded-full flex items-center justify-center text-center  shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-semibold">
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                100+
              </span>
            </div>
            <div className="text-sm text-white">Automations</div>
          </div>
        </div>
      </motion.div>

      <div className="w-full overflow-hidden mb-6">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(12)].map((_, index) => (
            <ReviewCard key={`top-${index}`} />
          ))}
        </motion.div>
      </div>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {[...Array(12)].map((_, index) => (
            <ReviewCard key={`bottom-${index}`} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="opacity-30 cursor-pointer border-[1px] hover:border-blue-200 hover:opacity-50 transition-all duration-500 bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 flex items-center justify-center gap-3 flex-shrink-0 w-20 h-20 shadow-md">
      <img width={30} src="/icon.png" alt="avatar" className="rounded-full" />
    </div>
  );
}

function LLMDemo() {
  type Card = {
    id: number;
    question: string;
    answer: string;
  };

  const items: Card[] = [
    {
      id: 1,
      question: "Where do Quokka's live?",
      answer: "Quokka's live on Rottnest Island.",
    },
    {
      id: 2,
      question: "What do Quokka's eat?",
      answer: "They eat leaves, stems, and bark.",
    },
    {
      id: 3,
      question: "Are Quokka's friendly?",
      answer: "Yes! They are very photogenic and social.",
    },
    {
      id: 4,
      question: "Are Quokka's friendly?",
      answer: "Yes! They are very photogenic and social.",
    },
  ];

  return (
    <div className="rounded-md p-2 border-[1px] overflow-hidden border-[#0d1117] h-64 group cursor-pointer">
      <div className="relative mt-12 w-full md:w-96 h-20 mx-auto">
        {items.map((card, index) => (
          <div
            key={card.id}
            className={`absolute inset-0 flex justify-between items-center   p-4 w-full h-full bg-[#0f0f0f] text-white rounded-xl border border-white/10 shadow-lg transition-all duration-500`}
            style={{
              top: `-${index * 15}px`,
              scale: `${1 - index * 0.05}`,
              zIndex: items.length - index,
            }}
          >
            <div>
              <img src="/ai.png" alt="AI" width={30} height={30} />
            </div>
            <div className="flex flex-col justify-center items-start">
              <div className="text-sm text-gray-300">
                <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                  {card.question}
                </span>
              </div>
              <div className="text-sm text-gray-500">{card.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input h-10 relative overflow-hidden">
        <input
          type="text"
          className="absolute transition-all duration-700 bottom-0  group-hover:bottom-20"
          placeholder="Write your prompt..."
        />
        <input
          type="text"
          className="absolute transition-all duration-700 top-20 group-hover:top-0"
          placeholder="And are Quokka's big ?"
        />
        <div></div>
        <motion.button
          className="absolute right-1 top-1  rounded-md bg-gray-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp size={16} />
        </motion.button>
      </div>
    </div>
  );
}

function ConsultingDemo() {
  return (
    <div
      className="h-64 group cursor-pointer relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/stats.png')" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Button
          className={` absolute top-1/4 left-20 group-hover:left-52 transition-all duration-700 bg-transparent border border-blue-400 backdrop-blur-sm rounded-md `}
        >
          <span className={`text-sm  hover:font-medium  `}>
            Efficiency +103%
          </span>
        </Button>
        <Button
          className={` absolute bottom-1/3 right-1/4 group-hover:right-56 group-hover:bottom-10 transition-all duration-700  bg-transparent border border-blue-400 backdrop-blur-sm rounded-md `}
        >
          <span className={`text-sm  hover:font-medium  `}>Cost -67%</span>
        </Button>
      </motion.div>
    </div>
  );
}
