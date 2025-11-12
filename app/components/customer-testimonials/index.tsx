import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
import React, { JSX } from "react";

// --- UPDATED TESTIMONIALS ---
// No more ratings, and the quotes are all about anticipation.
const testimonials = [
  {
    quote:
      "I've always been thinking about how I can have disciplined savings for my health. Seeing the preview of Indura, I know this is going to be a lifesaver. I'm signed up and ready for launch!",
    name: "Nkem Ndor",
    role: "Future User",
  },
  {
    quote:
      "I just signed up and had a personal view of how the app will look. The clean interface for managing payments is exactly what my pharmacy needs. I can't wait to try it when you launch.",
    name: "Blessing Okoye",
    role: "Pharmacy Owner",
  },
  {
    quote:
      "The concept of an AI coach to help plan for health expenses is brilliant. I've joined the waitlist and am genuinely excited to see this in action. This is a much-needed tool.",
    name: "Zainab Maikudi",
    role: "Early Adopter",
  },
];

export const CustomerTestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full items-center gap-8 md:gap-12 lg:gap-14 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-12 sm:py-16 md:py-20 lg:py-[88px] bg-[#F8FAFB] plusJakarta flex flex-col">
      <header className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full">
        <div className="font-semibold text-[#009688] text-base md:text-lg text-center tracking-[0] leading-[27.9px]">
          Our Community
        </div>

        {/* --- TWEAKED HEADER --- */}
        <h2 className="max-w-[554px] text-greyscale-900 text-2xl sm:text-4xl md:text-[44px] lg:text-[52px] text-center leading-tight md:leading-tight lg:leading-[65px] font-medium tracking-[0] px-4">
          What People Are Saying
        </h2>

        {/* --- TWEAKED SUBHEADER --- */}
        <p className="font-normal text-greyscale-500 text-sm sm:text-base md:text-lg tracking-[0] leading-relaxed md:leading-[27.9px] text-center max-w-[600px] px-4">
          Here&apos;s what some of our early adopters think about the platform.
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
                  
                  {/* --- RATING SECTION REMOVED ---
                    Since the app isn't launched, having ratings is misleading.
                    I've commented out the entire block.
                  
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
                  */}

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