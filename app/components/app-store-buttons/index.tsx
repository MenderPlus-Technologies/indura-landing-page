import Image from "next/image";
import { JSX } from "react";

const appStoreButtons = [
  {
    id: "appstore",
    icon: "/Apple.svg",
    iconAlt: "Apple App Store",
    topText: "Download on the",
    bottomText: "App Store",
  },
  {
    id: "playstore",
    icon: "/Playstore.svg",
    iconAlt: "Google Play Store",
    topText: "GET IT ON",
    bottomText: "Google Play",
  },
];

export const AppStoreButtons = (): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row gap-2.5 w-full">
      {appStoreButtons.map((button) => (
        <div
          key={button.id}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#dfe1e6] bg-[#0d0d12] px-3 py-2.5 text-white transition-colors hover:border-[#009688]"
        >
          <Image
            src={button.icon}
            alt={button.iconAlt}
            width={20}
            height={20}
            className="h-5 w-5 shrink-0"
          />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[9px] text-[#818898]">{button.topText}</span>
            <span className="text-[13px] font-semibold">{button.bottomText}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
