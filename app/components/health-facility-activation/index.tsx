import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX } from "react";

export const HealthFacilityActivationSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[72px] pt-8 pb-[88px] px-0 w-full">
      <div className="flex flex-col items-start justify-center gap-0 pl-8 md:pl-[122px] pr-0 py-20 bg-[linear-gradient(135deg,rgba(58,144,136,1)_0%,rgba(0,150,136,1)_100%)] w-full relative overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Gradient cta"
          src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient-cta.png"
        />

        <div className="flex flex-col max-w-[904px] items-start justify-center gap-4 relative z-10 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <h2 className="max-w-[862px] [font-family:'Plus_Jakarta_Sans',Helvetica] text-white text-3xl sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[68px] leading-tight md:leading-[56px] lg:leading-[64px] xl:leading-[85px] font-medium tracking-[0]">
            Activate Indura at Your Health Facility. Get Paid, Reconcile, Relax
          </h2>

          <p className="max-w-[601px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-sm sm:text-base md:text-lg tracking-[0] leading-relaxed md:leading-[27.9px]">
            Live transactions • Clean statements • Sandbox available
          </p>
        </div>

        <div className="inline-flex gap-4 items-center relative z-10 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
          {/* <Button className="h-auto justify-center gap-2 p-4 bg-white rounded-xl border border-solid border-[#dfe1e6] hover:bg-white/90 transition-colors">
            <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-base tracking-[0] leading-[24.8px] whitespace-nowrap">
              Get Early Access
            </span>
          </Button> */}
        </div>

        {/* Illustration image (matches CTA footer section) */}
        <div className="relative w-full  lg:block hidden lg:w-[500px] xl:w-[600px] shrink-0 h-80 lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:pr-12 xl:pr-24 transform-gpu">
              <Image
                src="/african-american-medical-doctor-man 1.svg"
                alt="Health facility illustration"
                fill
                className="object-contain lg:object-cover lg:object-right"
                priority
                sizes="(max-width: 1024px) 0px, 500px"
              />
            </div>
      </div>
    </section>
  );
};