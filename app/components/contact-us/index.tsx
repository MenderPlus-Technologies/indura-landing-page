"use client";
import React, { JSX, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner"; 

const formFields = [
  {
    id: "fullName" as const,
    label: "Full Name",
    placeholder: "Input your full name",
    type: "input",
    required: true,
  },
  {
    id: "email" as const,
    label: "Email",
    placeholder: "example@email.com",
    type: "input",
    required: true,
  },
  {
    id: "message" as const,
    label: "Message",
    placeholder: "Input your message",
    type: "textarea",
    required: true,
  },
];

const contactSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
  });
  
  type ContactFormData = z.infer<typeof contactSchema>;

export const ContactUsSection = (): JSX.Element => {
    const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),   
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Contact form error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-11 bg-white px-4 md:px-8 pb-24 md:pb-32 pt-0">
      {/* Background / heading block */}
      <div className="relative flex w-full flex-col items-center gap-8 md:gap-12 overflow-hidden rounded-b-[32px] bg-white px-0 pb-16 md:pb-20 pt-12 md:pt-14 min-h-[360px] md:min-h-[460px]">
        <img
          className="pointer-events-none absolute -bottom-24 right-[-200px] md:right-[-400px] h-[400px] md:h-[650px] w-[480px] md:w-[708px]"
          alt="Gradient"
          src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient-2.svg"
        />
        <img
          className="pointer-events-none absolute -bottom-24 left-[-120px] md:left-0 h-[400px] md:h-[650px] w-[520px] md:w-[861px]"
          alt="Gradient"
          src="https://c.animaapp.com/mm8xgcl4CkUVff/img/gradient-1.svg"
        />

        <div className="relative flex w-full flex-col items-center justify-center gap-4 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms]">
          <h2 className="relative max-w-[90%] md:max-w-[743px] font-display-medium text-[#0d0d12] font-medium text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-center leading-tight">
            Let&apos;s Talk
          </h2>

          <p className="relative max-w-[90%] md:max-w-[601px] text-[#666d80] text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed">
            Join us as we explore tailored solutions, discuss industry insights,
            and collaborate to find the best strategies for your success.
          </p>
        </div>
      </div>

      {/* Contact form card */}
      <Card
        className="
        w-full
        max-w-[90%]
        sm:max-w-[500px]
        md:max-w-[600px]
        lg:w-[600px]
        -mt-32
        md:-mt-40
        rounded-2xl 
        border 
        border-solid 
        border-[#eceff3] 
        shadow-[0px_2px_8px_-1px_#0d0d120a] 
        bg-white
        transform-gpu
      "
      >
        <CardHeader className="pt-8 px-6 md:px-10 pb-0">
          <CardTitle className="font-display-xsmall text-[#0d0d12] text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-medium text-center">
            Speak to us
          </CardTitle>
        </CardHeader>

        <CardContent className="px-6 md:px-10 pb-10 pt-8">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start gap-8 w-full">
            <div className="flex flex-col items-start gap-6 w-full">
              {formFields.map((field) => (
                <div key={field.id} className="flex flex-col items-start gap-1 w-full">
                  <div className="flex items-center w-full gap-1">
                    <Label
                      htmlFor={field.id}
                      className="text-[#444] text-sm md:text-base font-medium"
                    >
                      {field.label}
                    </Label>

                    {field.required && (
                      <span className="text-red-500">*</span>
                    )}
                  </div>

                  <div className="flex flex-col items-start gap-1.5 w-full">
                    {field.type === "input" ? (
                      <>
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          className="h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full"
                          {...register(field.id)}
                        />
                        {errors[field.id] && (
                          <p className="text-red-500 text-xs">{errors[field.id]?.message}</p>
                        )}
                      </>
                    ) : (
                      <>
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          className="h-[132px] px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] resize-none w-full"
                          {...register(field.id)}
                        />
                        {errors[field.id] && (
                          <p className="text-red-500 text-xs">{errors[field.id]?.message}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center w-full">
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="h-[52px] cursor-pointer px-6 bg-[#009688] hover:bg-[#00897b] text-white font-semibold rounded-xl w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};
