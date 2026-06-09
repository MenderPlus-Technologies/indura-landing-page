"use client";

import {
  getHashFromHref,
  isEcosystemPillarId,
  isHomePagePath,
  type EcosystemPillarId,
} from "@/lib/ecosystem-navigation";
import { useEcosystemHighlight } from "@/lib/ecosystem-highlight-context";
import Link from "next/link";
import { ComponentProps, JSX, MouseEvent } from "react";

type EcosystemHashLinkProps = ComponentProps<typeof Link> & {
  onNavigate?: () => void;
};

export function EcosystemHashLink({
  href,
  onClick,
  onNavigate,
  children,
  ...props
}: EcosystemHashLinkProps): JSX.Element {
  const highlight = useEcosystemHighlight();
  const hrefString = typeof href === "string" ? href : String(href);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    const hash = getHashFromHref(hrefString);
    if (!hash || !isEcosystemPillarId(hash)) return;
    if (!isHomePagePath(window.location.pathname) || !highlight) return;

    event.preventDefault();
    highlight.navigateToPillar(hash as EcosystemPillarId);
    onNavigate?.();
  };

  return (
    <Link href={href} {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
