import { Button } from "@/components/ui/button";
import { JSX } from "react";

const appStoreButtons = [
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/playstore.svg",
    topText: "GET IT ON",
    bottomImage: "https://c.animaapp.com/mm8xgcl4CkUVff/img/path90.svg",
    alt: "Playstore",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/apple.svg",
    topText: "Download on the",
    bottomText: "App Store",
    alt: "Apple",
  },
];

const phoneImages = [
  {
    src: "https://c.animaapp.com/mm8xgcl4CkUVff/img/mockuuups-free-transparent-iphone-air-mockup-3.png",
    className: "top-[141px] left-0",
  },
  {
    src: "https://c.animaapp.com/mm8xgcl4CkUVff/img/mockuuups-free-transparent-iphone-air-mockup-2.png",
    className: "top-0 left-[222px]",
  },
  {
    src: "https://c.animaapp.com/mm8xgcl4CkUVff/img/mockuuups-free-transparent-iphone-air-mockup-1.png",
    className: "top-[141px] left-[501px]",
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="flex flex-col w-full items-center pt-20 md:pt-24 pb-12 md:pb-20 px-4 md:px-[120px] relative bg-white">
      <img
        className="absolute top-0 -right-px w-full h-[846px] pointer-events-none z-0"
        alt="Pattern"
        src="https://c.animaapp.com/mm8xgcl4CkUVff/img/pattern.svg"
      />

      <img
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        alt="Gradient"
        src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient.svg"
      />

      <div className="flex flex-col items-center justify-center gap-10 relative w-full max-w-[1200px] z-10">
        <div className="flex flex-col items-center justify-center gap-4 relative w-full">
          <h1 className="max-w-[1016px] [font-family:'Plus_Jakarta_Sans',Helvetica] text-[#0d0d12] text-4xl md:text-5xl lg:text-[68px] text-center leading-tight lg:leading-[85px] font-medium tracking-[0] translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
            Revolutionizing Health Payments &amp; Savings with AI
          </h1>

          <p className="max-w-[601px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#666d80] text-base md:text-lg text-center tracking-[0] leading-[27.9px] px-4 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
            Indura is the AI-powered health fintech platform that helps you save
            for care, pay seamlessly at supported facilities, and verify with a universal Health
            ID, built for Africa, online or offline.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[29.27px] translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
          {appStoreButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              className="relative w-[146.36px] h-auto py-1.5 px-2.5 bg-black rounded-[7.32px] overflow-hidden border-[1.22px] border-[#a6a6a6] hover:bg-black/90 transition-colors"
            >
              <img
                className="w-[26px] h-[29px] mr-2"
                alt={button.alt}
                src={button.icon}
              />

              <div className="flex flex-col items-start gap-[3.66px]">
                <span className="[font-family:'Geist',Helvetica] font-normal text-white text-[12.2px] tracking-[0] leading-[normal]">
                  {button.topText}
                </span>

                {button.bottomImage ? (
                  <img
                    className="w-[90.26px] h-[18.3px]"
                    alt="Google Play"
                    src={button.bottomImage}
                  />
                ) : (
                  <span className="[font-family:'Geist',Helvetica] font-medium text-white text-[21px] tracking-[-0.57px] leading-[21.0px] whitespace-nowrap">
                    {button.bottomText}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Phone mockup images */}
      <div className="mt-12 w-full max-w-5xl mx-auto animate-fade-in [--animation-delay:600ms] relative z-10">
        <div className="flex flex-row items-end justify-center gap-3 sm:gap-4 md:gap-6">
          {phoneImages.map((phone, index) => (
            <img
              key={index}
              className={`object-contain h-auto ${
                index === 1
                  ? "w-28 sm:w-32 md:w-48 lg:w-56"
                  : "w-24 sm:w-28 md:w-40 lg:w-48"
              }`}
              alt="Mockuuups free"
              src={phone.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
