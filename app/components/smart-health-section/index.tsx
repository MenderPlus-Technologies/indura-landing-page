import { Card, CardContent } from "@/components/ui/card";
import type { CSSProperties, JSX } from "react";

const features = [
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/bar-chart-10.svg",
    alt: "Bar chart",
    title: "AI Savings Coach",
    description:
      "Let Indura's AI suggest health-first goals, automate contributions, and keep you on track with smart nudges.",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/database-01.svg",
    alt: "Database",
    title: "Effortless Payments",
    description:
      "Pay at clinics, pharmacies, and labs via QR, USSD, or in-app with instant confirmations and receipts.",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/server-01.svg",
    alt: "Server",
    title: "Universal Health ID",
    description:
      "Your portable Indura ID for fast check-ins and payment history, share only what you choose, when you choose.",
  },
];

export const SmartHealthFinanceOverviewSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-12 md:gap-16 px-4 py-16 md:py-[88px] md:px-[120px] w-full">
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[980px] translate-y-[-1rem] animate-fade-in">
        <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-lg text-center tracking-[0] leading-[27.9px]">
          Overview
        </div>

        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#0d0d12] text-2xl sm:text-3xl md:text-4xl lg:text-[52px] text-center leading-tight md:leading-[44px] lg:leading-[65px] font-medium tracking-[0]">
          Smart Health Finance Solutions Using AI
        </h2>

        <p className="max-w-[720px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#666d80] text-sm sm:text-base md:text-lg text-center tracking-[0] leading-relaxed md:leading-[27.9px]">
          Indura unifies savings, payments, and identity so people can access
          care and providers get paid; simply and securely.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1200px]">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="flex flex-col items-start gap-6 border-0 shadow-none translate-y-[-1rem] animate-fade-in"
            style={
              {
                "--animation-delay": `${(index + 1) * 200}ms`,
              } as CSSProperties
            }
          >
            <CardContent className="flex flex-col items-start gap-6 p-0 w-full">
              <div className="inline-flex items-center justify-center gap-2 p-2.5 bg-white rounded-[10px] border border-solid border-[#eceff3] shadow-[0px_2px_4px_#0d0d1226]">
                <img className="w-6 h-6" alt={feature.alt} src={feature.icon} />
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <h3 className="w-full [font-family:'Inter',Helvetica] text-lg tracking-[-0.36px] leading-[27px] font-medium text-[#0d0d12]">
                  {feature.title}
                </h3>

                <p className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#666d80] text-base tracking-[0] leading-[25.6px]">
                  {feature.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
