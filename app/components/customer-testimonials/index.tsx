import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React, { JSX } from "react";

const testimonials = [
  {
    rating: 4.8,
    quote:
      "The AI coach helped me save for my annual check-ups without stress.",
    name: "Nkem Ndor",
    role: "Parent",
  },
  {
    rating: 4.8,
    quote: "Our pharmacy lines move faster because payments confirm instantly.",
    name: "Blessing Okoye",
    role: "Pharmacy Owner",
  },
  {
    rating: 4.8,
    quote:
      "Reconciliation used to take hours; now it's minutes with fewer errors.",
    name: "Zainab Maikudi",
    role: "Community Member",
  },
];

export const CustomerTestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full items-center gap-8 md:gap-12 lg:gap-14 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-12 sm:py-16 md:py-20 lg:py-[88px] bg-[#F8FAFB] plusJakarta flex flex-col">
      <header className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full">
        <div className="font-semibold text-[#009688] text-base md:text-lg text-center tracking-[0] leading-[27.9px]">
          Our Customers
        </div>

        <h2 className="max-w-[554px] text-greyscale-900 text-2xl sm:text-4xl md:text-[44px] lg:text-[52px] text-center leading-tight md:leading-tight lg:leading-[65px] font-medium tracking-[0] px-4">
          What Our Users &amp; Providers Say
        </h2>

        <p className="font-normal text-greyscale-500 text-sm sm:text-base md:text-lg tracking-[0] leading-relaxed md:leading-[27.9px] text-center max-w-[600px] px-4">
          Here&#39;s what some of our customers say about our platform.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 md:gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-1 bg-white rounded-2xl border-0 shadow-none w-full"
            >
              <CardContent className="items-start gap-6 md:gap-10 p-4 sm:p-6 flex flex-col h-full">
                <div className="flex flex-col items-start gap-3 md:gap-4 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <div className="inline-flex items-center gap-0.5">
                      {[...Array(5)].map((_, starIndex) => (
                        <Image
                          key={starIndex}
                          className="w-4 h-4 md:w-5 md:h-5"
                          alt="Star"
                          src="/star-01.svg"
                          width={20}
                          height={20}
                        />
                      ))}
                    </div>

                    <div className="font-medium text-greyscale-500 text-sm md:text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {testimonial.rating}
                    </div>
                  </div>

                  <blockquote className="text-greyscale-900 text-base sm:text-lg md:text-xl font-medium leading-relaxed">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 w-full mt-auto">
                  <div className="inline-flex flex-col items-start gap-0.5">
                    <div className="font-medium text-[#0e1012] text-sm md:text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {testimonial.name}
                    </div>

                    <div className="font-normal text-[#566171] text-xs md:text-sm tracking-[0] leading-[21.7px] whitespace-nowrap">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};