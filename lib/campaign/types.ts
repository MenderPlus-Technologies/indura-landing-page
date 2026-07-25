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

export interface DonateInitiateRequest {
  amount: number;
  donorName?: string;
  message?: string;
  anonymous?: boolean;
}

export interface DonateInitiateResponse {
  checkoutUrl: string;
  reference: string;
}
