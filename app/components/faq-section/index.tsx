import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JSX } from "react";

const faqData = [
  {
    id: "item-1",
    question: "How are fees shown?",
    answer: "",
  },
  {
    id: "item-2",
    question: "How fast are settlements for providers?",
    answer:
      "Settlement windows appear in your portal. Payouts can go to bank or mobile money.",
  },
  {
    id: "item-3",
    question: "Is my money safe while saving?",
    answer: "",
  },
  {
    id: "item-4",
    question: "Does Idura give medical advice?",
    answer: "",
  },
];

export const FrequentlyAskedQuestionsSection = (): JSX.Element => {
  return (
    <section
      className="flex flex-col w-full items-center gap-10 sm:gap-12 md:gap-14 
      px-4 sm:px-8 md:px-[120px] py-12 sm:py-16 md:py-[88px] 
      relative plusJakarta"
    >
      {/* Header */}
      <header className="flex flex-col items-center gap-3 sm:gap-4 w-full text-center">
        <div className="font-semibold text-[#009688] text-base sm:text-lg leading-[27.9px]">
          FAQ
        </div>

        <h2
          className="text-greyscale-900 font-medium tracking-[0]
          text-2xl sm:text-3xl md:text-[52px] leading-tight md:leading-[65px]"
        >
          Frequently Asked Questions
        </h2>

        <p
          className="w-full max-w-[601px] text-greyscale-500 font-normal 
          text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px]"
        >
          Hendrerit fames metus leo ut orci pretium. Sit vitae montes egestas
          montes mauris. Auctor vitae neque urna nam nunc pellentesque.
        </p>
      </header>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-2"
        className="w-full max-w-[900px] flex flex-col gap-3 sm:gap-4"
      >
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="bg-white rounded-xl border border-[#eceff3] 
            shadow-[0px_2px_8px_-1px_#0d0d120a] px-4 sm:px-6 py-0"
          >
            <AccordionTrigger className="py-5 sm:py-6 hover:no-underline data-[state=open]:pb-4">
              <span
                className="text-base sm:text-xl md:text-2xl font-medium text-left 
                text-greyscale-900 leading-[1.4] tracking-[0]
                data-[state=open]:text-textloud-900"
              >
                {faq.question}
              </span>
            </AccordionTrigger>

            {faq.answer && (
              <AccordionContent className="pb-5 sm:pb-6 pt-0">
                <p
                  className="text-greyscale-500 font-normal 
                  text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px]"
                >
                  {faq.answer}
                </p>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
