"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  options?: SelectOption[];
  children?: React.ReactNode;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  name?: string;
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      value,
      onChange,
      options = [],
      children,
      placeholder = "Select an option",
      error = false,
      disabled = false,
      name,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);
    const [selectedLabel, setSelectedLabel] = React.useState<string>("");

    // Parse children if provided (for backward compatibility with <option> elements)
    const parsedOptions: SelectOption[] = React.useMemo(() => {
      if (options.length > 0) return options;
      
      if (children) {
        const childArray = React.Children.toArray(children) as React.ReactElement<
          React.HTMLAttributes<HTMLOptionElement> & { value?: string }
       >[];
        return childArray
          .filter((child) => child.type === "option")
          .map((child) => {
            const props = child.props as { value?: string; children?: React.ReactNode };
            return {
              value: props.value || "",
              label: (typeof props.children === "string" ? props.children : props.value) || "",
            };
          });
      }
      
      return [];
    }, [options, children]);

    // Update selected label when value changes
    React.useEffect(() => {
      if (value) {
        const option = parsedOptions.find((opt) => opt.value === value);
        setSelectedLabel(option?.label || "");
      } else {
        setSelectedLabel("");
      }
    }, [value, parsedOptions]);

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
      if (disabled) return;
      onChange?.(optionValue);
      setIsOpen(false);
    };

    return (
      <div
        ref={selectRef}
        className={cn("relative w-full", className)}
        {...props}
      >
        {/* Hidden input for form compatibility */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={value || ""}
            readOnly
          />
        )}

        {/* Select Button */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "h-12 w-full px-3 py-1.5 bg-white rounded-[10px] border",
            "text-left text-sm md:text-base text-[#0d0d12]",
            "transition-all duration-200",
            "flex items-center justify-between gap-2",
            "focus:outline-none focus:ring-2 focus:ring-[#009688]/20 focus:border-[#009688]",
            "hover:border-[#009688]/50",
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
              : "border-[#dfe1e6]",
            disabled && "opacity-50 cursor-not-allowed bg-gray-50",
            !selectedLabel && "text-[#666d80]"
          )}
        >
          <span className="truncate flex-1 text-left">
            {selectedLabel || placeholder}
          </span>
          <svg
            className={cn(
              "w-5 h-5 flex-shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
              error ? "text-red-500" : "text-[#666d80]"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && !disabled && (
          <div
            className={cn(
              "absolute z-50 w-full mt-1 bg-white rounded-[10px] border border-[#dfe1e6]",
              "shadow-lg max-h-60 overflow-auto",
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            <div className="p-1">
              {parsedOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-[#666d80] text-center">
                  No options available
                </div>
              ) : (
                parsedOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "w-full px-3 py-2 text-left text-sm md:text-base",
                      "rounded-md transition-colors",
                      "hover:bg-[#009688]/10",
                      value === option.value &&
                        "bg-[#009688]/10 text-[#009688] font-medium"
                    )}
                  >
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
