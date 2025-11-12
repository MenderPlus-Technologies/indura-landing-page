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
    <section
      className="flex flex-col w-full items-center plusJakarta pt-12 md:pt-16 lg:pt-24 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] relative overflow-hidden bg-[url('/Hero.svg')] bg-cover bg-center bg-no-repeat pb-0"
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8 lg:gap-10 relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-center justify-center gap-3 md:gap-4 relative self-stretch w-full flex-[0_0_auto]">
          <h1 className="max-w-[1016px] w-full px-4 -mt-px text-[#0d0d12] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] xl:text-[68px] text-center leading-tight md:leading-[1.2] lg:leading-[85px] relative font-medium tracking-[0]">
            Revolutionizing Health Payments &amp; Savings with AI
          </h1>

          <p className="relative max-w-[601px] w-full px-4 font-normal text-[#666d80] text-sm sm:text-base md:text-lg text-center tracking-[0] leading-relaxed md:leading-[27.9px]">
            Indura is the AI-powered health fintech platform that helps you save
            for care, pay anywhere QR Code, and verify with a universal Health
            ID, built for Africa, online or offline.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-[29.27px] relative flex-[0_0_auto]">
          {appStoreButtons.map((button) => (
            <Button
              key={button.id}
              variant="outline"
              className="relative w-[140px] sm:w-[146.36px] h-[46px] sm:h-[48.79px] bg-black rounded-[7.32px] overflow-hidden border-[1.22px] border-solid border-[#a6a6a6] p-0 hover:bg-black/90"
            >
              <Image
                className={`absolute top-2 sm:top-2.5 left-2 sm:left-2.5 ${button.iconWidth} ${button.iconHeight}`}
                alt={button.iconAlt}
                src={button.icon}
                width={26}
                height={29}
              />

              <div className="flex flex-col w-[85px] sm:w-[95px] items-start absolute top-[calc(50.00%-16px)] left-9 sm:left-11">
                <div className="relative mt-[-1.22px] font-normal text-white text-[10px] sm:text-[11px] tracking-[0] leading-[11.0px]">
                  {button.topText}
                </div>

                <div className="relative w-fit text-end font-medium text-white text-[14px] sm:text-[16px] tracking-[-0.57px] leading-[21.0px] whitespace-nowrap">
                  {button.bottomText}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="relative w-full max-w-[1432px] sm:h-[600px] md:h-[600px] lg:h-[600px] xl:h-[588px] -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20 xl:-mx-[116px] overflow-hidden">
        
      </div>

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