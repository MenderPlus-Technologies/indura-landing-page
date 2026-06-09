"use client";

import { Button } from "@/components/ui/button";
import { JSX, useState } from "react";
import { WaitlistModal } from "../waitlist-modal";

export const FinalCtaSection = (): JSX.Element => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <section
        id="join-waiting-list"
        className="relative flex flex-col items-center w-full pt-12 md:pt-16 pb-12 md:pb-[88px] overflow-hidden scroll-mt-24"
      >
        <img
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          alt=""
          src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient-cta-1.png"
        />

        <div className="relative flex flex-col items-center justify-center gap-6 md:gap-8 px-4 md:px-[80px] lg:px-[140px] w-full max-w-[1200px]">
          <div className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-[862px]">
            <h2 className="plusJakarta text-white text-2xl sm:text-3xl md:text-4xl lg:text-[52px] text-center leading-tight font-medium">
              Join the Sovereign Health Economy.
            </h2>

            <p className="max-w-[601px] plusJakarta font-normal text-white/90 text-sm sm:text-base md:text-lg text-center leading-relaxed">
              Secure health savings, optimize your health facility, or deploy impact
              capital with confidence. Join the waitlist to be first in line.
            </p>
          </div>

          <div className="flex gap-3 md:gap-4 items-center relative">
            <Button
              onClick={() => setShowWaitlist(true)}
              className="h-11 md:h-12 justify-center gap-2 px-5 md:px-6 bg-white rounded-xl border border-solid border-[#dfe1e6] hover:bg-white/90 transition-colors cursor-pointer"
            >
              <span className="plusJakarta font-semibold text-[#009688] text-sm md:text-base whitespace-nowrap">
                Get Early Access
              </span>
            </Button>
          </div>
        </div>
      </section>

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
};
