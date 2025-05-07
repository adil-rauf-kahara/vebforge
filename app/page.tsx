"use client";

import Header from "@/components/header";
import Hero from "@/components/hero";
import WhatWeDo from "@/components/what-we-do";
import Process from "@/components/process";
import Statistics from "@/components/statistics";
import Footer from "@/components/footer";
import CustomCursor from "@/components/customcursor";
import SecondHero from "@/components/second-hero";
import MeetOurTeam from "@/components/meet-our-team";
import AnswersSection from "@/components/FAQ";
import ReviewsSection from "@/components/reviews-section";
import LetsTalkSection from "@/components/contact";
import Pricing from "@/components/pricing";
import BackgroundAnimation from "@/components/bganimation";
import ScheduleMeeting from "@/components/schedule-meeting";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <CustomCursor />
        <BackgroundAnimation />
        <Header />
        <Hero />
        <SecondHero />
        <WhatWeDo />
        <Process />
        <Statistics />
        <MeetOurTeam />
        <Pricing />
        <ReviewsSection />
        <AnswersSection />
                        <ScheduleMeeting />

        <LetsTalkSection />
      </div>
      <Footer />
    </main>
  );
}
