import { Copyright } from "lucide-react";
import {
  footerCompanyLinks,
  footerPlatformLinks,
  footerResourceLinks,
  socialLinks,
} from "@/lib/site-config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FooterLinkColumn } from "./footer-link-column";

export default function FooterSection() {
  return (
    <footer className="plusJakarta w-full bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12">
          <div className="flex flex-col gap-4 lg:max-w-[320px]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 w-fit hover:opacity-90 transition-opacity"
            >
              <Image
                src="https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg"
                alt="Indura Health"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-10 sm:w-10"
                priority
              />
              <span className="text-[#009688] font-bold text-xl">Indura</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 font-medium">
              The dedicated financial operating system connecting patients, health
              providers, and global health capital.
            </p>
            <p className="text-xs font-medium text-[#009688]">
              Powered by Mender Plus Technologies.
            </p>
          </div>

          <FooterLinkColumn title="Platform" links={footerPlatformLinks} />
          <FooterLinkColumn title="Resources" links={footerResourceLinks} />
          <FooterLinkColumn title="Company & Legal" links={footerCompanyLinks} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Copyright className="w-4 h-4 shrink-0" aria-hidden />
            <p className="text-sm">
              {new Date().getFullYear()} Indura Health. All rights reserved. Abuja,
              Federal Capital Territory, Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:justify-end">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="rounded-lg p-1.5 text-gray-500 hover:text-[#009688] hover:bg-[#f7fffd] transition-colors"
                aria-label={social.name}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.image}
                  alt=""
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] opacity-90"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
