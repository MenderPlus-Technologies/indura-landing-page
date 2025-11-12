import { Card, CardContent } from "@/components/ui/card";
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
    <section className="w-full items-center gap-14 px-[120px] py-[88px] bg-greyscale-0 flex flex-col">
      <header className="flex flex-col items-center justify-center gap-4 w-full">
        <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-lg text-center tracking-[0] leading-[27.9px]">
          Our Customers
        </div>

        <h2 className="max-w-[554px] [font-family:'Plus_Jakarta_Sans',Helvetica] text-greyscale-900 text-[52px] text-center leading-[65px] font-medium tracking-[0]">
          What Our Users &amp; Providers Say
        </h2>

        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-greyscale-500 text-lg tracking-[0] leading-[27.9px] text-center">
          Here&#39;s what some of our customers say about our platform.
        </p>
      </header>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="flex items-stretch justify-center gap-6 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex-1 bg-white rounded-2xl border-0 shadow-none"
            >
              <CardContent className="items-start gap-10 p-6 flex flex-col h-full">
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <div className="inline-flex items-center gap-0.5">
                      {[...Array(5)].map((_, starIndex) => (
                        <img
                          key={starIndex}
                          className="w-5 h-5"
                          alt="Star"
                          src="/star-01.svg"
                        />
                      ))}
                    </div>

                    <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-greyscale-500 text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {testimonial.rating}
                    </div>
                  </div>

                  <blockquote className="font-heading-small font-[number:var(--heading-small-font-weight)] text-greyscale-900 text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 w-full mt-auto">
                  <div className="inline-flex flex-col items-start gap-0.5">
                    <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#0e1012] text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {testimonial.name}
                    </div>

                    <div className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#566171] text-sm tracking-[0] leading-[21.7px] whitespace-nowrap">
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
