"use client";

import { ecosystemPillars } from "@/lib/site-config";
import { useEcosystemHighlight } from "@/lib/ecosystem-highlight-context";
import { cn } from "@/lib/utils";
import { Building2, Hospital, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";
import { AppStoreButtons } from "../app-store-buttons";

const pillarIcons = {
  "user-shield": ShieldCheck,
  hospital: Hospital,
  building: Building2,
};

export const EcosystemSection = (): JSX.Element => {
  const highlight = useEcosystemHighlight();

  return (
    <section className="ecosystem-section plusJakarta py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16">
        <div className="text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          <h2 className="text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight mb-4">
            One Unified Ledger.
            <br />
            Three Dedicated Access Points.
          </h2>
          <p className="text-[#666d80] text-sm sm:text-base md:text-lg leading-relaxed">
            We have redesigned the way money moves in medicine. Whether you are
            saving for personal care, running a health facility, or deploying
            millions in global aid, Indura guarantees capital is locked to health
            intent.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {ecosystemPillars.map((pillar) => {
            const Icon = pillarIcons[pillar.icon];
            const isActive = highlight?.activePillarId === pillar.id;
            const isPopping = highlight?.poppingPillarId === pillar.id;

            return (
              <article
                key={pillar.id}
                id={pillar.id}
                className={cn(
                  "ecosystem-card flex flex-col rounded-b-lg border border-[#eceff3] border-t-4 border-t-[#009688] bg-white p-8 md:p-10 shadow-[0px_2px_8px_-1px_#0d0d120a] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-md scroll-mt-28",
                  isActive && "ecosystem-card--active",
                  isPopping && "ecosystem-card--pop"
                )}
              >
                <Icon className="h-10 w-10 text-[#009688] mb-6" strokeWidth={1.5} />
                <h3 className="text-[#0d0d12] text-xl md:text-2xl font-semibold mb-4">
                  {pillar.title}
                </h3>
                <p className="text-[#666d80] text-sm md:text-base leading-relaxed grow mb-8">
                  {pillar.description}
                </p>
                <div className="mt-auto space-y-4">
                  {pillar.showAppStoreButtons && <AppStoreButtons />}
                  <Link
                    href={pillar.ctaHref}
                    className="flex w-full items-center justify-center rounded-md border-2 border-[#009688] px-6 py-3 text-sm font-semibold text-[#009688] hover:bg-[#009688]/5 transition-colors"
                  >
                    {pillar.ctaLabel}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
