import type { Metadata } from "next";
import { MarketingHtml } from "@/components/marketing/html";

export const metadata: Metadata = {
  title: "Indura Health · Privacy Policy",
  description:
    "Indura Health is the financial operating system for healthcare in Africa. Save for care, pay verified providers instantly, and fund treatment you can see.",
};

export default function PrivacyPage() {
  return <MarketingHtml name="privacy" />;
}
