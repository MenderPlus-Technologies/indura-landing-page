import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";

interface DonateSuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reference?: string }>;
}

export default async function DonateSuccessPage({
  params,
  searchParams,
}: DonateSuccessPageProps) {
  const { id } = await params;
  const { reference } = await searchParams;

  return (
    <div className="min-h-screen bg-[#fafbfc] plusJakarta">
      <MinimalNavbar />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e6f4ea]">
          <CheckCircle2 className="h-10 w-10 text-[#00a86b]" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#0d0d12]">
          Thank you for your donation
        </h1>
        <p className="mt-3 max-w-lg text-base leading-7 text-[#666d80]">
          Your support helps someone get closer to the care they need. A receipt
          will be sent if you provided contact details during checkout.
        </p>
        {reference ? (
          <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-[#666d80] shadow-sm">
            Reference: <span className="font-medium text-[#0d0d12]">{reference}</span>
          </p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-xl bg-[#009688] px-6 text-white hover:bg-[#00897b]">
            <Link href={`/campaign/${id}`}>Back to campaign</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl border-[#dfe1e6]">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
