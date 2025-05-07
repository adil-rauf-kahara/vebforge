"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function AnswersSection() {
  const [openQuestion, setOpenQuestion] = useState("");

  const toggleQuestion = (id: string) => {
    if (openQuestion === id) {
      setOpenQuestion("");
    } else {
      setOpenQuestion(id);
    }
  };

const questions = [
  {
    id: "vebforge-fit",
    question: "Is VebForge a good fit for my agency?",
    answer:
      "VebForge is built for AI agencies, chatbot startups, and SaaS platforms — whether you're launching your first product or refining your brand presence.",
  },
  {
    id: "vebforge-secure",
    question: "Is VebForge secure and production-ready?",
    answer:
      "Yes, VebForge is built with Next.js and follows best practices for performance, security, and scalability — making it ready for real-world deployment.",
  },
  {
    id: "vebforge-support",
    question: "Do you offer support after purchase?",
    answer:
      "Absolutely. We offer clear documentation and fast support to help you get the most out of VebForge. Need help? We’re just a message away.",
  },
  {
    id: "vebforge-customization",
    question: "How easy is it to customize VebForge?",
    answer:
      "Very easy. VebForge is built with clean code, Tailwind CSS, and modular components — so you can tweak layouts, colors, and content in minutes.",
  },
  {
    id: "vebforge-license",
    question: "Can I use VebForge for multiple projects?",
    answer:
      "You’ll need an extended license if you're using it for multiple client projects. One license covers one end product — in line with Envato’s policy.",
  },
  {
    id: "vebforge-refund",
    question: "Can I get a refund if it doesn’t fit my needs?",
    answer:
      "If the template doesn’t work as described or has technical issues we can’t resolve, you’re eligible for a refund under Envato’s refund policy.",
  },
];

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };
  return (
    <div
      id="faq"
      style={gradientStyle}
      className="min-h-screen text-white py-16 px-4 md:px-6 lg:px-8"
    >
      <div className=" mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold text-center mb-4 px-5">
          <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
            Answers
          </span>
        </h1>
        <p className="text-gray-400 text-center text-lg mb-16">
          We&apos;ve gone ahead and answered some of the questions you might
          have.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {questions.map((item) => (
            <div
              key={item.id}
              className=" bg-[#0d0d0d] border-[#1f1f1f] border-[1px] rounded-lg overflow-hidden"
            >
              <div className="p-6 flex justify-between items-center">
                <h3 className="text-sm">{item.question}</h3>
                <button
                  onClick={() => toggleQuestion(item.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                >
                  {openQuestion === item.id ? (
                    <X size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                </button>
              </div>
              {openQuestion === item.id && (
                <div className="px-6 pb-6 text-gray-400">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
