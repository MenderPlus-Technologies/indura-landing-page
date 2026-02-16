'use client';
import { Card, CardContent } from "@/components/ui/card";
import { JSX } from "react";

const testimonials = [
  {
    quote: "I've always been thinking about how I can have disciplined savings for my health. Seeing the preview of Indura, I know this is going to be a lifesaver. I'm signed up and ready for launch!",
    name: "Nkem Ndor",
    role: "Future User",
  },
  {
    quote: "I just signed up and had a personal view of how the app will look. The clean interface for managing payments is exactly what my pharmacy needs. I can't wait to try it when you launch.",
    name: "Blessing Okoye",
    role: "Pharmacy Owner",
  },
  {
    quote: "The concept of an AI coach to help plan for health expenses is brilliant. I've joined the waitlist and am genuinely excited to see this in action. This is a much-needed tool.",
    name: "Zainab Maikudi",
    role: "Early Adopter",
  },
];

export const CustomerTestimonialsSection = (): JSX.Element => {
  return (
    <section 
      id="testimonials"
      className="w-full items-center gap-8 md:gap-12 lg:gap-14 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-[120px] py-12 sm:py-16 md:py-20 lg:py-[88px] bg-[#F8FAFB] plusJakarta flex flex-col transform-gpu"
    >
      <header className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-[1200px]">
        <div className="font-semibold text-[#009688] text-base md:text-lg text-center tracking-[0] leading-[27.9px]">
          Our Community
        </div>

        <h2 className="max-w-[554px] text-greyscale-900 text-2xl sm:text-4xl md:text-[44px] lg:text-[52px] text-center leading-tight md:leading-tight lg:leading-[65px] font-medium tracking-[0] px-4">
          What People Are Saying
        </h2>

        <p className="font-normal text-greyscale-500 text-sm sm:text-base md:text-lg tracking-[0] leading-relaxed md:leading-[27.9px] text-center max-w-[600px] px-4">
          Here&apos;s what some of our early adopters think about the platform.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6 w-full max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`testimonial-${index}`}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full"
            >
              <CardContent className="p-6 flex flex-col justify-between h-full min-h-[280px]">
                <blockquote className="text-greyscale-900 text-base sm:text-lg font-medium leading-relaxed mb-6">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div className="flex items-center gap-4 w-full">
                  <div className="flex flex-col items-start gap-0.5">
                    <div className="font-semibold text-[#0e1012] text-sm md:text-base tracking-[0] leading-tight">
                      {testimonial.name}
                    </div>
                    <div className="font-normal text-[#566171] text-xs md:text-sm tracking-[0] leading-tight">
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