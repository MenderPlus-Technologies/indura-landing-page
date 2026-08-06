import type { PublicCampaign } from "./types";

export function formatCurrency(amount: number, currency = "NGN"): string {
  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString("en-NG")}`;
  }
}

/** Strip non-digits from amount input. */
export function sanitizeAmountInput(raw: string): string {
  return raw.replace(/[^\d]/g, "");
}

/** Format digits with thousand separators for display in inputs. */
export function formatAmountInput(raw: string): string {
  const digits = sanitizeAmountInput(raw);
  if (!digits) return "";

  const amount = Number(digits);
  if (!Number.isFinite(amount)) return "";

  return new Intl.NumberFormat("en-NG", {
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Parse a formatted amount string back to a number. */
export function parseAmountInput(formatted: string): number {
  const digits = sanitizeAmountInput(formatted);
  if (!digits) return 0;

  return Number(digits);
}

export function getCampaignProgress(campaign: PublicCampaign): number {
  if (campaign.targetAmount <= 0) return 0;
  return Math.min(campaign.raisedAmount / campaign.targetAmount, 1);
}

export function getCampaignProgressLabel(campaign: PublicCampaign): string {
  return `${Math.round(getCampaignProgress(campaign) * 100)}% funded`;
}

export function formatCampaignDeadline(endDate?: string | null): string | null {
  if (!endDate) return null;

  const date = new Date(endDate);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatCategoryLabel(category: string): string {
  return category
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function isCampaignDonatable(campaign: PublicCampaign): boolean {
  if (campaign.status !== "active") return false;

  if (campaign.endDate) {
    const deadline = new Date(campaign.endDate);
    deadline.setHours(23, 59, 59, 999);
    if (deadline.getTime() < Date.now()) return false;
  }

  return true;
}

export function getCampaignClosedReason(campaign: PublicCampaign): string | null {
  if (campaign.status !== "active") {
    return "This campaign is no longer active.";
  }

  if (campaign.endDate) {
    const deadline = new Date(campaign.endDate);
    deadline.setHours(23, 59, 59, 999);
    if (deadline.getTime() < Date.now()) {
      return "This campaign has passed its deadline.";
    }
  }

  return null;
}
