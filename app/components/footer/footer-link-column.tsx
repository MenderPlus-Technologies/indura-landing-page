"use client";

import { EcosystemHashLink } from "@/app/components/ecosystem-hash-link";
import { getHashFromHref } from "@/lib/ecosystem-navigation";
import Link from "next/link";
import { JSX } from "react";

export function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { name: string; href: string; external?: boolean }[];
}): JSX.Element {
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
            ) : getHashFromHref(link.href) ? (
              <EcosystemHashLink
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#009688] transition-colors"
              >
                {link.name}
              </EcosystemHashLink>
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
