import FooterSection from "../components/footer";
import { NavigationMenuSection } from "../components/navbar";
import {
  Clock,
  Database,
  FileText,
  Globe2,
  LockKeyhole,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

const policyHighlights = [
  {
    icon: ShieldCheck,
    title: "NDPA aligned",
    description:
      "Built around the Nigeria Data Protection Act 2023 and NDPC expectations.",
  },
  {
    icon: LockKeyhole,
    title: "Sensitive data protected",
    description:
      "Health, wallet, and identity data are treated as high-risk information.",
  },
  {
    icon: UserCheck,
    title: "Your rights respected",
    description:
      "You can request access, correction, deletion, portability, or withdrawal of consent.",
  },
];

const sections = [
  {
    id: "scope",
    title: "1. Introduction and Scope",
    body: [
      "Indura Health provides a closed-loop healthcare financial ecosystem designed to support medical savings, community crowdfunding, diaspora health remittances, and digital pharmacy fulfillment.",
      "Because Indura operates at the intersection of healthcare and financial technology, we process sensitive data. This policy explains how we collect, use, store, protect, and share personal, financial, and medical information in compliance with the Nigeria Data Protection Act (NDPA) 2023 and the Nigeria Data Protection Commission (NDPC).",
      "By registering for an Indura Health account, funding a Health Wallet, or using our fulfillment services, you consent to the practices described in this policy.",
    ],
  },
  {
    id: "controller",
    title: "2. The Data Controller",
    body: [
      "For the purposes of the NDPA, Indura Health acts as the Data Controller for personal data collected through our platform. We determine the purposes and means of processing your personal data.",
    ],
  },
  {
    id: "data-collected",
    title: "3. Categories of Data We Collect",
    body: [
      "Non-sensitive personal data may include identity data such as full legal name, date of birth, gender, and government-issued identification numbers required for KYC and AML compliance.",
      "We may also collect contact data, including email address, mobile phone number, and physical delivery address, as well as technical and usage data such as IP address, device type, operating system, interaction logs, login timestamps, and geolocation data.",
      "Sensitive personal data may include Health Wallet balances, deposit histories, transaction logs, prescription details, chronic care medication schedules, pharmacy purchase history, hospital billing invoices paid through Indura, and medical campaign details where you use community crowdfunding features.",
      "Indura uses Flutterwave as core payment infrastructure. We do not store raw credit or debit card numbers on our local servers; payment details are tokenized and processed securely by our PCI-DSS compliant partner.",
    ],
  },
  {
    id: "collection-methods",
    title: "4. How We Collect Your Data",
    body: [
      "We collect data directly from you when you create an account, complete your KYC profile, upload a prescription, or initiate a crowdfunding campaign.",
      "We may receive data from third parties, including payment gateways to confirm wallet funding and healthcare providers when you use Indura to settle integrated hospital bills.",
      "We also collect data automatically through cookies, SDKs, and tracking technologies used for security, performance monitoring, and platform improvement.",
    ],
  },
  {
    id: "lawful-basis",
    title: "5. Lawful Basis and Purposes for Processing",
    body: [
      "We process data to perform our contract with you, including operating your Health Wallet, executing settlements with hospitals, and routing medication orders to fulfillment partners.",
      "We process data to comply with legal obligations, including Nigerian financial regulations, CBN anti-money laundering requirements, KYC rules, and statutory audit trail obligations.",
      "We rely on explicit consent for sensitive medical data, such as chronic care information for auto-refills or public display of medical needs when you opt in to a crowdfunding campaign.",
      "We may process data based on legitimate interest to detect and prevent fraud, secure our infrastructure, and improve the Indura experience.",
    ],
  },
  {
    id: "sharing",
    title: "6. Data Sharing and Third-Party Disclosures",
    body: [
      "Indura functions as an ecosystem, so certain data must be shared with vetted partners to deliver services. We do not sell your data to data brokers.",
      "We may share relevant delivery and medication information with fulfillment and logistics partners, including PharmaRun, to support accurate last-mile delivery.",
      "We may share necessary transaction and patient identification data with healthcare providers when you use Indura Wallet to settle a hospital bill.",
      "We may share KYC and transaction data with financial infrastructure partners, including Flutterwave and partner banks, to process deposits, escrow funds, and execute settlements.",
      "For subsidized health programs or VSLA programs managed through Indura, anonymized utilization data or compliance data may be shared with NGOs or institutional partners.",
      "We may disclose data where required by a valid court order, subpoena, or directive from the NDPC, CBN, or another lawful authority.",
    ],
  },
  {
    id: "security",
    title: "7. Data Security Measures",
    body: [
      "We classify the data we hold as high-risk and implement technical and organizational measures to protect it.",
      "Technical safeguards include encryption for data in transit, encryption at rest, tokenization of financial assets, multi-factor authentication for administrative access, and continuous network monitoring through our cloud providers.",
      "Organizational safeguards include role-based access control, employee access limitations, Data Privacy Impact Assessments for new features, and regular internal compliance audits.",
    ],
  },
  {
    id: "retention",
    title: "8. Data Retention Policy",
    body: [
      "We retain personal, health, and financial data only for as long as your Indura account is active or as necessary to fulfill the purposes described in this policy.",
      "Financial transaction data and KYC records are retained for a minimum of five (5) years to comply with Nigerian financial and anti-money laundering regulations, even if you close your account.",
      "Health and prescription data may be deleted or anonymized upon request where there is no pending legal or regulatory obligation to retain it.",
    ],
  },
  {
    id: "rights",
    title: "9. Your Rights as a Data Subject",
    body: [
      "Under the NDPA, you may request access to the data we hold about you, ask us to correct inaccurate or incomplete data, request deletion of your account and personal data, or ask us to restrict processing.",
      "You may also request data portability in a structured, commonly used, machine-readable format and withdraw consent for optional services at any time.",
      "To exercise these rights, contact our Data Protection Officer. We aim to respond to legitimate requests within 30 days.",
    ],
  },
  {
    id: "transfers",
    title: "10. International Data Transfers",
    body: [
      "Although Indura operates in Nigeria, our cloud infrastructure, including providers such as AWS or Google Cloud, may involve storing data on servers located outside Nigeria.",
      "Features that support diaspora users may also involve cross-border data flows. Any international data transfer is conducted subject to adequate safeguards and in line with NDPC guidelines.",
    ],
  },
  {
    id: "updates",
    title: "11. Updates to this Policy",
    body: [
      "We may update this Privacy Policy periodically to reflect changes in our technology, services, or regulatory obligations.",
      "Material changes will be communicated through in-app notification or email before they become effective.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Information",
    body: [
      "For questions, concerns, or data rights requests, contact the Indura Health Data Protection Officer.",
      "Address: Menderplus Technologies, Abuja, FCT, Nigeria.",
      "Phone: 09133293575.",
    ],
  },
];

const quickFacts = [
  {
    icon: FileText,
    label: "Effective date",
    value: "April 22, 2026",
  },
  {
    icon: Database,
    label: "Applies to",
    value: "Mobile app, website, and Health Wallet ecosystem",
  },
  {
    icon: Scale,
    label: "Regulatory basis",
    value: "NDPA 2023 and NDPC regulations",
  },
  {
    icon: Globe2,
    label: "Transfers",
    value: "Protected cross-border processing where required",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <NavigationMenuSection />

      <main className="plusJakarta">
        <section className="relative overflow-hidden bg-[#f7fffd] px-4 py-14 sm:px-8 md:px-12 lg:px-20 lg:py-20 xl:px-[120px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-180px] top-16 h-[440px] w-[440px] rounded-full bg-[#009688]/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-180px] top-24 h-[520px] w-[520px] rounded-full bg-[#d9fffb] blur-3xl"
          />

          <div className="relative mx-auto grid w-full max-w-[1200px] gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#b7f2ec] bg-white px-4 py-2 text-sm font-semibold text-[#009688] shadow-sm">
                <ShieldCheck className="h-4 w-4" />
                Privacy Policy
              </div>

              <div className="flex flex-col gap-5">
                <h1 className="max-w-[760px] text-4xl font-medium leading-tight tracking-[-0.04em] text-[#0d0d12] sm:text-5xl lg:text-[64px]">
                  How Indura protects your health and financial data.
                </h1>
                <p className="max-w-[680px] text-base leading-8 text-[#666d80] sm:text-lg">
                  This policy explains how Indura Health collects, uses, shares,
                  stores, and protects personal, medical, and financial data across
                  our mobile app, website, and Health Wallet ecosystem.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#009688] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#00897b]"
                >
                  Contact our DPO
                </Link>
                <a
                  href="#policy"
                  className="inline-flex h-12 items-center justify-center rounded-xl border border-[#dfe1e6] bg-white px-6 text-sm font-semibold text-[#0d0d12] transition-colors hover:border-[#009688] hover:text-[#009688]"
                >
                  Read policy
                </a>
              </div>
            </div>

            <div className="grid gap-3">
              {quickFacts.map((fact) => {
                const Icon = fact.icon;

                return (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-[#dfe1e6] bg-white/90 p-5 shadow-sm backdrop-blur"
                  >
                    <Icon className="mb-4 h-5 w-5 text-[#009688]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#818898]">
                      {fact.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-[#0d0d12]">
                      {fact.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 md:px-12 lg:px-20 xl:px-[120px]">
          <div className="mx-auto grid w-full max-w-[1200px] gap-4 md:grid-cols-3">
            {policyHighlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <div
                  key={highlight.title}
                  className="rounded-3xl border border-[#dfe1e6] bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9fffb]">
                    <Icon className="h-6 w-6 text-[#009688]" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#0d0d12]">
                    {highlight.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#666d80]">
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="policy"
          className="px-4 pb-16 sm:px-8 md:px-12 lg:px-20 lg:pb-24 xl:px-[120px]"
        >
          <div className="mx-auto grid w-full max-w-[1200px] gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-3xl border border-[#dfe1e6] bg-white p-5 shadow-sm">
                <p className="mb-4 text-sm font-semibold text-[#0d0d12]">
                  On this page
                </p>
                <nav className="flex flex-col gap-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-[#666d80] transition-colors hover:bg-[#f7fffd] hover:text-[#009688]"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="rounded-[32px] border border-[#dfe1e6] bg-white p-6 shadow-sm sm:p-8 md:p-10">
              <div className="mb-8 flex flex-col gap-3 border-b border-[#eceff3] pb-8">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d9fffb] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#00796f]">
                  <Clock className="h-3.5 w-3.5" />
                  Last updated April 22, 2026
                </div>
                <h2 className="text-2xl font-semibold text-[#0d0d12] md:text-3xl">
                  Indura Health Comprehensive Privacy Policy
                </h2>
              </div>

              <div className="flex flex-col gap-10">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                  >
                    <h3 className="text-xl font-semibold text-[#0d0d12]">
                      {section.title}
                    </h3>
                    <div className="mt-4 flex flex-col gap-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm leading-7 text-[#535A73] md:text-base md:leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 rounded-3xl bg-[#f7fffd] p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-[#0d0d12]">
                      Have a privacy question?
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-[#666d80]">
                      Contact Indura Health about your data rights or privacy
                      concerns.
                    </p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#009688] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#00897b]"
                  >
                    <Mail className="h-4 w-4" />
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}
