'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useLicense } from '@/contexts/LicenseContext';

// Dynamically import components with no SSR to prevent tampering
const Header = dynamic(() => import('@/components/header'), { ssr: false });
const Hero = dynamic(() => import('@/components/hero'), { ssr: false });
const WhatWeDo = dynamic(() => import('@/components/what-we-do'), { ssr: false });
const Process = dynamic(() => import('@/components/process'), { ssr: false });
const Statistics = dynamic(() => import('@/components/statistics'), { ssr: false });
const Footer = dynamic(() => import('@/components/footer'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/customcursor'), { ssr: false });
const SecondHero = dynamic(() => import('@/components/second-hero'), { ssr: false });
const MeetOurTeam = dynamic(() => import('@/components/meet-our-team'), { ssr: false });
const AnswersSection = dynamic(() => import('@/components/FAQ'), { ssr: false });
const ReviewsSection = dynamic(() => import('@/components/reviews-section'), { ssr: false });
const LetsTalkSection = dynamic(() => import('@/components/contact'), { ssr: false });
const Pricing = dynamic(() => import('@/components/pricing'), { ssr: false });
const BackgroundAnimation = dynamic(() => import('@/components/bganimation'), { ssr: false });
const ScheduleMeeting = dynamic(() => import('@/components/schedule-meeting'), { ssr: false });

// This key will be used to verify component integrity
const INTEGRITY_KEY = process.env.NEXT_PUBLIC_INTEGRITY_KEY || 'vf_integrity_2025';

export default function Home() {
  const { isLicenseValid, isChecking } = useLicense();
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Set loaded after initial render
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded && !isLicenseValid && !isChecking) {
      // Only hide content if license check is complete and invalid
      setShouldRender(false);
    } else {
      setShouldRender(true);
    }
  }, [isLicenseValid, isChecking, isLoaded]);

  // Always render the container, but conditionally render content
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden transition-opacity duration-300" 
          style={{ opacity: shouldRender ? 1 : 0 }}>
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