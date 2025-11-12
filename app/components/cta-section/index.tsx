'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { JSX, useState } from "react";
import { Modal } from "../reusable-modal";

export const CallToActionWrapperSection = (): JSX.Element => {
   const [showFormModal, setShowFormModal] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleEarlyAccess = () => {
      setLoading(true);
      setShowFormModal(true);
    };
  return (
    <>
    <section className="flex flex-col items-center plusJakarta gap-12 md:gap-[72px] mt-12 lg:mt-0 pt-8 pb-16 md:pb-[88px] w-full">
      <div
        className="relative flex flex-col items-center justify-center gap-6 md:gap-8 
        px-4 sm:px-8 md:px-[140px] py-16 md:py-20 
        bg-[#009688] w-full overflow-hidden 
         md:rounded-none"
      >
        {/* Background Image */}
        <Image
          src="/CTA (1).svg"
          alt="Gradient cta"
          width={1920}
          height={400}
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_60%]"
          priority
        />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[862px] text-center px-2">
          <h1
            className="text-white font-medium leading-tight tracking-[0]
            text-2xl sm:text-3xl md:text-[68px] md:leading-[85px]"
          >
            Revolutionizing Health Payments &amp; Savings with AI
          </h1>

          <p
            className="mt-3 font-normal text-white text-sm sm:text-base md:text-lg
            leading-relaxed md:leading-[27.9px] tracking-[0] max-w-[601px]"
          >
            Join the waitlist and be first to try Idura&apos;s AI Savings,
            Payments, and Health ID.
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative z-10 flex items-center justify-center mt-6 md:mt-8">
          <Button
              onClick={handleEarlyAccess}
            className="h-12 cursor-pointer  sm:h-[52px] px-5 sm:px-6 py-3 bg-white 
            text-[#009688] rounded-xl border border-[#dfe1e6] 
            hover:bg-white/90 font-semibold text-sm sm:text-base leading-[24.8px]"
          >
            Get Early Access
          </Button>
        </div>
      </div>
    </section>
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
