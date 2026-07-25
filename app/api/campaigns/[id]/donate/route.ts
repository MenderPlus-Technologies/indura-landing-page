import { NextResponse } from "next/server";

import { initiateCampaignDonation } from "@/lib/campaign/api";
import type { DonateInitiateRequest } from "@/lib/campaign/types";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const body = (await request.json()) as DonateInitiateRequest;

    if (!body.amount || body.amount <= 0) {
      return NextResponse.json(
        { message: "Enter a valid donation amount" },
        { status: 400 },
      );
    }

    const checkout = await initiateCampaignDonation(id, body);
    return NextResponse.json(checkout);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to start donation checkout";

    const status =
      error instanceof Error && "status" in error
        ? Number((error as { status?: number }).status) || 502
        : 502;

    return NextResponse.json(
      {
        message:
          status === 404
            ? message
            : "Web donation checkout is not available yet. Sheyin is still wiring the public donate endpoint.",
      },
      { status: status === 404 ? 404 : 503 },
    );
  }
}
