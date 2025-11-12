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

// Validation schema
const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

export const ContactFormSection = (): JSX.Element => {
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
    <section className="relative w-full plusJakarta flex flex-col items-center justify-center gap-11 pt-0 pb-60 lg:40 px-4 sm:px-6 md:px-8 bg-white">
      {/* Background Section */}
      <div className="relative w-full flex flex-col items-center gap-6 md:gap-12 pt-14 pb-20 px-0 bg-white rounded-b-4xl overflow-hidden min-h-[600px] md:h-[750px]">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/Container (1).png"
            alt="Background gradient"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Heading & Subtext */}
        <div className="flex flex-col items-center justify-center gap-4 w-full z-10 px-4 text-center">
          <h2 className="max-w-[90%] md:max-w-[743px] font-display-medium text-[#0d0d12] font-medium text-2xl sm:text-3xl md:text-5xl lg:text-5xl text-center leading-tight">
            Let&apos;s Talk
          </h2>

          <p className="max-w-[90%] md:max-w-[601px] text-[#666d80] text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed">
            Join us as we explore tailored solutions, discuss industry insights,
            and collaborate to find the best strategies for your success.
          </p>
        </div>
      </div>

      {/* Contact Form Card */}
      <Card className="
        w-full
        max-w-[90%]
        sm:max-w-[500px]
        md:max-w-[600px]
        lg:w-[600px]
        absolute 
        top-[220px]
        md:top-[241px] 
        left-1/2 
        -translate-x-1/2 
        rounded-2xl 
        border 
        border-solid 
        border-[#eceff3] 
        shadow-[0px_2px_8px_-1px_#0d0d120a] 
        bg-white
      ">
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