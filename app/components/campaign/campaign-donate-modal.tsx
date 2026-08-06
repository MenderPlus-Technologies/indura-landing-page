"use client";

import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CampaignDonateModal({
  campaign,
  open,
  onClose,
}: CampaignDonateModalProps) {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !isValidEmail(trimmedEmail)) {
      toast.error("Enter a valid email address");
      return;
    }

    if (!trimmedPhone) {
      toast.error("Enter a phone number");
      return;
    }

    if (!anonymous && !trimmedName) {
      toast.error("Enter your name or choose anonymous donation");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/campaigns/${campaign.id}/donate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parsedAmount,
          name: anonymous ? "Anonymous" : trimmedName,
          email: trimmedEmail,
          phone: trimmedPhone,
          anonymous,
        }),
      });

      const payload = (await response.json()) as {
        checkoutUrl?: string;
        message?: string;
      };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(
          payload.message || "Unable to start donation checkout.",
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
            <Label htmlFor="donor-name">
              Full name{anonymous ? " (hidden)" : ""}
            </Label>
            <Input
              id="donor-name"
              placeholder="Ada O."
              value={name}
              disabled={anonymous}
              onChange={(event) => setName(event.target.value)}
              required={!anonymous}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-email">Email</Label>
            <Input
              id="donor-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-phone">Phone</Label>
            <Input
              id="donor-phone"
              type="tel"
              inputMode="tel"
              placeholder="08012345678"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
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
