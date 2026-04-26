"use client";
import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  Clock,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

const formFields = [
  {
    id: "fullName" as const,
    label: "Full Name",
    placeholder: "Your full name",
    type: "input",
    required: true,
  },
  {
    id: "email" as const,
    label: "Email",
    placeholder: "you@example.com",
    type: "input",
    required: true,
  },
  {
    id: "message" as const,
    label: "Message",
    placeholder: "Tell us what you need help with",
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

const contactHighlights = [
  {
    icon: MessageCircle,
    title: "Product support",
    description: "Questions about savings, payments, Health ID, or your account.",
  },
  {
    icon: Stethoscope,
    title: "Provider enquiries",
    description: "Facility onboarding, integrations, transactions, and reconciliation.",
  },
  {
    icon: Sparkles,
    title: "Partnerships",
    description: "Press, business, ecosystem, and strategic partnership conversations.",
  },
];

const responseDetails = [
  {
    icon: Clock,
    label: "Typical response",
    value: "Within 24 hours",
  },
  {
    icon: Mail,
    label: "Best channel",
    value: "Email follow-up",
  },
  {
    icon: ShieldCheck,
    label: "Privacy",
    value: "Handled securely",
  },
];

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
    <section className="relative overflow-hidden bg-[#f7fffd] px-4 py-12 plusJakarta sm:px-8 md:px-12 lg:px-20 lg:py-20 xl:px-[120px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-180px] top-16 h-[420px] w-[420px] rounded-full bg-[#009688]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-160px] top-28 h-[520px] w-[520px] rounded-full bg-[#d9fffb] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_520px]">
          <div className="flex flex-col gap-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#b7f2ec] bg-white px-4 py-2 text-sm font-semibold text-[#009688] shadow-sm">
              <MessageCircle className="h-4 w-4" />
              Contact Indura
            </div>

            <div className="flex flex-col gap-5">
              <h1 className="max-w-[720px] text-4xl font-medium leading-tight tracking-[-0.04em] text-[#0d0d12] sm:text-5xl lg:text-[64px]">
                Let&apos;s help you get closer to care.
              </h1>
              <p className="max-w-[610px] text-base leading-8 text-[#666d80] sm:text-lg">
                Whether you are saving for healthcare, joining as a provider, or
                exploring a partnership, send us a message and the right person
                on our team will follow up.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:max-w-[680px]">
              {responseDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-[#dfe1e6] bg-white/80 p-4 shadow-sm backdrop-blur"
                  >
                    <Icon className="mb-4 h-5 w-5 text-[#009688]" />
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#818898]">
                      {detail.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-[#0d0d12]">
                      {detail.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="relative overflow-hidden rounded-[28px] border-[#dfe1e6] bg-white p-0 shadow-[0_24px_80px_rgba(13,13,18,0.10)]">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-2 bg-[linear-gradient(90deg,#009688,#59d7ca,#d9fffb)]"
            />
            <CardHeader className="px-6 pb-0 pt-8 md:px-8">
              <CardTitle className="text-2xl font-semibold leading-tight text-[#0d0d12] md:text-3xl">
                Send us a message
              </CardTitle>
              <p className="text-sm leading-6 text-[#666d80]">
                Share a few details and we&apos;ll route your enquiry to the
                right team.
              </p>
            </CardHeader>

            <CardContent className="px-6 pb-8 pt-6 md:px-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col items-start gap-6"
              >
                <div className="flex w-full flex-col items-start gap-5">
                  {formFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex w-full flex-col items-start gap-2"
                    >
                      <div className="flex w-full items-center gap-1">
                        <Label
                          htmlFor={field.id}
                          className="text-sm font-semibold text-[#0d0d12]"
                        >
                          {field.label}
                        </Label>

                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </div>

                      {field.type === "input" ? (
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          aria-invalid={!!errors[field.id]}
                          className="h-13 rounded-xl border-[#dfe1e6] bg-[#fbfcfc] px-4 text-base shadow-none focus-visible:border-[#009688] focus-visible:ring-[#009688]/20"
                          {...register(field.id)}
                        />
                      ) : (
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          aria-invalid={!!errors[field.id]}
                          className="min-h-[156px] resize-none rounded-xl border-[#dfe1e6] bg-[#fbfcfc] px-4 py-3 text-base shadow-none focus-visible:border-[#009688] focus-visible:ring-[#009688]/20"
                          {...register(field.id)}
                        />
                      )}

                      {errors[field.id] && (
                        <p className="text-xs font-medium text-red-500">
                          {errors[field.id]?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[52px] w-full cursor-pointer rounded-xl bg-[#009688] px-6 font-semibold text-white hover:bg-[#00897b] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {contactHighlights.map((highlight) => {
            const Icon = highlight.icon;

            return (
              <Card
                key={highlight.title}
                className="rounded-3xl border-[#dfe1e6] bg-white/90 p-0 shadow-sm"
              >
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d9fffb]">
                    <Icon className="h-6 w-6 text-[#009688]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#0d0d12]">
                      {highlight.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#666d80]">
                      {highlight.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
