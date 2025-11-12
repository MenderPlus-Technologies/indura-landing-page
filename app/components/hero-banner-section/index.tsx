"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX } from "react";

const appStoreButtons = [
  {
    id: "playstore",
    icon: "/playstore.svg",
    iconAlt: "Playstore",
    iconWidth: "w-[26px]",
    iconHeight: "h-[29px]",
    topText: "GET IT ON",
    bottomText: "Google Play",
  },
  {
    id: "appstore",
    icon: "/apple.svg",
    iconAlt: "Apple",
    iconWidth: "w-6",
    iconHeight: "h-[29px]",
    topText: "Download on the",
    bottomText: "App Store",
  },
];

export const HeroBannerSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center plusJakarta pt-12 md:pt-16 lg:pt-24 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] relative overflow-hidden bg-[url('/Hero.svg')] bg-cover bg-center bg-no-repeat pb-0">
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1
            className="max-w-[1016px] w-full px-4 -mt-px 
  text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl lg:text-[56px] xl:text-[68px] 
  text-center font-medium tracking-[0] 
  leading-[1.3] sm:leading-tight md:leading-[1.2] lg:leading-[85px] 
  relative"
          >
            Revolutionizing Health Payments &amp; Savings with AI
          </h1>

          <p
            className="relative max-w-[601px] w-full px-4 
  font-normal text-[#666d80] 
  text-xs sm:text-sm md:text-base lg:text-lg 
  text-center tracking-[0] 
  leading-[1.6] sm:leading-[1.65] md:leading-[27.9px] 
  wrap-break-word"
          >
            Indura is the AI-powered health fintech platform that helps you save
            for care, pay anywhere with QR Code, and verify with a universal
            Health ID — built for Africa, online or offline.
          </p>
        </div>

       <div
  className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-[29.27px] 
  relative flex-[0_0_auto] px-2 sm:px-4"
>
  {appStoreButtons.map((button) => (
    <Button
      key={button.id}
      variant="outline"
      className="relative flex items-center justify-start 
      w-[120px] sm:w-[140px] md:w-[146.36px] 
      h-[42px] sm:h-[46px] md:h-[48.79px] 
      bg-black rounded-[6px] sm:rounded-[7.32px] 
      overflow-hidden border border-[#a6a6a6] 
      p-0 hover:bg-black/90 transition-all duration-200"
    >
      {/* Icon */}
      <Image
        className={`absolute top-2 sm:top-2.5 left-2 sm:left-2.5 ${button.iconWidth} ${button.iconHeight}`}
        alt={button.iconAlt}
        src={button.icon}
        width={24}
        height={28}
      />

      {/* Text */}
      <div
        className="flex flex-col items-start 
        absolute top-1/2 -translate-y-1/2 
        left-9 sm:left-10 md:left-11"
      >
        <div
          className="font-normal text-white 
          text-[9px] sm:text-[10px] md:text-[11px] 
          leading-[1.1] tracking-[0]"
        >
          {button.topText}
        </div>

        <div
          className="font-medium text-white 
          text-[12px] sm:text-[14px] md:text-[16px] 
          tracking-[-0.57px] leading-[1.4] whitespace-nowrap"
        >
          {button.bottomText}
        </div>
      </div>
    </Button>
  ))}
</div>

      </div>

      <div className="relative w-full max-w-[1432px] h-60 sm:h-[300px] md:h-[390px] lg:h-[600px] xl:h-[588px] -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20 xl:-mx-[116px] overflow-hidden"></div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[400px] md:w-[500px] lg:w-[650px] xl:w-[761px] h-auto">
        <Image
          className="w-full h-full object-contain"
          alt="Phone mockups"
          src="/phone-mockup.svg"
          width={761}
          height={679}
        />
      </div>
    </section>
  );
};
