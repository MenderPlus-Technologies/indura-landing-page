import React, { JSX } from "react";
import Image from "next/image";

const features = [
  {
    icon: "/Icon.svg",
    title: "AI Savings Coach",
    description:
      "Let Indura's AI suggest health-first goals, automate contributions, and keep you on track with smart nudges.",
  },
  {
    icon: "/database-01.svg",
    title: "Effortless Payments",
    description:
      "Pay at clinics, pharmacies, and labs via QR, USSD, or in-app with instant confirmations and receipts.",
  },
  {
    icon: "/server-01.svg",
    title: "Universal Health ID",
    description:
      "Your portable Indura ID for fast check-ins and payment history, share only what you choose, when you choose.",
  },
];

export const KeyFeaturesSection = (): JSX.Element => {
  return (
    <section className="gap-8 md:gap-12 lg:gap-16 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-12 sm:py-16 md:py-20 lg:py-[88px] flex flex-col items-center w-full plusJakarta">
      <header className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-[980px]">
        <p className="font-semibold text-[#009688] text-base md:text-lg text-center tracking-[0] leading-[27.9px]">
          Overview
        </p>

        <h2 className="w-full text-[#0d0d12] text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] text-center leading-tight md:leading-tight lg:leading-[65px] font-medium tracking-[0] px-4">
          Smart Health Finance Solutions Using AI
        </h2>

        <p className="w-full max-w-[720px] font-normal text-[#666d80] text-sm sm:text-base md:text-lg text-center tracking-[0] leading-relaxed md:leading-[27.9px] px-4">
          Indura unifies savings, payments, and identity so people can access
          care and providers get paid; simply and securely.
        </p>
      </header>

      <div className="flex flex-col md:flex-row w-full max-w-[1200px] items-start gap-8 md:gap-8 lg:gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-start gap-4 md:gap-6 flex-1 w-full">
            <div className="inline-flex items-center justify-center gap-2 p-2.5 bg-white rounded-[10px] border border-solid border-[#eceff3] shadow-[0px_2px_4px_#0d0d1226]">
              <Image 
                className="w-6 h-6" 
                alt={feature.title} 
                src={feature.icon}
                width={24}
                height={24}
              />
            </div>

            <div className="flex flex-col items-start gap-2 w-full">
              <h3 className="w-full text-lg md:text-xl tracking-[-0.36px] leading-[27px] font-medium text-[#0d0d12]">
                {feature.title}
              </h3>

              <p className="w-full font-normal text-[#666d80] text-sm md:text-base tracking-[0] leading-relaxed md:leading-[25.6px]">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};