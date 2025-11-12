'use client';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { JSX, useState } from "react";
import { Modal } from "../reusable-modal";

export const CallToActionFooterSection = (): JSX.Element => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEarlyAccess = () => {
    setLoading(true);
    setShowFormModal(true);
  };

  return (
    <>
      <section className="flex flex-col items-center plusJakarta pt-8 pb-12 md:pb-16 lg:pb-[88px] w-full">
        <div className="relative w-full overflow-hidden mx-0 md:mx-4 lg:mx-8 rounded-none">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/CTA.svg"
              alt="Gradient background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Container */}
          <div className="relative flex flex-col lg:flex-row items-center justify-between lg:justify-start py-12 sm:py-16 md:py-20 lg:py-0">
            {/* Text Content */}
            <div className="flex flex-col items-start justify-center gap-4 flex-1 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[122px] lg:py-12 xl:py-16">
              <div className="flex flex-col items-start justify-center gap-3 md:gap-4">
                <h2 className="text-white lg:w-[800px] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] leading-tight md:leading-[1.2] lg:leading-20 font-medium tracking-[0]">
                  Activate Indura at Your Health Facility. Get Paid, Reconcile,
                  Relax
                </h2>

                <p className="max-w-[601px] font-normal text-white text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px]">
                  Live transactions • Clean statements • Sandbox available
                </p>
              </div>

              <div className="inline-flex gap-4 items-center mt-2">
                <Button
                  onClick={handleEarlyAccess}
                  className="cursor-pointer  h-12 md:h-[52px] justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white rounded-xl border border-solid border-[#dfe1e6] font-semibold text-[#009688] text-sm md:text-base tracking-[0] leading-[24.8px] hover:bg-white/90"
                >
                  Get Early Access
                </Button>
              </div>
            </div>

            {/* Image Content - Now extends full height */}
            <div className="relative w-full lg:block hidden lg:w-[550px] xl:w-[600px] shrink-0 h-80 lg:h-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:pr-12 xl:pr-24">
              <Image
                src="/african-american-medical-doctor-man 1.svg"
                alt="Health facility illustration"
                fill
                className="object-contain lg:object-cover lg:object-right"
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        maxWidth="2xl"
      >
        <div className="relative w-full h-[600px]">
          {/* Loader overlay */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-[#009688]" />
            </div>
          )}

          <iframe
            src="https://forms.gle/jZpee78KBPccwMBp6"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-b-lg"
            onLoad={() => setLoading(false)}
            loading="lazy"
          ></iframe>
        </div>

        <div className="p-4 text-center border-t bg-gray-50">
          <button
            onClick={() =>
              window.open("https://forms.gle/jZpee78KBPccwMBp6", "_blank")
            }
            className="text-[#009688] hover:underline text-sm font-medium"
          >
            Prefer to open in a new tab? →
          </button>
        </div>
      </Modal>
    </>
  );
};
