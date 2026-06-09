import { trustMetrics } from "@/lib/site-config";
import { JSX } from "react";

export const TrustBannerSection = (): JSX.Element => {
  return (
    <section className="plusJakarta border-y border-[#eceff3] bg-[#f7fffd] py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          {trustMetrics.map((metric) => (
            <div key={metric.label} className="flex flex-col items-center gap-1">
              <h3 className="text-4xl md:text-5xl font-semibold text-[#009688]">
                {metric.value}
              </h3>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] text-[#666d80]">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
