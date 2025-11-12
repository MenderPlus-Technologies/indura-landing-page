import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React, { JSX, ReactNode } from "react";

// --- UPDATED FAQ DATA ---
// I've changed the 'answer' type from string to ReactNode to allow for
// rich formatting (lists, paragraphs, bold text).

interface FaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

const faqData: FaqItem[] = [
  {
    id: "item-1",
    question: "What is Indura?",
    answer: (
      <p>
        Indura is a mobile app designed to help you save and plan for your health expenses. Think of it as a dedicated savings wallet just for your medical needs—like hospital visits, prescriptions, lab tests, and emergencies. It combines automated savings, goal setting, and a helpful AI assistant to make managing your health finances simple and stress-free.
      </p>
    ),
  },
  {
    id: "item-2",
    question: "How does the health savings wallet work?",
    answer: (
      <>
        <p>
          It&apos;s simple. You create an account and can start saving in two ways:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
          <li>
            <strong>Automated Savings:</strong> Set a recurring amount (e.g., ₦5,000 every week) to be saved automatically.
          </li>
          <li>
            <strong>Manual Savings:</strong> Top up your wallet with any amount, any time you want.
          </li>
        </ul>
        <p className="mt-4">
          You can also set specific goals (like &quot;₦100,000 for surgery&quot;), and the app will help you track your progress.
        </p>
      </>
    ),
  },
  {
    id: "item-3",
    question: "How do I use my savings for a health expense?",
    answer: (
      <>
        <p>
          When you need to pay for a prescription, lab test, or consultation, you can:
        </p>
      
        <p className="mt-2">
          Pay directly from your Indura wallet at any of our partner hospitals or pharmacies. Just tap &quot;Pay&quot; in the app on the given healthcare provider you visit and they&quot;ll confirm it instantly.
        </p>
       
      </>
    ),
  },
  {
    id: "item-4",
    question: "Is my money safe?",
    answer: (
      <p>
        Absolutely. Your security is our top priority. All transactions are securely processed. Your personal data is encrypted and is never shared without your consent.
      </p>
    ),
  },
  
  {
    id: "item-5",
    question: "What is the AI Health & Finance Assistant?",
    answer: (
      <>
        <p>
          It&apos;s your personal helper for your health finances. It does three things:
        </p>
        <ol className="list-decimal pl-5 space-y-2 mt-4">
          <li>
            <strong>Motivates you:</strong> It sends gentle reminders and encouragement to help you stay on track with your savings goals.
          </li>
          <li>
            <strong>Gives Financial Insights:</strong> It analyzes your health spending to show you exactly where your money is going.
          </li>
          <li>
            <strong>Provides General Info:</strong> It can answer basic, non-diagnostic health questions.{" "}
            <strong>It cannot give you medical advice or a diagnosis.</strong>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "item-6",
    question: "I'm a provider. How do I sign up?",
   answer: (
      <>
        <p>
          We&apos;re excited to have you! The best way to get started is to send an email directly to our team at{" "}
          <strong>hello@menderplus.com</strong>.
        </p>
        <p className="mt-4">
          Once you reach out, we&apos;ll guide you through the simple onboarding process for our provider dashboard. (And just a heads-up, a dedicated mobile app for providers is coming soon!)
        </p>
      </>
    ),
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

        {/* --- REPLACED PLACEHOLDER TEXT --- */}
        <p
          className="w-full max-w-[601px] text-greyscale-500 font-normal 
          text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px]"
        >
          Here are answers to some of the most common questions about how Indura works for both users and providers.
        </p>
      </header>

      {/* Accordion */}
      <Accordion
        type="single"
        collapsible
        defaultValue="item-1" // Changed to open the first item
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
                data-[state=open]:text-textloud-900" // Note: 'text-textloud-900' was in your original, make sure this class exists
              >
                {faq.question}
              </span>
            </AccordionTrigger>

            {/* --- UPDATED RENDER LOGIC --- */}
            {/* This now renders JSX directly, not just a string inside a <p> */}
            {faq.answer && (
              <AccordionContent className="pb-5 sm:pb-6 pt-0">
                <div
                  className="text-greyscale-500 font-normal 
                  text-sm sm:text-base md:text-lg leading-relaxed md:leading-[27.9px] space-y-4"
                >
                  {faq.answer}
                </div>
              </AccordionContent>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};