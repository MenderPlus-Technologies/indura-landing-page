import { BadgeCheck, Users } from "lucide-react";

import { BRAND } from "@/lib/site-config";
import {
  formatCategoryLabel,
  formatCampaignDeadline,
  formatCurrency,
  getCampaignProgress,
  getCampaignProgressLabel,
} from "@/lib/campaign/format";
import type { PublicCampaign } from "@/lib/campaign/types";

interface CampaignProgressCardProps {
  campaign: PublicCampaign;
}

export function CampaignProgressCard({ campaign }: CampaignProgressCardProps) {
  const progress = getCampaignProgress(campaign);
  const deadline = formatCampaignDeadline(campaign.endDate);

  return (
    <section className="rounded-3xl border border-[#eceff3] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#666d80]">Funds raised</p>
          <p
            className="mt-1 text-2xl font-bold sm:text-3xl"
            style={{ color: BRAND.primary }}
          >
            {formatCurrency(campaign.raisedAmount, campaign.currency)}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-medium text-[#666d80]">Goal</p>
          <p className="mt-1 text-lg font-semibold text-[#0d0d12] sm:text-xl">
            {formatCurrency(campaign.targetAmount, campaign.currency)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="h-3 overflow-hidden rounded-full bg-[#eceff3]">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress * 100}%`,
              backgroundColor: BRAND.primary,
            }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-[#666d80]">
          <span>{getCampaignProgressLabel(campaign)}</span>
          {deadline ? <span>Ends {deadline}</span> : null}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-[#666d80]">
        <span className="rounded-full bg-[#f7fffd] px-3 py-1 font-medium text-[#009688]">
          {formatCategoryLabel(campaign.category)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {campaign.contributorsCount} contributor
          {campaign.contributorsCount === 1 ? "" : "s"}
        </span>
        {campaign.organizer ? (
          <span className="inline-flex items-center gap-1.5">
            by {campaign.organizer.name}
            {campaign.organizer.isVerified ? (
              <BadgeCheck className="h-4 w-4 text-[#009688]" />
            ) : null}
          </span>
        ) : null}
      </div>
    </section>
  );
}
