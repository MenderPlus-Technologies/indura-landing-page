import * as React from "react";
import { cn } from "@/lib/utils";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className }: FormSectionProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-6 bg-white rounded-[10px] border border-[#eceff3] shadow-sm",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <div className="h-1 w-8 bg-[#009688] rounded-full"></div>
        <h3 className="text-lg sm:text-xl font-semibold text-[#0d0d12]">{title}</h3>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
};
