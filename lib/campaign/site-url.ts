const DEFAULT_SITE_URL = "https://www.indurahealth.com";
const APP_HOST = "app.indurahealth.com";
const WWW_HOST = "www.indurahealth.com";

function normalizeOrigin(value: string): string {
  return value.replace(/\/$/, "");
}

/** Public marketing site used for share links and payment return URLs. */
export function getPublicSiteOrigin(requestOrigin?: string): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  }

  if (
    requestOrigin &&
    (requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1"))
  ) {
    return normalizeOrigin(requestOrigin);
  }

  return DEFAULT_SITE_URL;
}

/** Host the payment gateway returns to after checkout (often app.indurahealth.com). */
export function getPaymentCallbackOrigin(requestOrigin?: string): string {
  if (process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL) {
    return normalizeOrigin(process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL);
  }

  if (
    requestOrigin &&
    (requestOrigin.includes("localhost") || requestOrigin.includes("127.0.0.1"))
  ) {
    return normalizeOrigin(requestOrigin);
  }

  // Backend / Flutterwave typically redirect to the app subdomain.
  return `https://${APP_HOST}`;
}

export function isAppHost(host: string): boolean {
  return host === APP_HOST || host.startsWith(`${APP_HOST}:`);
}

export function toWwwOrigin(url: URL): URL {
  const redirected = new URL(url.toString());
  redirected.protocol = "https:";
  redirected.host = WWW_HOST;
  return redirected;
}
