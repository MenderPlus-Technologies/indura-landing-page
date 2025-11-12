import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { JSX } from "react";

export const CallToActionWrapperSection = (): JSX.Element => {
  return (
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
            className="h-12 cursor-pointer  sm:h-[52px] px-5 sm:px-6 py-3 bg-white 
            text-[#009688] rounded-xl border border-[#dfe1e6] 
            hover:bg-white/90 font-semibold text-sm sm:text-base leading-[24.8px]"
          >
            Get Early Access
          </Button>
        </div>
      </div>
    </section>
  );
};
