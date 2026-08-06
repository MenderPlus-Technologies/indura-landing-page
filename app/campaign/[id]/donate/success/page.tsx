import Link from "next/link";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";

import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import {
  CampaignApiError,
  fetchDonationStatus,
  isDonationFailed,
  isDonationPending,
  isDonationSuccessful,
} from "@/lib/campaign/api";
import { formatCurrency } from "@/lib/campaign/format";

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

  const isSuccess =
    donationStatus && isDonationSuccessful(donationStatus.status);
  const isPending =
    donationStatus && isDonationPending(donationStatus.status);
  const isFailed =
    donationStatus && isDonationFailed(donationStatus.status);

  return (
    <div className="min-h-screen bg-[#fafbfc] plusJakarta">
      <MinimalNavbar />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${
            isSuccess
              ? "bg-[#e6f4ea]"
              : isFailed
                ? "bg-[#fdecea]"
                : "bg-[#fff7e6]"
          }`}
        >
          {isSuccess ? (
            <CheckCircle2 className="h-10 w-10 text-[#00a86b]" />
          ) : isFailed ? (
            <XCircle className="h-10 w-10 text-[#ef5350]" />
          ) : (
            <Clock3 className="h-10 w-10 text-[#f59e0b]" />
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#0d0d12]">
          {isSuccess
            ? "Thank you for your donation"
            : isFailed
              ? "Donation was not completed"
              : reference
                ? "Payment is being confirmed"
                : "Donation reference missing"}
        </h1>

        <p className="mt-3 max-w-lg text-base leading-7 text-[#666d80]">
          {isSuccess
            ? "Your support helps someone get closer to the care they need."
            : isFailed
              ? "The payment did not go through. You can return to the campaign and try again."
              : reference
                ? "We are verifying your payment with the donation reference returned from checkout."
                : "Open this page from the payment return link so we can verify your donation."}
        </p>

        {donationStatus?.amount ? (
          <p className="mt-4 text-sm text-[#666d80]">
            Amount:{" "}
            <span className="font-semibold text-[#0d0d12]">
              {formatCurrency(
                donationStatus.amount,
                donationStatus.currency || "NGN",
              )}
            </span>
          </p>
        ) : null}

        {reference ? (
          <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-[#666d80] shadow-sm">
            Donation reference:{" "}
            <span className="font-medium text-[#0d0d12]">{reference}</span>
          </p>
        ) : null}

        {statusError ? (
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#ef5350]">
            {statusError}
          </p>
        ) : null}

        {isPending && !statusError ? (
          <p className="mt-4 max-w-lg text-sm leading-6 text-[#666d80]">
            If this stays pending, refresh in a moment. The backend reconciles
            the payment through its verified webhook.
          </p>
        ) : null}

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
