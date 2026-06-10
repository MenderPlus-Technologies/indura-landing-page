import {
  INDURA_PRIVACY_POLICY_URL,
  INDURA_TERMS_AND_SERVICE_URL,
} from "@/lib/indura-legal-links";

export const WAITLIST_FORM_URL = "https://forms.gle/jZpee78KBPccwMBp6";

export const BRAND = {
  primary: "#009688",
  primaryHover: "#00897b",
  heading: "#0d0d12",
  body: "#666d80",
  muted: "#818898",
  surface: "#ffffff",
  surfaceMuted: "#f7fffd",
  border: "#dfe1e6",
  cardBorder: "#eceff3",
} as const;

export const mainNavItems = [
  { label: "For The Consumer", href: "/#consumer" },
  { label: "Health Providers", href: "/#providers" },
  { label: "Institutional Desk", href: "/#institutions" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export const socialLinks = [
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

export const footerPlatformLinks = [
  { name: "Consumer Wallet", href: "/#consumer" },
  { name: "Health Providers Terminal", href: "/#providers" },
  { name: "Institutional Dashboard", href: "/#institutions" },
];

export const footerResourceLinks = [
  { name: "Blog & Updates", href: "/blog" },
  { name: "FAQs", href: "/#faq" },
  { name: "Contact Us", href: "/contact" },
];

export const footerCompanyLinks = [
  { name: "Become a Provider", href: "/become-a-provider" },
  { name: "Join Waitlist", href: "/#join-waiting-list" },
  {
    name: "Privacy Policy",
    href: INDURA_PRIVACY_POLICY_URL,
    external: true,
  },
  {
    name: "Terms & Conditions",
    href: INDURA_TERMS_AND_SERVICE_URL,
    external: true,
  },
];

export const trustMetrics = [
  { value: "100%", label: "Digital Audit Trail" },
  { value: "T+0", label: "Instant Provider Settlement" },
  { value: "0%", label: "Capital Leakage on Grants" },
];

export const ecosystemPillars = [
  {
    id: "consumer",
    icon: "user-shield" as const,
    title: "For The Consumer",
    description:
      "Stop sending cash that gets lost to everyday expenses. Pre-fund digital medical wallets for yourself or your family. Funds are cryptographically locked and can only be spent at verified health providers.",
    ctaLabel: "Join Waitlist",
    ctaHref: "/#join-waiting-list",
    showAppStoreButtons: true,
  },
  {
    id: "providers",
    icon: "hospital" as const,
    title: "Health Providers",
    description:
      "End the 60-day wait for HMO payouts. Indura provides health providers with a digital checkout terminal that bypasses broken retail banking. Verify patient identity (NIN) and receive instant, point-of-care settlement to keep operations running.",
    ctaLabel: "Become a Provider",
    ctaHref: "/become-a-provider",
    showAppStoreButtons: false,
  },
  {
    id: "institutions",
    icon: "building" as const,
    title: "For Institutions",
    description:
      "Deploy block grants and donor capital with absolute precision. Our enterprise dashboard allows global charities to fund specific treatments and track every dollar in real-time. Capital is only released when a verified patient receives care.",
    ctaLabel: "Contact Institutional Desk",
    ctaHref: "/contact",
    showAppStoreButtons: false,
  },
];

export const infrastructureFeatures = [
  {
    icon: "lock" as const,
    title: "Hard-Locked Intent",
    description:
      "Money entered into the Indura ledger cannot be spent on non-essentials. We guarantee that capital serves its designated medical purpose.",
  },
  {
    icon: "heart-pulse" as const,
    title: "Accessible Healthcare",
    description:
      "Healthcare should be accessible to everyone. We are building the foundational infrastructure ensuring that medical payments and savings are barrier-free for all patients.",
  },
  {
    icon: "fingerprint" as const,
    title: "Instant Verification",
    description:
      "Real-time API integration with National Identity Numbers (NIN) prevents fraud and ensures the right patient receives the correct care.",
  },
  {
    icon: "shield" as const,
    title: "Treasury-Grade Security",
    description:
      "Built on public-company standard compliance, securing both private out-of-pocket savings and multilateral donor block capital.",
  },
];
