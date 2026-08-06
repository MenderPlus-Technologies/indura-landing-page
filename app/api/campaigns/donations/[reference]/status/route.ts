import { NextResponse } from "next/server";

import { CampaignApiError, fetchDonationStatus } from "@/lib/campaign/api";
import {
  createMockDonationStatus,
  isMockDonationReference,
  shouldUseMockDonationFallback,
} from "@/lib/campaign/dev-mock";

interface RouteContext {
  params: Promise<{ reference: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { reference } = await context.params;

  if (isMockDonationReference(reference)) {
    return NextResponse.json(
      createMockDonationStatus({
        reference,
        status: "successful",
      }),
    );
  }

  try {
    const status = await fetchDonationStatus(reference);
    return NextResponse.json(status);
  } catch (error) {
    if (shouldUseMockDonationFallback(error)) {
      return NextResponse.json(
        createMockDonationStatus({
          reference,
          status: "pending",
          message: "Backend status route not available locally yet.",
        }),
      );
    }

    const message =
      error instanceof Error
        ? error.message
        : "Unable to verify donation status";

    const statusCode =
      error instanceof CampaignApiError
        ? error.status
        : error instanceof Error && "status" in error
          ? Number((error as { status?: number }).status) || 502
          : 502;

    return NextResponse.json({ message }, { status: statusCode });
  }
}
