import { Button } from "@/components/ui/button";
import React, { JSX } from "react";

export const CallToActionWrapperSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[72px] pt-8 pb-[88px] w-full">
      <div className="flex flex-col items-center justify-center gap-8 px-4 md:px-[140px] py-20 bg-[#009688] w-full relative overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Gradient cta"
          src="/gradient-cta-1.png"
        />

        <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[862px] relative z-10">
          <h1 className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-white text-4xl md:text-[68px] text-center leading-tight md:leading-[85px] font-medium tracking-[0]">
            Revolutionizing Health Payments &amp; Savings with AI
          </h1>

          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-base md:text-lg text-center tracking-[0] leading-[27.9px] max-w-[601px]">
            Join the waitlist and be first to try Idura&apos;s AI Savings,
            Payments, and Health ID.
          </p>
        </div>

        <div className="flex gap-4 items-center relative z-10">
          <Button className="h-[52px] px-4 py-4 bg-white text-[#009688] rounded-xl border border-[#dfe1e6] hover:bg-white/90 [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-base tracking-[0] leading-[24.8px]">
            Get Early Access
          </Button>
        </div>
      </div>
    </section>
  );
};
