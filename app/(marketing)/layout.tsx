import type { Metadata } from "next";
import { MarketingShell } from "@/components/marketing/shell";
import "../marketing.css";

const description =
  "Indura Health is the financial operating system for healthcare in Africa. Save for care, pay verified providers instantly, and fund treatment you can see.";

export const metadata: Metadata = {
  title: {
    default: "Indura Health · Healthcare within reach",
    template: "%s",
  },
  description,
  openGraph: {
    title: "Indura Health · Healthcare within reach",
    description,
    siteName: "Indura Health",
  },
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MarketingShell>{children}</MarketingShell>;
}
