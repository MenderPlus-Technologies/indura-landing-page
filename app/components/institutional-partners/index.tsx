import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, ShieldCheck, Wallet } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

const highlights = [
  {
    icon: Building2,
    title: "For donors & agencies",
    description:
      "Foundations, NGOs, development partners, insurers, and government health agencies.",
  },
  {
    icon: Wallet,
    title: "Fund to point-of-care",
    description:
      "Deposit, enrol beneficiaries, disburse, track outcomes, and report — all in one portal.",
  },
  {
    icon: ShieldCheck,
    title: "NDPC compliant",
    description:
      "Ring-fenced treasury wallets with Flutterwave integration and audit-ready reporting.",
  },
];

export const InstitutionalPartnersSection = (): JSX.Element => {
  return (
    <section
      id="institutional"
      className="w-full bg-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20 plusJakarta"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[560px] flex-col gap-4">
          <span className="inline-flex w-fit items-center rounded-full border border-[#009688]/20 bg-[#f7fffd] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#009688]">
            In active development
          </span>
          <p className="font-semibold text-[#009688]">Institutional Portal</p>
          <h2 className="text-2xl font-medium leading-tight text-[#0d0d12] sm:text-3xl md:text-4xl">
            Manage healthcare programme funds with full accountability
          </h2>
          <p className="text-sm leading-relaxed text-[#666d80] sm:text-base">
            Indura&apos;s B2B dashboard helps institutional partners disburse
            healthcare funding to named, verified beneficiaries — with live
            analytics, compliance reporting, and treasury management. We&apos;re
            currently building the portal with our first wave of partners.
          </p>
          <div>
            <Link href="/institutional-portal">
              <Button className="h-12 rounded-xl bg-[#009688] px-6 font-semibold text-white hover:bg-[#00897b]">
                Explore the Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[560px] lg:grid-cols-1">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[#dfe1e6] bg-[#f7fffd] p-4"
            >
              <item.icon className="mb-3 h-5 w-5 text-[#009688]" />
              <h3 className="font-semibold text-[#0d0d12]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#666d80]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
