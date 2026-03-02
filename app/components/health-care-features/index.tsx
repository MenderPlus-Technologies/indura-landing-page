import { Card, CardContent } from "@/components/ui/card";
import type { CSSProperties, JSX } from "react";

const featuresData = [
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/icon.svg",
    title: "Save Smarter for Your Healthcare.",
    description:
      "Indura's AI helps you prepare for real-life health costs—routine visits, meds, emergencies—without the stress.",
    image: "https://c.animaapp.com/mm8xgcl4CkUVff/img/img.png",
    delay: "200ms",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/icon-2.svg",
    title: "Nearby Care Finder",
    description:
      "Locate facilities that accept Indura, check opening hours and services, then get directions. Save favorites for next time.",
    image: "https://c.animaapp.com/mm8xgcl4CkUVff/img/img-1.png",
    delay: "400ms",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/icon-1.svg",
    title: "Pay in Seconds, Ease And Comfort In Your Fingers.",
    description:
      "Use QR, USSD, or the Idura app to pay at the counter. Providers see instant confirmation; you get instant receipts.",
    image: "https://c.animaapp.com/mm8xgcl4CkUVff/img/img-2.png",
    delay: "600ms",
  },
  {
    icon: "https://c.animaapp.com/mm8xgcl4CkUVff/img/icon-3.svg",
    title: "Personalized Health Spend Insights",
    description:
      "See where your health money goes and what's likely next month. Idura suggests how much to set aside to stay prepared.",
    image: "https://c.animaapp.com/mm8xgcl4CkUVff/img/img-3.png",
    delay: "800ms",
  },
];

export const HealthcareFeaturesSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start px-4 md:px-[90px] py-12 md:py-[90px] w-full bg-shadeswhite">
      <div className="flex flex-col items-start gap-10 md:gap-[90px] w-full max-w-[1200px] mx-auto">
        <header className="flex flex-col lg:flex-row items-start gap-6 md:gap-10 lg:gap-[90px] w-full translate-y-[-1rem] animate-fade-in">
          <h2 className="flex-1 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#15181E] text-2xl sm:text-3xl md:text-[36px] lg:text-[43.2px] tracking-[-0.86px] leading-tight lg:leading-[55.8px]">
            Smarter Money For Healthcare
          </h2>

          <p className="flex-1 [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#535A73] text-base sm:text-lg md:text-[19px] lg:text-[21.6px] tracking-[-0.43px] leading-relaxed md:leading-[27.9px]">
            Create goals, build an emergency buffer, and pay confidently. Get
            instant confirmations, receipts, and helpful spending insights.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-[90px] w-full">
          <div className="flex flex-col gap-6 md:gap-9">
            {featuresData.slice(0, 2).map((feature, index) => (
              <Card
                key={index}
                className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 translate-y-[-1rem] animate-fade-in"
                style={
                  { "--animation-delay": feature.delay } as CSSProperties
                }
              >
                <CardContent className="flex flex-col items-center gap-8 md:gap-[54px] pt-6 md:pt-9 pb-0 px-4 md:px-[28.8px]">
                  <div className="flex items-start gap-4 md:gap-[28.8px] w-full">
                    <img
                      className="w-9 h-9 flex-shrink-0"
                      alt="Feature icon"
                      src={feature.icon}
                    />

                    <div className="flex flex-col items-start gap-3 md:gap-[11.7px] flex-1">
                      <h3 className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#15181E] text-lg md:text-[21.6px] tracking-[-0.43px] leading-snug md:leading-[27.9px]">
                        {feature.title}
                      </h3>

                      <p className="w-full [font-family:'Inter',Helvetica] font-normal text-[#747C9B] text-sm md:text-[16.2px] tracking-[-0.32px] leading-relaxed md:leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <img
                    className="w-full object-contain"
                    alt="Feature illustration"
                    src={feature.image}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:gap-9 pt-8 md:pt-[54px]">
            {featuresData.slice(2, 4).map((feature, index) => (
              <Card
                key={index}
                className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 translate-y-[-1rem] animate-fade-in"
                style={
                  { "--animation-delay": feature.delay } as CSSProperties
                }
              >
                <CardContent className="flex flex-col items-center gap-8 md:gap-[54px] pt-6 md:pt-9 pb-0 px-4 md:px-[28.8px]">
                  <div className="flex items-start gap-4 md:gap-[28.8px] w-full">
                    <img
                      className="w-9 h-9 flex-shrink-0"
                      alt="Feature icon"
                      src={feature.icon}
                    />

                    <div className="flex flex-col items-start gap-3 md:gap-[11.7px] flex-1">
                      <h3 className="w-full [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#15181E] text-lg md:text-[21.6px] tracking-[-0.43px] leading-snug md:leading-[27.9px]">
                        {feature.title}
                      </h3>

                      <p className="w-full [font-family:'Inter',Helvetica] font-normal text-[#747C9B] text-sm md:text-[16.2px] tracking-[-0.32px] leading-relaxed md:leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <img
                    className="w-full object-contain"
                    alt="Feature illustration"
                    src={feature.image}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
