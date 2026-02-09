import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        type="radio"
        ref={ref}
        className={cn(
          "mt-1 w-4 h-4 text-[#009688] border-[#dfe1e6] focus:ring-[#009688] focus:ring-2 cursor-pointer transition-all",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
    )
  }
)
Radio.displayName = "Radio"

export { Radio }
