export function getCampaignShareUrl(
  campaignId: string,
  origin?: string,
): string {
  const siteUrl =
    origin ||
    (typeof window !== "undefined" ? window.location.origin : undefined) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.indurahealth.com";

  return `${siteUrl.replace(/\/$/, "")}/campaign/${campaignId}`;
}

export function getWhatsAppShareUrl(text: string, url: string): string {
  const message = `${text}\n\n${url}`.trim();
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to legacy copy.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export async function shareCampaignLink(options: {
  title: string;
  text: string;
  url: string;
}): Promise<"shared" | "copied" | "failed"> {
  const shareData = {
    title: options.title,
    text: options.text,
    url: options.url,
  };

  if (typeof navigator.share === "function") {
    try {
      if (
        typeof navigator.canShare !== "function" ||
        navigator.canShare(shareData)
      ) {
        await navigator.share(shareData);
        return "shared";
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  const copied = await copyTextToClipboard(options.url);
  return copied ? "copied" : "failed";
}
