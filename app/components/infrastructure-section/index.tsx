import { infrastructureFeatures } from "@/lib/site-config";
import {
  Fingerprint,
  HeartPulse,
  Lock,
  Shield,
} from "lucide-react";
import { JSX } from "react";

const featureIcons = {
  lock: Lock,
  "heart-pulse": HeartPulse,
  fingerprint: Fingerprint,
  shield: Shield,
};

export const InfrastructureSection = (): JSX.Element => {
  return (
    <section className="plusJakarta py-16 md:py-24 lg:py-28 bg-[#f7fffd]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight">
            Built for the Realities of Healthcare.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {infrastructureFeatures.map((feature) => {
            const Icon = featureIcons[feature.icon];

            return (
              <article
                key={feature.title}
                className="flex gap-6 rounded-lg border border-[#eceff3] bg-white p-8 md:p-10"
              >
                <Icon
                  className="h-8 w-8 shrink-0 text-[#009688] mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <h3 className="text-[#0d0d12] text-lg md:text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#666d80] text-sm md:text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
