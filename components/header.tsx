"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import BorderButton from "@/components/gradientButton";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePillStyle, setActivePillStyle] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log(latest);
    const previous = scrollY.getPrevious() || 0;
    if (previous > 800 || latest > 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "services",
        "process",
        "team",
        "clients",
        "reviews",
        "faq",
      ];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.name.toLowerCase() === activeSection
    );
    if (hoveredIndex !== null) {
      const hoveredElement = featureRefs.current[hoveredIndex];
      if (hoveredElement) {
        const { offsetTop, offsetHeight, offsetWidth, offsetLeft } =
          hoveredElement;
        setActivePillStyle({
          top: offsetTop,
          left: offsetLeft,
          height: offsetHeight,
          width: offsetWidth,
          opacity: 1,
        });
      }
    } else if (activeIndex !== -1 && featureRefs.current[activeIndex]) {
      const { offsetTop, offsetLeft, clientWidth, clientHeight } =
        featureRefs.current[activeIndex];
      setActivePillStyle({
        top: offsetTop,
        left: offsetLeft,
        width: clientWidth,
        height: clientHeight,
        opacity: 1,
      });
    } else {
      setActivePillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoveredIndex, activeSection]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Team", href: "#team" },
    { name: "Clients", href: "#clients" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <motion.header
      className={`${
        hidden ? "fixed" : "absolute"
      } top-0 left-0 right-0 z-50 px-4 md:px-20 py-4 `}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0, delay: 4 }}
    >
      <div
        className={` max-w-full mx-auto flex items-center justify-center ${
          !hidden ? "" : "justify-center"
        } justify-between `}
      >
        {!hidden && (
          <motion.div
            className="flex items-center flex-1 shrink-0 basis-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="flex items-center gap-3 justify-center"
              style={{
                fontFamily: 'Switzer, "Switzer Placeholder", sans-serif',
                fontSize: "22px",
                lineHeight: "26px",
                fontWeight: 400,
                color: "rgb(255, 255, 255)",
              }}
            >
              <img src="/logo.png" alt="Logo" width={150} height={22} />
            </Link>
          </motion.div>
        )}

        <motion.div
          className="hidden lg:flex items-center mx-auto space-x-1 bg-[#0f0f0f] border-[#1f1f1f] border-[1px] backdrop-blur-sm px-[2px] py-[4px]   rounded-[10px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {hidden && (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="flex items-center gap-3 justify-center"
                style={{
                  fontFamily: 'Switzer, "Switzer Placeholder", sans-serif',
                  fontSize: "22px",
                  lineHeight: "26px",
                  fontWeight: 400,
                  color: "rgb(255, 255, 255)",
                }}
              >
              </Link>
            </motion.div>
          )}
          <motion.div
            className="absolute border border-blue-400 rounded-md z-0 shadow-[0_0_3px_0_#70BEFA]"
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

          {navItems.map((item, index) => (
            <div
              key={item.name}
              ref={(el) => {
                featureRefs.current[index] = el;
              }}
              className={`relative z-10 ${hidden ? "ps-2" : ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link
                href={item.href}
                className={clsx(
                  "py-2 px-[17px] rounded-md border border-transparent relative block",
                  activeSection === item.name.toLowerCase()
                    ? "bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent font-medium"
                    : "text-[#9c9c9c] hover:bg-gradient-to-r from-white to-[#70BEFA] hover:bg-clip-text hover:text-transparent"
                )}
                style={{
                  fontFamily: 'Switzer, "Switzer Placeholder", sans-serif',
                  fontSize: "14px",
                  lineHeight: "17px",
                  fontWeight: 400,
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}
          {hidden && (
<BorderButton
  borderWidth={0.6}
  borderSegmentSize={70}
  className="box-border text-sm !border !border-gray-900  bg-[#0f0f0f]"
>
  <Link
    href="#schedule"
    className="text-sm font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
  >
    Schedule a Session
  </Link>
</BorderButton>
          )}
        </motion.div>

        {!hidden && (
          <div className="flex-1 hidden shrink-0 basis-0 md:flex justify-end">
<BorderButton
  borderWidth={0.6}
  borderSegmentSize={70}
  className="box-border text-sm !border !border-gray-900  bg-[#0f0f0f]"
>
  <Link
    href="#schedule"
    className="text-sm font-medium bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent"
  >
    Schedule a Session
  </Link>
</BorderButton>
          </div>
        )}

        <motion.button
          className="md:hidden text-white"
          onClick={toggleMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimateMobileNav
        isOpen={isOpen}
        navItems={navItems}
        activeSection={activeSection}
      />
    </motion.header>
  );
}

function AnimateMobileNav({
  isOpen,
  navItems,
  activeSection,
}: {
  isOpen: any;
  navItems: any;
  activeSection: any;
}) {
  return (
    <motion.div
      className="md:hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
      }}
      transition={{ duration: 0.3 }}
    >
      {isOpen && (
        <div className="py-4 px-6 bg-black/90 backdrop-blur-md mt-2 rounded-xl">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item: any, i: any) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: 0.05 * i }}
              >
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    activeSection === item.name.toLowerCase()
                      ? "text-white bg-[#111111]"
                      : "text-gray-400 hover:text-white hover:bg-[#111111]/50"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3, delay: 0.3 }}
>
  <Button className="w-full bg-transparent hover:bg-[#111111]/80 border border-gray-700 text-white rounded-lg">
    <Link href="#schedule">Schedule a Session</Link>
  </Button>
</motion.div>

          </nav>
        </div>
      )}
    </motion.div>
  );
}
