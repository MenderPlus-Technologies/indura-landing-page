import { Card, CardContent } from "@/components/ui/card";
import { JSX } from "react";

const features = [
  {
    icon: "/icon-1.svg",
    title: "Save Smarter for Your Healthcare.",
    description:
      "Indura's AI helps you prepare for real-life health costs—routine visits, meds, emergencies—without the stress.",
    image: "url(..//img.png)",
  },
  {
    icon: "/icon.svg",
    title: "Nearby Care Finder",
    description:
      "Locate facilities that accept Indura, check opening hours and services, then get directions. Save favorites for next time.",
    image: "url(..//img-1.png)",
  },
  {
    icon: "/icon-2.svg",
    title: "Pay in Seconds, Ease And Comfort In Your Fingers.",
    description:
      "Use QR, USSD, or the Idura app to pay at the counter. Providers see instant confirmation; you get instant receipts.",
    image: "url(..//img-2.png)",
  },
  {
    icon: "/icon-3.svg",
    title: "Personalized Health Spend Insights",
    description:
      "See where your health money goes and what's likely next month. Idura suggests how much to set aside to stay prepared.",
    image: "url(..//img-3.png)",
  },
];

export const FeatureHighlightsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-start px-0 py-[90px] w-full bg-shadeswhite overflow-hidden">
      <div className="flex flex-col items-start gap-[90px] px-[90px] py-0 w-full">
        <div className="flex items-start gap-[90px] w-full">
          <h2 className="flex-1 mt-[-0.90px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-500 text-[43.2px] tracking-[-0.86px] leading-[55.8px]">
            Smarter Money For Healthcare
          </h2>

          <p className="flex-1 mt-[-0.90px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-neutral-400 text-[21.6px] tracking-[-0.43px] leading-[27.9px]">
            Create goals, build an emergency buffer, and pay confidently. Get
            instant confirmations, receipts, and helpful spending insights.
          </p>
        </div>

        <div className="flex items-start gap-[90px] w-full">
          <div className="flex flex-col items-start gap-9 flex-1">
            {features.slice(0, 2).map((feature, index) => (
              <Card
                key={index}
                className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 w-full"
              >
                <CardContent className="flex flex-col items-center gap-[54px] pt-9 pb-0 px-[28.8px]">
                  <div className="flex items-start gap-[28.8px] w-full">
                    <img
                      className="w-9 h-9 flex-shrink-0"
                      alt="Icon"
                      src={feature.icon}
                    />

                    <div className="flex flex-col items-start gap-[11.7px] flex-1">
                      <h3 className="w-full mt-[-0.90px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-500 text-[21.6px] tracking-[-0.43px] leading-[27.9px]">
                        {feature.title}
                      </h3>

                      <p className="w-full [font-family:'Inter',Helvetica] font-normal text-neutral-300 text-[16.2px] tracking-[-0.32px] leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="inline-flex flex-col items-start gap-[9px]"
                    style={{
                      background: `${feature.image} 50% 50% / cover, linear-gradient(0deg, rgba(0,150,136,1) 0%, rgba(0,150,136,1) 100%)`,
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-start gap-9 flex-1 pt-[54px]">
            {features.slice(2, 4).map((feature, index) => (
              <Card
                key={index}
                className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 w-full"
              >
                <CardContent className="flex flex-col items-center gap-[54px] pt-9 pb-0 px-[28.8px]">
                  <div className="flex items-start gap-[28.8px] w-full">
                    <img
                      className="w-9 h-9 flex-shrink-0"
                      alt="Icon"
                      src={feature.icon}
                    />

                    <div className="flex flex-col items-start gap-[11.7px] flex-1">
                      <h3 className="w-full mt-[-0.90px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-neutral-500 text-[21.6px] tracking-[-0.43px] leading-[27.9px]">
                        {feature.title}
                      </h3>

                      <p className="w-full [font-family:'Inter',Helvetica] font-normal text-neutral-300 text-[16.2px] tracking-[-0.32px] leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="inline-flex flex-col items-start gap-[9px]"
                    style={{
                      background: `${feature.image} 50% 50% / cover, linear-gradient(0deg, rgba(0,150,136,1) 0%, rgba(0,150,136,1) 100%)`,
                    }}
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
