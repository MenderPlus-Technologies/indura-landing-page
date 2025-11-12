import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX } from "react";

export const CallToActionFooterSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center plusJakarta pt-8 pb-12 md:pb-16 lg:pb-[88px] w-full">
      <div className="relative w-full overflow-hidden mx-0 md:mx-4 lg:mx-8 rounded-none">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/CTA.svg"
            alt="Gradient background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between lg:justify-start py-12 sm:py-16 md:py-20 lg:py-0">
          {/* Text Content */}
          <div className="flex flex-col items-start justify-center gap-4 flex-1 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[122px] lg:py-12 xl:py-16">
            <div className="flex flex-col items-start justify-center gap-3 md:gap-4">
              <h2 className="text-white lg:w-[800px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] leading-tight md:leading-[1.2] lg:leading-20 font-medium tracking-[0]">
                Activate Indura at Your Health Facility. Get Paid, Reconcile, Relax
              </h2>

              <p className="max-w-[601px] font-normal text-white text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px]">
                Live transactions • Clean statements • Sandbox available
              </p>
            </div>

            <div className="inline-flex gap-4 items-center mt-2">
              <Button className="h-12 md:h-[52px] justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white rounded-xl border border-solid border-[#dfe1e6] font-semibold text-[#009688] text-sm md:text-base tracking-[0] leading-[24.8px] hover:bg-white/90">
                Get Early Access
              </Button>
            </div>
          </div>

          {/* Image Content - Now extends full height */}
          <div className="relative w-full lg:block hidden lg:w-[550px] xl:w-[600px] shrink-0 h-80 lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:pr-12 xl:pr-24">
            <Image
              src="/african-american-medical-doctor-man 1.svg"
              alt="Health facility illustration"
              fill
              className="object-contain lg:object-cover lg:object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};