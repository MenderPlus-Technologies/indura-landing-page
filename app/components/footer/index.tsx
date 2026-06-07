import { Copyright } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  INDURA_PRIVACY_POLICY_URL,
  INDURA_TERMS_AND_SERVICE_URL,
} from "@/lib/indura-legal-links";

const featuresLinks = [
  { name: "Health Savings Wallet", href: "/#features" },
  { name: "AI Health Assistant", href: "/#features" },
  { name: "Find Providers", href: "/#providers" },
];

const companyLinks = [
  { name: "About Us", href: "/" },
  { name: "Providers", href: "/become-a-provider" },
  { name: "FAQs", href: "/#faq" },
  { name: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { name: "Privacy Policy", href: INDURA_PRIVACY_POLICY_URL, external: true },
  { name: "Terms & Conditions", href: INDURA_TERMS_AND_SERVICE_URL, external: true },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/useindura?igsh=N3UyYWdhc2xkd3Z4",
    image: "/instagram-icon.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/showcase/indurahealth/",
    image: "/akar-icons_linkedin-v2-fill.svg",
  },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string; external?: boolean }[];
}) {
  return (
    <div className="flex flex-col gap-3 min-w-[140px]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gray-400">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.name}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-gray-600 hover:text-[#009688] transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#009688] transition-colors"
              >
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FooterSection() {
  return (
    <footer className="plusJakarta w-full bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-10 xl:px-16 py-12 md:py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16 lg:justify-between">
          {/* Brand */}
          <div className="flex flex-col gap-4 lg:max-w-[320px] shrink-0">
            <Link href="/" className="inline-flex items-center gap-2 w-fit hover:opacity-90 transition-opacity">
              <Image
                src="https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg"
                alt="Indura"
                width={40}
                height={40}
                className="h-9 w-9 sm:h-10 sm:w-10"
                priority
              />
              <span className="text-[#009688] font-bold text-xl">Indura</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 font-medium">
              The AI-powered health fintech platform that helps you save for care, pay
              seamlessly at supported facilities, and verify with a universal Health ID
              built for Africa — online or offline.
            </p>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 sm:gap-12 lg:gap-14 flex-1 lg:justify-end">
            <FooterLinkColumn title="Features" links={featuresLinks} />
            <FooterLinkColumn title="Company" links={companyLinks} />
            <FooterLinkColumn title="Legal" links={legalLinks} />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Copyright className="w-4 h-4 shrink-0" aria-hidden />
            <p className="text-sm">
              {new Date().getFullYear()} Indura. All rights reserved.
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
