import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CampaignPageContent } from "@/app/components/campaign/campaign-page-content";
import {
  CampaignApiError,
  fetchPublicCampaign,
  getCampaignShareUrl,
} from "@/lib/campaign/api";

interface CampaignPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: CampaignPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const campaign = await fetchPublicCampaign(id);
    const description =
      campaign.subHead ||
      campaign.description.slice(0, 160) ||
      "Support this medical campaign on Indura Health.";

    return {
      title: `${campaign.title} | Indura Health`,
      description,
      openGraph: {
        title: campaign.title,
        description,
        url: getCampaignShareUrl(id),
        siteName: "Indura Health",
        type: "website",
        images: campaign.coverImage
          ? [{ url: campaign.coverImage, alt: campaign.title }]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: campaign.title,
        description,
        images: campaign.coverImage ? [campaign.coverImage] : undefined,
      },
    };
  } catch {
    return {
      title: "Campaign | Indura Health",
      description: "Support medical campaigns on Indura Health.",
    };
  }
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { id } = await params;

  let campaign;

  try {
    campaign = await fetchPublicCampaign(id);
  } catch (error) {
    if (error instanceof CampaignApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }

  return <CampaignPageContent campaign={campaign} />;
}
