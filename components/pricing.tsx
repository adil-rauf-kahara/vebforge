import { Check } from "lucide-react";
import { Button } from "./ui/button";
import FadingBorder from "./neon-border";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BorderButton from "./gradientButton";

export default function SubscriptionPricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('annually');
  const featureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activePillStyle, setActivePillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  
  const pricingPlans = [
    {
      name: "Basic",
      monthlyPrice: 750,
      description: "For businesses looking to start with AI and automations.",
      features: [
        "1 developer",
        "Basic chatbots & LLMs",
        "5 monthly workflow automations",
        "50 monthly content creation requests",
        "Cancel & pause anytime",
      ],
    },
    {
      name: "Professional",
      monthlyPrice: 1500,
      description:
        "For businesses looking to outperform their competition with AI and automations.",
      features: [
        "2 developers",
        "Custom chatbots & LLMs",
        "15 monthly workflow automations",
        "100 monthly content creation requests",
        "Cancel & pause anytime",
      ],
    },
    {
      name: "Enterprise",
      monthlyPrice: 3000,
      description:
        "For businesses looking to fully leverage AI and automations to become an industry leader.",
      features: [
        "3 developers",
        "Custom chatbots & LLMs",
        "Unlimited workflow automations",
        "Unlimited content creation requests",
        "Cancel & pause anytime",
      ],
    },
  ];

  const getPrice = (monthlyPrice: number) => {
    if (billingPeriod === 'annually') {
      // Apply 20% discount for annual billing
      return Math.round(monthlyPrice * 0.8);
    }
    return monthlyPrice;
  };

  const gradientStyle = {
    background: `radial-gradient(35% 25% at 50% 56.1%, rgba(80,176,250,0.1) 0%, rgba(64,140,199,0.1) 36.49%, rgb(10, 10, 10) 100%)`,
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const priceVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (billingPeriod) {
        const index = billingPeriod === 'monthly' ? 1 : 2;
        const hoveredElement = featureRefs.current[index];
        if (hoveredElement) {
          const { offsetTop, offsetHeight, offsetWidth, offsetLeft } = hoveredElement;
          setActivePillStyle({
            opacity: 1,
            top: offsetTop - 1,
            left: offsetLeft - 1,
            height: offsetHeight + 2,
            width: offsetWidth + 1,
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [billingPeriod, featureRefs.current]);

  return (
    <div
      id="pricing"
      style={gradientStyle}
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 py-16"
    >
      <div className="px-1 lg:px-14 w-full mx-auto">
        <h1 className="text-center text-6xl md:text-[100px] font-medium md:leading-[120px] mb-6 bg-gradient-to-r from-white via-white to-blue-300 bg-clip-text text-transparent">
          <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
            Subscriptions
          </span>
        </h1>

        <p className="text-center text-gray-400 mb-10">
          Three different subscriptions to match your companies&apos; needs.
        </p>

        <div className="items-center space-x-1 backdrop-blur-sm px-1 py-1 rounded-md w-fit mx-auto my-10">
          <motion.div
            className="inline-flex relative z-10 sm:flex-row items-center space-x-2 bg-[#0f0f0f] border-[1px] border-[#222222] backdrop-blur-sm px-1 py-1 rounded-[10px] w-fit"
            variants={itemVariants}
          >
            <motion.div
              className="absolute border border-blue-400 rounded-md z-0 shadow-[0_0_3px_0_#70BEFA] cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activePillStyle.opacity,
                top: activePillStyle.top,
                left: activePillStyle.left,
                width: activePillStyle.width,
                height: activePillStyle.height,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
            />
            <Button
              className="bg-transparent group hover:bg-[#111111]/80 text-gray-400 rounded-md"
              ref={(el) => {
                if (featureRefs.current) {
                  featureRefs.current[1] = el;
                }
              }}
              onClick={() => setBillingPeriod('monthly')}
            >
              <span
                className={`text-sm hover:font-medium ${
                  billingPeriod === 'monthly'
                    ? "bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
                    : ""
                } `}
              >
                Monthly
              </span>
            </Button>
            <Button
              className={`bg-transparent hover:bg-[#111111]/80 rounded-md ${
                activePillStyle.opacity ? "" : "border border-blue-400"
              }`}
              ref={(el) => {
                if (featureRefs.current) {
                  featureRefs.current[2] = el;
                }
              }}
              onClick={() => setBillingPeriod('annually')}
            >
              <span
                className={`text-sm hover:font-medium ${
                  billingPeriod === 'annually'
                    ? "bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
                    : ""
                } `}
              >
                Annually (-20%)
              </span>
            </Button>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{
                x: index == 0 ? -100 : index == 2 ? 100 : 0,
                y: index == 1 ? 100 : 0,
              }}
              transition={{ duration: 1 }}
              whileInView={{ x: 0, y: 0 }}
              className={`bg-transparent rounded-xl border border-[#222222] p-8 flex flex-col relative ${
                index == 0 || index == 2 ? "my-8" : "my-0"
              }`}
              style={{
                background: `radial-gradient(100% 50% at 50% 0%, 
                  rgba(80, 176, 250, 0.2) 0%, 
                  rgba(64, 140, 199, 0.05) 36.5%, 
                  rgb(13, 13, 13) 100%)`,
              }}
            >
              <FadingBorder side="top" />
              <h3 className="text-[15px] leading-[18px] mb-6">
                <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                  {plan.name}
                </span>
              </h3>
              <div className="mb-1 h-[48px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingPeriod}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={priceVariants}
                    className="flex items-end"
                  >
                    <span className="text-[40px] bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent leading-[48px] font-medium">
                      €{getPrice(plan.monthlyPrice)}
                    </span>

                    <span className="text-gray-400 text-base ml-1 mb-2">
                      {billingPeriod === 'annually' ? '/month' : '/month'}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>
              {billingPeriod === 'annually' && (
                <p className="text-xs text-blue-300 mb-2">
                  Billed as €{getPrice(plan.monthlyPrice) * 12} annually
                </p>
              )}
              <p className="text-gray-400 mb-8 text-sm">{plan.description}</p>

              {plan.name == "Professional" ? (
                <BorderButton
                  borderWidth={0.6}
                  borderSegmentSize={70}
                  className="w-full py-2.5 px-4 rounded-md border border-[#333333] text-blue-300 hover:bg-[#1a1a1a] transition-colors mb-8 text-sm"
                >
                  <span className="text-sm font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    Choose this plan
                  </span>
                </BorderButton>
              ) : (
                <button className="w-full py-2.5 px-4 rounded-md border border-[#333333] text-blue-300 hover:bg-[#1a1a1a] transition-colors mb-8 text-sm">
                  Choose this plan
                </button>
              )}
              <div className="border-t border-[#222222] pt-8 space-y-4 mt-auto">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-blue-200 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-400 opacity-85">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}