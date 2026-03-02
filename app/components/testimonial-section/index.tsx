import { StarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CSSProperties, JSX } from "react";

const testimonials = [
  {
    rating: 4.8,
    quote: "I've always been thinking about how I can have disciplined savings for my health. Seeing the preview of Indura, I know this is going to be a lifesaver. I'm signed up and ready for launch!",

    name: "Nkem Ndor",
    role: "Future User",

  },
  {
    rating: 4.8,
    quote: "I just signed up and had a personal view of how the app will look. The clean interface for managing payments is exactly what my pharmacy needs. I can't wait to try it when you launch.",

    name: "Blessing Okoye",
    role: "Pharmacy Owner",
  },
  {
    rating: 4.8,
    quote: "The concept of an AI coach to help plan for health expenses is brilliant. I've joined the waitlist and am genuinely excited to see this in action. This is a much-needed tool.",

    name: "Zainab Maikudi",
    role: "Early Adopter",
  },
];

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="w-full items-center gap-10 md:gap-14 px-4 md:px-[120px] py-12 md:py-[88px] bg-greyscale-0 flex flex-col">
      <header className="flex flex-col items-center justify-center gap-3 md:gap-4 w-full max-w-full translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-sm sm:text-base md:text-lg text-center tracking-[0] leading-[27.9px]">
          Our Customers
        </p>

        <h2 className="max-w-[554px] lg:whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-greyscale-900 text-2xl sm:text-3xl md:text-4xl lg:text-[52px] text-center leading-tight md:leading-[44px] lg:leading-[65px] font-medium tracking-[0]">
        What People Are Saying

        </h2>

        <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-greyscale-500 text-sm sm:text-base md:text-lg tracking-[0] leading-relaxed md:leading-[27.9px] text-center max-w-[600px]">
        Here&apos;s what some of our early adopters think about the platform.

        </p>
      </header>

      <div className="flex flex-col items-center gap-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <Card
              key={`testimonial-${index}`}
              className="bg-white rounded-2xl border-0 shadow-sm translate-y-[-1rem] animate-fade-in"
              style={
                {
                  "--animation-delay": `${(index + 1) * 200}ms`,
                } as CSSProperties
              }
            >
              <CardContent className="flex flex-col items-start gap-6 md:gap-10 p-6">
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-center gap-2 w-full">
                    <div className="inline-flex items-center gap-0.5">
                      {[...Array(5)].map((_, starIndex) => (
                        <StarIcon
                          key={`star-${starIndex}`}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>

                    <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-greyscale-500 text-sm md:text-base tracking-[0] leading-[25.6px]">
                      {testimonial.rating}
                    </span>
                  </div>

                  <blockquote className="font-heading-small font-[number:var(--heading-small-font-weight)] text-greyscale-900 text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                    "{testimonial.quote}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-4 w-full">
                  <div className="inline-flex flex-col items-start gap-0.5">
                      <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-[#0e1012] text-sm md:text-base tracking-[0] leading-[25.6px] whitespace-nowrap">
                      {testimonial.name}
                    </p>

                    <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-[#566171] text-xs md:text-sm tracking-[0] leading-[21.7px] whitespace-nowrap">
                      {testimonial.role}
                    </p>
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
