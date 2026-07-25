import { MOCK_CAMPAIGN } from "./mock-campaign";
import type {
  DonateInitiateRequest,
  DonateInitiateResponse,
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

export async function fetchPublicCampaign(
  campaignId: string,
): Promise<PublicCampaign> {
  if (campaignId === "demo" || process.env.NEXT_PUBLIC_USE_MOCK_CAMPAIGN === "true") {
    return { ...MOCK_CAMPAIGN, id: campaignId };
  }

  const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}`, {
    next: { revalidate: 60 },
  });

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

export async function initiateCampaignDonation(
  campaignId: string,
  body: DonateInitiateRequest,
): Promise<DonateInitiateResponse> {
  const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/donate/initiate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    throw new CampaignApiError(
      errorBody?.message || "Unable to start donation checkout",
      response.status,
    );
  }

  const payload = (await response.json()) as {
    checkoutUrl?: string;
    checkout_url?: string;
    reference?: string;
    data?: {
      checkoutUrl?: string;
      checkout_url?: string;
      reference?: string;
    };
  };

  const checkoutUrl =
    payload.checkoutUrl ||
    payload.checkout_url ||
    payload.data?.checkoutUrl ||
    payload.data?.checkout_url;
  const reference = payload.reference || payload.data?.reference;

  if (!checkoutUrl || !reference) {
    throw new CampaignApiError("Invalid checkout response from server", 502);
  }

  return { checkoutUrl, reference };
}

export { getCampaignShareUrl } from "./share";
