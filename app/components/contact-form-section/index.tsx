import React, { JSX } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

const formFields = [
  {
    id: "fullName",
    label: "Full Name",
    placeholder: "Input your full name",
    type: "input",
    required: true,
  },
  {
    id: "email",
    label: "Email",
    placeholder: "example@email.com",
    type: "input",
    required: true,
  },
  {
    id: "message",
    label: "Message",
    placeholder: "Input your message",
    type: "textarea",
    required: true,
  },
];

export const ContactFormSection = (): JSX.Element => {
  return (
    <section className="relative w-full flex flex-col items-center justify-center gap-11 pt-0 pb-40 px-8 bg-white">
      <div className="relative w-full flex flex-col items-center gap-12 pt-14 pb-20 px-0 bg-white rounded-[0px_0px_32px_32px] overflow-hidden h-[750px]">
        <img
          className="absolute right-[-668px] -bottom-24 w-[708px] h-[750px]"
          alt="Gradient"
          src="/gradient.svg"
        />

        <img
          className="absolute left-0 -bottom-24 w-[861px] h-[750px]"
          alt="Gradient"
          src="/gradient-1.svg"
        />

        <div className="flex flex-col items-center justify-center gap-4 w-full z-10">
          <h2 className="w-[743px] mt-[-1.00px] font-display-medium text-[#0d0d12] text-[length:var(--display-medium-font-size)] text-center leading-[var(--display-medium-line-height)] font-[number:var(--display-medium-font-weight)] tracking-[var(--display-medium-letter-spacing)] [font-style:var(--display-medium-font-style)]">
            Let&apos;s Talk
          </h2>

          <p className="w-[601px] font-body-large-regular font-[number:var(--body-large-regular-font-weight)] text-[#666d80] text-[length:var(--body-large-regular-font-size)] text-center tracking-[var(--body-large-regular-letter-spacing)] leading-[var(--body-large-regular-line-height)] [font-style:var(--body-large-regular-font-style)]">
            Join us as we explore tailored solutions, discuss industry insights,
            and collaborate to find the best strategies for your success.
          </p>
        </div>
      </div>

      <Card className="w-[600px] absolute top-[241px] left-[calc(50.00%_-_300px)] rounded-2xl border border-solid border-[#eceff3] shadow-[0px_2px_8px_-1px_#0d0d120a] bg-white">
        <CardHeader className="pt-8 px-10 pb-0">
          <CardTitle className="mt-[-1.00px] font-display-xsmall text-[#0d0d12] text-[length:var(--display-xsmall-font-size)] text-center leading-[var(--display-xsmall-line-height)] font-[number:var(--display-xsmall-font-weight)] tracking-[var(--display-xsmall-letter-spacing)] [font-style:var(--display-xsmall-font-style)]">
            Speak to us
          </CardTitle>
        </CardHeader>
        <CardContent className="px-10 pb-10 pt-8">
          <div className="flex flex-col items-start gap-8 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              {formFields.map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col items-center gap-1 w-full"
                >
                  <div className="flex items-center w-full">
                    <Label
                      htmlFor={field.id}
                      className="flex items-center justify-center w-fit mt-[-1.00px] font-body-small-medium font-[number:var(--body-small-medium-font-weight)] text-textmuted-600 text-[length:var(--body-small-medium-font-size)] tracking-[var(--body-small-medium-letter-spacing)] leading-[var(--body-small-medium-line-height)] whitespace-nowrap [font-style:var(--body-small-medium-font-style)]"
                    >
                      {field.label}
                    </Label>

                    {field.required && (
                      <span className="w-fit mt-[-1.00px] font-body-medium-medium font-[number:var(--body-medium-medium-font-weight)] text-alertserrorbase text-[length:var(--body-medium-medium-font-size)] tracking-[var(--body-medium-medium-letter-spacing)] leading-[var(--body-medium-medium-line-height)] whitespace-nowrap [font-style:var(--body-medium-medium-font-style)]">
                        *
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    {field.type === "input" ? (
                      <Input
                        id={field.id}
                        placeholder={field.placeholder}
                        className="h-12 items-center gap-2 px-3 py-1.5 bg-backgroundwhite rounded-[10px] overflow-hidden shadow-form-input-normal w-full font-body-medium-regular font-[number:var(--body-medium-regular-font-weight)] text-greyscale-300 text-[length:var(--body-medium-regular-font-size)] tracking-[var(--body-medium-regular-letter-spacing)] leading-[var(--body-medium-regular-line-height)] [font-style:var(--body-medium-regular-font-style)]"
                      />
                    ) : (
                      <Textarea
                        id={field.id}
                        placeholder={field.placeholder}
                        className="h-[132px] items-start gap-2 px-3 py-1.5 bg-backgroundwhite rounded-[10px] overflow-hidden shadow-form-input-normal w-full font-body-medium-regular font-[number:var(--body-medium-regular-font-weight)] text-greyscale-300 text-[length:var(--body-medium-regular-font-size)] tracking-[var(--body-medium-regular-letter-spacing)] leading-[var(--body-medium-regular-line-height)] [font-style:var(--body-medium-regular-font-style)] resize-none"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 w-full items-center">
              <Button className="h-[52px] justify-center gap-2 p-4 flex-1 bg-[#009688] rounded-xl overflow-hidden items-center hover:bg-[#00897b]">
                <span className="w-fit mt-[-3.50px] mb-[-1.50px] font-body-medium-semibold font-[number:var(--body-medium-semibold-font-weight)] text-white text-[length:var(--body-medium-semibold-font-size)] tracking-[var(--body-medium-semibold-letter-spacing)] leading-[var(--body-medium-semibold-line-height)] whitespace-nowrap [font-style:var(--body-medium-semibold-font-style)]">
                  Send Message
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
