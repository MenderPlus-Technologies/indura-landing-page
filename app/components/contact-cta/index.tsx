import { Button } from "@/components/ui/button";
import Link from "next/link";
import { JSX } from "react";

const contactOptions = [
  {
    title: "Support",
    description: "Ask about your account, Health ID, payments, or saving for care.",
  },
  {
    title: "Partnerships",
    description: "Talk to us about facility onboarding, integrations, and provider payouts.",
  },
  {
    title: "General Enquiries",
    description: "Reach the Indura team for press, product, or business questions.",
  },
];

export const ContactCtaSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-14 md:py-20 plusJakarta">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 rounded-[28px] border border-[#dfe1e6] bg-[#f7fffd] p-6 shadow-sm sm:p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[560px] flex-col gap-4">
          <p className="font-semibold text-[#009688]">Need to reach us?</p>
          <h2 className="text-2xl font-medium leading-tight text-[#0d0d12] sm:text-3xl md:text-4xl">
            Contact Indura on a dedicated page built for quick responses.
          </h2>
          <p className="text-sm leading-relaxed text-[#666d80] sm:text-base">
            Explore the product here, then use the dedicated contact page when
            you are ready to speak with the team.
          </p>
          <div>
            <Link href="/contact">
              <Button className="h-12 rounded-xl bg-[#009688] px-6 font-semibold text-white hover:bg-[#00897b]">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-3 lg:max-w-[520px] lg:grid-cols-1">
          {contactOptions.map((option) => (
            <div
              key={option.title}
              className="rounded-2xl border border-[#dfe1e6] bg-white p-4"
            >
              <h3 className="font-semibold text-[#0d0d12]">{option.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#666d80]">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
