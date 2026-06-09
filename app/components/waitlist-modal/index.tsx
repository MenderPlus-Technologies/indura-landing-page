"use client";

import { JSX, useState } from "react";
import { Modal } from "../reusable-modal";
import { WAITLIST_FORM_URL } from "@/lib/site-config";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal = ({
  isOpen,
  onClose,
}: WaitlistModalProps): JSX.Element => {
  const [loading, setLoading] = useState(true);

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="relative w-full h-[600px]">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-[#009688]" />
          </div>
        )}

        <iframe
          src={WAITLIST_FORM_URL}
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          className="rounded-b-lg"
          onLoad={() => setLoading(false)}
          loading="lazy"
          title="Indura waitlist form"
        />
      </div>

      <div className="p-4 text-center border-t bg-gray-50">
        <button
          onClick={() => window.open(WAITLIST_FORM_URL, "_blank")}
          className="text-[#009688] hover:underline text-sm font-medium"
        >
          Prefer to open in a new tab? →
        </button>
      </div>
    </Modal>
  );
};
