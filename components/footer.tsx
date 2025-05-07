import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadingBorder from "./neon-border";

import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b bg-[#0a0a0a] text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="bg-[#0f0f0f] relative flex justify-between rounded-3xl p-8 mb-16 shadow-xl">
          <FadingBorder side="bottom" />
          <div>
            <h2 className="text-3xl sm:text-4xl font-medium mb-2">
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                Get the VebForge newsletter
              </span>
            </h2>

            <p className="text-gray-400 mb-6">
              Subscribe to get the latest updates on AI into your inbox every
              month.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="name@email.com"
              className="bg-[#0f1318] border-[#2a2f35] text-white placeholder-gray-500 rounded-xl"
            />
            <Button className="bg-transparent border border-[#2563eb] text-[#3b82f6] hover:bg-[#2563eb] hover:text-white transition-colors rounded-xl">
              subscribe
            </Button>
          </div>
        </div>



      </div>
            <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-12">
          <div className="col-span-1 pl-4">
            <Link href="/" className="flex items-center gap-3 justify-start ">
              <img src="/logo.png" alt="Logo" width={180} height={40} />
            </Link>
            <p className="text-gray-400 mt-4">
              We are dedicated to delivering exceptional digital experiences that transform businesses and engage users.
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="mb-4 text-white">
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                Links
              </span>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Services", href: "#services" },
                { name: "Process", href: "#process" },
                { name: "Team", href: "#team" },
                { name: "Clients", href: "#clients" },
                { name: "Reviews", href: "#reviews" },
                { name: "FAQ", href: "#faq" },
                { name: "Schedule a Session", href: "#schedule" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="mb-4 text-white">
              <span className="bg-gradient-to-r from-white to-[#70BEFA] bg-clip-text text-transparent">
                Connect
              </span>
            </h3>
            <div className="flex gap-6">
              <Link
                href="https://www.facebook.com/vebtual/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/vebtual/"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/vebtual"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500 pl-4">
          © 2025, VebForge - All rights reserved.
        </div>
      </div>
    </footer>
  );
}
