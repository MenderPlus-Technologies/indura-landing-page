"use client";

import { useEffect, useState } from "react";
import { Check, Copy, MessageCircle, Share2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BRAND } from "@/lib/site-config";
import type { PublicCampaign } from "@/lib/campaign/types";
import {
  copyTextToClipboard,
  getCampaignShareUrl,
  getWhatsAppShareUrl,
  shareCampaignLink,
} from "@/lib/campaign/share";

interface CampaignShareSheetProps {
  campaign: PublicCampaign;
  open: boolean;
  onClose: () => void;
}

export function CampaignShareSheet({
  campaign,
  open,
  onClose,
}: CampaignShareSheetProps) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    setShareUrl(getCampaignShareUrl(campaign.id, window.location.origin));
    setCopied(false);
  }, [campaign.id, open]);

  if (!open) return null;

  const shareText = campaign.subHead || campaign.description;

  async function handleCopy() {
    const success = await copyTextToClipboard(shareUrl);

    if (!success) {
      toast.error("Could not copy link. Select and copy it manually.");
      return;
    }

    setCopied(true);
    toast.success("Campaign link copied");
    window.setTimeout(() => setCopied(false), 2000);
  }

  async function handleNativeShare() {
    const result = await shareCampaignLink({
      title: campaign.title,
      text: shareText,
      url: shareUrl,
    });

    if (result === "shared") {
      toast.success("Campaign shared");
      onClose();
      return;
    }

    if (result === "copied") {
      setCopied(true);
      toast.success("Campaign link copied");
      window.setTimeout(() => setCopied(false), 2000);
      return;
    }

    toast.error("Could not share this campaign. Try copy or WhatsApp.");
  }

  function handleWhatsAppShare() {
    const whatsappUrl = getWhatsAppShareUrl(
      `Support "${campaign.title}" on Indura Health`,
      shareUrl,
    );
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close share dialog"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl plusJakarta">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#0d0d12]">Share campaign</h2>
            <p className="mt-1 text-sm text-[#666d80]">
              Send this link so others can view and donate.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#666d80] hover:bg-[#f7fffd]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              readOnly
              value={shareUrl}
              onFocus={(event) => event.target.select()}
              className="h-11 rounded-xl border-[#dfe1e6] bg-[#fafbfc] text-sm text-[#0d0d12]"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleCopy}
              className="h-11 shrink-0 rounded-xl border-[#dfe1e6] px-4"
            >
              {copied ? (
                <Check className="h-4 w-4 text-[#00a86b]" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>

          <Button
            type="button"
            onClick={handleWhatsAppShare}
            className="h-11 w-full rounded-xl text-base font-semibold text-white"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="h-4 w-4" />
            Share on WhatsApp
          </Button>

          {typeof navigator !== "undefined" && typeof navigator.share === "function" ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleNativeShare}
              className="h-11 w-full rounded-xl border-[#dfe1e6]"
            >
              <Share2 className="h-4 w-4" />
              Share via device
            </Button>
          ) : null}
        </div>

        <p className="mt-4 text-xs leading-5 text-[#818898]">
          Anyone with this link can open the campaign page on{" "}
          <span style={{ color: BRAND.primary }}>Indura Health</span>.
        </p>
      </div>
    </div>
  );
}
