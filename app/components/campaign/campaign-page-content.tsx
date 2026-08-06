"use client";

import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

import { MinimalNavbar } from "@/app/components/minimal-navbar";
import FooterSection from "@/app/components/footer";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/site-config";
import {
  formatCategoryLabel,
  getCampaignClosedReason,
  isCampaignDonatable,
} from "@/lib/campaign/format";
import type { PublicCampaign } from "@/lib/campaign/types";
import { CampaignCoverImage } from "./campaign-cover-image";
import { CampaignDonateModal } from "./campaign-donate-modal";
import { CampaignGetAppBanner } from "./campaign-get-app-banner";
import { CampaignProgressCard } from "./campaign-progress-card";
import { CampaignShareSheet } from "./campaign-share-sheet";

interface CampaignPageContentProps {
  campaign: PublicCampaign;
}

function CampaignActionButtons({
  canDonate,
  onDonate,
  onShare,
  compact = false,
}: {
  canDonate: boolean;
  onDonate: () => void;
  onShare: () => void;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "flex gap-2" : "space-y-3"}>
      <Button
        type="button"
        disabled={!canDonate}
        onClick={onDonate}
        className={
          compact
            ? "h-11 flex-1 rounded-xl text-sm font-semibold text-white sm:text-base"
            : "h-12 w-full rounded-xl text-base font-semibold text-white"
        }
        style={{
          backgroundColor: canDonate ? BRAND.primary : "#818898",
        }}
      >
        <Heart className="h-4 w-4" />
        {canDonate ? "Donate now" : "Campaign closed"}
      </Button>

      <Button
        type="button"
        variant="outline"
        onClick={onShare}
        className={
          compact
            ? "h-11 flex-1 rounded-xl border-[#dfe1e6] text-sm sm:text-base"
            : "h-11 w-full rounded-xl border-[#dfe1e6]"
        }
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
}

export function CampaignPageContent({ campaign }: CampaignPageContentProps) {
  const [donateOpen, setDonateOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const canDonate = isCampaignDonatable(campaign);
  const closedReason = getCampaignClosedReason(campaign);

  return (
    <div className="min-h-screen bg-[#fafbfc] plusJakarta">
      <MinimalNavbar />

      <main className="mx-auto w-full max-w-5xl px-4 py-6 pb-28 sm:px-6 sm:py-8 lg:px-10 lg:pb-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)] lg:gap-8">
          {/* Progress + actions show first on mobile for quicker access */}
          <aside className="order-1 space-y-4 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <CampaignProgressCard campaign={campaign} />

            <div className="rounded-3xl border border-[#eceff3] bg-white p-5 shadow-sm sm:p-6">
              <CampaignActionButtons
                canDonate={canDonate}
                onDonate={() => setDonateOpen(true)}
                onShare={() => setShareOpen(true)}
              />

              {!canDonate ? (
                <p className="mt-3 text-sm text-[#666d80]">
                  {closedReason ?? "This campaign is no longer accepting donations."}
                </p>
              ) : (
                <p className="mt-3 text-sm leading-6 text-[#666d80]">
                  Donations are processed securely through Indura checkout.
                </p>
              )}
            </div>
          </aside>

          <div className="order-2 space-y-6 lg:order-1">
            <section className="overflow-hidden rounded-3xl border border-[#eceff3] bg-white shadow-sm sm:rounded-[2rem]">
              <CampaignCoverImage
                title={campaign.title}
                coverImage={campaign.coverImage}
              />

              <div className="space-y-4 p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#f7fffd] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#009688]">
                    Fund Me
                  </span>
                  <span className="rounded-full bg-[#f5f6f8] px-3 py-1 text-xs font-medium text-[#666d80]">
                    {formatCategoryLabel(campaign.category)}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-bold leading-tight text-[#0d0d12] sm:text-3xl lg:text-4xl">
                    {campaign.title}
                  </h1>
                  {campaign.subHead ? (
                    <p className="mt-3 text-base leading-7 text-[#666d80] sm:text-lg">
                      {campaign.subHead}
                    </p>
                  ) : null}
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-[#444a57] sm:text-base">
                  {campaign.description}
                </p>
              </div>
            </section>

            <CampaignGetAppBanner />
          </div>
        </div>
      </main>

      {/* Sticky donate bar on mobile/tablet */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#eceff3] bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
        <div className="mx-auto w-full max-w-5xl">
          <CampaignActionButtons
            compact
            canDonate={canDonate}
            onDonate={() => setDonateOpen(true)}
            onShare={() => setShareOpen(true)}
          />
        </div>
      </div>

      <FooterSection />

      <CampaignDonateModal
        campaign={campaign}
        open={donateOpen}
        onClose={() => setDonateOpen(false)}
      />

      <CampaignShareSheet
        campaign={campaign}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}
