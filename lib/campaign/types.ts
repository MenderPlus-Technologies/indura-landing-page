export type CampaignStatus =
  | "draft"
  | "pending_approval"
  | "active"
  | "completed"
  | "cancelled"
  | "suspended"
  | "ended";

export interface CampaignOrganizer {
  id: string;
  name: string;
  isVerified: boolean;
  profilePicture?: string | null;
}

export interface PublicCampaign {
  id: string;
  title: string;
  subHead?: string;
  description: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  endDate?: string | null;
  coverImage?: string | null;
  status: CampaignStatus;
  contributorsCount: number;
  organizer: CampaignOrganizer | null;
  beneficiaryName?: string | null;
}

export interface CampaignDetailResponse {
  campaign: PublicCampaign;
}

export interface DonateCheckoutRequest {
  amount: number;
  name: string;
  email: string;
  phone: string;
  anonymous?: boolean;
  /** Return URL after payment — backend appends reference query param. */
  redirectUrl?: string;
}

/** Used by our Next.js proxy when building return URLs — not sent to backend checkout. */
export interface DonateCheckoutProxyRequest extends DonateCheckoutRequest {
  redirectUrl?: string;
}

export interface DonateCheckoutResponse {
  checkoutUrl: string;
  reference: string;
}

export type DonationPaymentStatus =
  | "pending"
  | "successful"
  | "success"
  | "completed"
  | "failed"
  | "cancelled";

export interface DonationStatusResponse {
  reference: string;
  status: DonationPaymentStatus;
  amount?: number;
  currency?: string;
  campaignId?: string;
  message?: string;
}

/** @deprecated Use DonateCheckoutRequest */
export type DonateInitiateRequest = DonateCheckoutRequest;

/** @deprecated Use DonateCheckoutResponse */
export type DonateInitiateResponse = DonateCheckoutResponse;
