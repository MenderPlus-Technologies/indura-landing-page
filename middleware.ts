import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { isAppHost, toWwwOrigin } from "@/lib/campaign/site-url";

const CAMPAIGN_PATH = /^\/campaign\/([^/]+)$/;

function buildSuccessRedirectUrl(
  request: NextRequest,
  campaignId: string,
  reference: string,
): URL {
  const target = toWwwOrigin(request.nextUrl);
  target.pathname = `/campaign/${campaignId}/donate/success`;
  target.search = "";
  target.searchParams.set("reference", reference);
  return target;
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const payment = searchParams.get("payment");
  const reference = searchParams.get("reference");
  const campaignMatch = pathname.match(CAMPAIGN_PATH);

  // Payment gateway returns with ?payment=callback&reference=CDON-...
  if (
    payment === "callback" &&
    reference &&
    campaignMatch &&
    campaignMatch[1]
  ) {
    return NextResponse.redirect(
      buildSuccessRedirectUrl(request, campaignMatch[1], reference),
    );
  }

  // app.indurahealth.com may lag behind www — keep campaign web flow on www.
  if (isAppHost(host) && pathname.startsWith("/campaign/")) {
    return NextResponse.redirect(toWwwOrigin(request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/campaign/:path*"],
};
