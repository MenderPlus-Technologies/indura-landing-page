"use client";

import { EcosystemHighlightProvider } from "@/lib/ecosystem-highlight-context";
import { ReactNode } from "react";

export function HomePageShell({ children }: { children: ReactNode }) {
  return <EcosystemHighlightProvider>{children}</EcosystemHighlightProvider>;
}
