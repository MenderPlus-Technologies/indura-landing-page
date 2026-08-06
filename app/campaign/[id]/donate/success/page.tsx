import Link from "next/link";

import { DonationStatusPoller } from "@/app/components/campaign/donation-status-poller";
import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import { CampaignApiError, fetchDonationStatus } from "@/lib/campaign/api";

interface DonateSuccessPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ reference?: string }>;
}

export default async function DonateSuccessPage({
  params,
  searchParams,
}: DonateSuccessPageProps) {
  const { id: campaignIdFromPath } = await params;
  const { reference } = await searchParams;

  let donationStatus = null;
  let statusError: string | null = null;

  if (reference) {
    try {
      donationStatus = await fetchDonationStatus(reference);
    } catch (error) {
      statusError =
        error instanceof CampaignApiError
          ? error.message
          : "We could not verify your payment yet.";
    }
  }

  const resolvedCampaignId =
    donationStatus?.campaignId || campaignIdFromPath;

  return (
    <div className="min-h-screen bg-[#fafbfc] plusJakarta">
      <MinimalNavbar />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <DonationStatusPoller
          reference={reference ?? ""}
          initialStatus={donationStatus}
          initialError={statusError}
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="rounded-xl bg-[#009688] px-6 text-white hover:bg-[#00897b]"
          >
            <Link href={`/campaign/${resolvedCampaignId}`}>
              Back to campaign
            </Link>
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
