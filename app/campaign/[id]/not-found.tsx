import Link from "next/link";

import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";

export default function CampaignNotFound() {
  return (
    <div className="min-h-screen bg-white plusJakarta">
      <MinimalNavbar />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#009688]">
          Campaign
        </p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d0d12]">
          This campaign could not be found
        </h1>
        <p className="mt-3 max-w-lg text-base leading-7 text-[#666d80]">
          The link may be incorrect, expired, or the campaign may have been
          removed.
        </p>
        <Button asChild className="mt-8 rounded-xl bg-[#009688] px-6 text-white hover:bg-[#00897b]">
          <Link href="/">Back to Indura Health</Link>
        </Button>
        <p className="mt-6 text-sm text-[#818898]">
          Testing locally? Try{" "}
          <Link href="/campaign/demo" className="font-medium text-[#009688] hover:underline">
            /campaign/demo
          </Link>
        </p>
      </main>
      <FooterSection />
    </div>
  );
}
