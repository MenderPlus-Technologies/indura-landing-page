import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const featuresLinks = [
  "Lorem ipsum dolor sit",
  "Lorem ipsum dolor sit",
  "Lorem ipsum dolor sit amet consectetur.",
];

const companyLinks = ["About Us", "Contact Us"];

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    image: "/akar-icons_facebook-fill.svg",
  },
  {
    name: "Instagram",
    href: "#",
    image: "/instagram-icon.svg",
  },
  {
    name: "LinkedIn",
    href: "#",
    image: "/akar-icons_linkedin-v2-fill.svg",
  },
];


export default function FooterSection() {
  return (
    <footer className="flex flex-col items-start gap-12 md:gap-16 lg:gap-[72px] px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[120px] py-12 md:py-16 lg:py-20 w-full bg-white border-t border-gray-200">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start justify-between w-full gap-8 lg:gap-4">
        {/* Logo and Description */}
        <div className="flex flex-col w-full lg:w-[335.5px] items-start gap-4">
          <div className="flex items-center w-20 h-20 sm:w-24 sm:h-24">
             <Image
                        src="/Logo.svg"
              alt="Logo"
              className="w-full h-full object-contain"
               width={500}
            height={500}
            priority

            />
          </div>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed font-medium">
            Lorem ipsum dolor sit amet consectetur. Tristique in nunc nulla
            volutpat sed vulputate vitae. Ipsum scelerisque eu orci neque quam
            sagittis pharetra pulvinar. Elit sed.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col sm:flex-row items-start gap-8 sm:gap-12 lg:gap-8 w-full lg:w-auto">
          {/* Features */}
          <div className="flex flex-col w-full sm:w-auto items-start gap-4">
            <div className="text-gray-700 text-sm sm:text-base font-medium">
              Features
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              {featuresLinks.map((link, index) => (
                <div
                  key={index}
                  className="font-medium text-gray-600 text-sm sm:text-base hover:text-gray-800 cursor-pointer transition-colors"
                >
                  {link}
                </div>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="flex flex-col w-full sm:w-auto items-start gap-4">
            <div className="text-gray-700 text-sm sm:text-base font-medium">
              Company
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              {companyLinks.map((link, index) => (
                <div
                  key={index}
                  className="font-medium text-gray-600 text-sm sm:text-base hover:text-gray-800 cursor-pointer transition-colors"
                >
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col items-start gap-6 md:gap-10 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-6 sm:gap-4">
          {/* Copyright */}
          <div className="inline-flex items-center gap-1">
            <Copyright className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            <div className="font-normal text-gray-500 text-sm sm:text-base whitespace-nowrap">
              2025 Indura. All right reserved
            </div>
          </div>

          {/* Social Links */}
         <div className="flex items-center justify-center gap-4 mb-8">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              className="hover:opacity-80 transition-opacity"
              aria-label={social.name}
            >
              <Image
                src={social.image}
                alt={`${social.name} icon`}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          ))}
        </div>
        </div>
      </div>
    </footer>
  );
}