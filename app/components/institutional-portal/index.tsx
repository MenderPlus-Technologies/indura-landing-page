import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const audienceItems = [
  "Foundations & philanthropy",
  "NGOs & development partners",
  "Government health agencies",
  "Insurers & HMOs",
  "Impact investors",
];

/*
const dashboardScreens = [
  {
    icon: BarChart3,
    title: "Programme Overview",
    description:
      "Your command centre for live programme status, fund balances, and outcome tracking — with deposit and disburse actions, programme tabs, KPIs, and utilisation charts.",
    highlights: [
      "Deposit & disburse programme funds",
      "Multi-programme support (maternal health, malaria, nutrition, etc.)",
      "Treasury float, Healthscore, and outcome indicators",
    ],
  },
  {
    icon: Users,
    title: "Beneficiaries",
    description:
      "Individual-level management — who is enrolled, active, pending setup, or flagged for follow-up.",
    highlights: [
      "Bulk CSV import or individual enrolment by Indura ID",
      "Real-time status: active, pending wallet setup, flagged/inactive",
      "Search and filter by name, phone, email, or Healthscore",
    ],
  },
  {
    icon: Wallet,
    title: "Fund Analytics",
    description:
      "Financial accountability from deposit to point-of-care delivery.",
    highlights: [
      "Deployment rate and cost per beneficiary",
      "Spend by health category and geographic location",
      "Exportable per-beneficiary spend ledger for audit",
    ],
  },
  {
    icon: Landmark,
    title: "Treasury",
    description:
      "Ring-fenced institutional wallet with deposits, disbursements, float earnings, and withdrawals.",
    highlights: [
      "Live balance and lifetime deposit tracking",
      "Float revenue on undeployed funds (~21.2% annualised T-bill rate)",
      "Transparent withdrawal policy and full transaction ledger",
    ],
  },
  {
    icon: FileText,
    title: "Reports",
    description:
      "Six automated report types, schedulable to any stakeholder on any timetable.",
    highlights: [
      "Programme performance, financial summary, and audit-ready ledger",
      "Beneficiary roster and geographic spend reports",
      "Automated weekly, monthly, or quarterly delivery",
    ],
  },
  {
    icon: Settings,
    title: "Organisation Settings",
    description:
      "Profile, dashboard preferences, currency display, and notification controls.",
    highlights: [
      "Organisation profile for compliance documents",
      "Toggle Healthscores, float revenue, and leakage indicators",
      "Configurable alerts for inactive beneficiaries and low balance",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Team Access",
    description:
      "Bank linkage, 2FA, login notifications, and role-based team permissions.",
    highlights: [
      "Owner, Admin, Analyst, and Auditor roles",
      "Mandatory 2FA for high-volume accounts",
      "Invite team members via email with role assignment",
    ],
  },
  {
    icon: Megaphone,
    title: "Announcements",
    description:
      "Send messages to enrolled beneficiaries for discounts, updates, and upcoming programmes.",
    highlights: [
      "Direct communication to programme beneficiaries",
      "Share programme updates and promotional offers",
    ],
  },
];
*/

const platformPhases = [
  {
    phase: "1",
    title: "Registration & Onboarding",
    duration: "24–48 hours",
    summary:
      "Organisation signs up, passes KYB verification under NDPC compliance, configures programmes, links a bank account, and sets team roles.",
    outcome: "Verified organisation account ready to receive and disburse funds.",
  },
  {
    phase: "2",
    title: "Fund Deposit",
    duration: "Instant via Flutterwave",
    summary:
      "Programme budget is deposited into a ring-fenced treasury wallet, separate from patient household savings.",
    outcome: "Funds secured in treasury; float begins accruing on undeployed balances.",
  },
  {
    phase: "3",
    title: "Beneficiary Enrolment",
    duration: "Bulk or individual",
    summary:
      "Organisations enrol named individuals via CSV import or manual search by Indura ID, phone, or email.",
    outcome: "Beneficiaries linked to programme wallets; Healthscore tracking begins.",
  },
  {
    phase: "4",
    title: "Fund Disbursement",
    duration: "Instant transfer",
    summary:
      "Funds move from the institutional wallet to individual beneficiary health wallets for defined health categories.",
    outcome: "Funds ready for use at verified Indura partner providers.",
  },
  {
    phase: "5",
    title: "Patient Transactions",
    duration: "Real-time",
    summary:
      "Beneficiaries pay at verified clinics, pharmacies, or labs via their app wallet with ledger-to-ledger settlement.",
    outcome: "Every transaction recorded with full metadata for accountability.",
  },
  {
    phase: "6",
    title: "Analytics & Monitoring",
    duration: "Live dashboard",
    summary:
      "Track deployment rate, cost per beneficiary, spend categories, and geographic distribution with leakage detection.",
    outcome: "Real-time accountability dashboard for programme managers.",
  },
  {
    phase: "7",
    title: "Compliance Reporting",
    duration: "On demand or scheduled",
    summary:
      "Generate or schedule programme, financial, audit, geographic, and treasury reports to any stakeholder.",
    outcome: "Automated compliance reporting with zero manual formatting.",
  },
  {
    phase: "8",
    title: "Treasury Close-Out",
    duration: "1–2 business days",
    summary:
      "Review float earnings, export the full ledger, and withdraw unused funds to a registered bank account.",
    outcome: "Clean programme close-out with full audit trail.",
  },
];

