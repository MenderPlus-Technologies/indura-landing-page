"use client";

import { EcosystemHashLink } from "@/app/components/ecosystem-hash-link";
import { JSX, useState } from "react";
import { WaitlistModal } from "../waitlist-modal";

export const RevampHeroSection = (): JSX.Element => {
  const [showWaitlist, setShowWaitlist] = useState(false);

  return (
    <>
      <section className="plusJakarta relative flex w-full flex-col items-center overflow-hidden bg-[url('/Hero.svg')] bg-cover bg-center bg-no-repeat px-4 sm:px-8 lg:px-10 xl:px-16 pt-16 md:pt-24 lg:pt-28 pb-16 md:pb-20 transform-gpu">
        <header className="relative flex w-full max-w-[1016px] xl:max-w-[1200px] flex-col items-center text-center">
          <h1 className="mb-6 w-full px-4 text-[#0d0d12] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[68px] font-medium leading-[1.1] lg:leading-[1.2] tracking-[-0.02em]">
            <span className="lg:whitespace-nowrap">The Financial Operating System</span>
            <br className="hidden lg:block" />
            <span>for African Healthcare.</span>
          </h1>
          <p className="mb-10 max-w-3xl text-[#666d80] text-base sm:text-lg md:text-xl leading-relaxed">
            General fintech is built for everyday shopping. Indura is the dedicated
            financial infrastructure connecting patients, health providers, and
            global donors on one secure, zero-leakage ledger.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowWaitlist(true)}
              className="inline-flex w-full sm:w-auto cursor-pointer items-center justify-center rounded-md bg-[#009688] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#00897b]"
            >
              Get Started
            </button>
            <EcosystemHashLink
              href="/#institutions"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-md border-2 border-[#009688] px-7 py-3.5 text-sm font-semibold text-[#009688] transition-colors hover:bg-[#009688]/5"
            >
              Institutional Access
            </EcosystemHashLink>
          </div>
        </header>
      </section>

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
};
