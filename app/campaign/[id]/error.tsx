"use client";

import Link from "next/link";

import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";

export default function CampaignError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white plusJakarta">
      <MinimalNavbar />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-[#0d0d12]">
          Could not load this campaign
        </h1>
        <p className="mt-3 max-w-lg text-base leading-7 text-[#666d80]">
          The campaign API could not be reached. Check your internet connection,
          confirm the API URL in <code className="text-sm">.env.local</code>,
          and try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            onClick={reset}
            className="rounded-xl bg-[#009688] px-6 text-white hover:bg-[#00897b]"
          >
            Try again
          </Button>
          <Button asChild variant="outline" className="rounded-xl border-[#dfe1e6]">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}
