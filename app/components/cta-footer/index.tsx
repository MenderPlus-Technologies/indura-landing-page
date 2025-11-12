import { Button } from "@/components/ui/button";
import { JSX } from "react";

export const CallToActionFooterSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[72px] pt-8 pb-[88px] px-0 w-full">
      <div className="flex flex-col items-start justify-center gap-8 pl-[122px] pr-0 py-20 bg-[linear-gradient(135deg,rgba(58,144,136,1)_0%,rgba(0,150,136,1)_100%)] relative w-full">
        <img
          className="absolute top-0 left-0 w-[1440px] h-[457px]"
          alt="Gradient cta"
          src="/gradient-cta.png"
        />

        <div className="flex flex-col w-[904px] items-start justify-center gap-4 relative">
          <h2 className="w-[862px] mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] text-white text-[68px] leading-[85px] font-medium tracking-[0]">
            Activate Indura at Your Health Facility. Get Paid, Reconcile, Relax
          </h2>

          <p className="w-[601px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-white text-lg tracking-[0] leading-[27.9px]">
            Live transactions • Clean statements • Sandbox available
          </p>
        </div>

        <div className="inline-flex gap-4 items-center relative">
          <Button className="h-[52px] justify-center gap-2 p-4 bg-white rounded-xl border border-solid border-[#dfe1e6] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-base tracking-[0] leading-[24.8px] hover:bg-white/90">
            Get Early Access
          </Button>
        </div>
      </div>
    </section>
  );
};
