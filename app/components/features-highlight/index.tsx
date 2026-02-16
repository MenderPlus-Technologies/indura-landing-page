import { Card, CardContent } from "@/components/ui/card";
import { JSX } from "react";

const features = [
  {
    icon: "/Icon (1).svg",
    title: "Save Smarter for Your Healthcare.",
    description: "Indura's AI helps you prepare for real-life health costs—routine visits, meds, emergencies—without the stress.",
    mobileImage: "https://res.cloudinary.com/dcxdrsgjs/image/upload/v1764952777/Img_e59jj4.png",
    desktopImage: "/Img.svg", // Add your desktop image URL
  },
  {
    icon: "/Icon (2).svg",
    title: "Nearby Care Finder",
    description: "Locate facilities that accept Indura, check opening hours and services, then get directions. Save favorites for next time.",
    mobileImage: "https://res.cloudinary.com/dcxdrsgjs/image/upload/v1764953077/Img_2_m4bumr.png",
    desktopImage: "/Img (3).svg", // Add your desktop image URL
  },
  {
    icon: "/Icon Finance.svg",
    title: "Pay in Seconds, Ease And Comfort In Your Fingers.",
    description: "Use QR, or the Indura app to pay at the counter. Providers see instant confirmation; you get instant receipts.",
    mobileImage: "https://res.cloudinary.com/dcxdrsgjs/image/upload/v1764952853/Img_1_i5pzdx.png",
    desktopImage: "/Img (1).svg", // Add your desktop image URL
  },
  {
    icon: "/Icon (3).svg",
    title: "Personalized Health Spend Insights",
    description: "See where your health money goes and what's likely next month. Indura suggests how much to set aside to stay prepared.",
    mobileImage: "https://res.cloudinary.com/dcxdrsgjs/image/upload/v1764953163/Img_3_gv4roc.png",
    desktopImage: "/health-insights.svg", // Add your desktop image URL
  },
];

export const FeatureHighlightsSection = (): JSX.Element => {
  return (
    <section className="plusJakarta flex flex-col items-start px-0 py-12 sm:py-16 md:py-20 lg:py-[90px] w-full bg-shadeswhite overflow-hidden transform-gpu">
      <div className="flex flex-col items-start gap-12 md:gap-16 lg:gap-[90px] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[90px] py-0 w-full">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[90px] w-full">
          <h2 className="flex-1 mt-[-0.90px] font-normal text-[#15181E] text-2xl sm:text-3xl md:text-4xl lg:text-[43.2px] tracking-[-0.86px] leading-tight lg:leading-[55.8px]">
            Smarter Money For Healthcare
          </h2>
          <p className="flex-1 mt-[-0.90px] font-normal text-[#535A73] text-base sm:text-lg md:text-xl lg:text-[21.6px] tracking-[-0.43px] leading-relaxed lg:leading-[27.9px]">
            Create goals, build an emergency buffer, and pay confidently. Get instant confirmations, receipts, and helpful spending insights.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[90px] w-full">
          <div className="flex flex-col items-start gap-6 md:gap-9 flex-1 w-full">
            {features.slice(0, 2).map((feature, index) => (
              <Card key={index} className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 w-full">
                <CardContent className="flex flex-col items-center gap-8 md:gap-[54px] pt-6 md:pt-9 pb-0 px-4 sm:px-6 md:px-[28.8px]">
                  <div className="flex items-start gap-4 md:gap-[28.8px] w-full">
                    <img className="w-8 h-8 md:w-9 md:h-9 shrink-0" alt="Icon" src={feature.icon} loading="eager" decoding="async" />
                    <div className="flex flex-col items-start gap-2 md:gap-[11.7px] flex-1">
                      <h3 className="w-full mt-[-0.90px] font-semibold text-[#15181E] text-lg sm:text-xl md:text-[21.6px] tracking-[-0.43px] leading-tight md:leading-[27.9px]">
                        {feature.title}
                      </h3>
                      <p className="w-full font-normal text-[#747C9B] text-sm sm:text-base md:text-[16.2px] tracking-[-0.32px] leading-relaxed md:leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile/Tablet Image */}
                  <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:hidden rounded-t-[3.6px] overflow-hidden">
                    <img src={feature.mobileImage} alt={feature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  
                  {/* Desktop Image */}
                  <div className="relative w-full h-[500px] xl:h-[600px] hidden lg:block rounded-t-[3.6px] overflow-hidden">
                    <img src={feature.desktopImage} alt={feature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col items-start gap-6 md:gap-9 flex-1 w-full lg:pt-[54px]">
            {features.slice(2, 4).map((feature, index) => (
              <Card key={index} className="bg-[#d9fffb] rounded-[3.6px] overflow-hidden border-0 w-full">
                <CardContent className="flex flex-col items-center gap-8 md:gap-[54px] pt-6 md:pt-9 pb-0 px-4 sm:px-6 md:px-[28.8px]">
                  <div className="flex items-start gap-4 md:gap-[28.8px] w-full">
                    <img className="w-8 h-8 md:w-9 md:h-9 shrink-0" alt="Icon" src={feature.icon} loading="eager" decoding="async" />
                    <div className="flex flex-col items-start gap-2 md:gap-[11.7px] flex-1">
                      <h3 className="w-full mt-[-0.90px] font-semibold text-[#15181E] text-lg sm:text-xl md:text-[21.6px] tracking-[-0.43px] leading-tight md:leading-[27.9px]">
                        {feature.title}
                      </h3>
                      <p className="w-full font-normal text-[#747C9B] text-sm sm:text-base md:text-[16.2px] tracking-[-0.32px] leading-relaxed md:leading-[20.7px]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Mobile/Tablet Image */}
                  <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px] lg:hidden rounded-t-[3.6px] overflow-hidden">
                    <img src={feature.mobileImage} alt={feature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                  
                  {/* Desktop Image */}
                  <div className="relative w-full h-[500px] xl:h-[600px] hidden lg:block rounded-t-[3.6px] overflow-hidden">
                    <img src={feature.desktopImage} alt={feature.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};