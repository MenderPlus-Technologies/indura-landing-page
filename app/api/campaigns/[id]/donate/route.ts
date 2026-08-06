import { NextResponse } from "next/server";

import {
  CampaignApiError,
  getDonationCallbackUrl,
  getDonationSuccessUrl,
  initiateDonationCheckout,
} from "@/lib/campaign/api";
import {
  createMockDonationCheckout,
  shouldUseMockDonationFallback,
} from "@/lib/campaign/dev-mock";
import type { DonateCheckoutProxyRequest } from "@/lib/campaign/types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request, context: RouteContext) {
  const { id: campaignId } = await context.params;

  try {
    const body = (await request.json()) as DonateCheckoutProxyRequest;

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { message: "Enter a valid donation amount" },
        { status: 400 },
      );
    }

    if (!body.email?.trim() || !isValidEmail(body.email.trim())) {
      return NextResponse.json(
        { message: "Enter a valid email address" },
        { status: 400 },
      );
    }

    if (!body.phone?.trim()) {
      return NextResponse.json(
        { message: "Enter a phone number" },
        { status: 400 },
      );
    }

    const anonymous = Boolean(body.anonymous);
    const name = anonymous
      ? "Anonymous"
      : body.name?.trim() || "";

    if (!anonymous && !name) {
      return NextResponse.json(
        { message: "Enter your name or choose anonymous donation" },
        { status: 400 },
      );
    }

    const origin = new URL(request.url).origin;
    const callbackUrl = body.redirectUrl || getDonationCallbackUrl(campaignId, origin);
    const successUrl = getDonationSuccessUrl(campaignId, origin);

    const checkoutBody = {
      amount: body.amount,
      name,
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      anonymous,
      redirectUrl: callbackUrl,
    };

    try {
      const checkout = await initiateDonationCheckout(campaignId, checkoutBody);
      return NextResponse.json(checkout);
    } catch (error) {
      if (shouldUseMockDonationFallback(error)) {
        const mockCheckout = createMockDonationCheckout({
          campaignId,
          amount: body.amount,
          redirectUrl: successUrl,
        });

        return NextResponse.json({
          ...mockCheckout,
          mock: true,
          message: "Backend unavailable locally. Using dev mock redirect.",
        });
      }

      throw error;
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to start donation checkout";

    const status =
      error instanceof CampaignApiError
        ? error.status
        : error instanceof Error && "status" in error
          ? Number((error as { status?: number }).status) || 502
          : 502;

    return NextResponse.json({ message }, { status });
  }
}
