"use client";

import { Button } from "@/components/ui/button";
import { MainNavLink } from "@/app/components/main-nav-link";
import { mainNavItems } from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import { JSX, useState } from "react";
import { WaitlistModal } from "../waitlist-modal";

export const NavigationMenuSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  const handleGetStarted = () => {
    setShowWaitlist(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b border-gray-200 plusJakarta sticky top-0 z-50 transform-gpu will-change-transform">
        <div className="flex items-center justify-between py-4 px-4 sm:px-8 lg:px-10 xl:px-16 mx-auto max-w-7xl">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0"
          >
            <Image
              src="https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg"
              alt="Indura Health"
              width={40}
              height={40}
              className="w-10 h-10 sm:w-11 sm:h-11"
              priority
            />
            <span className="text-[#009688] font-bold text-lg sm:text-xl">
              Indura
            </span>
          </Link>

          <div className="hidden xl:flex items-center justify-center gap-5">
            {mainNavItems.map((item) => (
              <MainNavLink
                key={item.label}
                href={item.href}
                className="px-2 py-2 font-medium text-[#666d80] text-sm hover:text-[#009688] transition-colors whitespace-nowrap"
              >
                {item.label}
              </MainNavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center justify-end shrink-0">
            <Button
              onClick={handleGetStarted}
              className="h-10 cursor-pointer px-4 bg-[#009688] hover:bg-[#00897b] rounded-md transition-colors"
            >
              <span className="font-semibold text-white text-sm whitespace-nowrap">
                Get Started
              </span>
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-[#666d80]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#dfe1e6] bg-white">
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {mainNavItems.map((item) => (
                <MainNavLink
                  key={item.label}
                  href={item.href}
                  onNavigate={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 rounded-lg font-medium text-[#666d80] text-base hover:bg-gray-50 hover:text-[#009688] transition-colors"
                >
                  {item.label}
                </MainNavLink>
              ))}
              <div className="pt-3 border-t border-[#eceff3] mt-2">
                <Button
                  onClick={handleGetStarted}
                  className="w-full h-12 bg-[#009688] hover:bg-[#00897b] rounded-lg transition-colors"
                >
                  <span className="font-semibold text-white text-base">
                    Get Started
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
};
