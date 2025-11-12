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
    <section className="flex flex-col w-full items-center gap-14 px-[120px] py-[88px] relative">
      <header className="flex flex-col items-center gap-4 relative self-stretch w-full">
        <div className="relative self-stretch [font-family:'Plus_Jakarta_Sans',Helvetica] font-semibold text-[#009688] text-lg text-center tracking-[0] leading-[27.9px]">
          FAQ
        </div>

        <h2 className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-greyscale-900 text-[52px] text-center leading-[65px] relative font-medium tracking-[0]">
          Frequently Asked Questions
        </h2>

        <p className="relative w-full max-w-[601px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-greyscale-500 text-lg text-center tracking-[0] leading-[27.9px]">
          Hendrerit fames metus leo ut orci pretium. Sit vitae montes egestas
          montes mauris. Auctor vitae neque urna nam nunc pellentesque.
        </p>
      </header>

      <Accordion
        type="single"
        collapsible
        defaultValue="item-2"
        className="w-full max-w-[900px] flex flex-col gap-4"
      >
        {faqData.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="bg-white rounded-xl border border-solid border-[#eceff3] shadow-[0px_2px_8px_-1px_#0d0d120a] px-6 py-0"
          >
            <AccordionTrigger className="py-6 hover:no-underline [&[data-state=open]]:pb-4">
              <span className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-2xl tracking-[0] leading-[31.2px] font-medium text-left text-greyscale-900 data-[state=open]:text-textloud-900">
                {faq.question}
              </span>
            </AccordionTrigger>
            {faq.answer && (
              <AccordionContent className="pb-6 pt-0">
                <p className="[font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-greyscale-500 text-lg tracking-[0] leading-[27.9px]">
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
