"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX, useState } from "react";
import { Modal } from "../reusable-modal";

const navigationItems = [
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Join Waiting List", href: "#join-waiting-list" },
  { label: "Contact Us", href: "#contact" },
];

export const NavigationMenuSection = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleEarlyAccess = () => {
    setLoading(true);
    setShowFormModal(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b border-gray-200 plusJakarta sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-10 xl:px-16 max-w-7xl mx-auto">
          {/* Logo */}
          <div className="shrink-0 flex items-center w-20 h-20 sm:w-24 sm:h-24 lg:w-20 gap-2">
            <Image
              src="https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg"
              alt="Logo"
              width={500}
              height={500}
              className=""
              priority
            />
            <p className="text-[#009688] font-bold text-xl">Indura</p>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6">
            {navigationItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(item.href)}
                className="px-3 cursor-pointer py-2 rounded-md font-medium text-[#666d80] text-sm xl:text-base hover:bg-gray-50 hover:text-gray-900 transition-colors whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center">
            <Button
              onClick={handleEarlyAccess}
              className="h-10 cursor-pointer gap-2 px-5 bg-[#009688] hover:bg-[#00897b] rounded-md transition-colors"
            >
              <span className="font-semibold text-white text-sm xl:text-base whitespace-nowrap">
                Get Early Access
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#dfe1e6] bg-white">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium text-[#666d80] text-base hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2">
                <Button
                  onClick={handleEarlyAccess}
                  className="w-full h-12 gap-2 px-4 py-3 bg-[#009688] hover:bg-[#00897b] rounded-lg transition-colors"
                >
                  <span className="font-semibold text-white text-base">
                    Get Early Access
                  </span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        maxWidth="2xl"
      >
        <div className="relative w-full h-[600px]">
          {/* Loader overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-[#009688]" />
            </div>
          )}

          <iframe
            src="https://forms.gle/jZpee78KBPccwMBp6"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-b-lg"
            onLoad={() => setLoading(false)}
            loading="lazy"
          ></iframe>
        </div>

        <div className="p-4 text-center border-t bg-gray-50">
          <button
            onClick={() =>
              window.open("https://forms.gle/jZpee78KBPccwMBp6", "_blank")
            }
            className="text-[#009688] hover:underline text-sm font-medium"
          >
            Prefer to open in a new tab? →
          </button>
        </div>
      </Modal>
    </>
  );
};