const flowSummary = [
  { phase: "Registration", action: "Sign up, KYB, configure programmes", outcome: "Verified account" },
  { phase: "Fund Deposit", action: "Deposit via Flutterwave", outcome: "Treasury funded, float accruing" },
  { phase: "Enrolment", action: "Import CSV or enrol individuals", outcome: "Beneficiaries linked" },
  { phase: "Disbursement", action: "Send funds to beneficiary wallets", outcome: "Funds ready at providers" },
  { phase: "Transactions", action: "Patient pays at verified provider", outcome: "Instant settlement & metadata" },
  { phase: "Analytics", action: "Monitor deployment & spend", outcome: "Live accountability dashboard" },
  { phase: "Reporting", action: "Generate or schedule reports", outcome: "Automated compliance" },
  { phase: "Close-Out", action: "Withdraw unused funds", outcome: "Full audit trail" },
];

export const InstitutionalPortalSection = (): JSX.Element => {
  return (
    <div className="plusJakarta w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[url('/Hero.svg')] bg-cover bg-center bg-no-repeat px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-20">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center rounded-full border border-[#009688]/20 bg-[#f7fffd] px-4 py-1.5 text-sm font-semibold text-[#009688]">
            Dashboard in active development
          </span>

          <h1 className="max-w-[900px] text-2xl font-medium leading-tight text-[#0d0d12] sm:text-3xl md:text-4xl lg:text-[52px] lg:leading-[65px]">
            Institutional Portal for Healthcare Fund Management
          </h1>

          <p className="max-w-[720px] text-sm leading-relaxed text-[#666d80] sm:text-base md:text-lg">
            The B2B dashboard built for donors, development partners, NGOs,
            foundations, and government agencies disbursing funds for healthcare
            outcomes in Africa — from sign-up through fund deposit, beneficiary
            enrolment, disbursement, outcome tracking, compliance reporting, and
            treasury management.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/contact">
              <Button className="h-12 rounded-xl bg-[#009688] px-6 font-semibold text-white hover:bg-[#00897b]">
                Partner With Indura
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <a href="mailto:hello@menderplus.com">
              <Button
                variant="outline"
                className="h-12 rounded-xl border-[#009688] px-6 font-semibold text-[#009688] hover:bg-[#f7fffd]"
              >
                hello@menderplus.com
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3">
          <Card className="border-[#eceff3] shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <Building2 className="h-8 w-8 text-[#009688]" />
              <h2 className="text-lg font-semibold text-[#0d0d12]">Who It Is For</h2>
              <ul className="space-y-2 text-sm leading-6 text-[#666d80]">
                {audienceItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009688]" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-[#eceff3] shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <BarChart3 className="h-8 w-8 text-[#009688]" />
              <h2 className="text-lg font-semibold text-[#0d0d12]">What It Covers</h2>
              <p className="text-sm leading-6 text-[#666d80]">
                Manage the full programme lifecycle in one place — from onboarding
                and fund disbursement to beneficiary tracking, treasury, reporting,
                and team access.
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#eceff3] shadow-sm">
            <CardContent className="flex flex-col gap-4 p-6">
              <ShieldCheck className="h-8 w-8 text-[#009688]" />
              <h2 className="text-lg font-semibold text-[#0d0d12]">Built for Trust</h2>
              <p className="text-sm leading-6 text-[#666d80]">
                Built on NDPC-compliant infrastructure with secure payments through
                Flutterwave. Programme funds stay in dedicated institutional wallets,
                fully separate from patients&apos; personal savings.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/*
      <section className="bg-[#f7fffd] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <header className="mb-10 flex max-w-[760px] flex-col gap-4">
            <p className="font-semibold text-[#009688]">Platform Screens</p>
            <h2 className="text-2xl font-medium leading-tight text-[#0d0d12] sm:text-3xl md:text-4xl">
              Every screen designed for institutional accountability
            </h2>
            <p className="text-sm leading-relaxed text-[#666d80] sm:text-base">
              See what matters at a glance — fund balances, beneficiary activity,
              and programme performance — without digging through spreadsheets.
              We&apos;re building these screens now with our first institutional
              partners.
            </p>
          </header>

          <div className="grid gap-6 md:grid-cols-2">
            {dashboardScreens.map((screen) => (
              <Card key={screen.title} className="border-[#eceff3] bg-white shadow-sm">
                <CardContent className="flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-[10px] border border-[#eceff3] bg-white p-2.5 shadow-sm">
                      <screen.icon className="h-6 w-6 text-[#009688]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0d0d12]">
                        {screen.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#666d80]">
                        {screen.description}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 border-t border-[#eceff3] pt-4">
                    {screen.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm leading-6 text-[#666d80]"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009688]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* End-to-End Flow */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <header className="mb-10 flex max-w-[760px] flex-col gap-4">
            <p className="font-semibold text-[#009688]">End-to-End Flow</p>
            <h2 className="text-2xl font-medium leading-tight text-[#0d0d12] sm:text-3xl md:text-4xl">
              From sign-up to programme close-out
            </h2>
            <p className="text-sm leading-relaxed text-[#666d80] sm:text-base">
              What happens when a foundation, NGO, or government agency partners
              with Indura — from the moment they register to funds reaching
              verified beneficiaries at the point of care.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {platformPhases.map((item) => (
              <div
                key={item.phase}
                className="rounded-2xl border border-[#eceff3] bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#009688] text-sm font-bold text-white">
                    {item.phase}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#0d0d12]">{item.title}</h3>
                    <p className="text-xs font-medium uppercase tracking-wide text-[#009688]">
                      {item.duration}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-[#666d80]">{item.summary}</p>
                <p className="mt-3 text-sm font-medium text-[#0d0d12]">
                  Outcome: {item.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flow Summary Table */}
      <section className="bg-[#0d0d12] px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          <header className="mb-10 flex max-w-[760px] flex-col gap-4">
            <p className="font-semibold text-[#4db6ac]">Platform Flow Summary</p>
            <h2 className="text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl">
              The complete institutional journey at a glance
            </h2>
          </header>

          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-4 font-semibold text-white">Phase</th>
                  <th className="px-4 py-4 font-semibold text-white">Action</th>
                  <th className="px-4 py-4 font-semibold text-white">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {flowSummary.map((row, index) => (
                  <tr
                    key={row.phase}
                    className={index % 2 === 0 ? "bg-white/5" : "bg-transparent"}
                  >
                    <td className="px-4 py-4 font-medium text-[#4db6ac]">
                      {row.phase}
                    </td>
                    <td className="px-4 py-4 text-white/80">{row.action}</td>
                    <td className="px-4 py-4 text-white/80">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key differentiators */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Users,
              title: "Named, verified individuals",
              text: "Funds go to specific beneficiaries with unique Indura IDs — not communities or regions — with real-time activity tracking.",
            },
            {
              icon: Wallet,
              title: "Dual-wallet architecture",
              text: "Institutional treasury wallets are structurally separate from patient household savings, preventing commingling of donor capital.",
            },
            {
              icon: Bell,
              title: "Automated compliance",
              text: "Six report types with schedulable delivery eliminate manual, delayed, and expensive programme reporting.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#eceff3] bg-[#f7fffd] p-6"
            >
              <item.icon className="mb-4 h-8 w-8 text-[#009688]" />
              <h3 className="text-lg font-semibold text-[#0d0d12]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#666d80]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] pb-16 md:pb-24">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 rounded-[28px] bg-[linear-gradient(135deg,rgba(58,144,136,1)_0%,rgba(0,150,136,1)_100%)] p-8 md:flex-row md:items-center md:p-12">
          <div className="max-w-[640px]">
            <p className="font-semibold text-white/80">Join the first wave</p>
            <h2 className="mt-2 text-2xl font-medium leading-tight text-white sm:text-3xl md:text-4xl">
              Indura is onboarding its first institutional partners
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
              If your organisation disburses healthcare funding in Africa, reach
              out to our partnerships team to learn more about the institutional
              portal and early access.
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/90">
              <p>
                <strong>Email:</strong> hello@menderplus.com
              </p>
              <p>
                <strong>Phone:</strong> +234 913 329 3575
              </p>
              <p>
                <strong>Headquarters:</strong> Abuja, Nigeria
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/contact">
              <Button className="h-12 w-full rounded-xl bg-white px-6 font-semibold text-[#009688] hover:bg-white/90 sm:w-auto">
                Contact Partnerships
              </Button>
            </Link>
            <a href="mailto:hello@menderplus.com">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-white bg-transparent px-6 font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Email Us Directly
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
