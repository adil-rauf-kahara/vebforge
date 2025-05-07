"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export default function MeetOurTeam() {
  const teamMembers: TeamMember[] = [
    {
      name: "Branson",
      role: "Founder",
      image: "/avatar_1.png",
    },
    {
      name: "Jason Davis",
      role: "Developer",
      image: "/avatar_2.png",
    },
    {
      name: "Maria Wilson",
      role: "COO",
      image: "/avatar_3.png",
    },
    {
      name: "William Bird",
      role: "CTO",
      image: "/avatar_4.png",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const membersList = [...teamMembers, ...teamMembers, ...teamMembers];

  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isOverCard, setIsOverCard] = useState("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div id="team" className="min-h-[50vh] bg-[#0a0a0a] text-white relative">
      {isOverCard && (
        <motion.div
          className="fixed flex items-center justify-center z-50 pointer-events-none  "
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
            transform: "translate(-50%, -50%)",
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <Button
            className={`bg-transparent border border-blue-400 backdrop-blur-sm rounded-md `}
          >
            <span className={`text-sm  hover:font-medium  `}>{isOverCard}</span>
            <ArrowRight className={`text-md `} />
          </Button>
        </motion.div>
      )}

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="py-24"
          initial="hidden"
          animate="show"
          variants={container}
        >
          <motion.h1
            className="text-5xl md:text-[100px] md:leading-[120px] mb-16"
            variants={item}
          >
            <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </motion.h1>

          <div className="relative overflow-hidden w-full">
            <motion.div
              className="flex gap-6 md:gap-8"
              initial={{ x: 0 }}
              animate={{
                x: ["0%", "-100%"],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              }}
            >
              {membersList.map((member, index) => (
                <div key={index}>
                  <TeamMemberCard
                    member={member}
                    onMouseEnter={() => setIsOverCard(member.name)}
                    onMouseLeave={() => setIsOverCard("")}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TeamMemberCard({
  member,
  onMouseEnter,
  onMouseLeave,
}: {
  member: TeamMember;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <Card
      className="bg-transparent w-[350px] border-0 relative overflow-hidden group"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "none" }}
    >
      <div className="absolute inset-0 rounded-xl border border-[#1a2334] shadow-[0_0_15px_rgba(107,158,214,0.15)] group-hover:shadow-[0_0_25px_rgba(107,158,214,0.25)] transition-all duration-500"></div>

      <div className="p-10 relative z-10">
        <div
          className="w-full max-w-[280px] border-gray-800 rounded-lg mx-auto p-5 mb-6 relative flex items-center justify-center"
          style={{
            boxShadow: "inset 0px 0px 1px rgba(192, 192, 192, 0.6)",
          }}
        >
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            width={150}
            height={150}
            className="rounded-lg object-cover"
          />
        </div>

        <div className="">
          {member.role && (
            <motion.p
              className="text-[#6b9ed6] mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                {member.role}
              </span>
            </motion.p>
          )}
          <motion.h3
            className="text-white text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {member.name}
          </motion.h3>
        </div>
      </div>
    </Card>
  );
}
