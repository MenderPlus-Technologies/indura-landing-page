import { MOCK_CAMPAIGN } from "./mock-campaign";
import {
  createMockDonationStatus,
  isMockDonationReference,
} from "./dev-mock";
import {
  getPaymentCallbackOrigin,
  getPublicSiteOrigin,
} from "./site-url";
import type {
  DonateCheckoutRequest,
  DonateCheckoutResponse,
  DonationStatusResponse,
  PublicCampaign,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.indurahealth.com/api";

interface RawOrganizer {
  _id?: string;
  id?: string;
  name?: string;
  isVerified?: boolean;
  profilePicture?: string | null;
}

interface RawCampaign {
  _id?: string;
  id?: string;
  title?: string;
  subHead?: string;
  description?: string;
  category?: string;
  targetAmount?: number;
  raisedAmount?: number;
  currency?: string;
  endDate?: string;
  deadline?: string;
  coverImage?: string;
  image?: string;
  status?: PublicCampaign["status"];
  contributorsCount?: number;
  beneficiaryName?: string;
  organizerId?: RawOrganizer | string | null;
}

function normalizeOrganizer(
  organizerId: RawCampaign["organizerId"],
): PublicCampaign["organizer"] {
  if (!organizerId || typeof organizerId === "string") {
    return null;
  }

  return {
    id: organizerId._id || organizerId.id || "",
    name: organizerId.name || "Campaign organizer",
    isVerified: Boolean(organizerId.isVerified),
    profilePicture: organizerId.profilePicture ?? null,
  };
}

export function normalizeCampaign(raw: RawCampaign): PublicCampaign {
  return {
    id: raw._id || raw.id || "",
    title: raw.title || "Untitled campaign",
    subHead: raw.subHead,
    description: raw.description || "",
    category: raw.category || "other",
    targetAmount: raw.targetAmount ?? 0,
    raisedAmount: raw.raisedAmount ?? 0,
    currency: raw.currency || "NGN",
    endDate: raw.endDate || raw.deadline || null,
    coverImage: raw.coverImage || raw.image || null,
    status: raw.status || "active",
    contributorsCount: raw.contributorsCount ?? 0,
    beneficiaryName: raw.beneficiaryName,
    organizer: normalizeOrganizer(raw.organizerId),
  };
}

export class CampaignApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "CampaignApiError";
    this.status = status;
  }
}

function unwrapApiData<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    (payload as { data?: unknown }).data !== undefined
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

function extractCheckoutResponse(payload: unknown): DonateCheckoutResponse {
  const data = unwrapApiData<Record<string, unknown>>(payload);
  const payment =
    (data.payment as Record<string, unknown> | undefined) ?? data;

  const checkoutUrl = String(
    payment.checkoutUrl ??
      payment.checkout_url ??
      payment.checkoutURL ??
      "",
  );
  const reference = String(payment.reference ?? "");

  if (!checkoutUrl || !reference) {
    throw new CampaignApiError("Invalid checkout response from server", 502);
  }

  return { checkoutUrl, reference };
}

function extractDonationStatus(payload: unknown): DonationStatusResponse {
  const data = unwrapApiData<Record<string, unknown>>(payload);
  const donation =
    (data.donation as Record<string, unknown> | undefined) ??
    (data.payment as Record<string, unknown> | undefined) ??
    data;

  const reference = String(donation.reference ?? "");
  const status = String(
    donation.status ?? donation.paymentStatus ?? "pending",
  ).toLowerCase() as DonationStatusResponse["status"];

  if (!reference) {
    throw new CampaignApiError("Invalid donation status response", 502);
  }

  const campaignIdRaw =
    donation.campaignId ??
    donation.campaign_id ??
    (donation.campaign as Record<string, unknown> | undefined)?._id ??
    (donation.campaign as Record<string, unknown> | undefined)?.id;

  return {
    reference,
    status,
    amount:
      typeof donation.amount === "number"
        ? donation.amount
        : Number(donation.amount) || undefined,
    currency:
      typeof donation.currency === "string" ? donation.currency : undefined,
    campaignId: campaignIdRaw ? String(campaignIdRaw) : undefined,
    message:
      typeof donation.message === "string" ? donation.message : undefined,
  };
}

export async function fetchPublicCampaign(
  campaignId: string,
): Promise<PublicCampaign> {
  if (
    campaignId === "demo" ||
    process.env.NEXT_PUBLIC_USE_MOCK_CAMPAIGN === "true"
  ) {
    return { ...MOCK_CAMPAIGN, id: campaignId };
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
      next: { revalidate: 60 },
    });
  } catch {
    throw new CampaignApiError(
      "Unable to reach the campaign API. Check your connection or API URL.",
      503,
    );
  }

  if (!response.ok) {
    throw new CampaignApiError(
      response.status === 404 ? "Campaign not found" : "Failed to load campaign",
      response.status,
    );
  }

  const payload = (await response.json()) as { campaign?: RawCampaign };
  if (!payload.campaign) {
    throw new CampaignApiError("Campaign not found", 404);
  }

  return normalizeCampaign(payload.campaign);
}

export async function initiateDonationCheckout(
  campaignId: string,
  body: DonateCheckoutRequest,
): Promise<DonateCheckoutResponse> {
  const response = await fetch(
    `${API_BASE_URL}/campaigns/${campaignId}/donations/checkout`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string; error?: { message?: string } }
      | null;

    const message =
      errorBody?.error?.message ||
      errorBody?.message ||
      "Unable to start donation checkout";

    throw new CampaignApiError(message, response.status);
  }

  const payload = await response.json();
  return extractCheckoutResponse(payload);
}

export async function fetchDonationStatus(
  reference: string,
): Promise<DonationStatusResponse> {
  if (isMockDonationReference(reference)) {
    return createMockDonationStatus({
      reference,
      status: "successful",
    });
  }

  const response = await fetch(
    `${API_BASE_URL}/campaigns/donations/${reference}/status`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string; error?: { message?: string } }
      | null;

    const message =
      errorBody?.error?.message ||
      errorBody?.message ||
      "Unable to verify donation status";

    throw new CampaignApiError(message, response.status);
  }

  const payload = await response.json();
  return extractDonationStatus(payload);
}

/** @deprecated Use initiateDonationCheckout */
export const initiateCampaignDonation = initiateDonationCheckout;

export { getCampaignShareUrl } from "./share";

export function getDonationSuccessUrl(
  campaignId: string,
  requestOrigin?: string,
): string {
  const siteUrl = getPublicSiteOrigin(requestOrigin);
  return `${siteUrl}/campaign/${campaignId}/donate/success`;
}

/** URL the payment gateway should return to (backend adds ?reference=). */
export function getDonationCallbackUrl(
  campaignId: string,
  requestOrigin?: string,
): string {
  const callbackOrigin = getPaymentCallbackOrigin(requestOrigin);
  return `${callbackOrigin}/campaign/${campaignId}?payment=callback`;
}

export function isDonationSuccessful(
  status: DonationStatusResponse["status"],
): boolean {
  return status === "successful" || status === "success" || status === "completed";
}

export function isDonationPending(
  status: DonationStatusResponse["status"],
): boolean {
  return status === "pending";
}

export function isDonationFailed(
  status: DonationStatusResponse["status"],
): boolean {
  return status === "failed" || status === "cancelled";
}
