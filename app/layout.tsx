import type React from "react";
import "@/app/globals.css";
import { Inter_Tight } from "next/font/google";

const inter_tight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-intertight",
});

export const metadata = {
  title: "VebForge – AI Agency Website Template | Next.js & Tailwind",
  description: "VebForge is a sleek and modern Next.js template built for AI startups, chatbot agencies, and smart platform builders. Designed with Tailwind CSS and crafted for performance, it's the perfect starting point for AI-driven businesses.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter_tight.className} antialiased`}>{children}</body>
    </html>
  );
}
