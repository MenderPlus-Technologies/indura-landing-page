"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BRAND } from "@/lib/site-config";
import type { PublicCampaign } from "@/lib/campaign/types";
import {
  formatAmountInput,
  formatCurrency,
  parseAmountInput,
} from "@/lib/campaign/format";

interface CampaignDonateModalProps {
  campaign: PublicCampaign;
  open: boolean;
  onClose: () => void;
}

export function CampaignDonateModal({
  campaign,
  open,
  onClose,
}: CampaignDonateModalProps) {
  const [amount, setAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!open) return null;

  const parsedAmount = parseAmountInput(amount);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(formatAmountInput(event.target.value));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!parsedAmount || parsedAmount <= 0) {
      toast.error("Enter a valid donation amount");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount,
          donorName: anonymous ? undefined : donorName || undefined,
          message: message || undefined,
          anonymous,
        }),
      });

      const payload = (await response.json()) as {
        checkoutUrl?: string;
        message?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(
          payload.message ||
            "Web donations are not live yet. The backend checkout endpoint is still being set up.",
        );
      }

      window.location.href = payload.checkoutUrl;
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close donation modal"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl plusJakarta">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-[#0d0d12]">Donate</h2>
            <p className="mt-1 text-sm text-[#666d80]">
              Support {campaign.title}
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

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donation-amount">Amount ({campaign.currency})</Label>
            <Input
              id="donation-amount"
              inputMode="numeric"
              placeholder="e.g. 5,000"
              value={amount}
              onChange={handleAmountChange}
              required
            />
            {parsedAmount > 0 ? (
              <p className="text-xs text-[#818898]">
                You are donating {formatCurrency(parsedAmount, campaign.currency)}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-name">Your name (optional)</Label>
            <Input
              id="donor-name"
              placeholder="Ada O."
              value={donorName}
              disabled={anonymous}
              onChange={(event) => setDonorName(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donation-message">Message (optional)</Label>
            <Textarea
              id="donation-message"
              placeholder="Wishing you a speedy recovery"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[#666d80]">
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(event) => setAnonymous(event.target.checked)}
              className="rounded border-[#dfe1e6]"
            />
            Donate anonymously
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 w-full rounded-xl text-base font-semibold text-white"
            style={{ backgroundColor: BRAND.primary }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Starting checkout...
              </>
            ) : (
              "Continue to payment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
