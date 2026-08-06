import type { PublicCampaign } from "./types";

export const MOCK_CAMPAIGN: PublicCampaign = {
  id: "demo-campaign",
  title: "Help Ada recover from surgery",
  subHead: "Every contribution brings her closer to treatment",
  description:
    "Ada needs urgent support for a scheduled medical procedure. Funds raised through this campaign will go directly toward her treatment and recovery costs at a verified healthcare provider.",
  category: "surgery",
  targetAmount: 2_500_000,
  raisedAmount: 875_000,
  currency: "NGN",
  endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
  coverImage: null,
  status: "active",
  contributorsCount: 42,
  organizer: {
    id: "demo-organizer",
    name: "Indura Community",
    isVerified: true,
  },
};
