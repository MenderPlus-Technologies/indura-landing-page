'use client';
import { Button } from "@/components/ui/button";
import React, { JSX, useState } from "react";
import { Modal } from "../reusable-modal";

export const FinalCtaSection = (): JSX.Element => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEarlyAccess = () => {
    setLoading(true);
    setShowFormModal(true);
  };

  return (
    <>
      <section className="relative flex flex-col items-center w-full pt-12 md:pt-16 pb-12 md:pb-[88px] overflow-hidden">
        {/* Full-bleed gradient background */}
        <img
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          alt="Gradient cta"
          src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient-cta-1.png"
        />

        {/* Content container */}
        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-8 px-4 md:px-[80px] lg:px-[140px] w-full max-w-[1200px]">
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-[862px] translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
            <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-white text-2xl sm:text-3xl md:text-4xl lg:text-[52px] xl:text-[68px] text-center leading-tight md:leading-[44px] lg:leading-[60px] xl:leading-[85px] font-medium tracking-[0]">
              Revolutionizing Health Payments &amp; Savings with AI
            </h2>

            <p className="max-w-[601px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg text-center tracking-[0] leading-relaxed md:leading-[27.9px]">
              Join the waitlist and be first to try Indura&apos;s AI Savings,
              Payments, and Health ID.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 items-center relative translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
            <Button
              onClick={handleEarlyAccess}
              className="h-11 md:h-12 justify-center gap-2 px-5 md:px-6 bg-white rounded-xl border border-solid border-[#dfe1e6] hover:bg-white/90 transition-colors cursor-pointer"
            >
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-sm md:text-base tracking-[0] leading-[24.8px] whitespace-nowrap">
                Get Early Access
              </span>
            </Button>
          </div>
        </div>
      </section>

      {/* Reusable modal with loading overlay and Google Form */}
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