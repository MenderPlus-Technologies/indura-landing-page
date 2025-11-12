import { CopyrightIcon } from "lucide-react";
import { JSX } from "react";

const featuresLinks = [
  "Lorem ipsum dolor sit",
  "Lorem ipsum dolor sit",
  "Lorem ipsum dolor sit amet consectetur.",
];

const companyLinks = ["About Us", "Contact Us"];

export const FooterSection = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-start gap-[72px] px-[120px] py-20 w-full bg-white border-t border-[#dfe1e6]">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col w-[335.5px] items-start gap-4">
          <div className="flex w-[264px] items-center gap-2.5">
            <img className="w-7 h-7" alt="Logo" src="/logo.svg" />
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#0d0d12] text-2xl tracking-[0] leading-[31.2px] whitespace-nowrap">
              Indura
            </div>
          </div>
          <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-[#666d80] text-base leading-[25.6px] font-medium tracking-[0]">
            Lorem ipsum dolor sit amet consectetur. Tristique in nunc nulla
            volutpat sed vulputate vitae. Ipsum scelerisque eu orci neque quam
            sagittis pharetra pulvinar. Elit sed.
          </p>
        </div>

        <div className="inline-flex items-start gap-8">
          <div className="flex flex-col w-[183px] items-start gap-4">
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-greyscale-400 text-base leading-[25.6px] whitespace-nowrap font-medium tracking-[0]">
              Features
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              {featuresLinks.map((link, index) => (
                <div
                  key={index}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-greyscale-600 text-base tracking-[0] leading-[25.6px]"
                >
                  {link}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-[142px] items-start gap-4">
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-greyscale-400 text-base leading-[25.6px] whitespace-nowrap font-medium tracking-[0]">
              Company
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              {companyLinks.map((link, index) => (
                <div
                  key={index}
                  className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-greyscale-600 text-base tracking-[0] leading-[25.6px]"
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-10 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-1">
            <CopyrightIcon className="w-5 h-5 text-[#666d80]" />
            <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#666d80] text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
              2025 Indura. All right reserved
            </div>
          </div>

          <img alt="Social media icons" src="/frame-33830.svg" />
        </div>
      </div>
    </footer>
  );
};
