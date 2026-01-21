"use client";
import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export const MinimalNavbar = (): JSX.Element => {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 plusJakarta sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 sm:px-8 lg:px-10 xl:px-16 max-w-7xl mx-auto h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="https://res.cloudinary.com/dcxdrsgjs/image/upload/v1762925839/Group_phh0r8.svg"
            alt="Indura Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
            priority
          />
          <p className="text-[#009688] font-bold text-lg sm:text-xl">Indura</p>
        </Link>

        {/* Back to Home Link */}
        <Link
          href="/"
          className="text-[#666d80] text-sm sm:text-base font-medium hover:text-[#009688] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </nav>
  );
};
