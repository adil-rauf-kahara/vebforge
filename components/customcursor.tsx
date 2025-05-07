"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 "
      animate={{ x: mousePosition.x - 5, y: mousePosition.y - 5 }}
      transition={{ type: "spring", stiffness: 70, damping: 20 }}
    >
      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 shadow-lg shadow-blue-700" />
    </motion.div>
  );
}
