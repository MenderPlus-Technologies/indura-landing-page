import type { DonateCheckoutResponse, DonationStatusResponse } from "./types";

export const MOCK_DONATION_REFERENCE_PREFIX = "DON-TEST-";

export function isMockDonationReference(reference: string): boolean {
  return reference.startsWith(MOCK_DONATION_REFERENCE_PREFIX);
}

export function createMockDonationCheckout(options: {
  campaignId: string;
  amount: number;
  redirectUrl: string;
}): DonateCheckoutResponse {
  const reference = `${MOCK_DONATION_REFERENCE_PREFIX}${Date.now()}`;
  const separator = options.redirectUrl.includes("?") ? "&" : "?";
  const checkoutUrl = `${options.redirectUrl}${separator}reference=${encodeURIComponent(reference)}`;

  return { checkoutUrl, reference };
}

export function createMockDonationStatus(options: {
  reference: string;
  campaignId?: string;
  amount?: number;
  currency?: string;
  status?: DonationStatusResponse["status"];
  message?: string;
}): DonationStatusResponse {
  return {
    reference: options.reference,
    status: options.status ?? "successful",
    amount: options.amount,
    currency: options.currency ?? "NGN",
    campaignId: options.campaignId,
    message: options.message ?? "Mock donation status for local UI testing",
  };
}

export function shouldUseMockDonationFallback(error: unknown): boolean {
  if (process.env.NODE_ENV === "production") return false;

  return (
    error instanceof Error &&
    "status" in error &&
    Number((error as { status?: number }).status) === 404
  );
}
