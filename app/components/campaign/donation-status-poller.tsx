"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock3, Loader2, XCircle } from "lucide-react";

import type { DonationStatusResponse } from "@/lib/campaign/types";
import { formatCurrency } from "@/lib/campaign/format";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 20;

function normalizeStatus(
  status: DonationStatusResponse["status"],
): "success" | "pending" | "failed" {
  const value = status.toLowerCase();
  if (value === "successful" || value === "success" || value === "completed") {
    return "success";
  }
  if (value === "failed" || value === "cancelled") {
    return "failed";
  }
  return "pending";
}

interface DonationStatusPollerProps {
  reference: string;
  initialStatus: DonationStatusResponse | null;
  initialError: string | null;
}

export function DonationStatusPoller({
  reference,
  initialStatus,
  initialError,
}: DonationStatusPollerProps) {
  const [status, setStatus] = useState<DonationStatusResponse | null>(
    initialStatus,
  );
  const [error, setError] = useState<string | null>(initialError);
  const [isPolling, setIsPolling] = useState(false);
  const pollCountRef = useRef(0);

  const resolved = status ? normalizeStatus(status.status) : null;
  const shouldPoll =
    Boolean(reference) && resolved !== "success" && resolved !== "failed";

  useEffect(() => {
    if (!reference || !shouldPoll) {
      setIsPolling(false);
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;

    async function poll() {
      if (cancelled || pollCountRef.current >= MAX_POLLS) {
        setIsPolling(false);
        return;
      }

      pollCountRef.current += 1;
      setIsPolling(true);

      try {
        const response = await fetch(
          `/api/campaigns/donations/${encodeURIComponent(reference)}/status`,
          { cache: "no-store" },
        );
        const payload = (await response.json()) as DonationStatusResponse & {
          message?: string;
        };

        if (!response.ok) {
          throw new Error(payload.message || "Unable to verify donation status");
        }

        setStatus(payload);
        setError(null);

        const next = normalizeStatus(payload.status);
        if (next !== "pending") {
          setIsPolling(false);
          return;
        }
      } catch (pollError) {
        if (pollCountRef.current === 1 && !initialStatus) {
          setError(
            pollError instanceof Error
              ? pollError.message
              : "We could not verify your payment yet.",
          );
        }
      }

      if (!cancelled && pollCountRef.current < MAX_POLLS) {
        timeoutId = window.setTimeout(() => {
          void poll();
        }, POLL_INTERVAL_MS);
      } else {
        setIsPolling(false);
      }
    }

    void poll();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
      setIsPolling(false);
    };
  }, [reference, shouldPoll, initialStatus]);

  const isSuccess = resolved === "success";
  const isFailed = resolved === "failed";
  const isPending = !isSuccess && !isFailed;

  return (
    <>
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-full ${
          isSuccess
            ? "bg-[#e6f4ea]"
            : isFailed
              ? "bg-[#fdecea]"
              : "bg-[#fff7e6]"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="h-10 w-10 text-[#00a86b]" />
        ) : isFailed ? (
          <XCircle className="h-10 w-10 text-[#ef5350]" />
        ) : isPolling ? (
          <Loader2 className="h-10 w-10 animate-spin text-[#f59e0b]" />
        ) : (
          <Clock3 className="h-10 w-10 text-[#f59e0b]" />
        )}
      </div>

      <h1 className="mt-6 text-3xl font-bold text-[#0d0d12]">
        {isSuccess
          ? "Thank you for your donation"
          : isFailed
            ? "Donation was not completed"
            : reference
              ? "Payment is being confirmed"
              : "Donation reference missing"}
      </h1>

      <p className="mt-3 max-w-lg text-base leading-7 text-[#666d80]">
        {isSuccess
          ? "Your support helps someone get closer to the care they need."
          : isFailed
            ? "The payment did not go through. You can return to the campaign and try again."
            : reference
              ? "We are verifying your payment with the donation reference returned from checkout."
              : "Open this page from the payment return link so we can verify your donation."}
      </p>

      {status?.amount ? (
        <p className="mt-4 text-sm text-[#666d80]">
          Amount:{" "}
          <span className="font-semibold text-[#0d0d12]">
            {formatCurrency(status.amount, status.currency || "NGN")}
          </span>
        </p>
      ) : null}

      {reference ? (
        <p className="mt-4 rounded-xl bg-white px-4 py-3 text-sm text-[#666d80] shadow-sm">
          Donation reference:{" "}
          <span className="font-medium text-[#0d0d12]">{reference}</span>
        </p>
      ) : null}

      {error ? (
        <p className="mt-4 max-w-lg text-sm leading-6 text-[#ef5350]">{error}</p>
      ) : null}

      {isPending && !error ? (
        <p className="mt-4 max-w-lg text-sm leading-6 text-[#666d80]">
          {isPolling
            ? "Checking payment status..."
            : "If this stays pending, refresh in a moment. The backend reconciles the payment through its verified webhook."}
        </p>
      ) : null}
    </>
  );
}
