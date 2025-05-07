"use client";

import { motion } from "framer-motion";
import ReviewCard from "./review-card";

const topRowReviews = [
  {
    quote:
      "VebForge's AI solutions save us a ton of money on a monthly basis, highly recommend working with them",
    name: "David Williams",
    title: "CTO - Wave",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "VebForge has significantly enhanced our efficiency, resulting in the completion of more work every day",
    name: "Jessica Miller",
    title: "CCO - Kama Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Highly recommended VebForge's AI consultancy for any data-intensive business",
    name: "Michael Anderson",
    title: "CEO - Verdant Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "Game changer for any business looking to leverage AI capabilities",
    name: "Sarah Johnson",
    title: "CIO - Klara Innovations",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

const bottomRowReviews = [
  {
    quote:
      "Highly recommended VebForge's AI consultancy for any data-intensive business",
    name: "Michael Anderson",
    title: "CEO - Verdant Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "VebForge has significantly enhanced our efficiency, resulting in the completion of more work every day",
    name: "Jessica Miller",
    title: "CCO - Kama Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "VebForge's AI solutions save us a ton of money on a monthly basis, highly recommend working with them",
    name: "David Williams",
    title: "CTO - Wave",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote: "Game changer for any business looking to leverage AI capabilities",
    name: "Sarah Johnson",
    title: "CIO - Klara Innovations",
    avatar: "/placeholder.svg?height=80&width=80",
  },
];

export default function ReviewsSection() {
  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };
  return (
    <section
      id="reviews"
      style={gradientStyle}
      className="w-full py-20 overflow-hidden relativebg-black"
    >
      <div className="absolute inset-0 bg-gradient-radial from-blue-900/10 to-transparent opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl md:text-[100px] md:leading-[120px]  mb-24">
          <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
            Reviews
          </span>
        </h2>

        <div className="mb-12 overflow-hidden my-mask">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [-1500, 0],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...topRowReviews, ...topRowReviews, ...topRowReviews].map(
              (review, index) => (
                <ReviewCard key={`top-${index}`} review={review} />
              )
            )}
          </motion.div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -1500],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[
              ...bottomRowReviews,
              ...bottomRowReviews,
              ...bottomRowReviews,
            ].map((review, index) => (
              <ReviewCard key={`bottom-${index}`} review={review} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
