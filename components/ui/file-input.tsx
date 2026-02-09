import * as React from "react"
import { cn } from "@/lib/utils"

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        type="file"
        ref={ref}
        className={cn(
          "h-12 px-3 py-1.5 bg-white rounded-[10px] border border-[#dfe1e6] w-full transition-all",
          "file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium",
          "file:bg-[#009688] file:text-white file:cursor-pointer hover:file:bg-[#00897b]",
          "focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    )
  }
)
FileInput.displayName = "FileInput"

export { FileInput }
