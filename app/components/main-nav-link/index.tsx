"use client";

import {
  getHashFromHref,
  isEcosystemPillarId,
  isHomePagePath,
  type EcosystemPillarId,
} from "@/lib/ecosystem-navigation";
import { useEcosystemHighlight } from "@/lib/ecosystem-highlight-context";
import Link from "next/link";
import { JSX, MouseEvent, ReactNode } from "react";

type MainNavLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
};

export function MainNavLink({
  href,
  className,
  children,
  onNavigate,
}: MainNavLinkProps): JSX.Element {
  const highlight = useEcosystemHighlight();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const hash = getHashFromHref(href);
    if (!hash || !isEcosystemPillarId(hash)) return;
    if (!isHomePagePath(window.location.pathname) || !highlight) return;

    event.preventDefault();
    highlight.navigateToPillar(hash as EcosystemPillarId);
    onNavigate?.();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
